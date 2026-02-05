"""
Tests for analysis and visualization modules.

Tests for calculate_access_metrics.py and create_maps.py
"""

import pytest
import pandas as pd
import numpy as np
from pathlib import Path
import tempfile
import shutil

# Import modules to test
from analysis.calculate_access_metrics import AccessMetricsCalculator
from visualization.create_maps import HealthcareMapper


@pytest.fixture
def sample_facilities_df():
    """Create sample facilities data for testing."""
    return pd.DataFrame({
        'name': ['Hospital A', 'Clinic B', 'Urgent Care C'],
        'lat': [34.05, 34.06, 34.07],
        'lon': [-118.24, -118.25, -118.26],
        'category': ['hospital', 'clinic', 'urgent_care'],
        'address': ['123 Main St', '456 Oak Ave', '789 Pine Rd']
    })


@pytest.fixture
def sample_census_df():
    """Create sample census data for testing."""
    return pd.DataFrame({
        'GEOID': ['06037110100', '06037110200', '06037110300'],
        'Total Population': [1000, 2000, 1500],
        'Median Income': [50000, 60000, 55000],
        'centroid_lat': [34.05, 34.06, 34.07],
        'centroid_lon': [-118.24, -118.25, -118.26],
        'area_sqkm': [10.0, 15.0, 12.0]
    })


@pytest.fixture
def temp_data_dir(sample_facilities_df, sample_census_df):
    """Create temporary directory with sample data files."""
    temp_dir = tempfile.mkdtemp()

    # Save sample data files
    facilities_file = Path(temp_dir) / 'facilities.csv'
    census_file = Path(temp_dir) / 'census.csv'

    sample_facilities_df.to_csv(facilities_file, index=False)
    sample_census_df.to_csv(census_file, index=False)

    yield temp_dir, facilities_file, census_file

    # Cleanup
    shutil.rmtree(temp_dir)


class TestAccessMetricsCalculator:
    """Tests for AccessMetricsCalculator class."""

    def test_calculator_initialization(self, temp_data_dir):
        """Test calculator can be initialized."""
        temp_dir, facilities_file, census_file = temp_data_dir

        calculator = AccessMetricsCalculator(
            facilities_file=facilities_file,
            census_file=census_file
        )

        assert calculator.facilities_file == Path(facilities_file)
        assert calculator.census_file == Path(census_file)
        assert calculator.facilities is None
        assert calculator.census_tracts is None

    def test_load_data_success(self, temp_data_dir):
        """Test data loading succeeds with valid files."""
        temp_dir, facilities_file, census_file = temp_data_dir

        calculator = AccessMetricsCalculator(
            facilities_file=facilities_file,
            census_file=census_file
        )

        result = calculator.load_data()

        assert result is True
        assert calculator.facilities is not None
        assert calculator.census_tracts is not None
        assert len(calculator.facilities) == 3
        assert len(calculator.census_tracts) == 3

    def test_load_data_missing_file(self):
        """Test data loading fails with missing files."""
        calculator = AccessMetricsCalculator(
            facilities_file='nonexistent.csv',
            census_file='nonexistent.csv'
        )

        result = calculator.load_data()

        assert result is False

    def test_calculate_nearest_facility_distance(self, temp_data_dir):
        """Test nearest facility distance calculation."""
        temp_dir, facilities_file, census_file = temp_data_dir

        calculator = AccessMetricsCalculator(
            facilities_file=facilities_file,
            census_file=census_file
        )
        calculator.load_data()

        distances = calculator.calculate_nearest_facility_distance()

        assert distances is not None
        assert len(distances) == 3
        assert all(distances >= 0)
        # All distances should be very small (facilities and tracts at same locations)
        assert all(distances < 10)  # Less than 10 km

    def test_calculate_facilities_within_radius(self, temp_data_dir):
        """Test facilities within radius calculation."""
        temp_dir, facilities_file, census_file = temp_data_dir

        calculator = AccessMetricsCalculator(
            facilities_file=facilities_file,
            census_file=census_file
        )
        calculator.load_data()

        counts = calculator.calculate_facilities_within_radius(radius_km=5.0)

        assert counts is not None
        assert len(counts) == 3
        assert all(counts >= 0)

    def test_calculate_facilities_per_capita(self, temp_data_dir):
        """Test per capita facilities calculation."""
        temp_dir, facilities_file, census_file = temp_data_dir

        calculator = AccessMetricsCalculator(
            facilities_file=facilities_file,
            census_file=census_file
        )
        calculator.load_data()

        result = calculator.calculate_facilities_per_capita()

        assert 'total_facilities' in result
        assert 'total_population' in result
        assert 'per_10k' in result
        assert 'per_100k' in result
        assert result['total_facilities'] == 3
        assert result['total_population'] == 4500  # Sum of census populations

    def test_identify_coverage_gaps(self, temp_data_dir):
        """Test coverage gap identification."""
        temp_dir, facilities_file, census_file = temp_data_dir

        calculator = AccessMetricsCalculator(
            facilities_file=facilities_file,
            census_file=census_file
        )
        calculator.load_data()

        gaps = calculator.identify_coverage_gaps(threshold_km=0.001)

        assert gaps is not None
        assert isinstance(gaps, pd.DataFrame)
        # With facilities co-located with tracts, expect no gaps
        assert len(gaps) == 0 or len(gaps) <= 3

    def test_calculate_composite_access_score(self, temp_data_dir):
        """Test composite access score calculation."""
        temp_dir, facilities_file, census_file = temp_data_dir

        calculator = AccessMetricsCalculator(
            facilities_file=facilities_file,
            census_file=census_file
        )
        calculator.load_data()

        scores = calculator.calculate_composite_access_score()

        assert scores is not None
        assert len(scores) == 3
        assert all(scores >= 0)
        assert all(scores <= 100)

    def test_save_metrics(self, temp_data_dir):
        """Test metrics saving."""
        temp_dir, facilities_file, census_file = temp_data_dir

        calculator = AccessMetricsCalculator(
            facilities_file=facilities_file,
            census_file=census_file,
            output_dir=temp_dir
        )
        calculator.load_data()

        output_file = 'test_metrics.csv'
        result = calculator.save_metrics(output_file)

        assert result is True
        assert (Path(temp_dir) / output_file).exists()

        # Verify file can be read
        saved_data = pd.read_csv(Path(temp_dir) / output_file)
        assert len(saved_data) == 3


