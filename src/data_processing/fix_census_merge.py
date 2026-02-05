"""
Fix census data merge - properly integrate demographic data with geographic data.

This script fixes the critical issue where census_tracts_data_20260204.csv has
empty demographic columns despite raw data being available.
"""

import pandas as pd
import geopandas as gpd
from pathlib import Path
from datetime import datetime

def fix_census_merge():
    """Fix the census data merge to populate demographic columns."""

    print("="*70)
    print("FIXING CENSUS DATA MERGE")
    print("="*70)

    # Paths
    project_root = Path(__file__).parent.parent.parent
    data_raw = project_root / 'data' / 'raw'
    data_processed = project_root / 'data' / 'processed'
    data_external = project_root / 'data' / 'external'

    # Load raw census data files
    print("\n1. Loading raw census data...")

    census_basic = pd.read_csv(data_raw / 'census_basic_demographics_20260204.csv')
    print(f"   ✓ Basic demographics: {len(census_basic)} tracts")
    print(f"     Columns: {list(census_basic.columns)}")

    census_transport = pd.read_csv(data_raw / 'census_transportation_20260204.csv')
    print(f"   ✓ Transportation: {len(census_transport)} tracts")

    census_poverty = pd.read_csv(data_raw / 'census_poverty_20260204.csv')
    print(f"   ✓ Poverty data: {len(census_poverty)} tracts")

    # Standardize GEOID format in all census datasets
    print("\n2. Standardizing GEOIDs...")

    for df in [census_basic, census_transport, census_poverty]:
        if 'GEOID' in df.columns:
            # GEOID exists but may be integer - convert to string with leading zero
            df['GEOID'] = df['GEOID'].astype(str).str.zfill(11)
        else:
            # Create GEOID from components
            # GEOID format: state (2) + county (3) + tract (6) = 11 digits total
            df['GEOID'] = df['state'].astype(str).str.zfill(2) + \
                          df['county'].astype(str).str.zfill(3) + \
                          df['tract'].astype(str).str.zfill(6)

    print(f"   ✓ GEOIDs standardized to 11-digit strings")
    print(f"   Sample GEOID: {census_basic['GEOID'].iloc[0]}")

    # Load shapefile for geographic data
    print("\n3. Loading TIGER shapefile...")

    shapefile_path = data_external / 'tl_2023_06_tract.shp'
    if shapefile_path.exists():
        gdf = gpd.read_file(shapefile_path)
        print(f"   ✓ Loaded {len(gdf)} California census tracts")

        # Filter to LA County (COUNTYFP = 037)
        la_tracts = gdf[gdf['COUNTYFP'] == '037'].copy()
        print(f"   ✓ Filtered to {len(la_tracts)} LA County tracts")

        # Calculate centroids using proper projected CRS
        print("   Calculating centroids...")

        # Use California State Plane Zone 5 (NAD83) - EPSG:2229 (feet) or EPSG:26945 (meters)
        # This is the proper projection for LA County
        la_tracts_projected = la_tracts.to_crs(epsg=2229)  # CA State Plane Zone 5 (feet)

        # Calculate centroids in projected coordinates (avoids warning)
        centroids_projected = la_tracts_projected.geometry.centroid

        # Convert centroids back to WGS84 for lat/lon
        centroids_wgs84 = centroids_projected.to_crs(epsg=4326)
        la_tracts['centroid_lat'] = centroids_wgs84.y
        la_tracts['centroid_lon'] = centroids_wgs84.x

        # Calculate area in sq km using equal-area projection
        # Use California Albers (EPSG:3310) for accurate area calculation
        la_tracts_albers = la_tracts.to_crs(epsg=3310)  # California Albers
        la_tracts['area_sqkm'] = la_tracts_albers.geometry.area / 1_000_000  # m^2 to km^2

        print(f"   ✓ Centroids and areas calculated (proper projections used)")
    else:
        print(f"   ⚠ Shapefile not found at {shapefile_path}")
        print("   Continuing with census data only...")
        la_tracts = None

    # Merge census datasets
    print("\n4. Merging census datasets...")

    # Start with basic demographics
    census_merged = census_basic.copy()

    # Rename columns for clarity
    census_merged = census_merged.rename(columns={
        'NAME': 'tract_name',
        'B01003_001E': 'total_population',
        'B19013_001E': 'median_income',
        'B01002_001E': 'median_age'
    })

    # Merge transportation data
    if 'B08201_001E' in census_transport.columns:
        transport_cols = ['GEOID', 'B08201_001E', 'B08201_002E']
        census_transport_subset = census_transport[transport_cols].copy()
        census_transport_subset = census_transport_subset.rename(columns={
            'B08201_001E': 'total_households',
            'B08201_002E': 'households_no_vehicle'
        })

        census_merged = census_merged.merge(
            census_transport_subset,
            on='GEOID',
            how='left'
        )
        print(f"   ✓ Merged transportation data")

    # Merge poverty data
    if 'S1701_C03_001E' in census_poverty.columns:
        poverty_cols = ['GEOID', 'S1701_C03_001E']
        census_poverty_subset = census_poverty[poverty_cols].copy()
        census_poverty_subset = census_poverty_subset.rename(columns={
            'S1701_C03_001E': 'poverty_rate'
        })

        # Handle missing values (Census uses -666666666 for null)
        census_poverty_subset['poverty_rate'] = census_poverty_subset['poverty_rate'].replace(
            -666666666, pd.NA
        )

        census_merged = census_merged.merge(
            census_poverty_subset,
            on='GEOID',
            how='left'
        )
        print(f"   ✓ Merged poverty data")

    print(f"\n   Census data merged: {len(census_merged)} tracts")

    # Calculate derived metrics
    print("\n5. Calculating derived metrics...")

    if 'total_households' in census_merged.columns and 'households_no_vehicle' in census_merged.columns:
        census_merged['pct_no_vehicle'] = (
            census_merged['households_no_vehicle'] / census_merged['total_households'] * 100
        )
        print("   ✓ Calculated % households without vehicle")

    # Merge with geographic data if available
    if la_tracts is not None:
        print("\n6. Merging with geographic data...")

        # Ensure GEOID is string in both
        census_merged['GEOID'] = census_merged['GEOID'].astype(str)
        la_tracts['GEOID'] = la_tracts['GEOID'].astype(str)

        # Merge
        final_data = la_tracts.merge(
            census_merged,
            on='GEOID',
            how='left'
        )

        print(f"   ✓ Merged geographic + demographic data: {len(final_data)} tracts")

        # Calculate population density
        if 'total_population' in final_data.columns and 'area_sqkm' in final_data.columns:
            final_data['pop_density_per_sqkm'] = (
                final_data['total_population'] / final_data['area_sqkm']
            )
            print("   ✓ Calculated population density")

        # Convert GeoDataFrame to regular DataFrame for CSV output
        final_data_csv = final_data.drop(columns=['geometry'])
    else:
        final_data_csv = census_merged
        print("\n6. Skipping geographic merge (shapefile not loaded)")

    # Save fixed data
    print("\n7. Saving fixed census data...")

    timestamp = datetime.now().strftime('%Y%m%d')
    output_file = data_processed / f'census_tracts_data_{timestamp}.csv'
    final_data_csv.to_csv(output_file, index=False)

    print(f"   ✓ Saved to: {output_file}")

    # Verify the fix
    print("\n8. Verifying fix...")

    verification = pd.read_csv(output_file)

    critical_columns = ['GEOID', 'total_population', 'median_income', 'median_age']
    for col in critical_columns:
        if col in verification.columns:
            non_null = verification[col].notna().sum()
            print(f"   {col}: {non_null}/{len(verification)} non-null values")
        else:
            print(f"   ⚠ {col}: MISSING")

    # Summary statistics
    if 'total_population' in verification.columns:
        print(f"\n9. Summary Statistics:")
        print(f"   Total LA County population: {verification['total_population'].sum():,.0f}")
        print(f"   Average tract population: {verification['total_population'].mean():,.0f}")
        print(f"   Median household income (median): ${verification['median_income'].median():,.0f}")

        if 'centroid_lat' in verification.columns:
            print(f"   Centroids calculated: {verification['centroid_lat'].notna().sum()} tracts")

        if 'pop_density_per_sqkm' in verification.columns:
            print(f"   Population density calculated: {verification['pop_density_per_sqkm'].notna().sum()} tracts")

    print("\n" + "="*70)
    print("✓ CENSUS DATA MERGE FIXED!")
    print("="*70)

    return output_file


if __name__ == "__main__":
    output_file = fix_census_merge()
    print(f"\nFixed census data saved to:\n{output_file}")
    print("\nNext steps:")
    print("1. Review the output file to verify data quality")
    print("2. Run the analysis notebook: notebooks/FINAL_ANALYSIS_AND_RESULTS.ipynb")
    print("3. Generate all visualizations and outputs")
