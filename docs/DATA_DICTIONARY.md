# Data Dictionary

Complete reference for all datasets, variables, and metrics in the LA Healthcare Access Mapping project.

---

## Table of Contents
1. [Healthcare Facilities Data](#healthcare-facilities-data)
2. [Census Demographic Data](#census-demographic-data)
3. [Geographic Data](#geographic-data)
4. [Calculated Access Metrics](#calculated-access-metrics)
5. [Data Quality Indicators](#data-quality-indicators)

---

## Healthcare Facilities Data

### Source Files
- `data/raw/ca_health_facilities_YYYYMMDD.csv` - All California facilities
- `data/raw/la_health_facilities_YYYYMMDD.csv` - LA County subset
- `data/processed/facilities_cleaned_YYYYMMDD.csv` - Cleaned and validated

### Column Definitions

| Column | Type | Description | Example | Notes |
|--------|------|-------------|---------|-------|
| `lat` | float | Latitude coordinate | 34.0522 | WGS84 (EPSG:4326) |
| `lon` | float | Longitude coordinate | -118.2437 | WGS84 (EPSG:4326) |
| `county` | string | County name | "LOS ANGELES" | Uppercase |
| `facility_id` | string | Unique facility identifier | "50001463" | From source data |
| `name` | string | Facility name | "UCLA Medical Center" | May contain abbreviations |
| `type` | string | Facility type code | "GENERAL ACUTE CARE HOSPITAL" | From CDPH classification |
| `category` | string | Standardized category | "hospital" | Our classification |
| `source` | string | Data source identifier | "ca_dhhs" | For tracking provenance |

### Facility Categories
- `hospital` - General acute care hospitals, medical centers
- `urgent_care` - Urgent care clinics, walk-in facilities
- `clinic` - Community health clinics, outpatient centers
- `other` - Other licensed healthcare facilities

### Data Quality
- **Total Records**: 4,513 validated facilities
- **Coordinate Coverage**: 100% (all have lat/lon)
- **Geographic Bounds**: 33.7°N to 34.8°N, -118.7°W to -117.6°W
- **Duplicates Removed**: 2,561 (based on exact coordinate matching)
- **Out of Bounds Removed**: 33 facilities

---

## Census Demographic Data

### Source Files
- `data/raw/census_basic_demographics_YYYYMMDD.csv`
- `data/raw/census_transportation_YYYYMMDD.csv`
- `data/raw/census_poverty_YYYYMMDD.csv`
- `data/processed/census_tracts_data_YYYYMMDD.csv` - Merged dataset

### Geographic Identifiers

| Column | Type | Description | Example | Format |
|--------|------|-------------|---------|--------|
| `GEOID` | string | Census tract identifier | "06037204920" | 11 digits: SS(2)CCC(3)TTTTTT(6) |
| `STATEFP` | string | State FIPS code | "06" | California = 06 |
| `COUNTYFP` | string | County FIPS code | "037" | LA County = 037 |
| `TRACTCE` | string | Tract code | "204920" | 6-digit tract number |
| `NAME` | string | Tract name | "Census Tract 2049.20" | Human-readable |
| `NAMELSAD` | string | Legal/Statistical Area Description | "Census Tract 2049.20" | Official name |

### Demographic Variables

#### Population (ACS 5-Year Estimates, 2020-2024)

| Column | Type | Description | Census Variable | Unit |
|--------|------|-------------|-----------------|------|
| `total_population` | integer | Total population | B01003_001E | persons |
| `median_age` | float | Median age of residents | B01002_001E | years |

**Notes**:
- Population counts are estimates (not exact)
- Margin of error available in Census detailed tables
- LA County total: 9,936,690 residents

#### Income & Economic

| Column | Type | Description | Census Variable | Unit |
|--------|------|-------------|-----------------|------|
| `median_income` | integer | Median household income | B19013_001E | dollars |
| `poverty_rate` | float | Percent below poverty level | S1701_C03_001E | percent |

**Notes**:
- Income values are inflation-adjusted to survey year
- -666666666 in raw data indicates missing values
- Poverty rate from ACS Subject Tables

#### Transportation

| Column | Type | Description | Census Variable | Unit |
|--------|------|-------------|-----------------|------|
| `total_households` | integer | Total households | B08201_001E | households |
| `households_no_vehicle` | integer | Households with no vehicle | B08201_002E | households |
| `pct_no_vehicle` | float | Percent without vehicle access | Calculated | percent |

**Formula**: `pct_no_vehicle = (households_no_vehicle / total_households) * 100`

---

## Geographic Data

### Source Files
- `data/external/tl_2023_06_tract.*` - TIGER/Line 2023 shapefiles

### Geometric Properties

| Column | Type | Description | Unit | CRS |
|--------|------|-------------|------|-----|
| `centroid_lat` | float | Tract centroid latitude | degrees | EPSG:4326 (WGS84) |
| `centroid_lon` | float | Tract centroid longitude | degrees | EPSG:4326 (WGS84) |
| `area_sqkm` | float | Tract land area | square kilometers | Calculated from EPSG:3310 |
| `ALAND` | integer | Land area (Census) | square meters | From TIGER |
| `AWATER` | integer | Water area | square meters | From TIGER |
| `INTPTLAT` | string | Internal point latitude | degrees | Census-provided |
| `INTPTLON` | string | Internal point longitude | degrees | Census-provided |

### Coordinate Reference Systems Used
- **EPSG:4326** (WGS84) - Geographic coordinates for mapping
- **EPSG:2229** (CA State Plane Zone 5, US Feet) - Used for centroid calculation
- **EPSG:3310** (California Albers) - Used for accurate area calculation

**Why multiple CRS?**
- State Plane for local accuracy in LA County
- Albers for equal-area projection (accurate sq km)
- WGS84 for compatibility with web maps

### Calculated Properties

| Column | Type | Description | Formula | Unit |
|--------|------|-------------|---------|------|
| `pop_density_per_sqkm` | float | Population density | total_population / area_sqkm | persons/km² |

---

## Calculated Access Metrics

### Distance-Based Metrics

| Column | Type | Description | Method | Unit |
|--------|------|-------------|--------|------|
| `nearest_facility_km` | float | Distance to nearest facility | KD-tree nearest neighbor | kilometers |
| `nearest_facility_index` | integer | Index of nearest facility | KD-tree query result | array index |
| `avg_3_nearest_km` | float | Average distance to 3 nearest | KD-tree k=3 query | kilometers |

**Algorithm**: scipy.spatial.cKDTree for efficient spatial queries
**Distance Type**: Straight-line (Euclidean) distance
**Conversion**: 1 degree ≈ 111 km (rough approximation for LA County latitude)

**Note**: These are straight-line distances, not driving distances. Actual travel distance may be 1.3-1.5x greater.

### Access Score Components

| Column | Type | Description | Range | Interpretation |
|--------|------|-------------|-------|----------------|
| `distance_score` | float | Inverse distance score | 0-100 | Higher = closer to facility |
| `access_score` | float | Composite access score | 0-100 | Higher = better access |

**Formula**:
```python
distance_score = (1 - (nearest_facility_km / max_distance)) * 100
access_score = distance_score  # Currently same, can be expanded
```

**Interpretation**:
- **90-100**: Excellent access (within ~1 km)
- **75-89**: Good access (within ~2 km)
- **50-74**: Moderate access (within ~4 km)
- **25-49**: Limited access (within ~8 km)
- **0-24**: Poor access (>8 km)

### Coverage Gap Identification

**Definition**: Census tracts where `nearest_facility_km > 5.0`

**Rationale**:
- 5 km represents approximately 10 minutes driving
- Standard threshold in public health literature
- Balances urban density with rural access challenges

---

## Data Quality Indicators

### Completeness Metrics

| Metric | Value | Source |
|--------|-------|--------|
| Census tracts with population data | 2,498/2,498 (100%) | After merge fix |
| Facilities with coordinates | 4,513/4,513 (100%) | Validated |
| Tracts with centroids | 2,498/2,498 (100%) | Calculated |
| Tracts with access scores | 2,498/2,498 (100%) | Calculated |

### Missing Value Handling

| Variable | Missing Strategy | Rationale |
|----------|------------------|-----------|
| Population | No missing values | Census provides estimates for all tracts |
| Median income | Retained NaN | Some tracts have insufficient sample |
| Poverty rate | Replaced -666666666 with NaN | Census missing value code |
| Vehicle access | No missing values | Census provides for all tracts |

### Validation Checks Applied

✅ **Coordinate Validation**
- All facilities within LA County bounds (33.7-34.8°N, -118.7 to -117.6°W)
- Removed 33 facilities outside bounds

✅ **Duplicate Detection**
- Removed 2,561 facilities with identical coordinates
- Kept first occurrence

✅ **GEOID Validation**
- All GEOIDs are 11-digit strings with leading zeros
- Format: SSCCCTTTTTT (State, County, Tract)
- All match LA County FIPS: 06037

✅ **Population Sanity Checks**
- Total county population: 9,936,690 (reasonable for LA County)
- Mean tract population: 3,978 (typical range 1,200-8,000)
- No zero or negative populations

✅ **Geographic Consistency**
- All centroids within tract boundaries
- Area calculations match Census ALAND values (within 1%)
- Population density ranges 10-50,000 per sq km (expected for urban county)

---

## Data Provenance

### Collection Dates
- **Facilities**: January 28, 2026 (CDPH monthly update)
- **Demographics**: 2020-2024 ACS 5-Year Estimates (released 2026)
- **Geography**: TIGER/Line 2023 shapefiles

### Update Frequency
- **Facilities**: Monthly (CDPH updates)
- **Demographics**: Annually (ACS updates each December)
- **Geography**: Annually (TIGER updates following decennial census)

### Data Freshness
- Facilities data: <1 week old
- Demographic estimates: Mid-point 2022 (2020-2024 average)
- Boundaries: 2023 (based on 2020 Census)

---

## Usage Guidelines

### Appropriate Uses ✅
- Identifying underserved areas for facility placement
- Analyzing relationship between demographics and access
- Policy planning for healthcare resource allocation
- Academic research on healthcare equity
- Baseline for longitudinal monitoring

### Limitations & Caveats ⚠️

1. **Distance Measurement**
   - Straight-line distance, not actual travel distance
   - Does not account for roads, barriers, or public transit
   - Multiply by ~1.3-1.5 for estimated driving distance

2. **Facility Information**
   - Count only, no capacity or hours information
   - All facility types weighted equally
   - No information on services provided or quality

3. **Demographic Estimates**
   - ACS 5-year estimates have margins of error
   - Represent 2020-2024 average, not current
   - Small populations may have large margins of error

4. **Geographic Limitations**
   - Census tract boundaries change over time
   - Centroids are geometric, not population-weighted
   - Edge effects at county boundaries

5. **Temporal Considerations**
   - Facilities data: point-in-time snapshot
   - Demographics: 5-year average
   - Not suitable for real-time decision making

### Citation

When using this data, please cite:

```
LA Healthcare Access Mapping Project (2026)
Data Sources:
- California Department of Public Health, Healthcare Facility Locations (Jan 2026)
- US Census Bureau, American Community Survey 5-Year Estimates (2020-2024)
- US Census Bureau, TIGER/Line Shapefiles (2023)
Analysis conducted: February 2026
https://github.com/YOUR_USERNAME/la-healthcare-access-mapping
```

---

## Additional Resources

### Variable Codebooks
- **ACS Variables**: https://api.census.gov/data/2022/acs/acs5/variables.html
- **TIGER Documentation**: https://www2.census.gov/geo/pdfs/maps-data/data/tiger/tgrshp2023/TGRSHP2023_TechDoc.pdf

### Methodology References
- **Access Metrics**: Hansen, W. G. (1959). How Accessibility Shapes Land Use. Journal of the American Institute of Planners.
- **2SFCA Method**: Luo, W., & Wang, F. (2003). Measures of Spatial Accessibility to Health Care. Professional Geographer.

### Related Projects
- **CDC Social Vulnerability Index**: https://www.atsdr.cdc.gov/placeandhealth/svi/
- **HRSA Shortage Areas**: https://data.hrsa.gov/topics/health-workforce/shortage-areas

---

**Last Updated**: February 4, 2026
**Version**: 1.0
**Maintainer**: LA Healthcare Access Mapping Team
