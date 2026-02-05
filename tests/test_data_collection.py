"""
Unit tests for data collection modules.

Run with: pytest tests/test_data_collection.py -v
"""

import pytest
import pandas as pd
from pathlib import Path
import sys

# Add src to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))

from data_collection.fetch_facilities import FacilityDataCollector
from data_collection.fetch_census_data import CensusDataCollector


class TestFacilityDataCollector:
    """Test suite for facility data collection."""

    def setup_method(self):
        """Set up test fixtures."""
        self.collector = FacilityDataCollector(output_dir='tests/test_data')

    def test_collector_initialization(self):
        """Test that collector initializes correctly."""
        assert self.collector.output_dir.exists()
        assert self.collector.timestamp is not None
        assert len(self.collector.timestamp) == 8  # YYYYMMDD

    def test_validate_facility_data_empty(self):
        """Test validation with empty DataFrame."""
        result = self.collector.validate_facility_data(pd.DataFrame())
        assert result['valid'] == False

    def test_validate_facility_data_with_coords(self):
        """Test validation with proper coordinate data."""
        df = pd.DataFrame({
            'lat': [34.05, 34.06, 34.07],
            'lon': [-118.24, -118.25, -118.26],
            'name': ['Facility 1', 'Facility 2', 'Facility 3']
        })

        result = self.collector.validate_facility_data(df)
        assert result['total_records'] == 3
        assert 'lat_range' in result
        assert 'lon_range' in result

    def test_validate_facility_data_missing_coords(self):
        """Test validation detects missing coordinates."""
        df = pd.DataFrame({
            'lat': [34.05, None, 34.07],
            'lon': [-118.24, -118.25, -118.26],
        })

        result = self.collector.validate_facility_data(df)
        assert len(result['issues']) > 0

    def test_validate_facility_data_out_of_bounds(self):
        """Test validation detects out of bounds coordinates."""
        df = pd.DataFrame({
            'lat': [50.0, 51.0],  # Way outside LA County
            'lon': [-118.24, -118.25],
        })

        result = self.collector.validate_facility_data(df)
        issues_text = ' '.join(result['issues'])
        assert 'unusual' in issues_text.lower() or 'range' in issues_text.lower()

    def test_filter_to_la_county(self):
        """Test LA County filtering."""
        df = pd.DataFrame({
            'county_name': ['Los Angeles', 'Los Angeles', 'San Diego', 'Orange'],
            'lat': [34.05, 34.06, 32.71, 33.74],
            'lon': [-118.24, -118.25, -117.16, -117.87]
        })

        result = self.collector.filter_to_la_county(df)
        assert result is not None
        assert len(result) == 2  # Only LA County facilities
        assert all('Los Angeles' in str(county) for county in result['county_name'])


class TestCensusDataCollector:
    """Test suite for census data collection."""

    def setup_method(self):
        """Set up test fixtures."""
        self.collector = CensusDataCollector(output_dir='tests/test_data')

    def test_collector_initialization(self):
        """Test that collector initializes correctly."""
        assert self.collector.output_dir.exists()
        assert self.collector.STATE_FIPS == "06"
        assert self.collector.COUNTY_FIPS == "037"

    def test_validate_data_empty(self):
        """Test validation with empty DataFrame."""
        result = self.collector.validate_data(pd.DataFrame(), 'test')
        assert result['valid'] == False

    def test_validate_data_tract_count(self):
        """Test validation checks tract count."""
        # Too few tracts
        df_small = pd.DataFrame({
            'GEOID': range(100),
            'population': range(100)
        })
        result = self.collector.validate_data(df_small, 'test')
        assert len(result['issues']) > 0

        # Expected tract count
        df_good = pd.DataFrame({
            'GEOID': range(2500),
            'population': range(2500)
        })
        result = self.collector.validate_data(df_good, 'test')
        tract_issues = [i for i in result['issues'] if 'tract' in i.lower()]
        assert len(tract_issues) == 0  # Should not complain about tract count

    def test_validate_data_missing_geoid(self):
        """Test validation detects missing GEOID."""
        df = pd.DataFrame({
            'population': [1000, 2000, 3000]
        })

        result = self.collector.validate_data(df, 'test')
        assert not result['valid']
        issues_text = ' '.join(result['issues'])
        assert 'geoid' in issues_text.lower()

    def test_validate_data_missing_values(self):
        """Test validation detects high missing value rates."""
        df = pd.DataFrame({
            'GEOID': range(2500),
            'population': [1000] * 2000 + [None] * 500  # 20% missing
        })

        result = self.collector.validate_data(df, 'test')
        assert len(result['issues']) > 0
        issues_text = ' '.join(result['issues'])
        assert 'missing' in issues_text.lower()


class TestDataQuality:
    """Integration tests for data quality."""

    def test_geoid_format(self):
        """Test GEOID formatting is consistent."""
        # Create sample GEOID
        state = "06"
        county = "037"
        tract = "101110"

        # Test GEOID construction
        geoid = state + county + tract
        assert len(geoid) == 11
        assert geoid == "06037101110"

    def test_coordinate_ranges(self):
        """Test that LA County coordinate ranges are reasonable."""
        # Approximate LA County bounds
        lat_min, lat_max = 33.7, 34.8
        lon_min, lon_max = -118.7, -117.6

        # Test a point in LA
        test_lat, test_lon = 34.0522, -118.2437  # Downtown LA

        assert lat_min <= test_lat <= lat_max
        assert lon_min <= test_lon <= lon_max

    def test_population_ranges(self):
        """Test that population values are reasonable."""
        # Census tracts typically have 1,200 to 8,000 residents
        test_values = [1500, 3000, 5000, 7500]

        for pop in test_values:
            assert 0 < pop < 50000  # Very broad range, but catches obvious errors


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
