"""
Calculate healthcare access metrics for LA neighborhoods.

This script computes distance-based and density-based metrics
to quantify healthcare facility access across census tracts.
"""

import pandas as pd
import geopandas as gpd
import numpy as np
import logging
from pathlib import Path
from scipy.spatial import cKDTree
from typing import Optional, Dict, Union

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class AccessMetricsCalculator:
    """Calculate various healthcare access metrics."""

    def __init__(self, facilities_file: Union[str, Path],
                 census_file: Union[str, Path],
                 output_dir: Union[str, Path] = 'outputs/reports'):
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

    def load_data(self) -> bool:
        """
        Load facility and census tract data.

        Returns:
            True if data loaded successfully, False otherwise
        """
        try:
            logger.info("Loading data...")

            # Load facilities
            if not self.facilities_file.exists():
                logger.error(f"Facilities file not found: {self.facilities_file}")
                return False

            self.facilities = pd.read_csv(self.facilities_file)
            logger.info(f"Loaded {len(self.facilities)} facilities")

            # Load census tracts
            if not self.census_file.exists():
                logger.error(f"Census file not found: {self.census_file}")
                return False

            self.census_tracts = pd.read_csv(self.census_file)
            logger.info(f"Loaded {len(self.census_tracts)} census tracts")

            return True

        except Exception as e:
            logger.error(f"Error loading data: {e}")
            return False

    def calculate_nearest_facility_distance(self, facility_type: Optional[str] = None) -> Optional[pd.Series]:
        """
        Calculate distance from each census tract to nearest facility.

        Args:
            facility_type: Filter by facility type (e.g., 'urgent_care')

        Returns:
            Series with distances in kilometers, or None if calculation fails
        """
        logger.info(f"Calculating nearest facility distances...")

        if self.facilities is None or self.census_tracts is None:
            logger.error("Data not loaded. Call load_data() first.")
            return None

        # Filter facilities if type specified
        if facility_type:
            facilities = self.facilities[
                self.facilities['category'] == facility_type
            ].copy()
            logger.info(f"Filtered to {len(facilities)} {facility_type} facilities")
        else:
            facilities = self.facilities.copy()

        if len(facilities) == 0:
            logger.warning(f"No facilities found for type: {facility_type}")
            return None

        # Build KD-tree for fast nearest neighbor search
        facility_coords = facilities[['lat', 'lon']].values
        tree = cKDTree(facility_coords)

        # Calculate distances
        distances = []
        for idx, tract in self.census_tracts.iterrows():
            # Use centroid coordinates from census data
            if 'centroid_lat' in tract and 'centroid_lon' in tract:
                if pd.notna(tract['centroid_lat']) and pd.notna(tract['centroid_lon']):
                    tract_point = [tract['centroid_lat'], tract['centroid_lon']]
                    dist, _ = tree.query(tract_point)

                    # Convert degrees to approximate km (rough conversion for small distances)
                    # More accurate: use haversine formula, but this is sufficient for local analysis
                    dist_km = dist * 111.0  # 1 degree ≈ 111 km at equator
                    distances.append(dist_km)
                else:
                    distances.append(np.nan)
            else:
                # If no centroid, try to use tract center from lat/lon columns
                if 'lat' in tract and 'lon' in tract:
                    if pd.notna(tract['lat']) and pd.notna(tract['lon']):
                        tract_point = [tract['lat'], tract['lon']]
                        dist, _ = tree.query(tract_point)
                        dist_km = dist * 111.0
                        distances.append(dist_km)
                    else:
                        distances.append(np.nan)
                else:
                    distances.append(np.nan)

        valid_distances = sum(pd.notna(distances))
        logger.info(f"Calculated distances for {valid_distances}/{len(distances)} tracts")

        return pd.Series(distances, index=self.census_tracts.index)

    def calculate_facilities_within_radius(self, radius_km: float = 5.0) -> pd.Series:
        """
        Calculate number of facilities within specified radius of each tract.

        Args:
            radius_km: Radius in kilometers

        Returns:
            Series with facility counts per tract
        """
        logger.info(f"Calculating facilities within {radius_km} km...")

        if self.facilities is None or self.census_tracts is None:
            logger.error("Data not loaded. Call load_data() first.")
            return None

        # Build KD-tree for facilities
        facility_coords = self.facilities[['lat', 'lon']].values
        tree = cKDTree(facility_coords)

        # Convert km to degrees (approximate)
        radius_deg = radius_km / 111.0

        counts = []
        for idx, tract in self.census_tracts.iterrows():
            if 'centroid_lat' in tract and 'centroid_lon' in tract:
                if pd.notna(tract['centroid_lat']) and pd.notna(tract['centroid_lon']):
                    tract_point = [tract['centroid_lat'], tract['centroid_lon']]
                    # Query all facilities within radius
                    indices = tree.query_ball_point(tract_point, radius_deg)
                    counts.append(len(indices))
                else:
                    counts.append(0)
            else:
                counts.append(0)

        logger.info(f"Average facilities within {radius_km} km: {np.mean(counts):.2f}")
        return pd.Series(counts, index=self.census_tracts.index)

    def calculate_facilities_per_capita(self, population_col: str = 'Total Population') -> Dict[str, float]:
        """
        Calculate facilities per capita by census tract.

        Args:
            population_col: Name of population column

        Returns:
            Dictionary with per capita metrics
        """
        logger.info("Calculating facilities per capita...")

        if self.facilities is None or self.census_tracts is None:
            logger.error("Data not loaded. Call load_data() first.")
            return {}

        if population_col not in self.census_tracts.columns:
            logger.error(f"Population column '{population_col}' not found")
            return {}

        # Calculate overall metrics
        total_facilities = len(self.facilities)
        total_population = self.census_tracts[population_col].sum()

        if total_population == 0:
            logger.warning("Total population is zero")
            return {}

        facilities_per_10k = (total_facilities / total_population) * 10000
        facilities_per_100k = (total_facilities / total_population) * 100000

        logger.info(f"Overall: {facilities_per_10k:.2f} facilities per 10,000 residents")
        logger.info(f"Overall: {facilities_per_100k:.2f} facilities per 100,000 residents")

        return {
            'total_facilities': total_facilities,
            'total_population': total_population,
            'per_10k': facilities_per_10k,
            'per_100k': facilities_per_100k
        }

    def identify_coverage_gaps(self, threshold_km: float = 5.0) -> Optional[pd.DataFrame]:
        """
        Identify areas beyond threshold distance from any facility.

        Args:
            threshold_km: Distance threshold in kilometers

        Returns:
            DataFrame of underserved census tracts, or None if calculation fails
        """
        logger.info(f"Identifying coverage gaps (>{threshold_km} km from facility)...")

        # Calculate nearest distances
        distances = self.calculate_nearest_facility_distance()

        if distances is None:
            return None

        # Find tracts beyond threshold
        gaps_mask = distances > threshold_km
        gaps = self.census_tracts[gaps_mask].copy()
        gaps['distance_to_nearest_km'] = distances[gaps_mask]

        # Sort by distance (worst first)
        gaps = gaps.sort_values('distance_to_nearest_km', ascending=False)

        logger.info(f"Found {len(gaps)} census tracts with limited access")

        return gaps

    def calculate_composite_access_score(self) -> Optional[pd.Series]:
        """
        Calculate composite access score (0-100).

        Combines multiple metrics into a single score:
        - Distance to nearest facility (50% weight)
        - Number of facilities within 5km (30% weight)
        - Population density consideration (20% weight)

        Returns:
            Series with access scores (0-100), higher is better
        """
        logger.info("Calculating composite access scores...")

        if self.facilities is None or self.census_tracts is None:
            logger.error("Data not loaded. Call load_data() first.")
            return None

        # Component 1: Distance to nearest facility (inverse, 50% weight)
        nearest_dist = self.calculate_nearest_facility_distance()
        if nearest_dist is None:
            return None

        # Normalize: lower distance = higher score (inverse relationship)
        max_dist = nearest_dist.max()
        if max_dist > 0:
            distance_score = (1 - (nearest_dist / max_dist)) * 50
        else:
            distance_score = pd.Series([50.0] * len(nearest_dist), index=nearest_dist.index)

        # Component 2: Facilities within 5km (30% weight)
        facilities_nearby = self.calculate_facilities_within_radius(radius_km=5.0)
        if facilities_nearby is not None:
            max_nearby = facilities_nearby.max()
            if max_nearby > 0:
                nearby_score = (facilities_nearby / max_nearby) * 30
            else:
                nearby_score = pd.Series([0.0] * len(facilities_nearby), index=facilities_nearby.index)
        else:
            nearby_score = pd.Series([0.0] * len(nearest_dist), index=nearest_dist.index)

        # Component 3: Population density factor (20% weight)
        # Lower density areas may need more facilities per capita
        if 'Total Population' in self.census_tracts.columns and 'area_sqkm' in self.census_tracts.columns:
            density = self.census_tracts['Total Population'] / self.census_tracts['area_sqkm']
            # Normalize density score (higher density = potentially more need)
            max_density = density.max()
            if max_density > 0:
                density_score = (density / max_density) * 20
            else:
                density_score = pd.Series([10.0] * len(self.census_tracts), index=self.census_tracts.index)
        else:
            # Default density score if data not available
            density_score = pd.Series([10.0] * len(self.census_tracts), index=self.census_tracts.index)

        # Combine scores
        access_score = distance_score + nearby_score + density_score

        # Ensure scores are between 0-100
        access_score = access_score.clip(0, 100)

        logger.info(f"Access score range: {access_score.min():.2f} - {access_score.max():.2f}")
        logger.info(f"Mean access score: {access_score.mean():.2f}")

        return access_score

    def generate_summary_report(self) -> Dict[str, any]:
        """
        Generate summary statistics report.

        Returns:
            Dictionary with summary statistics
        """
        logger.info("="*60)
        logger.info("HEALTHCARE ACCESS SUMMARY REPORT")
        logger.info("="*60)

        summary = {}

        # Overall metrics
        per_capita = self.calculate_facilities_per_capita()
        summary['per_capita'] = per_capita

        logger.info(f"\nTotal Facilities: {per_capita.get('total_facilities', 0)}")
        logger.info(f"Total Population: {per_capita.get('total_population', 0):,}")
        logger.info(f"Facilities per 10,000: {per_capita.get('per_10k', 0):.2f}")

        # Distance metrics
        distances = self.calculate_nearest_facility_distance()
        if distances is not None:
            summary['distances'] = {
                'mean': distances.mean(),
                'median': distances.median(),
                'min': distances.min(),
                'max': distances.max()
            }
            logger.info(f"\nDistance to Nearest Facility:")
            logger.info(f"  Mean: {distances.mean():.2f} km")
            logger.info(f"  Median: {distances.median():.2f} km")
            logger.info(f"  Min: {distances.min():.2f} km")
            logger.info(f"  Max: {distances.max():.2f} km")

        # Coverage gaps
        gaps = self.identify_coverage_gaps(threshold_km=5.0)
        if gaps is not None:
            summary['coverage_gaps'] = {
                'count': len(gaps),
                'population': gaps['Total Population'].sum() if 'Total Population' in gaps.columns else 0
            }
            logger.info(f"\nUnderserved Areas (>5km from facility): {len(gaps)}")
            if len(gaps) > 0 and 'Total Population' in gaps.columns:
                gap_population = gaps['Total Population'].sum()
                logger.info(f"  Population affected: {gap_population:,.0f}")

        # Access scores
        scores = self.calculate_composite_access_score()
        if scores is not None:
            summary['access_scores'] = {
                'mean': scores.mean(),
                'median': scores.median(),
                'min': scores.min(),
                'max': scores.max()
            }
            logger.info(f"\nComposite Access Scores:")
            logger.info(f"  Mean: {scores.mean():.2f}")
            logger.info(f"  Median: {scores.median():.2f}")
            logger.info(f"  Range: {scores.min():.2f} - {scores.max():.2f}")

        logger.info("="*60)

        return summary

    def save_metrics(self, output_file: str = 'access_metrics.csv') -> bool:
        """
        Save calculated metrics to CSV file.

        Args:
            output_file: Output filename

        Returns:
            True if saved successfully, False otherwise
        """
        try:
            logger.info(f"Saving metrics to {output_file}...")

            # Calculate all metrics
            result_df = self.census_tracts.copy()

            # Add distance to nearest facility
            distances = self.calculate_nearest_facility_distance()
            if distances is not None:
                result_df['nearest_facility_km'] = distances

            # Add facilities within 5km
            nearby = self.calculate_facilities_within_radius(5.0)
            if nearby is not None:
                result_df['facilities_within_5km'] = nearby

            # Add composite access score
            scores = self.calculate_composite_access_score()
            if scores is not None:
                result_df['access_score'] = scores

            # Save to file
            output_path = self.output_dir / output_file
            result_df.to_csv(output_path, index=False)
            logger.info(f"Metrics saved to {output_path}")

            return True

        except Exception as e:
            logger.error(f"Error saving metrics: {e}")
            return False


def main():
    """Main function to calculate access metrics."""

    # Define file paths
    facilities_file = 'data/processed/facilities_cleaned.csv'
    census_file = 'data/processed/census_with_tracts.csv'

    # Initialize calculator
    calculator = AccessMetricsCalculator(
        facilities_file=facilities_file,
        census_file=census_file,
        output_dir='outputs/reports'
    )

    # Load data
    if not calculator.load_data():
        logger.error("Failed to load data. Exiting.")
        return 1

    # Generate comprehensive report
    summary = calculator.generate_summary_report()

    # Save metrics to file
    calculator.save_metrics('access_metrics_detailed.csv')

    # Calculate and display coverage gaps
    gaps = calculator.identify_coverage_gaps(threshold_km=5.0)
    if gaps is not None and len(gaps) > 0:
        logger.info(f"\nTop 10 most underserved tracts:")
        for idx, row in gaps.head(10).iterrows():
            logger.info(f"  GEOID {row.get('GEOID', 'N/A')}: {row['distance_to_nearest_km']:.2f} km")

    logger.info("\nAccess metrics calculation complete!")
    return 0


if __name__ == "__main__":
    exit(main())
