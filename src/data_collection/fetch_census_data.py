"""
Fetch demographic and population data from US Census Bureau API.

This script retrieves population, income, insurance, and other demographic
data at the census tract level for Los Angeles County.
"""

import requests
import pandas as pd
from datetime import datetime
from pathlib import Path
import os


class CensusDataCollector:
    """Collect demographic data from US Census Bureau API."""

    def __init__(self, api_key=None, output_dir='data/raw/demographics'):
        """
        Initialize the Census data collector.

        Args:
            api_key: Census API key (get from census.gov/data/developers)
            output_dir: Directory to save raw data files
        """
        self.api_key = api_key or os.getenv('CENSUS_API_KEY')
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.timestamp = datetime.now().strftime('%Y%m%d')
        self.base_url = "https://api.census.gov/data"

        # LA County FIPS code
        self.state_fips = "06"  # California
        self.county_fips = "037"  # Los Angeles County

    def fetch_acs_data(self, year=2021, dataset='acs5'):
        """
        Fetch American Community Survey data.

        Args:
            year: Data year (default: 2021, use most recent available)
            dataset: ACS dataset (acs1, acs5 - 5-year is more reliable)

        Returns:
            DataFrame with demographic data by census tract
        """
        if not self.api_key:
            print("⚠ Census API key required. Get one at https://api.census.gov/data/key_signup.html")
            return None

        # Key variables to collect
        variables = {
            'NAME': 'Geographic Area Name',
            'B01003_001E': 'Total Population',
            'B19013_001E': 'Median Household Income',
            'B01002_001E': 'Median Age',
            'B25001_001E': 'Total Housing Units',
            'B08201_001E': 'Total Households',
            'B08201_002E': 'Households with No Vehicle',
            'B27001_001E': 'Health Insurance Coverage Universe',
            'B27001_005E': 'Uninsured Males Under 18',
            'B27001_033E': 'Uninsured Females Under 18',
        }

        var_string = ','.join(variables.keys())

        url = f"{self.base_url}/{year}/{dataset}"
        params = {
            'get': var_string,
            'for': 'tract:*',
            'in': f'state:{self.state_fips}+county:{self.county_fips}',
            'key': self.api_key
        }

        try:
            print(f"Fetching ACS {year} {dataset} data for LA County...")
            response = requests.get(url, params=params)
            response.raise_for_status()

            data = response.json()

            # Convert to DataFrame
            df = pd.DataFrame(data[1:], columns=data[0])

            # Convert numeric columns
            for col in variables.keys():
                if col != 'NAME':
                    df[col] = pd.to_numeric(df[col], errors='coerce')

            # Rename columns
            df = df.rename(columns=variables)

            # Create GEOID for joining with shapefiles
            df['GEOID'] = df['state'] + df['county'] + df['tract']

            # Save raw data
            output_file = self.output_dir / f'census_acs_{year}_{self.timestamp}.csv'
            df.to_csv(output_file, index=False)

            print(f"✓ Saved {len(df)} census tracts to {output_file}")
            return df

        except requests.exceptions.RequestException as e:
            print(f"Error fetching Census data: {e}")
            return None

    def fetch_population_density(self, year=2020):
        """
        Fetch population and land area for density calculation.

        Args:
            year: Data year

        Returns:
            DataFrame with population density data
        """
        if not self.api_key:
            print("⚠ Census API key required")
            return None

        variables = {
            'NAME': 'Geographic Area Name',
            'P1_001N': 'Total Population',
            'AREALAND': 'Land Area (sq meters)',
            'AREAWATER': 'Water Area (sq meters)'
        }

        var_string = ','.join(variables.keys())

        url = f"{self.base_url}/{year}/dec/pl"  # Decennial census
        params = {
            'get': var_string,
            'for': 'tract:*',
            'in': f'state:{self.state_fips}+county:{self.county_fips}',
            'key': self.api_key
        }

        try:
            print(f"Fetching population density data ({year})...")
            response = requests.get(url, params=params)
            response.raise_for_status()

            data = response.json()
            df = pd.DataFrame(data[1:], columns=data[0])

            # Convert to numeric
            for col in ['P1_001N', 'AREALAND', 'AREAWATER']:
                df[col] = pd.to_numeric(df[col], errors='coerce')

            # Calculate density (per sq km)
            df['population_density_per_sqkm'] = (
                df['P1_001N'] / (df['AREALAND'] / 1_000_000)
            )

            # Create GEOID
            df['GEOID'] = df['state'] + df['county'] + df['tract']

            output_file = self.output_dir / f'census_density_{year}_{self.timestamp}.csv'
            df.to_csv(output_file, index=False)

            print(f"✓ Saved population density data to {output_file}")
            return df

        except Exception as e:
            print(f"Error fetching density data: {e}")
            return None

    def fetch_poverty_data(self, year=2021):
        """
        Fetch poverty status data.

        Args:
            year: Data year

        Returns:
            DataFrame with poverty data
        """
        if not self.api_key:
            print("⚠ Census API key required")
            return None

        variables = {
            'NAME': 'Geographic Area Name',
            'S1701_C01_001E': 'Total Population for Poverty Status',
            'S1701_C02_001E': 'Population Below Poverty Level',
            'S1701_C03_001E': 'Percent Below Poverty Level',
        }

        var_string = ','.join(variables.keys())

        url = f"{self.base_url}/{year}/acs/acs5/subject"
        params = {
            'get': var_string,
            'for': 'tract:*',
            'in': f'state:{self.state_fips}+county:{self.county_fips}',
            'key': self.api_key
        }

        try:
            print(f"Fetching poverty data ({year})...")
            response = requests.get(url, params=params)
            response.raise_for_status()

            data = response.json()
            df = pd.DataFrame(data[1:], columns=data[0])

            # Convert to numeric
            for col in variables.keys():
                if col != 'NAME':
                    df[col] = pd.to_numeric(df[col], errors='coerce')

            df['GEOID'] = df['state'] + df['county'] + df['tract']

            output_file = self.output_dir / f'census_poverty_{year}_{self.timestamp}.csv'
            df.to_csv(output_file, index=False)

            print(f"✓ Saved poverty data to {output_file}")
            return df

        except Exception as e:
            print(f"Error fetching poverty data: {e}")
            return None


def main():
    """Main function to run Census data collection."""

    # Initialize collector
    collector = CensusDataCollector()

    if not collector.api_key:
        print("\n⚠ No Census API key found!")
        print("Get a free API key at: https://api.census.gov/data/key_signup.html")
        print("Then add to .env file: CENSUS_API_KEY=your_key_here")
        return

    # Fetch different datasets
    acs_data = collector.fetch_acs_data(year=2021)
    density_data = collector.fetch_population_density(year=2020)
    poverty_data = collector.fetch_poverty_data(year=2021)

    print("\n✓ Census data collection complete!")
    print("Next steps:")
    print("1. Review data in data/raw/demographics/")
    print("2. Merge datasets in data processing phase")
    print("3. Join with geographic boundaries")


if __name__ == "__main__":
    main()
