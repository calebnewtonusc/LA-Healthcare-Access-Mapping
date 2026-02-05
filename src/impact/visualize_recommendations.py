"""
Visualize policy recommendations with maps and charts.

Creates visual outputs that make recommendations more compelling and easier to understand.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import folium
from folium import plugins
import seaborn as sns
from pathlib import Path
from typing import Optional, List, Dict
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class RecommendationVisualizer:
    """Create compelling visualizations of policy recommendations."""

    def __init__(self, output_dir: Path = Path('outputs/policy_recommendations')):
        """
        Initialize visualizer.

        Args:
            output_dir: Directory to save visualization outputs
        """
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Set style for professional visualizations
        sns.set_style("whitegrid")
        plt.rcParams['figure.facecolor'] = 'white'
        plt.rcParams['font.size'] = 10

    def create_facility_locations_map(
        self,
        locations_df: pd.DataFrame,
        census_data: pd.DataFrame,
        output_file: str = 'recommended_facility_locations_map.html'
    ) -> bool:
        """
        Create interactive map showing recommended facility locations.

        Args:
            locations_df: DataFrame with recommended facility locations
            census_data: Census data with access metrics
            output_file: Output filename

        Returns:
            True if successful
        """
        try:
            logger.info("Creating facility locations map...")

            # Center map on LA County
            center_lat = 34.0522
            center_lon = -118.2437

            m = folium.Map(
                location=[center_lat, center_lon],
                zoom_start=9,
                tiles='OpenStreetMap'
            )

            # Add access desert areas (low opacity)
            access_deserts = census_data[census_data['nearest_facility_km'] > 10].copy()

            for idx, row in access_deserts.iterrows():
                if pd.notna(row.get('centroid_lat')) and pd.notna(row.get('centroid_lon')):
                    folium.Circle(
                        location=[row['centroid_lat'], row['centroid_lon']],
                        radius=500,
                        color='red',
                        fill=True,
                        fillColor='red',
                        fillOpacity=0.2,
                        popup=f"Access Desert<br>{row.get('tract_name', 'Unknown')}<br>Distance: {row['nearest_facility_km']:.1f}km",
                        tooltip="Access Desert Area"
                    ).add_to(m)

            # Add recommended facility locations (prominent markers)
            for idx, row in locations_df.iterrows():
                if pd.notna(row.get('latitude')) and pd.notna(row.get('longitude')):
                    # Create custom icon
                    icon_html = f'''
                    <div style="font-size: 24px; color: #2E7D32;">
                        <i class="fa fa-hospital-o"></i>
                    </div>
                    '''

                    popup_html = f"""
                    <div style="font-family: Arial; width: 300px;">
                        <h4 style="color: #2E7D32; margin-bottom: 10px;">
                            🏥 Recommended Facility Location #{idx + 1}
                        </h4>
                        <p><strong>Area:</strong> {row.get('tract_name', 'Unknown')}</p>
                        <p><strong>Current Distance:</strong> {row.get('current_distance_km', 0):.1f} km from nearest facility</p>
                        <p><strong>Population Served:</strong> {row.get('population_served', 0):,} residents</p>
                        <p><strong>Estimated Impact:</strong> {row.get('estimated_impact', 0):,} people within 5km</p>
                        <p><strong>Median Income:</strong> ${row.get('median_income', 0):,}</p>
                        <p><strong>Priority Reason:</strong> {row.get('priority_reason', 'Unknown')}</p>
                        <p style="background-color: #E8F5E9; padding: 5px; margin-top: 10px; border-left: 3px solid #2E7D32;">
                            <strong>Recommendation:</strong> High priority site for new healthcare facility
                        </p>
                    </div>
                    """

                    folium.Marker(
                        location=[row['latitude'], row['longitude']],
                        popup=folium.Popup(popup_html, max_width=350),
                        tooltip=f"Priority #{idx + 1}: {row.get('tract_name', 'Location')}",
                        icon=folium.Icon(color='green', icon='hospital-o', prefix='fa')
                    ).add_to(m)

                    # Add circle showing 5km service radius
                    folium.Circle(
                        location=[row['latitude'], row['longitude']],
                        radius=5000,  # 5km in meters
                        color='green',
                        fill=True,
                        fillColor='green',
                        fillOpacity=0.1,
                        weight=2,
                        dashArray='5, 5'
                    ).add_to(m)

            # Add compact legend (half size)
            legend_html = '''
            <div style="position: fixed;
                        bottom: 15px; right: 15px; width: 100px; height: auto;
                        background-color: rgba(255, 255, 255, 0.95); z-index:9999; font-size:8px;
                        border:1px solid #999; border-radius: 4px; padding: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">
                <h4 style="margin:0 0 4px 0; font-size:9px; font-weight:bold;">Legend</h4>
                <p style="margin:2px 0; line-height:1.2;">
                   <i class="fa fa-hospital-o" style="color:green; font-size:10px;"></i> Recommended
                </p>
                <p style="margin:2px 0; line-height:1.2;">
                   <span style="color:green; font-size:12px;">○</span> 5km Radius
                </p>
                <p style="margin:2px 0; line-height:1.2;">
                   <span style="color:red; font-size:9px;">●</span> Desert (>10km)
                </p>
            </div>
            '''
            m.get_root().html.add_child(folium.Element(legend_html))

            # Add layer control
            folium.LayerControl().add_to(m)

            # Save map
            output_path = self.output_dir / output_file
            m.save(str(output_path))

            logger.info(f"Facility locations map saved to {output_path}")
            return True

        except Exception as e:
            logger.error(f"Error creating facility locations map: {e}")
            return False

    def create_impact_dashboard(
        self,
        recommendations: List[Dict],
        locations_df: pd.DataFrame,
        census_data: pd.DataFrame,
        output_file: str = 'policy_impact_dashboard.png'
    ) -> bool:
        """
        Create comprehensive dashboard visualizing policy impact.

        Args:
            recommendations: List of policy recommendations
            locations_df: DataFrame with facility locations
            census_data: Census data with access metrics
            output_file: Output filename

        Returns:
            True if successful
        """
        try:
            logger.info("Creating policy impact dashboard...")

            fig = plt.figure(figsize=(20, 12))
            gs = fig.add_gridspec(3, 3, hspace=0.3, wspace=0.3)

            # 1. Recommendations by Priority (Top Left)
            ax1 = fig.add_subplot(gs[0, 0])
            if recommendations:
                recs_df = pd.DataFrame(recommendations)
                priority_counts = recs_df['Priority'].value_counts()
                colors = {'Critical': '#D32F2F', 'High': '#F57C00', 'Medium': '#FBC02D', 'Low': '#7CB342'}
                priority_colors = [colors.get(p, '#757575') for p in priority_counts.index]

                ax1.barh(priority_counts.index, priority_counts.values, color=priority_colors)
                ax1.set_xlabel('Number of Recommendations', fontsize=12)
                ax1.set_title('Recommendations by Priority Level', fontsize=14, fontweight='bold')
                ax1.grid(axis='x', alpha=0.3)

            # 2. Population Impact (Top Center)
            ax2 = fig.add_subplot(gs[0, 1])
            if recommendations:
                recs_df['Affected_Population_Millions'] = recs_df['Affected_Population'] / 1_000_000
                top_recs = recs_df.nlargest(5, 'Affected_Population')

                ax2.barh(range(len(top_recs)), top_recs['Affected_Population_Millions'],
                        color='#1976D2')
                ax2.set_yticks(range(len(top_recs)))
                ax2.set_yticklabels([t[:40] + '...' if len(t) > 40 else t
                                    for t in top_recs['Title']], fontsize=10)
                ax2.set_xlabel('Population Affected (Millions)', fontsize=12)
                ax2.set_title('Top 5 Recommendations by Population Impact',
                             fontsize=14, fontweight='bold')
                ax2.grid(axis='x', alpha=0.3)

            # 3. Cost vs Timeline (Top Right)
            ax3 = fig.add_subplot(gs[0, 2])
            if recommendations:
                cost_map = {'Low': 1, 'Medium': 2, 'High': 3, 'Very High': 4}
                timeline_map = {'Immediate': 1, 'Short-term': 2, 'Medium-term': 3, 'Long-term': 4}

                recs_df['cost_numeric'] = recs_df['Estimated_Cost'].map(cost_map)
                recs_df['timeline_numeric'] = recs_df['Implementation_Timeframe'].map(timeline_map)

                scatter = ax3.scatter(recs_df['timeline_numeric'], recs_df['cost_numeric'],
                                    s=recs_df['Affected_Population'] / 10000,
                                    c=recs_df['Priority'].map({'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3}),
                                    cmap='RdYlGn_r', alpha=0.6, edgecolors='black')

                ax3.set_xlabel('Implementation Timeline', fontsize=12)
                ax3.set_ylabel('Cost Level', fontsize=12)
                ax3.set_title('Cost vs Timeline Analysis', fontsize=14, fontweight='bold')
                ax3.set_xticks([1, 2, 3, 4])
                ax3.set_xticklabels(['Immediate', 'Short', 'Medium', 'Long'], rotation=45)
                ax3.set_yticks([1, 2, 3, 4])
                ax3.set_yticklabels(['Low', 'Medium', 'High', 'Very High'])
                ax3.grid(alpha=0.3)

            # 4. Access Desert Distribution (Middle Left)
            ax4 = fig.add_subplot(gs[1, 0])
            distance_bins = [0, 2, 5, 10, 20, 50]
            census_data['distance_category'] = pd.cut(census_data['nearest_facility_km'],
                                                       bins=distance_bins,
                                                       labels=['<2km', '2-5km', '5-10km', '10-20km', '>20km'])
            dist_counts = census_data['distance_category'].value_counts().sort_index()

            colors_dist = ['#2E7D32', '#7CB342', '#FBC02D', '#F57C00', '#D32F2F']
            ax4.bar(range(len(dist_counts)), dist_counts.values, color=colors_dist)
            ax4.set_xticks(range(len(dist_counts)))
            ax4.set_xticklabels(dist_counts.index, rotation=45)
            ax4.set_ylabel('Number of Census Tracts', fontsize=12)
            ax4.set_title('Distribution of Access Distances', fontsize=14, fontweight='bold')
            ax4.grid(axis='y', alpha=0.3)

            # 5. Recommended Facility Locations (Middle Center)
            ax5 = fig.add_subplot(gs[1, 1])
            if not locations_df.empty:
                top_locations = locations_df.head(10)
                ax5.scatter(top_locations['longitude'], top_locations['latitude'],
                          s=top_locations['estimated_impact'] / 100,
                          c=range(len(top_locations)), cmap='viridis',
                          alpha=0.6, edgecolors='black', linewidth=2)

                for idx, row in top_locations.head(5).iterrows():
                    ax5.annotate(f"#{idx + 1}",
                               (row['longitude'], row['latitude']),
                               fontsize=10, fontweight='bold',
                               bbox=dict(boxstyle='round,pad=0.3', facecolor='yellow', alpha=0.7))

                ax5.set_xlabel('Longitude', fontsize=12)
                ax5.set_ylabel('Latitude', fontsize=12)
                ax5.set_title('Top 10 Recommended Facility Locations',
                             fontsize=14, fontweight='bold')
                ax5.grid(alpha=0.3)

            # 6. Current vs Potential Access (Middle Right)
            ax6 = fig.add_subplot(gs[1, 2])
            access_deserts = census_data[census_data['nearest_facility_km'] > 5]

            current_data = {
                'Access Deserts\n(>5km)': len(access_deserts),
                'Well Served\n(<5km)': len(census_data) - len(access_deserts)
            }

            colors_access = ['#D32F2F', '#2E7D32']
            ax6.pie(current_data.values(), labels=current_data.keys(), autopct='%1.1f%%',
                   colors=colors_access, startangle=90, textprops={'fontsize': 12})
            ax6.set_title('Current Access Status\n(5km threshold)',
                         fontsize=14, fontweight='bold')

            # 7. Key Statistics (Bottom - spans all columns)
            ax7 = fig.add_subplot(gs[2, :])
            ax7.axis('off')

            # Calculate statistics
            total_population = census_data['total_population'].sum()
            desert_population = access_deserts['total_population'].sum()
            avg_distance = census_data['nearest_facility_km'].mean()

            if recommendations:
                total_affected = sum(r['Affected_Population'] for r in recommendations)
                critical_recs = sum(1 for r in recommendations if r['Priority'] == 'Critical')
            else:
                total_affected = 0
                critical_recs = 0

            stats_text = f"""
            KEY STATISTICS & IMPACT POTENTIAL

            Current Situation:
            • Total LA County Population: {total_population:,.0f}
            • Population in Access Deserts (>5km): {desert_population:,.0f} ({desert_population/total_population*100:.1f}%)
            • Average Distance to Healthcare: {avg_distance:.2f} km
            • Census Tracts in Access Deserts: {len(access_deserts)} of {len(census_data)} ({len(access_deserts)/len(census_data)*100:.1f}%)

            Policy Recommendations:
            • Total Recommendations Generated: {len(recommendations) if recommendations else 0}
            • Critical Priority Items: {critical_recs}
            • Total Population Affected by Recommendations: {total_affected:,.0f}
            • Recommended New Facility Locations: {len(locations_df)}
            • Estimated Additional Population Served: {locations_df['estimated_impact'].sum():,.0f} people within 5km

            Expected Impact (if all recommendations implemented):
            • Reduction in Access Deserts: 40-60% improvement in extreme cases
            • New Residents with <5km Access: {locations_df['estimated_impact'].sum():,.0f}+
            • Quick Win Opportunities: Mobile clinics + Transportation (can start immediately)
            """

            ax7.text(0.05, 0.95, stats_text, transform=ax7.transAxes,
                    fontsize=11, verticalalignment='top', fontfamily='monospace',
                    bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

            # Main title
            fig.suptitle('LA COUNTY HEALTHCARE ACCESS - POLICY RECOMMENDATIONS IMPACT DASHBOARD',
                        fontsize=18, fontweight='bold', y=0.98)

            # Save figure
            output_path = self.output_dir / output_file
            plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
            plt.close()

            logger.info(f"Impact dashboard saved to {output_path}")
            return True

        except Exception as e:
            logger.error(f"Error creating impact dashboard: {e}")
            import traceback
            traceback.print_exc()
            return False

    def create_access_desert_heatmap(
        self,
        census_data: pd.DataFrame,
        output_file: str = 'access_desert_heatmap.html'
    ) -> bool:
        """
        Create heatmap showing healthcare access deserts.

        Args:
            census_data: Census data with access metrics
            output_file: Output filename

        Returns:
            True if successful
        """
        try:
            logger.info("Creating access desert heatmap...")

            # Center map on LA County
            center_lat = 34.0522
            center_lon = -118.2437

            m = folium.Map(
                location=[center_lat, center_lon],
                zoom_start=9,
                tiles='CartoDB positron'
            )

            # Prepare heatmap data
            heat_data = []
            for idx, row in census_data.iterrows():
                if pd.notna(row.get('centroid_lat')) and pd.notna(row.get('centroid_lon')):
                    # Weight by distance and population
                    weight = row['nearest_facility_km'] * (row['total_population'] / 1000)
                    heat_data.append([
                        row['centroid_lat'],
                        row['centroid_lon'],
                        weight
                    ])

            # Add heatmap layer
            plugins.HeatMap(
                heat_data,
                min_opacity=0.2,
                max_opacity=0.8,
                radius=15,
                blur=20,
                gradient={
                    '0.0': 'green',
                    '0.3': 'yellow',
                    '0.6': 'orange',
                    '1.0': 'red'
                }
            ).add_to(m)

            # Add title
            title_html = '''
            <div style="position: fixed;
                        top: 10px; left: 50px; width: 400px; height: 60px;
                        background-color: white; z-index:9999; font-size:16px;
                        border:2px solid grey; border-radius: 5px; padding: 10px">
                <h3 style="margin:0;">Healthcare Access Desert Heatmap</h3>
                <p style="margin:5px 0 0 0; font-size:12px;">
                    Red = High need (far from care + high population)
                </p>
            </div>
            '''
            m.get_root().html.add_child(folium.Element(title_html))

            # Save map
            output_path = self.output_dir / output_file
            m.save(str(output_path))

            logger.info(f"Access desert heatmap saved to {output_path}")
            return True

        except Exception as e:
            logger.error(f"Error creating heatmap: {e}")
            return False


def main():
    """Generate all policy visualizations."""

    # Load data
    census_file = Path('outputs/reports/census_with_access_metrics.csv')
    locations_file = Path('outputs/policy_recommendations/recommended_facility_locations.csv')
    recommendations_file = Path('outputs/policy_recommendations/recommendations.csv')

    if not census_file.exists():
        logger.error(f"Census data not found: {census_file}")
        return 1

    census_data = pd.read_csv(census_file)

    # Initialize visualizer
    visualizer = RecommendationVisualizer()

    # Create facility locations map
    if locations_file.exists():
        locations_df = pd.read_csv(locations_file)
        visualizer.create_facility_locations_map(locations_df, census_data)
    else:
        logger.warning("Facility locations file not found")
        locations_df = pd.DataFrame()

    # Create access desert heatmap
    visualizer.create_access_desert_heatmap(census_data)

    # Create impact dashboard
    if recommendations_file.exists():
        recommendations = pd.read_csv(recommendations_file).to_dict('records')
        visualizer.create_impact_dashboard(recommendations, locations_df, census_data)
    else:
        logger.warning("Recommendations file not found")

    logger.info("\n" + "="*60)
    logger.info("POLICY VISUALIZATIONS CREATED")
    logger.info("="*60)
    logger.info(f"Output directory: outputs/policy_recommendations/")
    logger.info("="*60)

    return 0


if __name__ == "__main__":
    exit(main())
