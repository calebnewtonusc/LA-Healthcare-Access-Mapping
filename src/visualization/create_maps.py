"""
Create maps and visualizations of healthcare access.

This script generates static and interactive maps showing facility
locations, access gaps, and demographic patterns.
"""

import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt
import seaborn as sns
import folium
import logging
import numpy as np
from pathlib import Path
from typing import Optional, Union
import json

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Set visualization style
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 10)


class HealthcareMapper:
    """Create maps and visualizations for healthcare access analysis."""

    def __init__(self, facilities_file: Union[str, Path],
                 boundaries_file: Optional[Union[str, Path]] = None,
                 output_dir: Union[str, Path] = 'outputs/maps'):
        """
        Initialize the mapper.

        Args:
            facilities_file: Path to cleaned facilities data
            boundaries_file: Path to geographic boundaries (GeoJSON/Shapefile) - optional
            output_dir: Directory to save maps
        """
        self.facilities_file = Path(facilities_file)
        self.boundaries_file = Path(boundaries_file) if boundaries_file else None
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

        self.facilities = None
        self.boundaries = None

    def load_data(self) -> bool:
        """
        Load facility and boundary data.

        Returns:
            True if data loaded successfully, False otherwise
        """
        try:
            logger.info("Loading data for mapping...")

            # Load facilities
            if not self.facilities_file.exists():
                logger.error(f"Facilities file not found: {self.facilities_file}")
                return False

            self.facilities = pd.read_csv(self.facilities_file)
            logger.info(f"Loaded {len(self.facilities)} facilities")

            # Load boundaries if provided
            if self.boundaries_file and self.boundaries_file.exists():
                self.boundaries = gpd.read_file(self.boundaries_file)
                logger.info(f"Loaded {len(self.boundaries)} geographic boundaries")
            else:
                logger.info("No boundaries file provided or found, maps will show facilities only")

            return True

        except Exception as e:
            logger.error(f"Error loading data: {e}")
            return False

    def create_static_map(self, output_file: str = 'facility_map.png') -> bool:
        """
        Create a static map of facility locations.

        Args:
            output_file: Output filename

        Returns:
            True if map created successfully, False otherwise
        """
        try:
            logger.info("Creating static map...")

            fig, ax = plt.subplots(figsize=(14, 12))

            # Plot boundaries if available
            if self.boundaries is not None:
                self.boundaries.plot(ax=ax, color='lightgray', edgecolor='black', alpha=0.5)
                logger.info("Plotted geographic boundaries")

            # Plot facilities
            if self.facilities is not None:
                # Color by facility type
                facility_colors = {
                    'urgent_care': '#e74c3c',  # Red
                    'hospital': '#3498db',      # Blue
                    'clinic': '#2ecc71',        # Green
                    'other': '#95a5a6'          # Gray
                }

                for category, color in facility_colors.items():
                    subset = self.facilities[self.facilities['category'] == category]
                    if len(subset) > 0:
                        ax.scatter(
                            subset['lon'],
                            subset['lat'],
                            c=color,
                            label=category.replace('_', ' ').title(),
                            alpha=0.7,
                            s=60,
                            edgecolors='white',
                            linewidth=0.5
                        )

            ax.set_xlabel('Longitude', fontsize=12)
            ax.set_ylabel('Latitude', fontsize=12)
            ax.set_title('Healthcare Facilities in Los Angeles County', fontsize=16, fontweight='bold')
            ax.legend(loc='upper right', fontsize=10, framealpha=0.9)
            ax.grid(True, alpha=0.3)

            output_path = self.output_dir / output_file
            plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
            logger.info(f"Saved static map to {output_path}")

            plt.close()
            return True

        except Exception as e:
            logger.error(f"Error creating static map: {e}")
            return False

    def create_interactive_map(self, output_file: str = 'interactive_map.html') -> bool:
        """
        Create an interactive Folium map.

        Args:
            output_file: Output filename

        Returns:
            True if map created successfully, False otherwise
        """
        try:
            logger.info("Creating interactive map...")

            # Center on LA
            la_center = [34.0522, -118.2437]
            m = folium.Map(
                location=la_center,
                zoom_start=10,
                tiles='OpenStreetMap',
                control_scale=True
            )

            # Add facility markers
            if self.facilities is not None:
                # Define colors for different facility types
                color_map = {
                    'urgent_care': 'red',
                    'hospital': 'blue',
                    'clinic': 'green',
                    'other': 'gray'
                }

                # Create feature groups for each category
                feature_groups = {}
                for category in color_map.keys():
                    feature_groups[category] = folium.FeatureGroup(
                        name=category.replace('_', ' ').title()
                    )

                # Add markers to feature groups
                for idx, facility in self.facilities.iterrows():
                    category = facility.get('category', 'other')
                    color = color_map.get(category, 'gray')

                    # Create popup with facility info
                    popup_html = f"""
                    <div style="font-family: Arial; width: 200px;">
                        <h4 style="margin: 5px 0;">{facility.get('name', 'Unknown')}</h4>
                        <p style="margin: 3px 0;"><b>Type:</b> {category.replace('_', ' ').title()}</p>
                        <p style="margin: 3px 0;"><b>Address:</b> {facility.get('address', 'N/A')}</p>
                        <p style="margin: 3px 0;"><b>Coordinates:</b> ({facility['lat']:.4f}, {facility['lon']:.4f})</p>
                    </div>
                    """

                    folium.CircleMarker(
                        location=[facility['lat'], facility['lon']],
                        radius=6,
                        popup=folium.Popup(popup_html, max_width=250),
                        color=color,
                        fill=True,
                        fillColor=color,
                        fillOpacity=0.7,
                        weight=2
                    ).add_to(feature_groups[category])

                # Add feature groups to map
                for fg in feature_groups.values():
                    fg.add_to(m)

                # Add layer control
                folium.LayerControl().add_to(m)

                logger.info(f"Added {len(self.facilities)} facility markers to map")

            # Save map
            output_path = self.output_dir / output_file
            m.save(str(output_path))
            logger.info(f"Saved interactive map to {output_path}")

            return True

        except Exception as e:
            logger.error(f"Error creating interactive map: {e}")
            return False

    def create_choropleth_map(self, metric_data: pd.DataFrame,
                             metric_col: str,
                             output_file: str = 'access_choropleth.html',
                             color_scheme: str = 'YlOrRd') -> bool:
        """
        Create choropleth map showing access metrics by area.

        Args:
            metric_data: DataFrame with GEOID and metric values
            metric_col: Column name containing the metric to visualize
            output_file: Output filename
            color_scheme: Color scheme for choropleth (e.g., 'YlOrRd', 'RdYlGn_r')

        Returns:
            True if map created successfully, False otherwise
        """
        try:
            logger.info(f"Creating choropleth map for {metric_col}...")

            if self.boundaries is None:
                logger.error("Boundaries data required for choropleth mapping")
                return False

            # Ensure boundaries is a GeoDataFrame
            if not isinstance(self.boundaries, gpd.GeoDataFrame):
                logger.error("Boundaries must be a GeoDataFrame")
                return False

            # Merge metric data with boundaries
            if 'GEOID' in metric_data.columns and 'GEOID' in self.boundaries.columns:
                boundaries_with_metrics = self.boundaries.merge(
                    metric_data[['GEOID', metric_col]],
                    on='GEOID',
                    how='left'
                )
            else:
                logger.error("GEOID column required in both metric_data and boundaries")
                return False

            # Create map centered on LA
            la_center = [34.0522, -118.2437]
            m = folium.Map(
                location=la_center,
                zoom_start=10,
                tiles='OpenStreetMap'
            )

            # Create choropleth layer
            folium.Choropleth(
                geo_data=boundaries_with_metrics,
                name='choropleth',
                data=metric_data,
                columns=['GEOID', metric_col],
                key_on='feature.properties.GEOID',
                fill_color=color_scheme,
                fill_opacity=0.7,
                line_opacity=0.2,
                legend_name=metric_col.replace('_', ' ').title(),
                nan_fill_color='lightgray'
            ).add_to(m)

            # Add tooltips with detailed information
            folium.GeoJson(
                boundaries_with_metrics,
                name='labels',
                style_function=lambda x: {
                    'fillColor': 'transparent',
                    'color': 'transparent',
                    'weight': 0
                },
                tooltip=folium.GeoJsonTooltip(
                    fields=['GEOID', metric_col],
                    aliases=['Census Tract:', metric_col.replace('_', ' ').title() + ':'],
                    localize=True
                )
            ).add_to(m)

            # Add layer control
            folium.LayerControl().add_to(m)

            # Save map
            output_path = self.output_dir / output_file
            m.save(str(output_path))
            logger.info(f"Saved choropleth map to {output_path}")

            return True

        except Exception as e:
            logger.error(f"Error creating choropleth map: {e}")
            return False

    def create_access_score_map(self, scores_file: Union[str, Path],
                               output_file: str = 'access_scores.png') -> bool:
        """
        Create map visualization of composite access scores.

        Args:
            scores_file: Path to file with access scores by area
            output_file: Output filename

        Returns:
            True if map created successfully, False otherwise
        """
        try:
            logger.info("Creating access score map...")

            scores_path = Path(scores_file)
            if not scores_path.exists():
                logger.error(f"Scores file not found: {scores_path}")
                return False

            # Load scores
            scores_df = pd.read_csv(scores_path)

            if 'access_score' not in scores_df.columns:
                logger.error("access_score column not found in scores file")
                return False

            # If we have coordinates, create a heatmap-style visualization
            if 'centroid_lat' in scores_df.columns and 'centroid_lon' in scores_df.columns:
                fig, ax = plt.subplots(figsize=(14, 12))

                # Create scatter plot colored by access score
                scatter = ax.scatter(
                    scores_df['centroid_lon'],
                    scores_df['centroid_lat'],
                    c=scores_df['access_score'],
                    cmap='RdYlGn',  # Red (low) to Green (high)
                    s=50,
                    alpha=0.6,
                    edgecolors='black',
                    linewidth=0.5
                )

                # Add colorbar
                cbar = plt.colorbar(scatter, ax=ax)
                cbar.set_label('Access Score (0-100)', fontsize=12)

                # Overlay facility points if available
                if self.facilities is not None:
                    ax.scatter(
                        self.facilities['lon'],
                        self.facilities['lat'],
                        c='blue',
                        marker='x',
                        s=20,
                        alpha=0.5,
                        label='Facilities'
                    )
                    ax.legend()

                ax.set_xlabel('Longitude', fontsize=12)
                ax.set_ylabel('Latitude', fontsize=12)
                ax.set_title('Healthcare Access Scores by Census Tract', fontsize=16, fontweight='bold')
                ax.grid(True, alpha=0.3)

                output_path = self.output_dir / output_file
                plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
                logger.info(f"Saved access score map to {output_path}")

                plt.close()
                return True
            else:
                logger.warning("Coordinate columns not found, cannot create spatial visualization")
                return False

        except Exception as e:
            logger.error(f"Error creating access score map: {e}")
            return False

    def create_facility_density_heatmap(self, output_file: str = 'facility_density.png') -> bool:
        """
        Create heatmap showing facility density across the region.

        Args:
            output_file: Output filename

        Returns:
            True if map created successfully, False otherwise
        """
        try:
            logger.info("Creating facility density heatmap...")

            if self.facilities is None or len(self.facilities) == 0:
                logger.error("No facilities data available")
                return False

            fig, ax = plt.subplots(figsize=(14, 12))

            # Create 2D histogram (heatmap)
            lat_range = (self.facilities['lat'].min(), self.facilities['lat'].max())
            lon_range = (self.facilities['lon'].min(), self.facilities['lon'].max())

            heatmap, xedges, yedges = np.histogram2d(
                self.facilities['lon'],
                self.facilities['lat'],
                bins=50,
                range=[lon_range, lat_range]
            )

            # Plot heatmap
            extent = [xedges[0], xedges[-1], yedges[0], yedges[-1]]
            im = ax.imshow(
                heatmap.T,
                extent=extent,
                origin='lower',
                cmap='YlOrRd',
                alpha=0.6,
                aspect='auto'
            )

            # Add colorbar
            cbar = plt.colorbar(im, ax=ax)
            cbar.set_label('Facility Count', fontsize=12)

            # Overlay actual facility points
            ax.scatter(
                self.facilities['lon'],
                self.facilities['lat'],
                c='black',
                s=5,
                alpha=0.3
            )

            ax.set_xlabel('Longitude', fontsize=12)
            ax.set_ylabel('Latitude', fontsize=12)
            ax.set_title('Healthcare Facility Density Heatmap', fontsize=16, fontweight='bold')
            ax.grid(True, alpha=0.3)

            output_path = self.output_dir / output_file
            plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
            logger.info(f"Saved density heatmap to {output_path}")

            plt.close()
            return True

        except Exception as e:
            logger.error(f"Error creating density heatmap: {e}")
            return False


