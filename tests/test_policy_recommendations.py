"""
Tests for policy recommendations module.

Tests for impact.policy_recommendations
"""

import pytest
import pandas as pd
import numpy as np
from pathlib import Path
import tempfile
import shutil

# Import module to test
from impact.policy_recommendations import PolicyRecommendationEngine, PolicyRecommendation


@pytest.fixture
def sample_census_data():
    """Create sample census data for testing."""
    return pd.DataFrame({
        'GEOID': ['06037110100', '06037110200', '06037110300', '06037110400', '06037110500'],
        'total_population': [2000, 3000, 1500, 2500, 4000],
        'median_income': [40000, 80000, 35000, 90000, 45000],
        'centroid_lat': [34.05, 34.06, 34.07, 34.08, 34.09],
        'centroid_lon': [-118.24, -118.25, -118.26, -118.27, -118.28],
        'area_sqkm': [10.0, 12.0, 8.0, 15.0, 11.0],
        'poverty_rate': [20, 5, 25, 3, 18],
        'pct_no_vehicle': [15, 3, 20, 2, 12]
    })


@pytest.fixture
def sample_access_metrics():
    """Create sample access metrics for testing."""
    return pd.DataFrame({
        'GEOID': ['06037110100', '06037110200', '06037110300', '06037110400', '06037110500'],
        'nearest_facility_km': [8.5, 2.3, 12.0, 1.5, 6.2],
        'access_score': [35, 75, 25, 85, 45],
        'facilities_within_5km': [1, 5, 0, 7, 2]
    })


@pytest.fixture
def temp_data_files(sample_census_data, sample_access_metrics):
    """Create temporary data files for testing."""
    temp_dir = tempfile.mkdtemp()

    census_file = Path(temp_dir) / 'census.csv'
    metrics_file = Path(temp_dir) / 'metrics.csv'

    sample_census_data.to_csv(census_file, index=False)
    sample_access_metrics.to_csv(metrics_file, index=False)

    yield temp_dir, census_file, metrics_file

    # Cleanup
    shutil.rmtree(temp_dir)


