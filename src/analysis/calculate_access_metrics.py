"""
Calculate healthcare access metrics for LA neighborhoods.

This script computes distance-based and density-based metrics
to quantify healthcare facility access across census tracts.
"""

import pandas as pd
import geopandas as gpd
import numpy as np
from pathlib import Path
from scipy.spatial import cKDTree


class AccessMetricsCalculator:
    """Calculate various healthcare access metrics."""

    def __init__(self, facilities_file, census_file, output_dir='outputs/reports'):
        """
        Initialize the metrics calculator.

        Args:
            facilities_file: Path to cleaned facilities data
            census_file: Path to census/demographic data with geometries
            output_dir: Directory to save results
        """
        self.facilities_file = Path(facilities_file)
        self.census_file = Path(census_file)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

        self.facilities = None
        self.census_tracts = None

    def load_data(self):
        """Load facility and census tract data."""
        print("Loading data...")

        # Load facilities
        self.facilities = pd.read_csv(self.facilities_file)
        print(f"✓ Loaded {len(self.facilities)} facilities")

        # Load census tracts (assumes GeoDataFrame or will need to convert)
        # For now, assuming CSV with geometry or separate shapefile
        self.census_tracts = pd.read_csv(self.census_file)
        print(f"✓ Loaded {len(self.census_tracts)} census tracts")

    def calculate_nearest_facility_distance(self, facility_type=None):
        """
        Calculate distance from each census tract to nearest facility.

        Args:
            facility_type: Filter by facility type (e.g., 'urgent_care')

        Returns:
            Series with distances in kilometers
        """
        print(f"Calculating nearest facility distances...")

        # Filter facilities if type specified
        if facility_type:
            facilities = self.facilities[
                self.facilities['category'] == facility_type
            ].copy()
        else:
            facilities = self.facilities.copy()

        if len(facilities) == 0:
            print(f"⚠ No facilities found for type: {facility_type}")
            return None

        # Build KD-tree for fast nearest neighbor search
        facility_coords = facilities[['lat', 'lon']].values
        tree = cKDTree(facility_coords)

        # Calculate distances
        distances = []
        for idx, tract in self.census_tracts.iterrows():
            # Assuming census_tracts has centroid coordinates
            # TODO: Calculate actual centroids from geometries
            if 'centroid_lat' in tract and 'centroid_lon' in tract:
                tract_point = [tract['centroid_lat'], tract['centroid_lon']]
                dist, _ = tree.query(tract_point)

                # Convert degrees to approximate km (rough conversion)
                dist_km = dist * 111.0  # 1 degree ≈ 111 km
                distances.append(dist_km)
            else:
                distances.append(np.nan)

        return pd.Series(distances, index=self.census_tracts.index)

    def calculate_facilities_per_capita(self, population_col='Total Population'):
        """
        Calculate facilities per capita by census tract.

        Args:
            population_col: Name of population column

        Returns:
            DataFrame with per capita metrics
        """
        print("Calculating facilities per capita...")

        # Count facilities per tract (requires spatial join)
        # TODO: Implement actual spatial join when geometries available

        # For now, calculate overall metrics
        total_facilities = len(self.facilities)
        total_population = self.census_tracts[population_col].sum()

        facilities_per_10k = (total_facilities / total_population) * 10000
        facilities_per_100k = (total_facilities / total_population) * 100000

        print(f"Overall: {facilities_per_10k:.2f} facilities per 10,000 residents")
        print(f"Overall: {facilities_per_100k:.2f} facilities per 100,000 residents")

        # TODO: Calculate per-tract metrics with spatial join

        return {
            'total_facilities': total_facilities,
            'total_population': total_population,
            'per_10k': facilities_per_10k,
            'per_100k': facilities_per_100k
        }

    def identify_coverage_gaps(self, threshold_km=5.0):
        """
        Identify areas beyond threshold distance from any facility.

        Args:
            threshold_km: Distance threshold in kilometers

        Returns:
            DataFrame of underserved census tracts
        """
        print(f"Identifying coverage gaps (>{threshold_km} km from facility)...")

        # Calculate nearest distances
        distances = self.calculate_nearest_facility_distance()

        if distances is None:
            return None

        # Find tracts beyond threshold
        gaps = self.census_tracts[distances > threshold_km].copy()
        gaps['distance_to_nearest_km'] = distances[distances > threshold_km]

        # Sort by distance (worst first)
        gaps = gaps.sort_values('distance_to_nearest_km', ascending=False)

        print(f"✓ Found {len(gaps)} census tracts with limited access")

        return gaps

    def calculate_composite_access_score(self):
        """
        Calculate composite access score (0-100).

        Combines multiple metrics into a single score.

        Returns:
            Series with access scores
        """
        print("Calculating composite access scores...")

        # Calculate component metrics
        nearest_dist = self.calculate_nearest_facility_distance()

        # Normalize metrics to 0-1 scale (inverse for distance)
        # Lower distance = higher score
        max_dist = nearest_dist.max()
        normalized_dist = 1 - (nearest_dist / max_dist)

        # TODO: Add more components
        # - Facilities per capita (weighted)
        # - Population density
        # - Socioeconomic factors

        # For now, use distance only
        access_score = normalized_dist * 100

        return access_score

    def generate_summary_report(self):
        """Generate summary statistics report."""
        print("\n" + "="*60)
        print("HEALTHCARE ACCESS SUMMARY REPORT")
        print("="*60)

        # Overall metrics
        per_capita = self.calculate_facilities_per_capita()
        print(f"\nTotal Facilities: {per_capita['total_facilities']}")
        print(f"Total Population: {per_capita['total_population']:,}")
        print(f"Facilities per 10,000: {per_capita['per_10k']:.2f}")

        # Distance metrics
        distances = self.calculate_nearest_facility_distance()
        print(f"\nDistance to Nearest Facility:")
        print(f"  Mean: {distances.mean():.2f} km")
        print(f"  Median: {distances.median():.2f} km")
        print(f"  Max: {distances.max():.2f} km")

        # Coverage gaps
        gaps = self.identify_coverage_gaps(threshold_km=5.0)
        if gaps is not None:
            print(f"\nUnderserved Areas (>5km from facility): {len(gaps)}")
            if len(gaps) > 0:
                gap_population = gaps['Total Population'].sum()
                print(f"  Population affected: {gap_population:,.0f}")

        print("="*60 + "\n")


def main():
    """Main function to calculate access metrics."""

    # Example usage - update file paths when data is ready
    calculator = AccessMetricsCalculator(
        facilities_file='data/processed/facilities_cleaned.csv',
        census_file='data/processed/census_merged.csv'
    )

    # Load data
    # calculator.load_data()

    # Generate metrics
    # calculator.generate_summary_report()

    # Calculate specific metrics
    # distances = calculator.calculate_nearest_facility_distance()
    # gaps = calculator.identify_coverage_gaps()
    # scores = calculator.calculate_composite_access_score()

    print("Access metrics calculator ready!")
    print("Uncomment sections in main() once data is processed")


if __name__ == "__main__":
    main()
