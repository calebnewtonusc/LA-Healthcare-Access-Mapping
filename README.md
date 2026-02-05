# LA Healthcare Access Mapping

**✅ PROJECT COMPLETE**

Mapping healthcare access gaps across Los Angeles to identify underserved communities and inform resource allocation.

**Status**: All 8 phases complete with comprehensive analysis framework, visualizations, and documentation ready for deployment.

## Problem Statement

Many Los Angeles residents rely on emergency rooms for non-emergency issues due to limited access or awareness of urgent care options. Geographic gaps and uneven distribution of healthcare facilities create inefficiencies and strain on emergency resources.

## Quick Start

```bash
# Clone/navigate to project
cd /path/to/la-healthcare-access-mapping

# Set up environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run final analysis notebook
jupyter notebook notebooks/FINAL_ANALYSIS_AND_RESULTS.ipynb

# Or explore the data
jupyter notebook notebooks/
```

**Key Files**:
- 📊 [`notebooks/FINAL_ANALYSIS_AND_RESULTS.ipynb`](notebooks/FINAL_ANALYSIS_AND_RESULTS.ipynb) - Complete analysis
- 📝 [`docs/FINAL_PROJECT_REPORT.md`](docs/FINAL_PROJECT_REPORT.md) - Comprehensive report
- 🎤 [`docs/PRESENTATION_SLIDES.md`](docs/PRESENTATION_SLIDES.md) - Presentation materials
- 📈 [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md) - Detailed methodology

## Project Goals ✅

1. **Identify** neighborhoods in Los Angeles with limited access to urgent care facilities ✅
2. **Analyze** access disparities using population density, distance, and facility availability ✅
3. **Provide insights** that could inform resource allocation or outreach efforts ✅

## Key Results

**Data Collected**:
- 🏥 **4,512** validated healthcare facilities across LA County
- 👥 **2,498** census tracts with demographic data
- 📊 **9,936,690** total LA County residents analyzed
- 🗺️ Complete geographic boundaries (TIGER/Line 2023)

**Analysis Completed**:
- ✅ Distance-based access metrics framework
- ✅ Density calculations (4.5 facilities per 10,000 residents)
- ✅ Coverage gap identification methodology
- ✅ Income and demographic disparity analysis
- ✅ Interactive and static visualizations

**Deliverables**:
- 📁 Clean, validated datasets
- 📊 Comprehensive analysis notebooks
- 🗺️ Interactive maps (Folium)
- 📈 Statistical visualizations
- 📝 Complete project documentation

## Key Learning Objectives ✅

- ✅ Retrieve and work with public health data using APIs and JSON-based sources
- ✅ Clean and process datasets with Python (Pandas, NumPy)
- ✅ Perform geospatial analysis and compute access metrics
- ✅ Calculate facilities per capita and distance-to-care metrics
- ✅ Create meaningful visualizations of healthcare access patterns

## Project Structure

```
la-healthcare-access-mapping/
├── data/
│   ├── raw/                    # Original, unmodified data
│   ├── processed/              # Cleaned and transformed data
│   └── external/               # Reference data (shapefiles, demographics)
├── src/
│   ├── data_collection/        # Scripts for API calls and data retrieval
│   ├── data_processing/        # Data cleaning and transformation
│   ├── analysis/               # Analysis scripts and metrics calculation
│   └── visualization/          # Plotting and map generation
├── notebooks/                  # Jupyter notebooks for exploration
├── docs/                       # Project documentation and reports
├── tests/                      # Unit tests
├── outputs/
│   ├── maps/                   # Generated maps and visualizations
│   ├── reports/                # Analysis reports
│   └── figures/                # Charts and graphs
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## Data Sources ✅

### Collected and Validated

1. **Healthcare Facilities**
   - LA County Health Data (data.lacounty.gov)
   - California Health and Human Services Open Data Portal
   - Google Places API (urgent care, hospitals, clinics)

2. **Geographic Data**
   - LA County neighborhood boundaries (GeoJSON/Shapefiles)
   - Census tract data
   - ZIP code boundaries

3. **Population Data**
   - US Census Bureau API
   - American Community Survey (ACS) data
   - Population density by census tract

4. **Socioeconomic Indicators**
   - Median household income
   - Insurance coverage rates
   - Transportation access

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd la-healthcare-access-mapping
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up API keys (if needed):
```bash
cp .env.example .env
# Edit .env and add your API keys
```

## Usage

See [PROJECT_PLAN.md](docs/PROJECT_PLAN.md) for detailed implementation phases and milestones.

### Quick Start

1. **Data Collection**: Run data collection scripts
```bash
python src/data_collection/fetch_facilities.py
```

2. **Data Processing**: Clean and prepare data
```bash
python src/data_processing/clean_data.py
```

3. **Analysis**: Run analysis scripts
```bash
python src/analysis/calculate_access_metrics.py
```

4. **Visualization**: Generate maps and charts
```bash
python src/visualization/create_maps.py
```

## Key Metrics

- **Facilities per capita**: Number of urgent care facilities per 10,000 residents
- **Average distance to nearest facility**: Mean distance from population centers
- **Coverage gaps**: Areas beyond 3-mile radius of any facility
- **Facility density**: Spatial clustering of healthcare resources

## Contributing

This is a collaborative project. To contribute:

1. Create a new branch for your feature
2. Make your changes and test thoroughly
3. Submit a pull request with a clear description
4. Ensure code follows project style guidelines (use `black` for formatting)

## Team Collaboration

- Use GitHub Issues to track tasks and bugs
- Create feature branches for new work
- Review each other's pull requests before merging
- Document your code and analyses clearly
- Communicate regularly about progress and blockers

## License

This project is for educational purposes.

## Acknowledgments

- LA County Department of Public Health
- US Census Bureau
- OpenStreetMap contributors

## Contact

For questions or suggestions, please open an issue or contact the team.
