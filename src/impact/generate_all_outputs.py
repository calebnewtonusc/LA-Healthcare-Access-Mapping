"""
Master script to generate all policy impact outputs.

Runs the complete pipeline to produce:
- Policy recommendations
- Cost-benefit analysis
- Community reports
- Interactive visualizations
- Impact dashboards
"""

import logging
from pathlib import Path
import sys

# Import all impact modules
from impact.policy_recommendations import PolicyRecommendationEngine
from impact.visualize_recommendations import RecommendationVisualizer
from impact.community_reports import CommunityReportGenerator
from impact.cost_benefit_analysis import CostBenefitAnalyzer
import pandas as pd

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def main():
    """Generate all policy impact outputs."""

    logger.info("="*80)
    logger.info("GENERATING COMPREHENSIVE POLICY IMPACT PACKAGE")
    logger.info("="*80)

    # File paths
    census_file = Path('outputs/reports/census_with_access_metrics.csv')
    output_dir = Path('outputs/policy_recommendations')

    # Verify data exists
    if not census_file.exists():
        logger.error(f"Census data not found: {census_file}")
        logger.error("Please run the analysis notebook first to generate access metrics.")
        return 1

    logger.info(f"\n1/5 Generating policy recommendations...")
    logger.info("-" * 80)

    # Step 1: Generate Policy Recommendations
    engine = PolicyRecommendationEngine(census_file, census_file)

    if not engine.load_data():
        logger.error("Failed to load data. Exiting.")
        return 1

    recommendations = engine.generate_all_recommendations()
    output_dir.mkdir(parents=True, exist_ok=True)

    engine.generate_executive_summary(output_dir / 'EXECUTIVE_SUMMARY.txt')
    engine.export_recommendations_csv(output_dir / 'recommendations.csv')

    locations = engine.recommend_new_facility_locations(n_facilities=10)
    locations_df = pd.DataFrame(locations)
    locations_df.to_csv(output_dir / 'recommended_facility_locations.csv', index=False)

    logger.info(f"✓ Policy recommendations generated: {len(recommendations)} recommendations")

    # Step 2: Generate Cost-Benefit Analysis
    logger.info(f"\n2/5 Generating cost-benefit analysis...")
    logger.info("-" * 80)

    analyzer = CostBenefitAnalyzer()
    recommendations_df = pd.read_csv(output_dir / 'recommendations.csv')
    analyzer.generate_cost_benefit_report(
        recommendations_df.to_dict('records'),
        locations_df,
        output_dir / 'COST_BENEFIT_ANALYSIS.txt'
    )

    logger.info("✓ Cost-benefit analysis complete")

    # Step 3: Generate Community Report
    logger.info(f"\n3/5 Generating community report...")
    logger.info("-" * 80)

    census_data = pd.read_csv(census_file)
    report_generator = CommunityReportGenerator(output_dir)
    report_generator.generate_community_summary(
        recommendations_df.to_dict('records'),
        census_data,
        locations_df
    )

    logger.info("✓ Community report generated")

    # Step 4: Generate Visualizations
    logger.info(f"\n4/5 Creating interactive visualizations...")
    logger.info("-" * 80)

    visualizer = RecommendationVisualizer(output_dir)

    # Facility locations map
    visualizer.create_facility_locations_map(locations_df, census_data)
    logger.info("  ✓ Facility locations map created")

    # Access desert heatmap
    visualizer.create_access_desert_heatmap(census_data)
    logger.info("  ✓ Access desert heatmap created")

    # Impact dashboard
    visualizer.create_impact_dashboard(
        recommendations_df.to_dict('records'),
        locations_df,
        census_data
    )
    logger.info("  ✓ Policy impact dashboard created")

    # Step 5: Summary
    logger.info(f"\n5/5 Generating summary...")
    logger.info("-" * 80)

    # Count outputs
    output_files = list(output_dir.glob('*'))
    logger.info(f"✓ Total files generated: {len(output_files)}")

    logger.info("\n" + "="*80)
    logger.info("✅ COMPLETE POLICY IMPACT PACKAGE GENERATED SUCCESSFULLY")
    logger.info("="*80)

    logger.info("\nOUTPUTS CREATED:")
    logger.info("-" * 80)

    logger.info("\n📊 FOR POLICYMAKERS:")
    logger.info("  • EXECUTIVE_SUMMARY.txt - 1-page summary for decision makers")
    logger.info("  • recommendations.csv - Structured recommendations dataset")
    logger.info("  • COST_BENEFIT_ANALYSIS.txt - Detailed financial analysis with ROI")
    logger.info("  • policy_impact_dashboard.png - Visual dashboard with key metrics")

    logger.info("\n🗺️ INTERACTIVE MAPS:")
    logger.info("  • recommended_facility_locations_map.html - Where to build new facilities")
    logger.info("  • access_desert_heatmap.html - Heat map of access gaps")

    logger.info("\n👥 FOR COMMUNITIES:")
    logger.info("  • COMMUNITY_SUMMARY.txt - Plain-language report for residents")

    logger.info("\n📍 FACILITY PLANNING:")
    logger.info("  • recommended_facility_locations.csv - Top 10 priority sites with coordinates")

    logger.info(f"\nAll files saved to: {output_dir.absolute()}")

    logger.info("\n" + "="*80)
    logger.info("NEXT STEPS:")
    logger.info("="*80)
    logger.info("""
1. Review EXECUTIVE_SUMMARY.txt for high-level overview
2. Open interactive maps in your web browser
3. Share COMMUNITY_SUMMARY.txt with community organizations
4. Use COST_BENEFIT_ANALYSIS.txt for funding proposals
5. Share visualizations on social media (#LAHealthcareAccess)
""")

    logger.info("="*80)
    logger.info("This project can now directly support healthcare access improvements for")
    logger.info(f"{census_data['total_population'].sum():,.0f} LA County residents!")
    logger.info("="*80)

    return 0


if __name__ == "__main__":
    sys.exit(main())