def main():
    """Main function to create maps."""

    # Define file paths
    facilities_file = 'data/processed/facilities_cleaned.csv'
    boundaries_file = 'data/external/tl_2022_06037_tract/tl_2022_06037_tract.shp'
    scores_file = 'outputs/reports/census_with_access_metrics.csv'

    # Initialize mapper
    mapper = HealthcareMapper(
        facilities_file=facilities_file,
        boundaries_file=boundaries_file if Path(boundaries_file).exists() else None,
        output_dir='outputs/maps'
    )

    # Load data
    if not mapper.load_data():
        logger.error("Failed to load data. Exiting.")
        return 1

    # Create static map
    logger.info("\n=== Creating Static Map ===")
    mapper.create_static_map('facility_map_static.png')

    # Create interactive map
    logger.info("\n=== Creating Interactive Map ===")
    mapper.create_interactive_map('healthcare_facilities_interactive.html')

    # Create facility density heatmap
    logger.info("\n=== Creating Density Heatmap ===")
    mapper.create_facility_density_heatmap('facility_density_heatmap.png')

    # Create access score map if scores file exists
    if Path(scores_file).exists():
        logger.info("\n=== Creating Access Score Map ===")
        mapper.create_access_score_map(scores_file, 'access_scores_map.png')

        # Create choropleth if boundaries available
        if mapper.boundaries is not None:
            logger.info("\n=== Creating Choropleth Map ===")
            scores_df = pd.read_csv(scores_file)
            if 'access_score' in scores_df.columns:
                mapper.create_choropleth_map(
                    scores_df,
                    'access_score',
                    'access_choropleth.html',
                    color_scheme='RdYlGn'
                )
    else:
        logger.info(f"\nScores file not found at {scores_file}")
        logger.info("Run access metrics calculation first to generate scores")

    logger.info("\n=== Map creation complete! ===")
    logger.info(f"Maps saved to: {mapper.output_dir}")

    return 0


if __name__ == "__main__":
    exit(main())
