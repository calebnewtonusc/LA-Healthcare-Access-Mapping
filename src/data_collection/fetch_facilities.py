"""
Fetch healthcare facility data from California DHHS and other sources.

This script collects healthcare facility location data and saves it to the raw data directory.
Properly handles API requests, retries, and data validation.
"""

import requests
import pandas as pd
from datetime import datetime
from pathlib import Path
import time
import logging
from typing import Optional

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class FacilityDataCollector:
    """Collect healthcare facility data from verified sources."""

    def __init__(self, output_dir='data/raw'):
        """
        Initialize the data collector.

        Args:
            output_dir: Directory to save raw data files
        """
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.timestamp = datetime.now().strftime('%Y%m%d')

        # User agent for requests
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }

    def fetch_ca_dhhs_facilities(self, max_retries: int = 3) -> Optional[pd.DataFrame]:
        """
        Fetch facility data from California Department of Public Health.

        Args:
            max_retries: Maximum number of retry attempts

        Returns:
            DataFrame with facility data, or None if failed
        """
        # Direct CSV download URL - verified working
        url = "https://data.chhs.ca.gov/dataset/3b5b80e8-6b8d-4715-b3c0-2699af6e72e5/resource/f0ae5731-fef8-417f-839d-54a0ed3a126e/download/health_facility_locations.csv"

        for attempt in range(max_retries):
            try:
                logger.info(f"Fetching CA DHHS facility data (attempt {attempt + 1}/{max_retries})...")

                response = requests.get(url, headers=self.headers, timeout=30)
                response.raise_for_status()

                # Parse CSV
                from io import StringIO
                df = pd.read_csv(StringIO(response.text))

                logger.info(f"✓ Downloaded {len(df):,} California facilities")

                # Save raw data
                output_file = self.output_dir / f'ca_health_facilities_{self.timestamp}.csv'
                df.to_csv(output_file, index=False)
                logger.info(f"✓ Saved to {output_file}")

                return df

            except requests.exceptions.RequestException as e:
                logger.warning(f"Attempt {attempt + 1} failed: {e}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                else:
                    logger.error(f"Failed to fetch CA DHHS data after {max_retries} attempts")
                    return None

    def filter_to_la_county(self, df: pd.DataFrame) -> Optional[pd.DataFrame]:
        """
        Filter facility data to LA County only.

        Args:
            df: DataFrame with facility data

        Returns:
            Filtered DataFrame for LA County
        """
        if df is None or df.empty:
            logger.error("No data to filter")
            return None

        try:
            # Check for county column (various possible names)
            county_cols = [col for col in df.columns if 'county' in col.lower()]

            if not county_cols:
                logger.error("No county column found in data")
                return None

            county_col = county_cols[0]
            logger.info(f"Using county column: {county_col}")

            # Filter to LA County
            la_facilities = df[
                df[county_col].str.contains('Los Angeles', case=False, na=False)
            ].copy()

            logger.info(f"✓ Filtered to {len(la_facilities):,} LA County facilities")

            # Save LA County subset
            output_file = self.output_dir / f'la_health_facilities_{self.timestamp}.csv'
            la_facilities.to_csv(output_file, index=False)
            logger.info(f"✓ Saved to {output_file}")

            return la_facilities

        except Exception as e:
            logger.error(f"Error filtering to LA County: {e}")
            return None

    def validate_facility_data(self, df: pd.DataFrame) -> dict:
        """
        Validate facility data quality.

        Args:
            df: DataFrame to validate

        Returns:
            Dictionary with validation results
        """
        if df is None or df.empty:
            return {'valid': False, 'message': 'No data to validate'}

        results = {
            'valid': True,
            'total_records': len(df),
            'columns': list(df.columns),
            'issues': []
        }

        # Check for coordinate columns
        lat_cols = [col for col in df.columns if 'lat' in col.lower()]
        lon_cols = [col for col in df.columns if 'lon' in col.lower()]

        if not lat_cols or not lon_cols:
            results['issues'].append('Missing coordinate columns')
            results['valid'] = False
        else:
            # Check for missing coordinates
            lat_col = lat_cols[0]
            lon_col = lon_cols[0]

            missing_coords = df[[lat_col, lon_col]].isna().any(axis=1).sum()
            if missing_coords > 0:
                results['issues'].append(f'{missing_coords} records with missing coordinates')

            # Check coordinate ranges (should be LA County area)
            if lat_col in df.columns and lon_col in df.columns:
                lat_range = (df[lat_col].min(), df[lat_col].max())
                lon_range = (df[lon_col].min(), df[lon_col].max())

                results['lat_range'] = lat_range
                results['lon_range'] = lon_range

                # Rough LA County bounds check
                if lat_range[0] < 33.0 or lat_range[1] > 35.0:
                    results['issues'].append('Latitude range seems unusual for LA County')
                if lon_range[0] < -119.0 or lon_range[1] > -117.0:
                    results['issues'].append('Longitude range seems unusual for LA County')

        # Check for duplicates
        duplicates = df.duplicated().sum()
        if duplicates > 0:
            results['issues'].append(f'{duplicates} duplicate records found')

        # Log results
        logger.info(f"Validation: {len(results['issues'])} issues found")
        for issue in results['issues']:
            logger.warning(f"  - {issue}")

        return results


def main():
    """Main function to run data collection."""

    logger.info("="*70)
    logger.info("HEALTHCARE FACILITY DATA COLLECTION")
    logger.info("="*70)

    # Initialize collector
    collector = FacilityDataCollector()

    # Fetch California facility data
    ca_data = collector.fetch_ca_dhhs_facilities()

    if ca_data is not None:
        # Filter to LA County
        la_data = collector.filter_to_la_county(ca_data)

        if la_data is not None:
            # Validate data
            validation = collector.validate_facility_data(la_data)

            logger.info("\n" + "="*70)
            logger.info("DATA COLLECTION COMPLETE")
            logger.info("="*70)
            logger.info(f"Total California facilities: {len(ca_data):,}")
            logger.info(f"LA County facilities: {len(la_data):,}")
            logger.info(f"Validation status: {'✓ PASS' if validation['valid'] else '⚠ ISSUES FOUND'}")

            if validation['issues']:
                logger.info("\nData quality issues:")
                for issue in validation['issues']:
                    logger.info(f"  - {issue}")

            logger.info("\nNext steps:")
            logger.info("1. Review data in data/raw/")
            logger.info("2. Run data cleaning: python src/data_processing/clean_facilities.py")
            logger.info("3. Verify coordinate quality")

            return 0

    logger.error("Data collection failed")
    return 1


if __name__ == "__main__":
    exit(main())
