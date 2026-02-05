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
from pathlib import Path


class HealthcareMapper:
    """Create maps and visualizations for healthcare access analysis."""

    def __init__(self, facilities_file, boundaries_file, output_dir='outputs/maps'):
        """
        Initialize the mapper.

        Args:
            facilities_file: Path to cleaned facilities data
            boundaries_file: Path to geographic boundaries (GeoJSON/Shapefile)
            output_dir: Directory to save maps
        """
        self.facilities_file = Path(facilities_file)
        self.boundaries_file = Path(boundaries_file)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

        self.facilities = None
        self.boundaries = None

    def load_data(self):
        """Load facility and boundary data."""
        print("Loading data for mapping...")

        # Load facilities
        self.facilities = pd.read_csv(self.facilities_file)
        print(f"✓ Loaded {len(self.facilities)} facilities")

        # Load boundaries as GeoDataFrame
        # self.boundaries = gpd.read_file(self.boundaries_file)
        # print(f"✓ Loaded {len(self.boundaries)} geographic boundaries")

    def create_static_map(self, output_file='facility_map.png'):
        """
        Create a static map of facility locations.

        Args:
            output_file: Output filename
        """
        print("Creating static map...")

        fig, ax = plt.subplots(figsize=(12, 10))

        # Plot boundaries
        # if self.boundaries is not None:
        #     self.boundaries.plot(ax=ax, color='lightgray', edgecolor='black')

        # Plot facilities
        if self.facilities is not None:
            # Color by facility type
            facility_colors = {
                'urgent_care': 'red',
                'hospital': 'blue',
                'clinic': 'green',
                'other': 'gray'
            }

            for category, color in facility_colors.items():
                subset = self.facilities[self.facilities['category'] == category]
                if len(subset) > 0:
                    ax.scatter(
                        subset['lon'],
                        subset['lat'],
                        c=color,
                        label=category.replace('_', ' ').title(),
                        alpha=0.6,
                        s=50
                    )

        ax.set_xlabel('Longitude')
        ax.set_ylabel('Latitude')
        ax.set_title('Healthcare Facilities in Los Angeles County')
        ax.legend()

        output_path = self.output_dir / output_file
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        print(f"✓ Saved static map to {output_path}")

        plt.close()

    def create_interactive_map(self, output_file='interactive_map.html'):
        """
        Create an interactive Folium map.

        Args:
            output_file: Output filename
        """
        print("Creating interactive map...")

        # Center on LA
        la_center = [34.0522, -118.2437]
        m = folium.Map(location=la_center, zoom_start=10)

        # Add facility markers
        if self.facilities is not None:
            # Define colors for different facility types
            color_map = {
                'urgent_care': 'red',
                'hospital': 'blue',
                'clinic': 'green',
                'other': 'gray'
            }

            for idx, facility in self.facilities.iterrows():
                color = color_map.get(facility.get('category', 'other'), 'gray')

                # Create popup with facility info
                popup_text = f"""
                <b>{facility.get('name', 'Unknown')}</b><br>
                Type: {facility.get('category', 'Unknown')}<br>
                Address: {facility.get('address', 'N/A')}
                """

                folium.CircleMarker(
                    location=[facility['lat'], facility['lon']],
                    radius=5,
                    popup=folium.Popup(popup_text, max_width=200),
                    color=color,
                    fill=True,
                    fillColor=color,
                    fillOpacity=0.6
                ).add_to(m)

        # Save map
        output_path = self.output_dir / output_file
        m.save(str(output_path))
        print(f"✓ Saved interactive map to {output_path}")

    def create_choropleth_map(self, metric_data, metric_col, output_file='access_choropleth.html'):
        """
        Create choropleth map showing access metrics by area.

        Args:
            metric_data: GeoDataFrame with metric values
            metric_col: Column name containing the metric to visualize
            output_file: Output filename
        """
        print(f"Creating choropleth map for {metric_col}...")

        # TODO: Implement choropleth mapping
        # Requires GeoDataFrame with geometries and metrics
        # Use folium.Choropleth or geopandas.plot

        print("⚠ Choropleth mapping requires processed geographic data")

    def create_access_score_map(self, scores_file, output_file='access_scores.png'):
        """
        Create map visualization of composite access scores.

        Args:
            scores_file: Path to file with access scores by area
            output_file: Output filename
        """
        print("Creating access score map...")

        # TODO: Load scores and create heatmap-style visualization

        print("⚠ Access score mapping requires calculated metrics")


def main():
    """Main function to create maps."""

    # Example usage - update file paths when data is ready
    mapper = HealthcareMapper(
        facilities_file='data/processed/facilities_cleaned.csv',
        boundaries_file='data/external/la_county_boundaries.geojson'
    )

    # Load data
    # mapper.load_data()

    # Create maps
    # mapper.create_static_map()
    # mapper.create_interactive_map()

    print("Healthcare mapper ready!")
    print("Uncomment sections in main() once data is processed")


if __name__ == "__main__":
    main()
