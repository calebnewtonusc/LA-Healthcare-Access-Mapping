"""
Fetch demographic and population data from US Census Bureau API.

This script retrieves population, income, insurance, and other demographic
data at the census tract level for Los Angeles County with proper error handling
and retry logic.
"""

import requests
import pandas as pd
from datetime import datetime
from pathlib import Path
import os
import time
import logging
from typing import Optional, Dict, List

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class CensusDataCollector:
    """Collect demographic data from US Census Bureau API with robust error handling."""

    # LA County FIPS codes
    STATE_FIPS = "06"  # California
    COUNTY_FIPS = "037"  # Los Angeles County

    # Census API base URL
    BASE_URL = "https://api.census.gov/data"

    def __init__(self, api_key: Optional[str] = None, output_dir: str = 'data/raw'):
        """
        Initialize the Census data collector.

        Args:
            api_key: Census API key (optional for testing, recommended for production)
            output_dir: Directory to save raw data files
        """
        self.api_key = api_key or os.getenv('CENSUS_API_KEY')
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.timestamp = datetime.now().strftime('%Y%m%d')

    def _make_request(self, url: str, params: Dict, max_retries: int = 3) -> Optional[List]:
        """
        Make Census API request with retry logic.

        Args:
            url: API endpoint URL
            params: Request parameters
            max_retries: Maximum number of retry attempts

        Returns:
            JSON response data or None if failed
        """
        for attempt in range(max_retries):
            try:
                logger.info(f"Making Census API request (attempt {attempt + 1}/{max_retries})...")

                response = requests.get(url, params=params, timeout=30)
                response.raise_for_status()

                data = response.json()

                # Check for API error messages
                if isinstance(data, dict) and 'error' in data:
                    logger.error(f"Census API error: {data['error']}")
                    return None

                return data

            except requests.exceptions.Timeout:
                logger.warning(f"Request timeout on attempt {attempt + 1}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)
            except requests.exceptions.RequestException as e:
                logger.warning(f"Request failed on attempt {attempt + 1}: {e}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)

        logger.error(f"Failed after {max_retries} attempts")
        return None

    def fetch_basic_demographics(self, year: int = 2022) -> Optional[pd.DataFrame]:
        """
        Fetch basic demographic data (population, income, age).

        Args:
            year: Data year (default: 2022 for 2020-2024 ACS estimates)

        Returns:
            DataFrame with demographic data by census tract
        """
        logger.info(f"Fetching basic demographics for year {year}...")

        # Key variables to collect
        variables = [
            'NAME',  # Geographic name
            'B01003_001E',  # Total Population
            'B19013_001E',  # Median Household Income
            'B01002_001E',  # Median Age
        ]

        url = f"{self.BASE_URL}/{year}/acs/acs5"
        params = {
            'get': ','.join(variables),
            'for': 'tract:*',
            'in': f'state:{self.STATE_FIPS} county:{self.COUNTY_FIPS}'
        }

        # Add API key if available
        if self.api_key:
            params['key'] = self.api_key

        data = self._make_request(url, params)

        if data is None:
            return None

        # Convert to DataFrame
        df = pd.DataFrame(data[1:], columns=data[0])

        # Convert numeric columns
        numeric_cols = ['B01003_001E', 'B19013_001E', 'B01002_001E']
        for col in numeric_cols:
            df[col] = pd.to_numeric(df[col], errors='coerce')

        # Create GEOID
        df['GEOID'] = (
            df['state'].astype(str).str.zfill(2) +
            df['county'].astype(str).str.zfill(3) +
            df['tract'].astype(str).str.zfill(6)
        )

        # Save raw data
        output_file = self.output_dir / f'census_basic_demographics_{self.timestamp}.csv'
        df.to_csv(output_file, index=False)

        logger.info(f"✓ Saved {len(df)} census tracts to {output_file}")

        return df

    def fetch_transportation_data(self, year: int = 2022) -> Optional[pd.DataFrame]:
        """
        Fetch transportation and vehicle availability data.

        Args:
            year: Data year

        Returns:
            DataFrame with transportation data
        """
        logger.info(f"Fetching transportation data for year {year}...")

        variables = [
            'NAME',
            'B08201_001E',  # Total Households
            'B08201_002E',  # Households with No Vehicle
        ]

        url = f"{self.BASE_URL}/{year}/acs/acs5"
        params = {
            'get': ','.join(variables),
            'for': 'tract:*',
            'in': f'state:{self.STATE_FIPS} county:{self.COUNTY_FIPS}'
        }

        if self.api_key:
            params['key'] = self.api_key

        data = self._make_request(url, params)

        if data is None:
            return None

        df = pd.DataFrame(data[1:], columns=data[0])

        # Convert numeric columns
        for col in ['B08201_001E', 'B08201_002E']:
            df[col] = pd.to_numeric(df[col], errors='coerce')

        # Create GEOID
        df['GEOID'] = (
            df['state'].astype(str).str.zfill(2) +
            df['county'].astype(str).str.zfill(3) +
            df['tract'].astype(str).str.zfill(6)
        )

        # Save raw data
        output_file = self.output_dir / f'census_transportation_{self.timestamp}.csv'
        df.to_csv(output_file, index=False)

        logger.info(f"✓ Saved transportation data to {output_file}")

        return df

    def fetch_poverty_data(self, year: int = 2022) -> Optional[pd.DataFrame]:
        """
        Fetch poverty status data.

        Args:
            year: Data year

        Returns:
            DataFrame with poverty data
        """
        logger.info(f"Fetching poverty data for year {year}...")

        variables = [
            'NAME',
            'S1701_C03_001E',  # Percent Below Poverty Level
        ]

        url = f"{self.BASE_URL}/{year}/acs/acs5/subject"
        params = {
            'get': ','.join(variables),
            'for': 'tract:*',
            'in': f'state:{self.STATE_FIPS} county:{self.COUNTY_FIPS}'
        }

        if self.api_key:
            params['key'] = self.api_key

        data = self._make_request(url, params)

        if data is None:
            return None

        df = pd.DataFrame(data[1:], columns=data[0])

        # Convert to numeric (handle -666666666 for nulls)
        df['S1701_C03_001E'] = pd.to_numeric(df['S1701_C03_001E'], errors='coerce')
        df['S1701_C03_001E'] = df['S1701_C03_001E'].replace(-666666666, pd.NA)

        # Create GEOID
        df['GEOID'] = (
            df['state'].astype(str).str.zfill(2) +
            df['county'].astype(str).str.zfill(3) +
            df['tract'].astype(str).str.zfill(6)
        )

        # Save raw data
        output_file = self.output_dir / f'census_poverty_{self.timestamp}.csv'
        df.to_csv(output_file, index=False)

        logger.info(f"✓ Saved poverty data to {output_file}")

        return df

    def validate_data(self, df: pd.DataFrame, data_type: str) -> Dict:
        """
        Validate census data quality.

        Args:
            df: DataFrame to validate
            data_type: Type of data (for logging)

        Returns:
            Dictionary with validation results
        """
        if df is None or df.empty:
            return {'valid': False, 'message': 'No data to validate'}

        results = {
            'valid': True,
            'data_type': data_type,
            'total_records': len(df),
            'issues': []
        }

        # Check for GEOID
        if 'GEOID' not in df.columns:
            results['issues'].append('GEOID column missing')
            results['valid'] = False

        # Check for expected tract count (LA County has ~2,500 tracts)
        if len(df) < 2000:
            results['issues'].append(f'Only {len(df)} tracts found (expected ~2,500)')
        elif len(df) > 3000:
            results['issues'].append(f'Too many tracts: {len(df)} (expected ~2,500)')

        # Check for missing values in numeric columns
        numeric_cols = df.select_dtypes(include=['number']).columns
        for col in numeric_cols:
            missing = df[col].isna().sum()
            if missing > 0:
                pct = (missing / len(df)) * 100
                if pct > 10:  # More than 10% missing
                    results['issues'].append(f'{col}: {missing} missing values ({pct:.1f}%)')

        logger.info(f"Validation ({data_type}): {len(results['issues'])} issues found")
        for issue in results['issues']:
            logger.warning(f"  - {issue}")

        return results


def main():
    """Main function to run Census data collection."""

    logger.info("="*70)
    logger.info("CENSUS DATA COLLECTION")
    logger.info("="*70)

    # Initialize collector
    collector = CensusDataCollector()

    if not collector.api_key:
        logger.warning("\n⚠ No Census API key found!")
        logger.info("Get a free API key at: https://api.census.gov/data/key_signup.html")
        logger.info("Then add to .env file: CENSUS_API_KEY=your_key_here")
        logger.info("\nContinuing without API key (may have rate limits)...\n")

    # Fetch different datasets
    basic_data = collector.fetch_basic_demographics(year=2022)
    transport_data = collector.fetch_transportation_data(year=2022)
    poverty_data = collector.fetch_poverty_data(year=2022)

    # Validate all datasets
    all_valid = True

    if basic_data is not None:
        validation = collector.validate_data(basic_data, 'Basic Demographics')
        all_valid = all_valid and validation['valid']
    else:
        logger.error("Failed to fetch basic demographics")
        all_valid = False

    if transport_data is not None:
        validation = collector.validate_data(transport_data, 'Transportation')
        all_valid = all_valid and validation['valid']
    else:
        logger.error("Failed to fetch transportation data")
        all_valid = False

    if poverty_data is not None:
        validation = collector.validate_data(poverty_data, 'Poverty')
        all_valid = all_valid and validation['valid']
    else:
        logger.error("Failed to fetch poverty data")
        all_valid = False

    logger.info("\n" + "="*70)
    logger.info("CENSUS DATA COLLECTION COMPLETE")
    logger.info("="*70)

    if all_valid:
        logger.info("✓ All datasets collected and validated")
        logger.info("\nNext steps:")
        logger.info("1. Review data in data/raw/")
        logger.info("2. Run census merge: python src/data_processing/fix_census_merge.py")
        logger.info("3. Proceed to analysis")
        return 0
    else:
        logger.error("⚠ Some datasets failed validation")
        logger.info("Review errors above and retry if needed")
        return 1


if __name__ == "__main__":
    exit(main())
