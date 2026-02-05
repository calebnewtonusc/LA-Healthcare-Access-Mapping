"""
Generate plain-language community reports.

Creates accessible reports for residents and community organizations.
"""

import pandas as pd
from pathlib import Path
from typing import Dict, List
import logging
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class CommunityReportGenerator:
    """Generate plain-language reports for community members."""

    def __init__(self, output_dir: Path = Path('outputs/policy_recommendations')):
        """Initialize report generator."""
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def generate_community_summary(
        self,
        recommendations: List[Dict],
        census_data: pd.DataFrame,
        locations_df: pd.DataFrame,
        output_file: str = 'COMMUNITY_SUMMARY.txt'
    ) -> bool:
        """
        Generate plain-language summary for community members.

        Args:
            recommendations: List of policy recommendations
            census_data: Census data with access metrics
            locations_df: Recommended facility locations
            output_file: Output filename

        Returns:
            True if successful
        """
        try:
            logger.info("Generating community summary...")

            lines = []
            lines.append("=" * 80)
            lines.append("HEALTHCARE ACCESS IN LOS ANGELES COUNTY")
            lines.append("What This Means for You and Your Community")
            lines.append("=" * 80)
            lines.append(f"\nReport Date: {datetime.now().strftime('%B %d, %Y')}")
            lines.append("\n" + "=" * 80)

            # Introduction
            lines.append("\n📋 WHAT IS THIS REPORT?")
            lines.append("-" * 80)
            lines.append("""
This report explains healthcare access in LA County in plain language. We analyzed
data from all 2,498 census tracts (neighborhoods) to find out where residents
have difficulty accessing healthcare facilities.

The goal is to identify WHERE new healthcare facilities are needed and WHAT actions
can improve access for everyone, especially communities that currently have the
longest distances to travel for care.
""")

            # Current situation
            lines.append("\n📊 CURRENT SITUATION IN LA COUNTY")
            lines.append("-" * 80)

            total_pop = census_data['total_population'].sum()
            avg_distance = census_data['nearest_facility_km'].mean()
            access_deserts = census_data[census_data['nearest_facility_km'] > 5]
            desert_pop = access_deserts['total_population'].sum()
            extreme_deserts = census_data[census_data['nearest_facility_km'] > 10]

            lines.append(f"\n✓ Total LA County Residents: {total_pop:,.0f} people")
            lines.append(f"✓ Average Distance to Nearest Healthcare Facility: {avg_distance:.1f} kilometers ({avg_distance * 0.621371:.1f} miles)")
            lines.append(f"\n⚠️  {len(access_deserts):,} neighborhoods ({len(access_deserts)/len(census_data)*100:.1f}%) are MORE THAN 5 KM (3.1 MILES) from healthcare")
            lines.append(f"   → This affects {desert_pop:,.0f} residents ({desert_pop/total_pop*100:.1f}% of LA County)")
            lines.append(f"\n🚨 {len(extreme_deserts):,} neighborhoods are MORE THAN 10 KM (6.2 MILES) from healthcare")
            lines.append(f"   → This is a CRITICAL ACCESS PROBLEM affecting {extreme_deserts['total_population'].sum():,.0f} residents")

            # What this means in real terms
            lines.append("\n\n💡 WHAT DOES THIS MEAN IN REAL LIFE?")
            lines.append("-" * 80)
            lines.append("""
When you live far from healthcare facilities:
• It's harder to see a doctor for regular checkups
• Emergency situations become more dangerous
• Transportation costs add up quickly
• Taking time off work becomes necessary
• Chronic conditions are harder to manage
• Preventive care (that keeps you healthy) is less accessible

This is especially difficult for:
• Families without cars (10%+ of households in 776 neighborhoods)
• Low-income residents who can't afford transportation
• Elderly residents with mobility challenges
• Parents with young children
""")

            # Quick wins
            lines.append("\n\n🎯 GOOD NEWS: QUICK SOLUTIONS ARE AVAILABLE!")
            lines.append("-" * 80)
            lines.append("""
Our analysis found that some solutions can start RIGHT AWAY:

1. MOBILE HEALTH CLINICS
   • What: Bring healthcare directly to your neighborhood
   • Where: Community centers, schools, libraries
   • Services: Check-ups, vaccinations, screenings, basic care
   • Timeline: Can start in a few months
   • Who benefits: 4,805 residents in areas with poor access

2. TRANSPORTATION HELP
   • What: Vouchers or subsidized rides to medical appointments
   • How: Partner with ride-sharing services or volunteer drivers
   • Cost: Low - much cheaper than building new facilities
   • Timeline: Can start immediately
   • Who benefits: 2.9 million residents in areas with few cars

3. TELEHEALTH / VIDEO VISITS
   • What: See doctors via video call
   • Where: From your home, or at a library/community center kiosk
   • Services: Primary care, specialist consultations
   • Timeline: Can expand quickly
   • Who benefits: 4,023 residents in low-access areas
""")

            # Where new facilities are needed
            lines.append("\n\n🏥 WHERE NEW HEALTHCARE FACILITIES ARE NEEDED MOST")
            lines.append("-" * 80)

            if not locations_df.empty:
                lines.append(f"\nWe identified the TOP {len(locations_df)} LOCATIONS where building new facilities would help the most people:")
                lines.append("")

                for idx, row in locations_df.head(10).iterrows():
                    lines.append(f"\n{idx + 1}. {row.get('tract_name', 'Unknown Area')}")
                    lines.append(f"   • Current Situation: Nearest facility is {row['current_distance_km']:.1f} km ({row['current_distance_km'] * 0.621371:.1f} miles) away")
                    lines.append(f"   • Residents Directly Affected: {row['population_served']:,} people")
                    lines.append(f"   • Total Who Would Benefit (5km radius): {row['estimated_impact']:,} people")
                    lines.append(f"   • Why This Area: {row['priority_reason']}")

            # Recommendations
            if recommendations:
                lines.append("\n\n📝 COMPLETE LIST OF RECOMMENDATIONS")
                lines.append("-" * 80)

                for priority in ['Critical', 'High', 'Medium']:
                    priority_recs = [r for r in recommendations if r.get('Priority') == priority]

                    if priority_recs:
                        lines.append(f"\n{priority.upper()} PRIORITY:")
                        lines.append("")

                        for rec in priority_recs:
                            lines.append(f"• {rec['Title']}")
                            lines.append(f"  → {rec['Description']}")
                            lines.append(f"  → Timeline: {rec.get('Implementation_Timeframe', 'Unknown')}")
                            lines.append(f"  → Estimated Cost: {rec.get('Estimated_Cost', 'Unknown')}")
                            lines.append(f"  → Expected Impact: {rec.get('Expected_Impact', 'Unknown')}")
                            lines.append("")

            # How to get involved
            lines.append("\n\n✊ HOW YOU CAN HELP MAKE THIS HAPPEN")
            lines.append("-" * 80)
            lines.append("""
1. SHARE THIS INFORMATION
   • Talk to your neighbors about healthcare access
   • Share at community meetings
   • Post on social media using #LAHealthcareAccess

2. CONTACT YOUR REPRESENTATIVES
   • LA County Board of Supervisors
   • Your State Assembly Member
   • Your State Senator
   • Tell them: "I support expanding healthcare access in LA County"

3. SUPPORT LOCAL HEALTH CENTERS
   • Community health centers provide care regardless of ability to pay
   • They often need volunteers and donations
   • Find your local center: www.nachc.org

4. ATTEND PUBLIC MEETINGS
   • LA County Department of Health Services holds public meetings
   • Voice your support for healthcare expansion
   • Bring data from this report!

5. CONNECT WITH ADVOCACY ORGANIZATIONS
   • Join groups working on healthcare access
   • Participate in community health coalitions
   • Help organize around specific recommendations
""")

            # Resources
            lines.append("\n\n📚 RESOURCES FOR MORE INFORMATION")
            lines.append("-" * 80)
            lines.append("""
• LA County Department of Health Services: dhs.lacounty.gov
• Community Clinic Association of LA County: ccalac.org
• California Association of Public Hospitals: caph.org
• Find a Community Health Center: findahealthcenter.hrsa.gov
• Emergency Medical Services: Call 911 (always free)
• Nurse Advice Line: 1-800-339-6993 (24/7, free)
""")

            # Conclusion
            lines.append("\n\n🌟 BOTTOM LINE")
            lines.append("-" * 80)
            lines.append(f"""
CURRENT SITUATION:
• {len(extreme_deserts):,} neighborhoods have CRITICAL access problems (>10km from care)
• {desert_pop:,.0f} residents live more than 5km from healthcare

SOLUTIONS AVAILABLE:
• {len(recommendations)} specific recommendations identified
• {len([r for r in recommendations if r.get('Priority') == 'Critical'])} CRITICAL priorities that need immediate attention
• Quick wins available: Mobile clinics and transportation can start NOW

YOUR VOICE MATTERS:
Healthcare is a community issue. When you speak up, elected officials listen.
Share this report, contact your representatives, and help make healthcare
accessible for everyone in LA County.

Together, we can close the healthcare access gap.
""")

            lines.append("\n" + "=" * 80)
            lines.append(f"Report generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}")
            lines.append("Data source: LA County census tracts, California DHHS facility data")
            lines.append("=" * 80)

            # Save report
            output_path = self.output_dir / output_file
            with open(output_path, 'w') as f:
                f.write('\n'.join(lines))

            logger.info(f"Community summary saved to {output_path}")
            return True

        except Exception as e:
            logger.error(f"Error generating community summary: {e}")
            import traceback
            traceback.print_exc()
            return False


def main():
    """Generate community reports."""

    # Load data
    census_file = Path('outputs/reports/census_with_access_metrics.csv')
    locations_file = Path('outputs/policy_recommendations/recommended_facility_locations.csv')
    recommendations_file = Path('outputs/policy_recommendations/recommendations.csv')

    if not census_file.exists():
        logger.error(f"Census data not found: {census_file}")
        return 1

    census_data = pd.read_csv(census_file)

    # Load other data if available
    locations_df = pd.DataFrame()
    if locations_file.exists():
        locations_df = pd.read_csv(locations_file)

    recommendations = []
    if recommendations_file.exists():
        recommendations = pd.read_csv(recommendations_file).to_dict('records')

    # Generate report
    generator = CommunityReportGenerator()
    generator.generate_community_summary(recommendations, census_data, locations_df)

    logger.info("\n" + "="*60)
    logger.info("COMMUNITY REPORT GENERATED")
    logger.info("="*60)

    return 0


if __name__ == "__main__":
    exit(main())
