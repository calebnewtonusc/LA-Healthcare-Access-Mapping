"""
Cost-benefit analysis for policy recommendations.

Provides detailed financial analysis with realistic cost estimates and ROI calculations.
"""

import pandas as pd
import numpy as np
from pathlib import Path
from typing import Dict, List, Tuple
import logging
from dataclasses import dataclass

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@dataclass
class CostEstimate:
    """Detailed cost estimate for a recommendation."""
    category: str
    one_time_costs: float
    annual_operating_costs: float
    cost_per_person_served: float
    roi_timeframe_years: int
    annual_savings_estimate: float
    break_even_years: float
    benefit_cost_ratio: float


class CostBenefitAnalyzer:
    """Analyze costs and benefits of policy recommendations."""

    def __init__(self):
        """Initialize analyzer with cost constants."""

        # Cost estimates based on industry standards (2026 dollars)
        self.FACILITY_CONSTRUCTION_COST_PER_SQ_FT = 450  # Healthcare facility
        self.TYPICAL_FACILITY_SIZE_SQ_FT = 15000  # Small community health center
        self.FACILITY_LAND_COST = 2_000_000  # Average for LA County
        self.FACILITY_EQUIPMENT_COST = 1_500_000  # Medical equipment
        self.FACILITY_ANNUAL_OPERATING = 3_000_000  # Staffing, utilities, supplies

        self.MOBILE_CLINIC_VEHICLE_COST = 250_000  # Equipped medical van
        self.MOBILE_CLINIC_ANNUAL_OPERATING = 400_000  # Staff, fuel, supplies, maintenance
        self.MOBILE_CLINICS_NEEDED = 5  # For recommended coverage

        self.TRANSPORT_VOUCHER_COST_PER_TRIP = 25  # Average ride cost
        self.TRANSPORT_TRIPS_PER_PERSON_PER_YEAR = 4  # Medical visits
        self.TRANSPORT_SUBSIDY_PERCENTAGE = 0.75  # 75% subsidy

        self.TELEHEALTH_SETUP_PER_KIOSK = 15_000  # Equipment and software
        self.TELEHEALTH_KIOSKS_NEEDED = 20  # Community centers and libraries
        self.TELEHEALTH_ANNUAL_OPERATING = 250_000  # Platform licensing, support

        # Savings estimates
        self.ER_VISIT_COST = 2_000  # Average ER visit cost
        self.PRIMARY_CARE_VISIT_COST = 150  # Average primary care visit
        self.ER_DIVERSION_RATE = 0.15  # % of ER visits that could be primary care
        self.PREVENTABLE_ER_VISITS_PER_1000_WITH_POOR_ACCESS = 250  # Annual

        self.CHRONIC_DISEASE_MANAGEMENT_SAVINGS = 1_500  # Per person per year
        self.IMPROVED_ACCESS_DISEASE_MANAGEMENT_RATE = 0.20  # % improvement

    def estimate_new_facility_costs(self, population_served: int) -> CostEstimate:
        """
        Estimate costs for building a new healthcare facility.

        Args:
            population_served: Number of people who would gain access

        Returns:
            CostEstimate with detailed financial analysis
        """
        # One-time costs
        construction = self.FACILITY_CONSTRUCTION_COST_PER_SQ_FT * self.TYPICAL_FACILITY_SIZE_SQ_FT
        one_time = construction + self.FACILITY_LAND_COST + self.FACILITY_EQUIPMENT_COST

        # Annual operating
        annual_operating = self.FACILITY_ANNUAL_OPERATING

        # Savings from improved access
        # 1. ER diversion savings
        preventable_er_visits = (population_served / 1000) * self.PREVENTABLE_ER_VISITS_PER_1000_WITH_POOR_ACCESS
        er_savings = preventable_er_visits * (self.ER_VISIT_COST - self.PRIMARY_CARE_VISIT_COST)

        # 2. Chronic disease management savings
        chronic_disease_patients = population_served * 0.40  # 40% have chronic conditions
        chronic_savings = chronic_disease_patients * self.IMPROVED_ACCESS_DISEASE_MANAGEMENT_RATE * \
                         self.CHRONIC_DISEASE_MANAGEMENT_SAVINGS

        annual_savings = er_savings + chronic_savings

        # ROI calculation
        net_annual_benefit = annual_savings - annual_operating
        if net_annual_benefit > 0:
            break_even = one_time / net_annual_benefit
            benefit_cost_ratio = (annual_savings * 10) / (one_time + annual_operating * 10)
        else:
            break_even = 999  # Never breaks even
            benefit_cost_ratio = annual_savings / annual_operating if annual_operating > 0 else 0

        cost_per_person = (one_time + annual_operating * 10) / population_served if population_served > 0 else 0  # 10-year horizon

        return CostEstimate(
            category='New Healthcare Facility',
            one_time_costs=one_time,
            annual_operating_costs=annual_operating,
            cost_per_person_served=cost_per_person,
            roi_timeframe_years=10,
            annual_savings_estimate=annual_savings,
            break_even_years=break_even,
            benefit_cost_ratio=benefit_cost_ratio
        )

    def estimate_mobile_clinic_costs(self, population_served: int) -> CostEstimate:
        """Estimate costs for mobile clinic program."""

        # One-time costs
        one_time = self.MOBILE_CLINIC_VEHICLE_COST * self.MOBILE_CLINICS_NEEDED

        # Annual operating
        annual_operating = self.MOBILE_CLINIC_ANNUAL_OPERATING * self.MOBILE_CLINICS_NEEDED

        # Savings (similar to facility but lower scale)
        preventable_er_visits = (population_served / 1000) * 150  # Lower than facility
        er_savings = preventable_er_visits * (self.ER_VISIT_COST - self.PRIMARY_CARE_VISIT_COST)

        chronic_disease_patients = population_served * 0.40
        chronic_savings = chronic_disease_patients * 0.10 * 1000  # Lower impact than facility

        annual_savings = er_savings + chronic_savings

        # ROI
        net_annual_benefit = annual_savings - annual_operating
        if net_annual_benefit > 0:
            break_even = one_time / net_annual_benefit
            benefit_cost_ratio = (annual_savings * 5) / (one_time + annual_operating * 5)
        else:
            break_even = 999
            benefit_cost_ratio = annual_savings / annual_operating if annual_operating > 0 else 0

        cost_per_person = (one_time + annual_operating * 5) / population_served if population_served > 0 else 0

        return CostEstimate(
            category='Mobile Health Clinics',
            one_time_costs=one_time,
            annual_operating_costs=annual_operating,
            cost_per_person_served=cost_per_person,
            roi_timeframe_years=5,
            annual_savings_estimate=annual_savings,
            break_even_years=break_even,
            benefit_cost_ratio=benefit_cost_ratio
        )

    def estimate_transportation_costs(self, population_served: int) -> CostEstimate:
        """Estimate costs for transportation assistance program."""

        # Assume 10% of population uses service
        active_users = population_served * 0.10

        # One-time costs (minimal - mainly setup/admin)
        one_time = 50_000  # Program setup

        # Annual operating
        annual_trips = active_users * self.TRANSPORT_TRIPS_PER_PERSON_PER_YEAR
        annual_operating = annual_trips * self.TRANSPORT_VOUCHER_COST_PER_TRIP * self.TRANSPORT_SUBSIDY_PERCENTAGE

        # Savings from improved access to care
        preventable_er_visits = (active_users / 1000) * 200
        er_savings = preventable_er_visits * (self.ER_VISIT_COST - self.PRIMARY_CARE_VISIT_COST)

        # Additional savings from keeping appointments
        kept_appointments_value = active_users * self.TRANSPORT_TRIPS_PER_PERSON_PER_YEAR * 100

        annual_savings = er_savings + kept_appointments_value

        # ROI
        net_annual_benefit = annual_savings - annual_operating
        if net_annual_benefit > 0:
            break_even = one_time / net_annual_benefit
            benefit_cost_ratio = (annual_savings * 5) / (one_time + annual_operating * 5)
        else:
            break_even = 999
            benefit_cost_ratio = annual_savings / annual_operating if annual_operating > 0 else 0

        cost_per_person = (one_time + annual_operating * 5) / active_users if active_users > 0 else 0

        return CostEstimate(
            category='Transportation Assistance',
            one_time_costs=one_time,
            annual_operating_costs=annual_operating,
            cost_per_person_served=cost_per_person,
            roi_timeframe_years=5,
            annual_savings_estimate=annual_savings,
            break_even_years=break_even,
            benefit_cost_ratio=benefit_cost_ratio
        )

    def estimate_telehealth_costs(self, population_served: int) -> CostEstimate:
        """Estimate costs for telehealth expansion."""

        # One-time costs
        one_time = self.TELEHEALTH_SETUP_PER_KIOSK * self.TELEHEALTH_KIOSKS_NEEDED

        # Annual operating
        annual_operating = self.TELEHEALTH_ANNUAL_OPERATING

        # Savings
        # Assume 20% of population uses telehealth
        users = population_served * 0.20

        # Average 2 telehealth visits per person per year
        telehealth_visits = users * 2

        # Savings vs in-person visits (reduced travel, time off work)
        savings_per_visit = 75  # Patient time + travel savings
        patient_savings = telehealth_visits * savings_per_visit

        # Provider efficiency gains
        provider_savings = telehealth_visits * 25  # More efficient scheduling

        annual_savings = patient_savings + provider_savings

        # ROI
        net_annual_benefit = annual_savings - annual_operating
        if net_annual_benefit > 0:
            break_even = one_time / net_annual_benefit
            benefit_cost_ratio = (annual_savings * 5) / (one_time + annual_operating * 5)
        else:
            break_even = 999
            benefit_cost_ratio = annual_savings / annual_operating if annual_operating > 0 else 0

        cost_per_person = (one_time + annual_operating * 5) / users if users > 0 else 0

        return CostEstimate(
            category='Telehealth Expansion',
            one_time_costs=one_time,
            annual_operating_costs=annual_operating,
            cost_per_person_served=cost_per_person,
            roi_timeframe_years=5,
            annual_savings_estimate=annual_savings,
            break_even_years=break_even,
            benefit_cost_ratio=benefit_cost_ratio
        )

    def generate_cost_benefit_report(
        self,
        recommendations: List[Dict],
        locations_df: pd.DataFrame,
        output_file: Path
    ) -> bool:
        """
        Generate comprehensive cost-benefit analysis report.

        Args:
            recommendations: List of policy recommendations
            locations_df: Recommended facility locations
            output_file: Output file path

        Returns:
            True if successful
        """
        try:
            logger.info("Generating cost-benefit analysis...")

            lines = []
            lines.append("=" * 80)
            lines.append("COST-BENEFIT ANALYSIS")
            lines.append("Healthcare Access Policy Recommendations")
            lines.append("=" * 80)
            lines.append("")

            # Analyze each recommendation type
            analyses = {}

            # 1. New facilities
            if not locations_df.empty:
                total_served = locations_df['estimated_impact'].sum()
                # Calculate costs for ONE average facility, not all combined
                avg_served_per_facility = total_served / len(locations_df) if len(locations_df) > 0 else 0
                facility_analysis = self.estimate_new_facility_costs(int(avg_served_per_facility))
                analyses['New Healthcare Facilities'] = facility_analysis

                lines.append("\n1. NEW HEALTHCARE FACILITIES")
                lines.append("-" * 80)
                lines.append(f"Recommended Locations: {len(locations_df)}")
                lines.append(f"Total Population to be Served: {total_served:,.0f} people")
                lines.append("")
                lines.append(f"ONE-TIME COSTS (per facility):")
                lines.append(f"  • Land Acquisition: ${self.FACILITY_LAND_COST:,.0f}")
                lines.append(f"  • Construction ({self.TYPICAL_FACILITY_SIZE_SQ_FT:,} sq ft @ ${self.FACILITY_CONSTRUCTION_COST_PER_SQ_FT}/sq ft): ${self.FACILITY_CONSTRUCTION_COST_PER_SQ_FT * self.TYPICAL_FACILITY_SIZE_SQ_FT:,.0f}")
                lines.append(f"  • Medical Equipment: ${self.FACILITY_EQUIPMENT_COST:,.0f}")
                lines.append(f"  TOTAL ONE-TIME (per facility): ${facility_analysis.one_time_costs:,.0f}")
                lines.append(f"  TOTAL FOR {len(locations_df)} FACILITIES: ${facility_analysis.one_time_costs * len(locations_df):,.0f}")
                lines.append("")
                lines.append(f"ANNUAL OPERATING COSTS (per facility): ${facility_analysis.annual_operating_costs:,.0f}")
                lines.append(f"  • Staffing (doctors, nurses, admin): $2,000,000")
                lines.append(f"  • Supplies and maintenance: $600,000")
                lines.append(f"  • Utilities and overhead: $400,000")
                lines.append(f"  TOTAL ANNUAL FOR {len(locations_df)} FACILITIES: ${facility_analysis.annual_operating_costs * len(locations_df):,.0f}")
                lines.append("")
                lines.append(f"ESTIMATED ANNUAL SAVINGS (per facility):")
                lines.append(f"  • ER Diversion Savings: ${facility_analysis.annual_savings_estimate * 0.60:,.0f}")
                lines.append(f"  • Chronic Disease Management: ${facility_analysis.annual_savings_estimate * 0.40:,.0f}")
                lines.append(f"  TOTAL ANNUAL SAVINGS: ${facility_analysis.annual_savings_estimate:,.0f}")
                lines.append(f"  TOTAL FOR {len(locations_df)} FACILITIES: ${facility_analysis.annual_savings_estimate * len(locations_df):,.0f}/year")
                lines.append("")
                lines.append(f"RETURN ON INVESTMENT:")
                lines.append(f"  • Break-even timeframe: {facility_analysis.break_even_years:.1f} years")
                lines.append(f"  • 10-year benefit-cost ratio: {facility_analysis.benefit_cost_ratio:.2f}:1")
                lines.append(f"  • Cost per person served (10-year): ${facility_analysis.cost_per_person_served:,.0f}")

            # 2. Mobile clinics
            mobile_pop = sum(r.get('Affected_Population', 0) for r in recommendations if 'Mobile' in r.get('Title', ''))
            if mobile_pop > 0:
                mobile_analysis = self.estimate_mobile_clinic_costs(mobile_pop)
                analyses['Mobile Clinics'] = mobile_analysis

                lines.append("\n\n2. MOBILE HEALTH CLINICS")
                lines.append("-" * 80)
                lines.append(f"Population to be Served: {mobile_pop:,.0f} people")
                lines.append(f"Number of Mobile Clinics: {self.MOBILE_CLINICS_NEEDED}")
                lines.append("")
                lines.append(f"ONE-TIME COSTS:")
                lines.append(f"  • {self.MOBILE_CLINICS_NEEDED} equipped medical vans @ ${self.MOBILE_CLINIC_VEHICLE_COST:,.0f}: ${mobile_analysis.one_time_costs:,.0f}")
                lines.append("")
                lines.append(f"ANNUAL OPERATING COSTS: ${mobile_analysis.annual_operating_costs:,.0f}")
                lines.append(f"  • Staffing (per clinic): $250,000")
                lines.append(f"  • Fuel and maintenance: $50,000")
                lines.append(f"  • Medical supplies: $100,000")
                lines.append("")
                lines.append(f"ESTIMATED ANNUAL SAVINGS: ${mobile_analysis.annual_savings_estimate:,.0f}")
                lines.append("")
                lines.append(f"RETURN ON INVESTMENT:")
                lines.append(f"  • Break-even timeframe: {mobile_analysis.break_even_years:.1f} years")
                lines.append(f"  • 5-year benefit-cost ratio: {mobile_analysis.benefit_cost_ratio:.2f}:1")
                lines.append(f"  • Cost per person served (5-year): ${mobile_analysis.cost_per_person_served:,.0f}")

            # 3. Transportation
            transport_pop = sum(r.get('Affected_Population', 0) for r in recommendations if 'Transportation' in r.get('Title', ''))
            if transport_pop > 0:
                transport_analysis = self.estimate_transportation_costs(transport_pop)
                analyses['Transportation'] = transport_analysis

                lines.append("\n\n3. HEALTHCARE TRANSPORTATION SERVICES")
                lines.append("-" * 80)
                lines.append(f"Population Eligible: {transport_pop:,.0f} people")
                lines.append(f"Expected Active Users (10%): {transport_pop * 0.10:,.0f}")
                lines.append("")
                lines.append(f"ONE-TIME COSTS: ${transport_analysis.one_time_costs:,.0f}")
                lines.append(f"  • Program setup and administration")
                lines.append("")
                lines.append(f"ANNUAL OPERATING COSTS: ${transport_analysis.annual_operating_costs:,.0f}")
                lines.append(f"  • Subsidized trips ({transport_pop * 0.10 * self.TRANSPORT_TRIPS_PER_PERSON_PER_YEAR:,.0f} trips @ ${self.TRANSPORT_VOUCHER_COST_PER_TRIP * self.TRANSPORT_SUBSIDY_PERCENTAGE:.2f} subsidy)")
                lines.append("")
                lines.append(f"ESTIMATED ANNUAL SAVINGS: ${transport_analysis.annual_savings_estimate:,.0f}")
                lines.append(f"  • Kept appointments and ER diversion")
                lines.append("")
                lines.append(f"RETURN ON INVESTMENT:")
                lines.append(f"  • Break-even timeframe: {transport_analysis.break_even_years:.1f} years")
                lines.append(f"  • 5-year benefit-cost ratio: {transport_analysis.benefit_cost_ratio:.2f}:1")
                lines.append(f"  • Cost per active user (5-year): ${transport_analysis.cost_per_person_served:,.0f}")

            # 4. Telehealth
            telehealth_pop = sum(r.get('Affected_Population', 0) for r in recommendations if 'Telehealth' in r.get('Title', ''))
            if telehealth_pop > 0:
                telehealth_analysis = self.estimate_telehealth_costs(telehealth_pop)
                analyses['Telehealth'] = telehealth_analysis

                lines.append("\n\n4. TELEHEALTH EXPANSION")
                lines.append("-" * 80)
                lines.append(f"Population to be Served: {telehealth_pop:,.0f} people")
                lines.append(f"Number of Telehealth Kiosks: {self.TELEHEALTH_KIOSKS_NEEDED}")
                lines.append("")
                lines.append(f"ONE-TIME COSTS: ${telehealth_analysis.one_time_costs:,.0f}")
                lines.append(f"  • {self.TELEHEALTH_KIOSKS_NEEDED} kiosks @ ${self.TELEHEALTH_SETUP_PER_KIOSK:,.0f}")
                lines.append("")
                lines.append(f"ANNUAL OPERATING COSTS: ${telehealth_analysis.annual_operating_costs:,.0f}")
                lines.append(f"  • Platform licensing and technical support")
                lines.append("")
                lines.append(f"ESTIMATED ANNUAL SAVINGS: ${telehealth_analysis.annual_savings_estimate:,.0f}")
                lines.append(f"  • Patient time and travel savings")
                lines.append(f"  • Provider efficiency gains")
                lines.append("")
                lines.append(f"RETURN ON INVESTMENT:")
                lines.append(f"  • Break-even timeframe: {telehealth_analysis.break_even_years:.1f} years")
                lines.append(f"  • 5-year benefit-cost ratio: {telehealth_analysis.benefit_cost_ratio:.2f}:1")
                lines.append(f"  • Cost per user (5-year): ${telehealth_analysis.cost_per_person_served:,.0f}")

            # Summary
            lines.append("\n\n" + "=" * 80)
            lines.append("SUMMARY OF ALL RECOMMENDATIONS")
            lines.append("=" * 80)

            # Calculate totals correctly: multiply facilities by count, add others as-is
            total_one_time = 0
            total_annual = 0
            total_savings = 0

            # New facilities: multiply by number of facilities
            if 'New Healthcare Facilities' in analyses:
                facility = analyses['New Healthcare Facilities']
                total_one_time += facility.one_time_costs * len(locations_df)
                total_annual += facility.annual_operating_costs * len(locations_df)
                total_savings += facility.annual_savings_estimate * len(locations_df)

            # Other programs: add as-is (no multiplication)
            for name, analysis in analyses.items():
                if name != 'New Healthcare Facilities':
                    total_one_time += analysis.one_time_costs
                    total_annual += analysis.annual_operating_costs
                    total_savings += analysis.annual_savings_estimate

            lines.append(f"\nTOTAL INVESTMENT REQUIRED:")
            lines.append(f"  • One-time costs: ${total_one_time:,.0f}")
            lines.append(f"  • Annual operating costs: ${total_annual:,.0f}")
            lines.append(f"  • 10-year total investment: ${total_one_time + total_annual * 10:,.0f}")

            lines.append(f"\nTOTAL ESTIMATED BENEFITS:")
            lines.append(f"  • Annual savings: ${total_savings:,.0f}")
            lines.append(f"  • 10-year total savings: ${total_savings * 10:,.0f}")

            lines.append(f"\nOVERALL ROI:")
            net_10_year = (total_savings * 10) - (total_one_time + total_annual * 10)
            roi_percentage = (net_10_year / (total_one_time + total_annual * 10)) * 100 if (total_one_time + total_annual * 10) > 0 else 0

            lines.append(f"  • 10-year net benefit: ${net_10_year:,.0f}")
            lines.append(f"  • 10-year ROI: {roi_percentage:.1f}%")

            # Priority ranking by cost-effectiveness
            lines.append("\n\nPRIORITY RANKING BY COST-EFFECTIVENESS:")
            lines.append("-" * 80)

            cost_effectiveness = []
            for name, analysis in analyses.items():
                cost_effectiveness.append({
                    'name': name,
                    'ratio': analysis.benefit_cost_ratio,
                    'break_even': analysis.break_even_years
                })

            cost_effectiveness.sort(key=lambda x: x['ratio'], reverse=True)

            for idx, item in enumerate(cost_effectiveness, 1):
                lines.append(f"{idx}. {item['name']}")
                lines.append(f"   → Benefit-cost ratio: {item['ratio']:.2f}:1")
                lines.append(f"   → Break-even: {item['break_even']:.1f} years")

            lines.append("\n" + "=" * 80)
            lines.append("Note: Cost estimates based on 2026 industry standards for LA County.")
            lines.append("Actual costs may vary based on location, scope, and implementation details.")
            lines.append("=" * 80)

            # Save report
            with open(output_file, 'w') as f:
                f.write('\n'.join(lines))

            logger.info(f"Cost-benefit analysis saved to {output_file}")
            return True

        except Exception as e:
            logger.error(f"Error generating cost-benefit analysis: {e}")
            import traceback
            traceback.print_exc()
            return False


def main():
    """Generate cost-benefit analysis."""

    locations_file = Path('outputs/policy_recommendations/recommended_facility_locations.csv')
    recommendations_file = Path('outputs/policy_recommendations/recommendations.csv')
    output_file = Path('outputs/policy_recommendations/COST_BENEFIT_ANALYSIS.txt')

    locations_df = pd.DataFrame()
    if locations_file.exists():
        locations_df = pd.read_csv(locations_file)

    recommendations = []
    if recommendations_file.exists():
        recommendations = pd.read_csv(recommendations_file).to_dict('records')

    analyzer = CostBenefitAnalyzer()
    analyzer.generate_cost_benefit_report(recommendations, locations_df, output_file)

    logger.info("\n" + "="*60)
    logger.info("COST-BENEFIT ANALYSIS COMPLETE")
    logger.info("="*60)

    return 0


if __name__ == "__main__":
    exit(main())
