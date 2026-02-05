"""
Clean and standardize healthcare facility data.

This script processes raw facility data from multiple sources,
removes duplicates, geocodes addresses, and standardizes formats.
"""

import pandas as pd
import numpy as np
from pathlib import Path
import json


class FacilityDataCleaner:
    """Clean and standardize facility data from multiple sources."""

    def __init__(self, input_dir='data/raw', output_dir='data/processed'):
        """
        Initialize the data cleaner.

        Args:
            input_dir: Directory containing raw data files
            output_dir: Directory to save cleaned data
        """
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def load_facility_data(self, filename):
        """
        Load raw facility data from JSON or CSV.

        Args:
            filename: Name of the data file

        Returns:
            DataFrame with raw facility data
        """
        filepath = self.input_dir / filename

        if not filepath.exists():
            print(f"⚠ File not found: {filepath}")
            return None

        try:
            if filename.endswith('.json'):
                with open(filepath, 'r') as f:
                    data = json.load(f)
                df = pd.DataFrame(data)
            elif filename.endswith('.csv'):
                df = pd.read_csv(filepath)
            else:
                print(f"⚠ Unsupported file format: {filename}")
                return None

            print(f"✓ Loaded {len(df)} facilities from {filename}")
            return df

        except Exception as e:
            print(f"Error loading {filename}: {e}")
            return None

    def standardize_columns(self, df, source='lacounty'):
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
            }
        }

        if source in column_mappings:
            # Handle nested columns for Google data
            if source == 'google' and 'geometry' in df.columns:
                df['lat'] = df['geometry'].apply(lambda x: x.get('location', {}).get('lat'))
                df['lon'] = df['geometry'].apply(lambda x: x.get('location', {}).get('lng'))

            df = df.rename(columns=column_mappings[source])

        return df

    def remove_duplicates(self, df, threshold=0.0001):
        """
        Remove duplicate facilities based on location.

        Args:
            df: DataFrame with facility data
            threshold: Distance threshold for duplicates (degrees)

        Returns:
            DataFrame with duplicates removed
        """
        initial_count = len(df)

        # Remove exact coordinate duplicates
        df = df.drop_duplicates(subset=['lat', 'lon'], keep='first')

        # TODO: Add fuzzy matching for near-duplicates
        # Could use geopy distance calculation for more sophisticated deduplication

        removed = initial_count - len(df)
        print(f"✓ Removed {removed} duplicate facilities")

        return df

    def validate_coordinates(self, df):
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
            (df['lon'] <= la_bounds['lon_max'])
        )

        invalid_count = (~mask).sum()
        if invalid_count > 0:
            print(f"⚠ Filtered {invalid_count} facilities outside LA County bounds")

        return df[mask]

    def categorize_facilities(self, df):
        """
        Categorize facilities into standardized types.

        Args:
            df: DataFrame with facility data

        Returns:
            DataFrame with standardized facility categories
        """
        # Define facility type mappings
        urgent_care_keywords = ['urgent care', 'urgent', 'walk-in']
        hospital_keywords = ['hospital', 'medical center', 'emergency']
        clinic_keywords = ['clinic', 'health center', 'community health']

        def categorize(facility_type):
            if pd.isna(facility_type):
                return 'unknown'

            facility_type = str(facility_type).lower()

            if any(keyword in facility_type for keyword in urgent_care_keywords):
                return 'urgent_care'
            elif any(keyword in facility_type for keyword in hospital_keywords):
                return 'hospital'
            elif any(keyword in facility_type for keyword in clinic_keywords):
                return 'clinic'
            else:
                return 'other'

        df['category'] = df['type'].apply(categorize)

        print("\nFacility categories:")
        print(df['category'].value_counts())

        return df

    def clean_dataset(self, df, source='lacounty'):
        """
        Run full cleaning pipeline on facility dataset.

        Args:
            df: Raw facility DataFrame
            source: Data source identifier

        Returns:
            Cleaned DataFrame
        """
        print(f"\nCleaning {source} data...")

        # Standardize columns
        df = self.standardize_columns(df, source)

        # Ensure required columns exist
        required_cols = ['name', 'lat', 'lon']
        missing_cols = [col for col in required_cols if col not in df.columns]
        if missing_cols:
            print(f"⚠ Missing required columns: {missing_cols}")
            return None

        # Remove rows with missing coordinates
        df = df.dropna(subset=['lat', 'lon'])

        # Validate coordinates
        df = self.validate_coordinates(df)

        # Remove duplicates
        df = self.remove_duplicates(df)

        # Categorize facilities
        if 'type' in df.columns:
            df = self.categorize_facilities(df)

        # Add data source column
        df['source'] = source

        print(f"✓ Cleaned dataset: {len(df)} facilities")

        return df

    def merge_sources(self, dataframes):
        """
        Merge facility data from multiple sources.

        Args:
            dataframes: List of cleaned DataFrames

        Returns:
            Merged DataFrame
        """
        if not dataframes:
            print("⚠ No dataframes to merge")
            return None

        merged = pd.concat(dataframes, ignore_index=True)

        # Remove cross-source duplicates
        merged = self.remove_duplicates(merged)

        print(f"\n✓ Merged dataset: {len(merged)} facilities from {len(dataframes)} sources")

        return merged

    def save_cleaned_data(self, df, filename='facilities_cleaned.csv'):
        """
        Save cleaned facility data.

        Args:
            df: Cleaned DataFrame
            filename: Output filename
        """
        output_path = self.output_dir / filename
        df.to_csv(output_path, index=False)
        print(f"✓ Saved cleaned data to {output_path}")


def main():
    """Main function to run facility data cleaning."""

    cleaner = FacilityDataCleaner()

    # Example: Load and clean LA County data
    # Update filename to match your collected data
    lacounty_raw = cleaner.load_facility_data('lacounty_facilities_20240204.json')

    if lacounty_raw is not None:
        lacounty_clean = cleaner.clean_dataset(lacounty_raw, source='lacounty')

        if lacounty_clean is not None:
            cleaner.save_cleaned_data(lacounty_clean)

    # TODO: Add other data sources when available
    # google_raw = cleaner.load_facility_data('google_places_facilities_20240204.json')
    # google_clean = cleaner.clean_dataset(google_raw, source='google')

    # Merge all sources
    # all_clean = [df for df in [lacounty_clean, google_clean] if df is not None]
    # merged = cleaner.merge_sources(all_clean)
    # cleaner.save_cleaned_data(merged, 'facilities_merged.csv')

    print("\n✓ Data cleaning complete!")


if __name__ == "__main__":
    main()
