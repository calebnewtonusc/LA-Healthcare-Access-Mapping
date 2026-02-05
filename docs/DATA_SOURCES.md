# Data Sources

This document tracks all data sources used in the LA Healthcare Access Mapping project.

## Healthcare Facility Data

### 1. LA County Department of Public Health
- **URL**: https://data.lacounty.gov/
- **Datasets**:
  - Healthcare facilities
  - Urgent care centers
  - Hospitals and emergency departments
- **Format**: CSV, JSON via API
- **Update Frequency**: Quarterly
- **API**: Yes (Socrata Open Data API)
- **Authentication**: Optional (higher rate limits with key)
- **License**: Open Data

### 2. California Health and Human Services Open Data Portal
- **URL**: https://data.chhs.ca.gov/
- **Primary Dataset**: Licensed and Certified Healthcare Facility Listing
- **Dataset Page**: https://data.chhs.ca.gov/dataset/healthcare-facility-locations
- **Direct CSV Download**: https://data.chhs.ca.gov/dataset/3b5b80e8-6b8d-4715-b3c0-2699af6e72e5/resource/f0ae5731-fef8-417f-839d-54a0ed3a126e/download/health_facility_locations.csv
- **Dataset Size**: 7.63 MB
- **Last Updated**: January 28, 2026
- **Update Frequency**: Monthly
- **Format**: CSV, ZIP (includes data dictionary XLSX)
- **Data Source**: CDPH Electronic Licensing Management System (ELMS)
- **Contact**: CDPHCHCQInformatics@cdph.ca.gov
- **API**: CKAN API (see https://docs.ckan.org/en/2.9/api/)
- **Facility Types**: 30+ types of licensed and certified healthcare facilities
- **Geographic Coverage**: All California, filterable to LA County
- **License**: Open Data

### 3. Google Places API
- **URL**: https://developers.google.com/maps/documentation/places/web-service
- **Use Case**: Supplement facility locations, verify addresses
- **Format**: JSON
- **API Key Required**: Yes (free tier available)
- **Rate Limits**:
  - Autocomplete: 600 requests/minute
  - Details: 600 requests/minute
  - Search: 600 requests/minute
- **Cost**: Free tier, then pay-per-request
- **License**: Commercial use allowed with attribution

## Geographic Boundary Data

### 4. LA County GIS Data Portal (eGIS Hub)
- **URL**: https://egis-lacounty.hub.arcgis.com/
- **Main Data Portal**: https://data.lacounty.gov/
- **Datasets**:
  - **Hospitals and Medical Centers**: https://egis-lacounty.hub.arcgis.com/datasets/hospitals-and-medical-centers
  - **Health Clinics**: https://egis-lacounty.hub.arcgis.com/datasets/lacounty::health-clinics/about
  - **CDPH Healthcare Facilities**: https://egis-lacounty.hub.arcgis.com/maps/lacounty::cdph-healthcare-facilities/about
  - Neighborhood boundaries
  - Council districts
  - Service planning areas
- **Format**: Shapefile, GeoJSON, ArcGIS FeatureServer
- **CRS**: Various (typically WGS 84 / EPSG:4326 or NAD83)
- **Technology**: ArcGIS REST API
- **Contact**: egis@isd.lacounty.gov
- **Terms of Use**: https://egis-lacounty.hub.arcgis.com/pages/terms-of-use
- **License**: Open Data

### 5. US Census Bureau TIGER/Line Shapefiles
- **URL**: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html
- **Main Download Page**: https://www.census.gov/cgi-bin/geo/shapefiles/index.php
- **Documentation**: https://www2.census.gov/geo/pdfs/education/brochures/DownloadingTIGERLineShapefiles.pdf
- **Datasets Available**:
  - Census tracts (for LA County: State 06, County 037)
  - Block groups
  - ZIP Code Tabulation Areas (ZCTAs)
  - County boundaries
  - All roads
  - Topological faces
- **Format**: Shapefile (.shp, .shx, .dbf, .prj)
- **Current Version**: 2023 (most recent available)
- **Update Frequency**: Annually (typically following decennial census)
- **Geographic Encoding**: GEOIDs for linking to demographic data
- **Note**: Shapefiles contain geographic boundaries only - no demographic data included
- **License**: Public domain

### 6. Los Angeles Times Neighborhood Boundaries
- **URL**: https://github.com/datadesk/la-county-neighborhoods-v7
- **Dataset**: LA County neighborhood polygons
- **Format**: GeoJSON
- **License**: MIT

## Population & Demographic Data

### 7. US Census Bureau API
- **Main URL**: https://www.census.gov/data/developers/data-sets.html
- **API Key Signup**: https://api.census.gov/data/key_signup.html (free, instant)
- **API Endpoint Format**: `https://api.census.gov/data/{year}/{dataset}`
- **Example Endpoint**: `https://api.census.gov/data/2022/acs/acs5` (2020-2024 data now available)
- **LA County FIPS Codes**: State: 06, County: 037
- **Example Query**:
  ```
  https://api.census.gov/data/2022/acs/acs5?get=NAME,B01003_001E,B19013_001E&for=tract:*&in=state:06+county:037&key=YOUR_API_KEY
  ```
- **Datasets**:
  - Decennial Census (2020): `/data/2020/dec/pl`
  - ACS 5-year estimates (most reliable for small areas): `/data/{year}/acs/acs5`
  - ACS 1-year estimates (recent data, larger areas only): `/data/{year}/acs/acs1`
- **Key Variables for Project**:
  - Total population: `B01003_001E`
  - Median household income: `B19013_001E`
  - Median age: `B01002_001E`
  - Age distribution: `B01001` (series)
  - Race/ethnicity: `B02001`, `B03003`
  - Total housing units: `B25001_001E`
  - Vehicle availability: `B08201_001E` (total), `B08201_002E` (no vehicle)
  - Health insurance coverage: `B27001` (series)
  - Land area: `AREALAND` (in square meters)
- **Geographic Levels**: Nation, states, counties, census tracts, block groups, ZCTAs
- **Format**: JSON
- **Topics Covered**: 40+ topics including education, employment, income, housing, transportation
- **Variables Available**: 2,400+ variables
- **API Key Required**: Yes (free, no restrictions)
- **License**: Public domain

### 8. American Community Survey (ACS) - Detailed Tables
- **Main Page**: https://www.census.gov/programs-surveys/acs/data.html
- **API Documentation**: https://www.census.gov/data/developers/data-sets/acs-5year.html
- **Data via API**: https://www.census.gov/programs-surveys/acs/data/data-via-api.html
- **Latest Available**: 2020-2024 5-year estimates (released early 2026)
- **Products**:
  - **Detailed Tables**: Most detailed estimates, available to block group level
  - **Data Profiles**: Broad social, economic, housing, demographic info, available to census tract level
  - **Subject Tables**: Focused on specific topics
- **Key Tables for Project**:
  - Poverty status: `S1701_C01_001E` (total pop), `S1701_C02_001E` (below poverty), `S1701_C03_001E` (percent)
  - Health insurance: `S2701` (subject table) or `B27001` (detailed table)
  - Vehicle availability: `B08201` (detailed counts by household)
  - Commute characteristics: `S0801` (subject table)
- **API Endpoint**: `/data/{year}/acs/acs5` (detailed) or `/data/{year}/acs/acs5/subject` (subject tables)
- **Format**: JSON via API, CSV download option
- **Time Period**: 5-year estimates (most reliable for census tracts)
- **Geographic Granularity**: Down to block group level for detailed tables
- **License**: Public domain

### 9. California Department of Public Health - County Health Rankings
- **URL**: https://www.countyhealthrankings.org/
- **Datasets**:
  - Health outcomes
  - Clinical care access
  - Socioeconomic factors
- **Format**: Excel, CSV
- **Update Frequency**: Annually
- **License**: Open Data

## Supplementary Data (Optional)

### 10. LA Metro Transit Data
- **URL**: https://developer.metro.net/
- **Use Case**: Public transportation access analysis
- **Format**: GTFS, API
- **License**: Open Data

### 11. OpenStreetMap
- **URL**: https://www.openstreetmap.org/
- **Use Case**: Road networks, POI verification
- **Format**: OSM XML, PBF
- **API**: Overpass API
- **License**: ODbL (Open Database License)

### 12. California Hospital Association
- **URL**: https://www.calhospital.org/
- **Use Case**: Hospital capacity and service data
- **Format**: Reports, may require manual extraction
- **License**: Check terms

## API Keys Setup

Create a `.env` file in the project root (DO NOT commit to Git):

```bash
# Google APIs
GOOGLE_PLACES_API_KEY=your_key_here

# Census Bureau
CENSUS_API_KEY=your_key_here

# LA County Data (optional, for higher rate limits)
LACOUNTY_APP_TOKEN=your_token_here
```

### How to Obtain API Keys

#### Google Places API
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable Places API
4. Create credentials (API key)
5. Restrict key to Places API only (recommended)

#### Census Bureau API
1. Go to https://api.census.gov/data/key_signup.html
2. Fill out form with name and email
3. Receive key via email
4. No restrictions needed

#### LA County Open Data
1. Go to https://data.lacounty.gov/profile/app_tokens
2. Sign up for account
3. Create application token
4. Use for higher rate limits (optional)

## Data Collection Schedule

- **Initial collection**: Week 2 of project
- **Updates**: As needed, note collection dates
- **Refresh cycle**: Re-collect before final analysis to ensure currency

## Data Quality Checks

For each data source, verify:
- [ ] Data completeness (missing values)
- [ ] Geographic accuracy (coordinates within LA County)
- [ ] Temporal consistency (dates align)
- [ ] Cross-source validation (compare overlapping data)
- [ ] License compliance (proper attribution)

## Notes

- Always document the date data was collected
- Keep raw data unchanged in `data/raw/`
- Track data versions if sources update
- Note any manual corrections or interventions
- Cite all sources in final report
