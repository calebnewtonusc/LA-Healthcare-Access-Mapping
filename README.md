# LA Healthcare Access Mapping

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-backend-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white)
![GeoPandas](https://img.shields.io/badge/GeoPandas-spatial-139C5A)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)
![Tests](https://img.shields.io/badge/tests-44%20passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-yellow)

Geospatial data science platform that maps healthcare facility access gaps across Los Angeles County, serving 9.9 million residents across 2,498 census tracts with interactive visualizations and evidence-based policy recommendations.

**Live dashboard:** [la-healthcare-access-mapping.vercel.app](https://la-healthcare-access-mapping.vercel.app)

> Screenshot

## Features

- **KD-tree spatial analysis**: O(log n) nearest-neighbor search across 4,512 validated facility locations using CA State Plane (EPSG:2229) and CA Albers (EPSG:3310) projections for metric accuracy
- **Access desert identification**: 80,831 residents flagged as living in underserved tracts, with geocoded priority sites for 10 new facilities
- **Interactive maps**: Folium-based facility location and access desert heatmaps served via FastAPI, with fullscreen controls
- **Policy recommendation engine**: 5 evidence-based interventions ranked by urgency, cost, and ROI (projected 539.9% return on $645M investment over 10 years)
- **6-section web app**: Home, Analysis, Recommendations, Methodology, Data & API, and Resources with Framer Motion animations and a green Apple design theme
- **Auto-updating pipeline**: GitHub Actions triggers monthly data collection and re-analysis, committing updated outputs and redeploying automatically

## Key Stats

| Metric | Value |
|---|---|
| Facilities analyzed | 4,512 validated locations |
| Census tracts covered | 2,498 |
| Population served | 9.9 million |
| Access deserts identified | 80,831 residents |
| Policy interventions | 5 evidence-based recommendations |
| Projected ROI | 539.9% over 10 years |

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS, Framer Motion, Recharts |
| Backend | FastAPI, Python 3.13, Uvicorn |
| Spatial | GeoPandas, Shapely, Folium, SciPy (KD-tree) |
| Data | US Census ACS 5-Year, CDPH facility registry, TIGER shapefiles |
| Deployment | Vercel (frontend), Railway (backend), GitHub Actions (automation) |

## Getting Started

```bash
git clone https://github.com/calebnewtonusc/LA-Healthcare-Access-Mapping.git
cd la-healthcare-access-mapping

# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
# API: http://localhost:8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
# App: http://localhost:3000
```

### Run the full analysis pipeline

```bash
pip install -r requirements.txt

python src/data_collection/fetch_facilities.py   # Download facility data
python src/data_collection/fetch_census_data.py  # Download ACS demographics
python src/data_processing/fix_census_merge.py   # Merge and clean

jupyter notebook notebooks/FINAL_ANALYSIS_AND_RESULTS.ipynb

python -m impact.policy_recommendations          # Generate policy report

pytest tests/ -v                                  # 44 tests
```

## Project Structure

```
la-healthcare-access-mapping/
├── frontend/              # Next.js 16 app (6-section architecture)
│   ├── app/               # App Router: home, analysis, recommendations, methodology, data, resources
│   └── components/        # Charts (Recharts), maps, breadcrumbs, mobile nav, SEO
├── backend/               # FastAPI: 7 REST endpoints, serves maps and analysis outputs
├── src/
│   ├── data_collection/   # Census API + CDPH scraper with retry logic
│   ├── data_processing/   # Merging, validation, coordinate checks
│   ├── analysis/          # KD-tree access metrics, composite scoring
│   ├── visualization/     # Folium maps, matplotlib plots
│   └── impact/            # Policy recommendation engine
├── data/                  # Raw, processed, external (TIGER shapefiles)
├── outputs/               # Figures, interactive maps, CSV reports
├── notebooks/             # Final analysis Jupyter notebook
└── tests/                 # 44 unit tests (data, analysis, geospatial, policy)
```

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/stats` | Dashboard summary statistics |
| `GET /api/recommendations` | Policy recommendations with priority ranking |
| `GET /api/facilities` | Optimal new facility locations |
| `GET /api/cost-benefit` | Financial analysis and ROI projections |
| `GET /api/maps/facility-locations` | Interactive Folium facility map |
| `GET /api/maps/access-desert` | Access desert heatmap |
| `GET /health` | Health check |

## Author

**Caleb Newton** | [calebnewton.me](https://calebnewton.me) | [GitHub](https://github.com/calebnewtonusc)

All glory to God! ✝️❤️
