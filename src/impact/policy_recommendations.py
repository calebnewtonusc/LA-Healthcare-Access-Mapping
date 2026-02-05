"""
Generate actionable policy recommendations based on healthcare access analysis.

This module transforms data insights into concrete recommendations for
policymakers, healthcare administrators, and community advocates.
"""

import pandas as pd
import numpy as np
import logging
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@dataclass
class PolicyRecommendation:
    """Structured policy recommendation."""
    priority: str  # 'Critical', 'High', 'Medium', 'Low'
    category: str  # 'Infrastructure', 'Service Expansion', 'Transportation', 'Equity'
    title: str
    description: str
    affected_population: int
    affected_tracts: List[str]
    estimated_cost: str  # 'Low', 'Medium', 'High', 'Very High'
    implementation_timeframe: str  # 'Immediate', 'Short-term', 'Medium-term', 'Long-term'
    expected_impact: str
    actionable_steps: List[str]
    metrics_to_track: List[str]


class PolicyRecommendationEngine:
    """Generate evidence-based policy recommendations."""

    def __init__(self, census_data_file: Path, access_metrics_file: Path):
        """
        Initialize recommendation engine.

        Args:
            census_data_file: Path to census data with demographics
            access_metrics_file: Path to calculated access metrics
        """
        self.census_data_file = Path(census_data_file)
        self.access_metrics_file = Path(access_metrics_file)
        self.census_data = None
        self.access_metrics = None
        self.recommendations = []

    def load_data(self) -> bool:
        """Load necessary data files."""
        try:
            logger.info("Loading data for policy analysis...")

            # Check if census_data_file and access_metrics_file are the same (combined file)
            if self.census_data_file == self.access_metrics_file:
                # Load combined file
                if not self.census_data_file.exists():
                    logger.error(f"Data file not found: {self.census_data_file}")
                    return False

                combined_data = pd.read_csv(self.census_data_file)

                # Split into census and access metrics
                access_cols = ['GEOID', 'nearest_facility_km', 'access_score']
                if 'nearest_facility_index' in combined_data.columns:
                    access_cols.append('nearest_facility_index')
                if 'avg_3_nearest_km' in combined_data.columns:
                    access_cols.append('avg_3_nearest_km')
                if 'distance_score' in combined_data.columns:
                    access_cols.append('distance_score')

                self.census_data = combined_data
                self.access_metrics = combined_data[access_cols]

                logger.info(f"Loaded {len(self.census_data)} records from combined file")
            else:
                # Load separate files
                if not self.census_data_file.exists():
                    logger.error(f"Census data not found: {self.census_data_file}")
                    return False

                if not self.access_metrics_file.exists():
                    logger.error(f"Access metrics not found: {self.access_metrics_file}")
                    return False

                self.census_data = pd.read_csv(self.census_data_file)
                self.access_metrics = pd.read_csv(self.access_metrics_file)

                logger.info(f"Loaded {len(self.census_data)} census tracts")
                logger.info(f"Loaded {len(self.access_metrics)} access metric records")

            return True

        except Exception as e:
            logger.error(f"Error loading data: {e}")
            return False

    def identify_access_deserts(self, distance_threshold: float = 5.0) -> pd.DataFrame:
        """
        Identify healthcare access deserts.

        Args:
            distance_threshold: Distance in km to define access desert

        Returns:
            DataFrame of access deserts sorted by severity
        """
        logger.info(f"Identifying access deserts (>{distance_threshold}km from facility)...")

        # Check if census_data already has access metrics (combined file)
        if 'nearest_facility_km' in self.census_data.columns:
            merged = self.census_data
        else:
            # Merge datasets
            merged = self.census_data.merge(
                self.access_metrics[['GEOID', 'nearest_facility_km', 'access_score']],
                on='GEOID',
                how='inner'
            )

        # Identify deserts
        deserts = merged[merged['nearest_facility_km'] > distance_threshold].copy()

        # Calculate severity score (distance * population)
        deserts['severity_score'] = (
            deserts['nearest_facility_km'] * deserts['total_population']
        )

        deserts = deserts.sort_values('severity_score', ascending=False)

        logger.info(f"Identified {len(deserts)} access deserts affecting {deserts['total_population'].sum():,.0f} people")

        return deserts

    def identify_vulnerable_populations(self) -> pd.DataFrame:
        """
        Identify areas with vulnerable populations and poor access.

        Returns:
            DataFrame of vulnerable areas
        """
        logger.info("Identifying vulnerable populations with poor access...")

        # Check if census_data already has access metrics (combined file)
        if 'access_score' in self.census_data.columns:
            merged = self.census_data
        else:
            merged = self.census_data.merge(
                self.access_metrics[['GEOID', 'nearest_facility_km', 'access_score']],
                on='GEOID',
                how='inner'
            )

        # Define vulnerability criteria
        vulnerable = merged[
            (merged['median_income'] < merged['median_income'].median()) |  # Low income
            (merged.get('poverty_rate', 0) > 15) |  # High poverty
            (merged.get('pct_no_vehicle', 0) > 10)  # Transportation barriers
        ].copy()

        # Filter to poor access
        vulnerable = vulnerable[vulnerable['access_score'] < 50]

        # Calculate priority score
        vulnerable['priority_score'] = (
            (100 - vulnerable['access_score']) *  # Access need
            (vulnerable['total_population'] / 1000) *  # Population impact
            (1 + (vulnerable.get('poverty_rate', 0) / 100))  # Vulnerability multiplier
        )

        vulnerable = vulnerable.sort_values('priority_score', ascending=False)

        logger.info(f"Identified {len(vulnerable)} vulnerable areas affecting {vulnerable['total_population'].sum():,.0f} people")

        return vulnerable

    def recommend_new_facility_locations(self, n_facilities: int = 5) -> List[Dict]:
        """
        Recommend optimal locations for new healthcare facilities.

        Args:
            n_facilities: Number of facilities to recommend

        Returns:
            List of recommended locations with details
        """
        logger.info(f"Analyzing optimal locations for {n_facilities} new facilities...")

        # Identify underserved areas
        deserts = self.identify_access_deserts()
        vulnerable = self.identify_vulnerable_populations()

        # Combine and prioritize
        priority_areas = pd.concat([deserts, vulnerable]).drop_duplicates(subset=['GEOID'])
        priority_areas = priority_areas.sort_values(
            ['severity_score', 'priority_score'],
            ascending=False
        ).head(n_facilities)

        recommendations = []
        for idx, row in priority_areas.iterrows():
            recommendations.append({
                'geoid': row['GEOID'],
                'tract_name': row.get('tract_name', 'Unknown'),
                'latitude': row.get('centroid_lat', 0),
                'longitude': row.get('centroid_lon', 0),
                'population_served': int(row['total_population']),
                'current_distance_km': float(row['nearest_facility_km']),
                'median_income': int(row['median_income']) if pd.notna(row['median_income']) else 0,
                'priority_reason': self._get_priority_reason(row),
                'estimated_impact': int(self._estimate_impact(row))
            })

        logger.info(f"Generated {len(recommendations)} facility placement recommendations")

        return recommendations

    def _get_priority_reason(self, row: pd.Series) -> str:
        """Determine primary reason for priority."""
        reasons = []

        if row['nearest_facility_km'] > 10:
            reasons.append("Extreme distance to care")
        elif row['nearest_facility_km'] > 5:
            reasons.append("Limited access")

        # Compare to dataset median
        median_income = self.census_data['median_income'].median()
        if row['median_income'] < median_income:
            reasons.append("Low-income community")

        if row.get('poverty_rate', 0) > 15:
            reasons.append("High poverty rate")

        if row.get('pct_no_vehicle', 0) > 10:
            reasons.append("Transportation barriers")

        return "; ".join(reasons) if reasons else "Access improvement opportunity"

    def _estimate_impact(self, row: pd.Series) -> int:
        """Estimate number of people who would benefit."""
        # Rough estimate: people within 5km radius
        # Simplified calculation based on population density
        if 'pop_density_per_sqkm' in row:
            area_served = np.pi * (5 ** 2)  # 5km radius in sq km
            estimated = row['pop_density_per_sqkm'] * area_served
            return int(estimated)
        return int(row['total_population'] * 2)  # Rough multiplier

    def generate_all_recommendations(self) -> List[PolicyRecommendation]:
        """Generate comprehensive policy recommendations."""
        logger.info("Generating comprehensive policy recommendations...")

        recommendations = []

        # 1. Critical Infrastructure Gaps
        deserts = self.identify_access_deserts(distance_threshold=10.0)
        if len(deserts) > 0:
            recommendations.append(PolicyRecommendation(
                priority='Critical',
                category='Infrastructure',
                title='Build Healthcare Facilities in Extreme Access Deserts',
                description=f"Identified {len(deserts)} areas where residents are more than 10km from the nearest healthcare facility, affecting {deserts['total_population'].sum():,.0f} people.",
                affected_population=int(deserts['total_population'].sum()),
                affected_tracts=deserts['GEOID'].head(10).tolist(),
                estimated_cost='Very High',
                implementation_timeframe='Medium-term',
                expected_impact='Reduce average travel distance by 40-60% for affected populations',
                actionable_steps=[
                    'Conduct detailed land use and zoning analysis',
                    'Engage with community stakeholders',
                    'Secure funding through state/federal grants',
                    'Partner with healthcare systems for facility operation',
                    'Prioritize urgent care and primary care services'
                ],
                metrics_to_track=[
                    'Average distance to nearest facility',
                    'Emergency room visits from affected areas',
                    'Preventive care utilization rates'
                ]
            ))

        # 2. Mobile Clinic Programs
        vulnerable = self.identify_vulnerable_populations()
        if len(vulnerable) > 0:
            recommendations.append(PolicyRecommendation(
                priority='High',
                category='Service Expansion',
                title='Deploy Mobile Health Clinics to Underserved Communities',
                description=f"Implement mobile clinic program targeting {len(vulnerable)} vulnerable areas with limited transportation and poor access.",
                affected_population=int(vulnerable['total_population'].sum()),
                affected_tracts=vulnerable['GEOID'].head(15).tolist(),
                estimated_cost='Medium',
                implementation_timeframe='Short-term',
                expected_impact='Immediate access improvement for vulnerable populations without requiring new infrastructure',
                actionable_steps=[
                    'Establish rotating schedule for mobile clinics',
                    'Partner with local community centers and schools',
                    'Provide basic primary care, vaccinations, and screenings',
                    'Coordinate with existing healthcare providers',
                    'Offer translation services for diverse communities'
                ],
                metrics_to_track=[
                    'Number of patients served',
                    'Services provided per visit',
                    'Patient satisfaction scores',
                    'Reduction in emergency visits'
                ]
            ))

        # 3. Transportation Solutions
        no_vehicle_areas = self.census_data[
            self.census_data.get('pct_no_vehicle', 0) > 10
        ]
        if len(no_vehicle_areas) > 0:
            recommendations.append(PolicyRecommendation(
                priority='High',
                category='Transportation',
                title='Expand Healthcare Transportation Services',
                description=f"Over 10% of households in {len(no_vehicle_areas)} census tracts lack vehicle access, creating significant barriers to healthcare.",
                affected_population=int(no_vehicle_areas['total_population'].sum()),
                affected_tracts=no_vehicle_areas['GEOID'].head(10).tolist(),
                estimated_cost='Low',
                implementation_timeframe='Immediate',
                expected_impact='Reduce transportation barriers for 50,000+ residents',
                actionable_steps=[
                    'Expand medical transport voucher programs',
                    'Partner with ride-sharing services for subsidized healthcare trips',
                    'Add bus routes connecting to major medical centers',
                    'Implement volunteer driver programs',
                    'Provide real-time transportation coordination'
                ],
                metrics_to_track=[
                    'Number of subsidized trips provided',
                    'Missed appointment rates',
                    'Patient satisfaction with transportation',
                    'Cost per trip'
                ]
            ))

        # 4. Telehealth Expansion
        low_access = self.access_metrics[self.access_metrics['access_score'] < 40]
        if len(low_access) > 0:
            recommendations.append(PolicyRecommendation(
                priority='Medium',
                category='Service Expansion',
                title='Expand Telehealth Services in Low-Access Areas',
                description=f"Leverage telehealth to improve access for {len(low_access)} areas with poor physical access scores.",
                affected_population=int(self.census_data[
                    self.census_data['GEOID'].isin(low_access['GEOID'])
                ]['total_population'].sum()),
                affected_tracts=low_access['GEOID'].head(20).tolist(),
                estimated_cost='Low',
                implementation_timeframe='Short-term',
                expected_impact='Provide immediate access to primary care and specialists',
                actionable_steps=[
                    'Provide subsidized internet/devices for low-income families',
                    'Set up telehealth kiosks at libraries and community centers',
                    'Train healthcare providers on telehealth best practices',
                    'Ensure language support and accessibility',
                    'Coordinate with existing providers for hybrid care models'
                ],
                metrics_to_track=[
                    'Telehealth appointment volume',
                    'Patient outcomes comparison',
                    'Patient satisfaction',
                    'Cost savings vs. in-person care'
                ]
            ))

        # 5. Equity-Focused Investment
        # Check if census_data already has access metrics (combined file)
        if 'access_score' in self.census_data.columns:
            low_income_poor_access = self.census_data
        else:
            low_income_poor_access = self.census_data.merge(
                self.access_metrics,
                on='GEOID'
            )

        low_income_poor_access = low_income_poor_access[
            (low_income_poor_access['median_income'] <
             low_income_poor_access['median_income'].quantile(0.25)) &
            (low_income_poor_access['access_score'] < 50)
        ]

        if len(low_income_poor_access) > 0:
            recommendations.append(PolicyRecommendation(
                priority='Critical',
                category='Equity',
                title='Prioritize Healthcare Investments in Low-Income Areas',
                description=f"Identified {len(low_income_poor_access)} low-income census tracts with poor healthcare access requiring priority intervention.",
                affected_population=int(low_income_poor_access['total_population'].sum()),
                affected_tracts=low_income_poor_access['GEOID'].head(15).tolist(),
                estimated_cost='High',
                implementation_timeframe='Medium-term',
                expected_impact='Reduce healthcare disparities and improve health equity',
                actionable_steps=[
                    'Allocate additional funding to safety-net providers',
                    'Expand Medicaid/Medicare coverage and enrollment',
                    'Provide free or subsidized preventive care',
                    'Establish community health worker programs',
                    'Partner with FQHCs for expanded services'
                ],
                metrics_to_track=[
                    'Health outcome disparities',
                    'Insurance coverage rates',
                    'Preventable hospitalization rates',
                    'Life expectancy gaps'
                ]
            ))

        logger.info(f"Generated {len(recommendations)} policy recommendations")
        self.recommendations = recommendations

        return recommendations

    def generate_executive_summary(self, output_file: Path) -> None:
        """
        Generate executive summary for policymakers.

        Args:
            output_file: Path to save summary
        """
        logger.info("Generating executive summary...")

        if not self.recommendations:
            self.generate_all_recommendations()

        summary = []
        summary.append("=" * 80)
        summary.append("HEALTHCARE ACCESS POLICY RECOMMENDATIONS")
        summary.append("Executive Summary for Decision Makers")
        summary.append("=" * 80)
        summary.append("")

        # Key findings
        summary.append("KEY FINDINGS:")
        summary.append("-" * 80)

        total_affected = sum(r.affected_population for r in self.recommendations)
        critical_recs = [r for r in self.recommendations if r.priority == 'Critical']

        summary.append(f"• Total population affected by access gaps: {total_affected:,}")
        summary.append(f"• Critical priorities identified: {len(critical_recs)}")
        summary.append(f"• Total recommendations: {len(self.recommendations)}")
        summary.append("")

        # Recommendations by priority
        for priority in ['Critical', 'High', 'Medium', 'Low']:
            priority_recs = [r for r in self.recommendations if r.priority == priority]

            if priority_recs:
                summary.append(f"{priority.upper()} PRIORITY RECOMMENDATIONS:")
                summary.append("-" * 80)

                for i, rec in enumerate(priority_recs, 1):
                    summary.append(f"\n{i}. {rec.title}")
                    summary.append(f"   Category: {rec.category}")
                    summary.append(f"   Population Impact: {rec.affected_population:,} people")
                    summary.append(f"   Cost Estimate: {rec.estimated_cost}")
                    summary.append(f"   Timeline: {rec.implementation_timeframe}")
                    summary.append(f"   Description: {rec.description}")
                    summary.append(f"   Expected Impact: {rec.expected_impact}")
                    summary.append(f"\n   First Steps:")
                    for step in rec.actionable_steps[:3]:
                        summary.append(f"   → {step}")
                summary.append("")

        # Implementation roadmap
        summary.append("\nIMPLEMENTATION ROADMAP:")
        summary.append("-" * 80)

        for timeframe in ['Immediate', 'Short-term', 'Medium-term', 'Long-term']:
            timeframe_recs = [r for r in self.recommendations if r.implementation_timeframe == timeframe]
            if timeframe_recs:
                summary.append(f"\n{timeframe} ({len(timeframe_recs)} initiatives):")
                for rec in timeframe_recs:
                    summary.append(f"  • {rec.title}")

        summary.append("\n" + "=" * 80)
        summary.append("For detailed analysis, see full technical report")
        summary.append("=" * 80)

        # Save to file
        output_file.parent.mkdir(parents=True, exist_ok=True)
        with open(output_file, 'w') as f:
            f.write('\n'.join(summary))

        logger.info(f"Executive summary saved to {output_file}")

    def export_recommendations_csv(self, output_file: Path) -> None:
        """Export recommendations to CSV for further analysis."""
        if not self.recommendations:
            self.generate_all_recommendations()

        records = []
        for rec in self.recommendations:
            records.append({
                'Priority': rec.priority,
                'Category': rec.category,
                'Title': rec.title,
                'Description': rec.description,
                'Affected_Population': rec.affected_population,
                'Affected_Tracts_Count': len(rec.affected_tracts),
                'Estimated_Cost': rec.estimated_cost,
                'Implementation_Timeframe': rec.implementation_timeframe,
                'Expected_Impact': rec.expected_impact,
                'Actionable_Steps': ' | '.join(rec.actionable_steps),
                'Metrics_to_Track': ' | '.join(rec.metrics_to_track)
            })

        df = pd.DataFrame(records)
        df.to_csv(output_file, index=False)

        logger.info(f"Recommendations exported to {output_file}")


