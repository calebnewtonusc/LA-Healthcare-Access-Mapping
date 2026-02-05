"""
Clean and standardize healthcare facility data.

This script processes raw facility data from multiple sources,
removes duplicates, geocodes addresses, and standardizes formats.
"""

import pandas as pd
import numpy as np
import logging
from pathlib import Path
from typing import Optional, Union, List
import json

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class FacilityDataCleaner:
    """Clean and standardize facility data from multiple sources."""

    def __init__(self, input_dir: Union[str, Path] = 'data/raw',
                 output_dir: Union[str, Path] = 'data/processed'):
        """
        Initialize the data cleaner.

        Args:
            input_dir: Directory containing raw data files
            output_dir: Directory to save cleaned data
        """
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def load_facility_data(self, filename: str) -> Optional[pd.DataFrame]:
        """
        Load raw facility data from JSON or CSV.

        Args:
            filename: Name of the data file

        Returns:
            DataFrame with raw facility data, or None if loading fails
        """
        filepath = self.input_dir / filename

        if not filepath.exists():
            logger.warning(f"File not found: {filepath}")
            return None

        try:
            if filename.endswith('.json'):
                with open(filepath, 'r') as f:
                    data = json.load(f)
                df = pd.DataFrame(data)
            elif filename.endswith('.csv'):
                df = pd.read_csv(filepath)
            else:
                logger.error(f"Unsupported file format: {filename}")
                return None

            logger.info(f"Loaded {len(df)} facilities from {filename}")
            return df

        except Exception as e:
            logger.error(f"Error loading {filename}: {e}")
            return None

    def standardize_columns(self, df: pd.DataFrame, source: str = 'lacounty') -> pd.DataFrame:
        """
        Standardize column names across data sources.

        Args:
            df: DataFrame with facility data
            source: Data source identifier

        Returns:
            DataFrame with standardized column names
        """
        # Define column mappings for different sources
        column_mappings = {
            'lacounty': {
                'facility_name': 'name',
                'facility_type': 'type',
                'street_address': 'address',
                'city': 'city',
                'zip_code': 'zipcode',
                'latitude': 'lat',
                'longitude': 'lon',
            },
            'google': {
                'name': 'name',
                'types': 'type',
                'vicinity': 'address',
                'geometry.location.lat': 'lat',
                'geometry.location.lng': 'lon',
            },
            'ca_dhhs': {
                'FACNAME': 'name',
                'FACTYPE': 'type',
                'ADDRESS': 'address',
                'CITY': 'city',
                'ZIP': 'zipcode',
                'LAT': 'lat',
                'LON': 'lon',
            }
        }

        if source in column_mappings:
            # Handle nested columns for Google data
            if source == 'google' and 'geometry' in df.columns:
                df['lat'] = df['geometry'].apply(lambda x: x.get('location', {}).get('lat') if isinstance(x, dict) else None)
                df['lon'] = df['geometry'].apply(lambda x: x.get('location', {}).get('lng') if isinstance(x, dict) else None)

            df = df.rename(columns=column_mappings[source])
            logger.info(f"Standardized columns for {source} data")
        else:
            logger.warning(f"No column mapping defined for source: {source}")

        return df

    def remove_duplicates(self, df: pd.DataFrame, threshold: float = 0.0001) -> pd.DataFrame:
        """
        Remove duplicate facilities based on location and name.

        Args:
            df: DataFrame with facility data
            threshold: Distance threshold for coordinate duplicates (degrees)

        Returns:
            DataFrame with duplicates removed
        """
        initial_count = len(df)

        # Remove exact coordinate duplicates
        df = df.drop_duplicates(subset=['lat', 'lon'], keep='first')

        # Remove near-duplicates using coordinate proximity
        # For facilities within threshold distance, keep the one with more complete data
        if 'name' in df.columns:
            # Group by approximate location (rounded coordinates)
            df['lat_round'] = df['lat'].round(4)
            df['lon_round'] = df['lon'].round(4)

            # For each location group, remove duplicates with similar names
            deduplicated = []
            for (lat_r, lon_r), group in df.groupby(['lat_round', 'lon_round']):
                if len(group) > 1:
                    # Keep the facility with the most complete information
                    group['completeness'] = group.notna().sum(axis=1)
                    best = group.nlargest(1, 'completeness')
                    deduplicated.append(best)
                else:
                    deduplicated.append(group)

            df = pd.concat(deduplicated, ignore_index=True)
            df = df.drop(columns=['lat_round', 'lon_round', 'completeness'])

        removed = initial_count - len(df)
        logger.info(f"Removed {removed} duplicate facilities ({removed/initial_count*100:.1f}%)")

        return df

    def validate_coordinates(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Validate and filter facilities within LA County bounds.

        Args:
            df: DataFrame with facility data

        Returns:
            DataFrame with validated coordinates
        """
        # Approximate LA County bounding box
        # North: 34.8, South: 33.7, West: -118.7, East: -117.6
        la_bounds = {
            'lat_min': 33.7,
            'lat_max': 34.8,
            'lon_min': -118.7,
            'lon_max': -117.6
        }

        # Filter coordinates
        mask = (
            (df['lat'] >= la_bounds['lat_min']) &
            (df['lat'] <= la_bounds['lat_max']) &
            (df['lon'] >= la_bounds['lon_min']) &
            (df['lon'] <= la_bounds['lon_max']) &
            (df['lat'].notna()) &
            (df['lon'].notna())
        )

        invalid_count = (~mask).sum()
        if invalid_count > 0:
            logger.warning(f"Filtered {invalid_count} facilities outside LA County bounds or with invalid coordinates")

        return df[mask].copy()

    def categorize_facilities(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Categorize facilities into standardized types.

        Args:
            df: DataFrame with facility data

        Returns:
            DataFrame with standardized facility categories
        """
        # Define facility type mappings
        urgent_care_keywords = ['urgent care', 'urgent', 'walk-in', 'walk in']
        hospital_keywords = ['hospital', 'medical center', 'emergency', 'trauma']
        clinic_keywords = ['clinic', 'health center', 'community health', 'primary care']

        def categorize(facility_type):
            if pd.isna(facility_type):
                return 'other'

            facility_type = str(facility_type).lower()

            if any(keyword in facility_type for keyword in urgent_care_keywords):
                return 'urgent_care'
            elif any(keyword in facility_type for keyword in hospital_keywords):
                return 'hospital'
            elif any(keyword in facility_type for keyword in clinic_keywords):
                return 'clinic'
            else:
                return 'other'

        if 'type' in df.columns:
            df['category'] = df['type'].apply(categorize)
        else:
            df['category'] = 'other'

        category_counts = df['category'].value_counts()
        logger.info(f"Facility categories:\n{category_counts.to_string()}")

        return df

    def clean_dataset(self, df: pd.DataFrame, source: str = 'lacounty') -> Optional[pd.DataFrame]:
        """
        Run full cleaning pipeline on facility dataset.

        Args:
            df: Raw facility DataFrame
            source: Data source identifier

        Returns:
            Cleaned DataFrame, or None if cleaning fails
        """
        try:
            logger.info(f"\nCleaning {source} data...")
            logger.info(f"Initial record count: {len(df)}")

            # Standardize columns
            df = self.standardize_columns(df, source)

            # Ensure required columns exist
            required_cols = ['lat', 'lon']
            missing_cols = [col for col in required_cols if col not in df.columns]
            if missing_cols:
                logger.error(f"Missing required columns: {missing_cols}")
                return None

            # Remove rows with missing coordinates
            initial_count = len(df)
            df = df.dropna(subset=['lat', 'lon'])
            dropped = initial_count - len(df)
            if dropped > 0:
                logger.info(f"Dropped {dropped} records with missing coordinates")

            # Validate coordinates
            df = self.validate_coordinates(df)

            # Remove duplicates
            df = self.remove_duplicates(df)

            # Categorize facilities
            df = self.categorize_facilities(df)

            # Add data source column
            df['source'] = source

            # Add metadata
            df['cleaned_date'] = pd.Timestamp.now().strftime('%Y-%m-%d')

            logger.info(f"Cleaned dataset: {len(df)} facilities")

            return df

        except Exception as e:
            logger.error(f"Error cleaning dataset: {e}")
            return None

    def merge_sources(self, dataframes: List[pd.DataFrame]) -> Optional[pd.DataFrame]:
        """
        Merge facility data from multiple sources.

        Args:
            dataframes: List of cleaned DataFrames

        Returns:
            Merged DataFrame, or None if merge fails
        """
        if not dataframes:
            logger.warning("No dataframes to merge")
            return None

        try:
            merged = pd.concat(dataframes, ignore_index=True)
            logger.info(f"Merged {len(dataframes)} datasets: {len(merged)} total records")

            # Remove cross-source duplicates
            merged = self.remove_duplicates(merged)

            logger.info(f"Final merged dataset: {len(merged)} facilities from {len(dataframes)} sources")

            return merged

        except Exception as e:
            logger.error(f"Error merging datasets: {e}")
            return None

    def save_cleaned_data(self, df: pd.DataFrame, filename: str = 'facilities_cleaned.csv') -> bool:
        """
        Save cleaned facility data.

        Args:
            df: Cleaned DataFrame
            filename: Output filename

        Returns:
            True if save successful, False otherwise
        """
        try:
            output_path = self.output_dir / filename
            df.to_csv(output_path, index=False)
            logger.info(f"Saved cleaned data to {output_path}")

            # Log summary statistics
            logger.info("\n=== Cleaning Summary ===")
            logger.info(f"Total facilities: {len(df)}")
            if 'category' in df.columns:
                logger.info(f"Categories:\n{df['category'].value_counts().to_string()}")
            if 'source' in df.columns:
                logger.info(f"Sources:\n{df['source'].value_counts().to_string()}")

            return True

        except Exception as e:
            logger.error(f"Error saving cleaned data: {e}")
            return False


def main():
    """Main function to run facility data cleaning."""

    cleaner = FacilityDataCleaner()

    # List of potential data sources to process
    data_sources = [
        ('health_facility_locations.csv', 'ca_dhhs'),
        ('lacounty_facilities.csv', 'lacounty'),
        ('google_places_facilities.json', 'google'),
    ]

    cleaned_datasets = []

    # Process each data source
    for filename, source in data_sources:
        logger.info(f"\n{'='*60}")
        logger.info(f"Processing {filename}...")
        logger.info(f"{'='*60}")

        raw_data = cleaner.load_facility_data(filename)

        if raw_data is not None:
            cleaned = cleaner.clean_dataset(raw_data, source)

            if cleaned is not None:
                cleaned_datasets.append(cleaned)
                # Save individual cleaned dataset
                cleaner.save_cleaned_data(cleaned, f'facilities_{source}_cleaned.csv')
        else:
            logger.info(f"Skipping {filename} (file not found)")

    # Merge all cleaned datasets
    if len(cleaned_datasets) > 0:
        logger.info(f"\n{'='*60}")
        logger.info("Merging all cleaned datasets...")
        logger.info(f"{'='*60}")

        merged = cleaner.merge_sources(cleaned_datasets)
        if merged is not None:
            cleaner.save_cleaned_data(merged, 'facilities_cleaned.csv')

        logger.info("\n=== Data cleaning complete! ===")
        return 0
    else:
        logger.warning("No data sources were successfully processed")
        return 1


if __name__ == "__main__":
    exit(main())