class TestPolicyRecommendationEngine:
    """Tests for PolicyRecommendationEngine class."""

    def test_engine_initialization(self, temp_data_files):
        """Test engine can be initialized."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(
            census_data_file=census_file,
            access_metrics_file=metrics_file
        )

        assert engine.census_data_file == Path(census_file)
        assert engine.access_metrics_file == Path(metrics_file)
        assert engine.census_data is None
        assert engine.access_metrics is None
        assert engine.recommendations == []

    def test_load_data_success(self, temp_data_files):
        """Test data loading succeeds with valid files."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(census_file, metrics_file)
        result = engine.load_data()

        assert result is True
        assert engine.census_data is not None
        assert engine.access_metrics is not None
        assert len(engine.census_data) == 5
        assert len(engine.access_metrics) == 5

    def test_load_data_missing_files(self):
        """Test data loading fails with missing files."""
        engine = PolicyRecommendationEngine(
            census_data_file='nonexistent.csv',
            access_metrics_file='nonexistent.csv'
        )

        result = engine.load_data()

        assert result is False

    def test_identify_access_deserts(self, temp_data_files):
        """Test access desert identification."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(census_file, metrics_file)
        engine.load_data()

        deserts = engine.identify_access_deserts(distance_threshold=5.0)

        assert deserts is not None
        assert isinstance(deserts, pd.DataFrame)
        # With threshold 5km, should find tracts with distance > 5km
        assert len(deserts) >= 1
        assert all(deserts['nearest_facility_km'] > 5.0)
        assert 'severity_score' in deserts.columns

    def test_identify_vulnerable_populations(self, temp_data_files):
        """Test vulnerable population identification."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(census_file, metrics_file)
        engine.load_data()

        vulnerable = engine.identify_vulnerable_populations()

        assert vulnerable is not None
        assert isinstance(vulnerable, pd.DataFrame)
        # Should find areas with low income or high poverty AND poor access
        assert 'priority_score' in vulnerable.columns
        # All should have access_score < 50
        if len(vulnerable) > 0:
            assert all(vulnerable['access_score'] < 50)

    def test_recommend_new_facility_locations(self, temp_data_files):
        """Test facility location recommendations."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(census_file, metrics_file)
        engine.load_data()

        locations = engine.recommend_new_facility_locations(n_facilities=3)

        assert locations is not None
        assert isinstance(locations, list)
        assert len(locations) <= 3

        if len(locations) > 0:
            # Verify structure
            location = locations[0]
            assert 'geoid' in location
            assert 'latitude' in location
            assert 'longitude' in location
            assert 'population_served' in location
            assert 'current_distance_km' in location
            assert 'priority_reason' in location
            assert 'estimated_impact' in location

    def test_generate_all_recommendations(self, temp_data_files):
        """Test comprehensive recommendation generation."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(census_file, metrics_file)
        engine.load_data()

        recommendations = engine.generate_all_recommendations()

        assert recommendations is not None
        assert isinstance(recommendations, list)
        assert len(recommendations) > 0

        # Verify recommendation structure
        for rec in recommendations:
            assert isinstance(rec, PolicyRecommendation)
            assert rec.priority in ['Critical', 'High', 'Medium', 'Low']
            assert rec.category in ['Infrastructure', 'Service Expansion', 'Transportation', 'Equity']
            assert rec.title
            assert rec.description
            assert rec.affected_population >= 0
            assert isinstance(rec.affected_tracts, list)
            assert isinstance(rec.actionable_steps, list)
            assert len(rec.actionable_steps) > 0
            assert isinstance(rec.metrics_to_track, list)
            assert len(rec.metrics_to_track) > 0

    def test_generate_executive_summary(self, temp_data_files):
        """Test executive summary generation."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(census_file, metrics_file)
        engine.load_data()
        engine.generate_all_recommendations()

        output_file = Path(temp_dir) / 'summary.txt'
        engine.generate_executive_summary(output_file)

        assert output_file.exists()

        # Verify content
        content = output_file.read_text()
        assert 'HEALTHCARE ACCESS POLICY RECOMMENDATIONS' in content
        assert 'KEY FINDINGS:' in content
        assert 'IMPLEMENTATION ROADMAP:' in content

    def test_export_recommendations_csv(self, temp_data_files):
        """Test CSV export of recommendations."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(census_file, metrics_file)
        engine.load_data()
        engine.generate_all_recommendations()

        output_file = Path(temp_dir) / 'recommendations.csv'
        engine.export_recommendations_csv(output_file)

        assert output_file.exists()

        # Verify CSV structure
        df = pd.read_csv(output_file)
        assert len(df) == len(engine.recommendations)

        expected_columns = [
            'Priority', 'Category', 'Title', 'Description',
            'Affected_Population', 'Affected_Tracts_Count',
            'Estimated_Cost', 'Implementation_Timeframe',
            'Expected_Impact', 'Actionable_Steps', 'Metrics_to_Track'
        ]
        for col in expected_columns:
            assert col in df.columns

    def test_get_priority_reason(self, temp_data_files):
        """Test priority reason generation."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(census_file, metrics_file)
        engine.load_data()

        # Test with high distance
        row = engine.census_data.iloc[0].copy()
        row['nearest_facility_km'] = 12.0
        row['median_income'] = 30000

        reason = engine._get_priority_reason(row)

        assert isinstance(reason, str)
        assert len(reason) > 0
        # Should mention distance and low income
        assert 'distance' in reason.lower() or 'access' in reason.lower()

    def test_estimate_impact(self, temp_data_files):
        """Test impact estimation."""
        temp_dir, census_file, metrics_file = temp_data_files

        engine = PolicyRecommendationEngine(census_file, metrics_file)
        engine.load_data()

        row = engine.census_data.iloc[0]

        impact = engine._estimate_impact(row)

        assert isinstance(impact, int)
        assert impact > 0


class TestIntegration:
    """Integration tests for policy recommendations."""

    def test_full_pipeline(self, temp_data_files):
        """Test complete recommendation pipeline."""
        temp_dir, census_file, metrics_file = temp_data_files

        # Initialize engine
        engine = PolicyRecommendationEngine(census_file, metrics_file)

        # Load data
        assert engine.load_data() is True

        # Generate recommendations
        recommendations = engine.generate_all_recommendations()
        assert len(recommendations) > 0

        # Export outputs
        output_dir = Path(temp_dir) / 'outputs'
        output_dir.mkdir(exist_ok=True)

        engine.generate_executive_summary(output_dir / 'summary.txt')
        engine.export_recommendations_csv(output_dir / 'recs.csv')

        # Verify outputs exist
        assert (output_dir / 'summary.txt').exists()
        assert (output_dir / 'recs.csv').exists()

        # Verify content quality
        summary_content = (output_dir / 'summary.txt').read_text()
        assert len(summary_content) > 100  # Should have substantial content

        recs_df = pd.read_csv(output_dir / 'recs.csv')
        assert len(recs_df) == len(recommendations)
