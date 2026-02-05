"""
Fetch healthcare facility data from LA County and other sources.

This script collects urgent care, hospital, and clinic location data
from various APIs and saves them to the raw data directory.
"""

import requests
import json
import pandas as pd
from datetime import datetime
import os
from pathlib import Path


class FacilityDataCollector:
    """Collect healthcare facility data from multiple sources."""

    def __init__(self, output_dir='data/raw'):
        """
        Initialize the data collector.

        Args:
            output_dir: Directory to save raw data files
        """
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.timestamp = datetime.now().strftime('%Y%m%d')

    def fetch_lacounty_facilities(self):
        """
        Fetch facility data from LA County Open Data Portal.

        Returns:
            DataFrame with facility data
        """
        # LA County Socrata API endpoint
        # Example: Healthcare facilities dataset
        url = "https://data.lacounty.gov/resource/healthcare-facilities.json"

        try:
            print("Fetching LA County facility data...")
            response = requests.get(url, params={'$limit': 10000})
            response.raise_for_status()

            data = response.json()
            df = pd.DataFrame(data)

            # Save raw data
            output_file = self.output_dir / f'lacounty_facilities_{self.timestamp}.json'
            with open(output_file, 'w') as f:
                json.dump(data, f, indent=2)

            print(f"✓ Saved {len(df)} facilities to {output_file}")
            return df

        except requests.exceptions.RequestException as e:
            print(f"Error fetching LA County data: {e}")
            return None

    def fetch_google_places(self, api_key, location='34.0522,-118.2437', radius=50000):
        """
        Fetch facility data from Google Places API.

        Args:
            api_key: Google Places API key
            location: Lat,long coordinates (default: LA center)
            radius: Search radius in meters

        Returns:
            DataFrame with facility data
        """
        # Note: This requires a valid Google API key
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

        facility_types = ['hospital', 'doctor', 'health']
        all_facilities = []

        for facility_type in facility_types:
            try:
                print(f"Searching for {facility_type} facilities...")
                params = {
                    'location': location,
                    'radius': radius,
                    'type': facility_type,
                    'key': api_key
                }

                response = requests.get(url, params=params)
                response.raise_for_status()

                data = response.json()
                if data.get('results'):
                    all_facilities.extend(data['results'])

            except requests.exceptions.RequestException as e:
                print(f"Error fetching {facility_type} from Google Places: {e}")

        if all_facilities:
            df = pd.DataFrame(all_facilities)
            output_file = self.output_dir / f'google_places_facilities_{self.timestamp}.json'
            with open(output_file, 'w') as f:
                json.dump(all_facilities, f, indent=2)

            print(f"✓ Saved {len(df)} facilities from Google Places to {output_file}")
            return df

        return None

    def fetch_california_hhs(self):
        """
        Fetch facility data from California Health and Human Services.

        Returns:
            DataFrame with facility data
        """
        # California HHS Open Data Portal
        # This is a placeholder - update with actual endpoint
        url = "https://data.chhs.ca.gov/api/3/action/datastore_search"

        # TODO: Add actual resource ID when identified
        params = {
            'resource_id': 'your-resource-id-here',
            'limit': 10000
        }

        try:
            print("Fetching California HHS data...")
            # response = requests.get(url, params=params)
            # response.raise_for_status()
            # data = response.json()

            print("⚠ California HHS endpoint needs to be configured")
            return None

        except Exception as e:
            print(f"Error fetching California HHS data: {e}")
            return None


def main():
    """Main function to run data collection."""

    # Initialize collector
    collector = FacilityDataCollector()

    # Fetch from LA County
    lacounty_data = collector.fetch_lacounty_facilities()

    # Fetch from Google Places (requires API key)
    # Uncomment and add your API key when ready
    # google_api_key = os.getenv('GOOGLE_PLACES_API_KEY')
    # if google_api_key:
    #     google_data = collector.fetch_google_places(google_api_key)
    # else:
    #     print("⚠ Google Places API key not found in environment")

    # Fetch from California HHS
    ca_data = collector.fetch_california_hhs()

    print("\n✓ Data collection complete!")
    print("Next steps:")
    print("1. Review collected data in data/raw/")
    print("2. Update API endpoints with correct dataset IDs")
    print("3. Add API keys to .env file")
    print("4. Run data cleaning scripts")


if __name__ == "__main__":
    main()