def main():
    """Generate policy recommendations."""

    # File paths - use combined file for both
    combined_file = Path('outputs/reports/census_with_access_metrics.csv')
    census_file = combined_file
    metrics_file = combined_file
    output_dir = Path('outputs/policy_recommendations')

    # Initialize engine
    engine = PolicyRecommendationEngine(census_file, metrics_file)

    # Load data
    if not engine.load_data():
        logger.error("Failed to load data. Exiting.")
        return 1

    # Generate recommendations
    recommendations = engine.generate_all_recommendations()

    # Generate outputs
    output_dir.mkdir(parents=True, exist_ok=True)

    engine.generate_executive_summary(output_dir / 'EXECUTIVE_SUMMARY.txt')
    engine.export_recommendations_csv(output_dir / 'recommendations.csv')

    # Generate facility location recommendations
    locations = engine.recommend_new_facility_locations(n_facilities=10)
    pd.DataFrame(locations).to_csv(
        output_dir / 'recommended_facility_locations.csv',
        index=False
    )

    logger.info(f"\n{'='*60}")
    logger.info("POLICY RECOMMENDATIONS GENERATED")
    logger.info(f"{'='*60}")
    logger.info(f"Total recommendations: {len(recommendations)}")
    logger.info(f"Critical priorities: {len([r for r in recommendations if r.priority == 'Critical'])}")
    logger.info(f"Output directory: {output_dir}")
    logger.info(f"{'='*60}")

    return 0


if __name__ == "__main__":
    exit(main())
