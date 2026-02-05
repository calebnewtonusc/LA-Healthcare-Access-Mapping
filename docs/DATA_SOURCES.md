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
- **Datasets**:
  - Licensed healthcare facilities
  - Clinic locations
  - Hospital listings
- **Format**: CSV, JSON
- **Update Frequency**: Monthly
- **API**: Yes
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

### 4. LA County GIS Data Portal
- **URL**: https://gis.lacounty.gov/
- **Datasets**:
  - Neighborhood boundaries
  - Council districts
  - Service planning areas
- **Format**: Shapefile, GeoJSON
- **CRS**: Various (check and standardize to EPSG:4326)
- **License**: Open Data

### 5. US Census Bureau TIGER/Line Shapefiles
- **URL**: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html
- **Datasets**:
  - Census tracts
  - Block groups
  - ZIP Code Tabulation Areas (ZCTAs)
  - County boundaries
- **Format**: Shapefile
- **Update Frequency**: Annually
- **License**: Public domain

### 6. Los Angeles Times Neighborhood Boundaries
- **URL**: https://github.com/datadesk/la-county-neighborhoods-v7
- **Dataset**: LA County neighborhood polygons
- **Format**: GeoJSON
- **License**: MIT

## Population & Demographic Data

### 7. US Census Bureau API
- **URL**: https://www.census.gov/data/developers/data-sets.html
- **Datasets**:
  - Decennial Census
  - American Community Survey (ACS) 5-year estimates
- **Variables**:
  - Total population (B01003_001E)
  - Median household income (B19013_001E)
  - Age distribution (B01001)
  - Race/ethnicity (B02001, B03003)
- **Format**: JSON
- **API Key Required**: Yes (free)
- **Request**: https://api.census.gov/data/key_signup.html
- **License**: Public domain

### 8. American Community Survey (ACS)
- **URL**: https://www.census.gov/programs-surveys/acs/data.html
- **Datasets**:
  - Health insurance coverage (S2701)
  - Poverty status (S1701)
  - Vehicle availability (B08201)
  - Commute characteristics (S0801)
- **Format**: CSV, JSON via API
- **Time Period**: 5-year estimates (most reliable for small areas)
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