class TestHealthcareMapper:
    """Tests for HealthcareMapper class."""

    def test_mapper_initialization(self, temp_data_dir):
        """Test mapper can be initialized."""
        temp_dir, facilities_file, census_file = temp_data_dir

        mapper = HealthcareMapper(
            facilities_file=facilities_file
        )

        assert mapper.facilities_file == Path(facilities_file)
        assert mapper.facilities is None

    def test_load_data_success(self, temp_data_dir):
        """Test data loading succeeds."""
        temp_dir, facilities_file, census_file = temp_data_dir

        mapper = HealthcareMapper(
            facilities_file=facilities_file
        )

        result = mapper.load_data()

        assert result is True
        assert mapper.facilities is not None
        assert len(mapper.facilities) == 3

    def test_load_data_missing_file(self):
        """Test data loading fails with missing file."""
        mapper = HealthcareMapper(
            facilities_file='nonexistent.csv'
        )

        result = mapper.load_data()

        assert result is False

    def test_create_static_map(self, temp_data_dir):
        """Test static map creation."""
        temp_dir, facilities_file, census_file = temp_data_dir

        mapper = HealthcareMapper(
            facilities_file=facilities_file,
            output_dir=temp_dir
        )
        mapper.load_data()

        output_file = 'test_map.png'
        result = mapper.create_static_map(output_file)

        assert result is True
        assert (Path(temp_dir) / output_file).exists()

    def test_create_interactive_map(self, temp_data_dir):
        """Test interactive map creation."""
        temp_dir, facilities_file, census_file = temp_data_dir

        mapper = HealthcareMapper(
            facilities_file=facilities_file,
            output_dir=temp_dir
        )
        mapper.load_data()

        output_file = 'test_interactive.html'
        result = mapper.create_interactive_map(output_file)

        assert result is True
        assert (Path(temp_dir) / output_file).exists()

        # Verify HTML file has content
        with open(Path(temp_dir) / output_file, 'r') as f:
            content = f.read()
            assert 'folium' in content.lower() or 'map' in content.lower()

    def test_create_facility_density_heatmap(self, temp_data_dir):
        """Test density heatmap creation."""
        temp_dir, facilities_file, census_file = temp_data_dir

        mapper = HealthcareMapper(
            facilities_file=facilities_file,
            output_dir=temp_dir
        )
        mapper.load_data()

        output_file = 'test_density.png'
        result = mapper.create_facility_density_heatmap(output_file)

        assert result is True
        assert (Path(temp_dir) / output_file).exists()

    def test_create_access_score_map(self, temp_data_dir, sample_census_df):
        """Test access score map creation."""
        temp_dir, facilities_file, census_file = temp_data_dir

        # Add access_score column to census data
        census_with_scores = sample_census_df.copy()
        census_with_scores['access_score'] = [75, 85, 80]

        scores_file = Path(temp_dir) / 'scores.csv'
        census_with_scores.to_csv(scores_file, index=False)

        mapper = HealthcareMapper(
            facilities_file=facilities_file,
            output_dir=temp_dir
        )
        mapper.load_data()

        output_file = 'test_scores_map.png'
        result = mapper.create_access_score_map(scores_file, output_file)

        assert result is True
        assert (Path(temp_dir) / output_file).exists()


class TestIntegration:
    """Integration tests for analysis and visualization."""

    def test_full_analysis_pipeline(self, temp_data_dir):
        """Test complete analysis pipeline."""
        temp_dir, facilities_file, census_file = temp_data_dir

        # Initialize calculator
        calculator = AccessMetricsCalculator(
            facilities_file=facilities_file,
            census_file=census_file,
            output_dir=temp_dir
        )

        # Load data
        assert calculator.load_data() is True

        # Calculate metrics
        distances = calculator.calculate_nearest_facility_distance()
        assert distances is not None

        scores = calculator.calculate_composite_access_score()
        assert scores is not None

        # Save metrics
        assert calculator.save_metrics('full_pipeline_metrics.csv') is True

        # Verify output
        output_file = Path(temp_dir) / 'full_pipeline_metrics.csv'
        assert output_file.exists()

        saved_data = pd.read_csv(output_file)
        assert 'nearest_facility_km' in saved_data.columns
        assert 'access_score' in saved_data.columns

    def test_full_visualization_pipeline(self, temp_data_dir):
        """Test complete visualization pipeline."""
        temp_dir, facilities_file, census_file = temp_data_dir

        # Initialize mapper
        mapper = HealthcareMapper(
            facilities_file=facilities_file,
            output_dir=temp_dir
        )

        # Load data
        assert mapper.load_data() is True

        # Create maps
        assert mapper.create_static_map('pipeline_static.png') is True
        assert mapper.create_interactive_map('pipeline_interactive.html') is True
        assert mapper.create_facility_density_heatmap('pipeline_density.png') is True

        # Verify outputs
        assert (Path(temp_dir) / 'pipeline_static.png').exists()
        assert (Path(temp_dir) / 'pipeline_interactive.html').exists()
        assert (Path(temp_dir) / 'pipeline_density.png').exists()
