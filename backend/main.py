"""
FastAPI backend for LA Healthcare Access Mapping
Serves analysis outputs and provides API endpoints for the frontend
"""
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
import pandas as pd
from pathlib import Path
import sys
import os

# Add parent directory to path to import src modules
sys.path.append(str(Path(__file__).parent.parent))

app = FastAPI(
    title="LA Healthcare Access API",
    description="API for Los Angeles Healthcare Access Mapping and Policy Recommendations",
    version="1.1.0"
)

# CORS configuration for Vercel frontend
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS + ["https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base paths
BASE_DIR = Path(__file__).parent.parent
OUTPUTS_DIR = BASE_DIR / "outputs" / "policy_recommendations"

# Serve static outputs
try:
    app.mount("/outputs", StaticFiles(directory=str(BASE_DIR / "outputs")), name="outputs")
except RuntimeError:
    pass  # Directory might not exist yet


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "name": "LA Healthcare Access API",
        "version": "1.1.0",
        "status": "healthy",
        "endpoints": {
            "recommendations": "/api/recommendations",
            "facilities": "/api/facilities",
            "cost_benefit": "/api/cost-benefit",
            "maps": {
                "facility_locations": "/api/maps/facility-locations",
                "access_desert": "/api/maps/access-desert"
            },
            "reports": {
                "executive": "/api/reports/executive",
                "community": "/api/reports/community",
                "cost_benefit_full": "/api/reports/cost-benefit"
            }
        }
    }


@app.on_event("startup")
async def startup_event():
    """Log startup information for debugging"""
    print("=" * 60)
    print("LA Healthcare Access API - Starting")
    print(f"Working directory: {os.getcwd()}")
    print(f"BASE_DIR: {BASE_DIR}")
    print(f"OUTPUTS_DIR: {OUTPUTS_DIR}")
    print(f"Outputs directory exists: {OUTPUTS_DIR.exists()}")
    if OUTPUTS_DIR.exists():
        print(f"Files in outputs: {list(OUTPUTS_DIR.iterdir())}")
    print("=" * 60)


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "service": "la-healthcare-api",
        "outputs_available": OUTPUTS_DIR.exists(),
        "working_dir": os.getcwd()
    }


@app.get("/api/recommendations")
async def get_recommendations():
    """Get all policy recommendations as JSON"""
    try:
        csv_path = OUTPUTS_DIR / "recommendations.csv"
        if not csv_path.exists():
            raise HTTPException(status_code=404, detail="Recommendations file not found")

        df = pd.read_csv(csv_path)

        # Rename columns for better frontend compatibility
        if 'Implementation_Timeframe' in df.columns:
            df = df.rename(columns={'Implementation_Timeframe': 'Timeline'})

        recommendations = df.to_dict(orient="records")

        return JSONResponse(content={
            "count": len(recommendations),
            "recommendations": recommendations
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading recommendations: {str(e)}")


@app.get("/api/facilities")
async def get_facilities():
    """Get recommended facility locations with coordinates"""
    try:
        csv_path = OUTPUTS_DIR / "recommended_facility_locations.csv"
        if not csv_path.exists():
            raise HTTPException(status_code=404, detail="Facility locations file not found")

        df = pd.read_csv(csv_path)
        facilities = df.to_dict(orient="records")

        return JSONResponse(content={
            "count": len(facilities),
            "facilities": facilities
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading facilities: {str(e)}")


@app.get("/api/cost-benefit")
async def get_cost_benefit_summary():
    """Get cost-benefit analysis summary"""
    try:
        txt_path = OUTPUTS_DIR / "COST_BENEFIT_ANALYSIS.txt"
        if not txt_path.exists():
            raise HTTPException(status_code=404, detail="Cost-benefit analysis file not found")

        with open(txt_path, 'r') as f:
            content = f.read()

        # Parse key metrics from the summary section
        lines = content.split('\n')
        summary = {}

        for line in lines:
            if '10-year total investment:' in line:
                summary['total_investment'] = line.split('$')[1].strip()
            elif '10-year total savings:' in line:
                summary['total_savings'] = line.split('$')[1].strip()
            elif '10-year net benefit:' in line:
                summary['net_benefit'] = line.split('$')[1].strip()
            elif '10-year ROI:' in line:
                summary['roi'] = line.split(':')[1].strip()

        return JSONResponse(content={
            "summary": summary,
            "full_text": content
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading cost-benefit analysis: {str(e)}")


@app.get("/api/maps/facility-locations")
async def get_facility_map():
    """Get facility locations map HTML"""
    try:
        html_path = OUTPUTS_DIR / "recommended_facility_locations_map.html"
        if not html_path.exists():
            raise HTTPException(status_code=404, detail="Facility map not found")

        return FileResponse(
            path=html_path,
            media_type="text/html"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error serving map: {str(e)}")


@app.get("/api/maps/access-desert")
async def get_access_desert_map():
    """Get access desert heatmap HTML"""
    try:
        html_path = OUTPUTS_DIR / "access_desert_heatmap.html"
        if not html_path.exists():
            raise HTTPException(status_code=404, detail="Access desert map not found")

        return FileResponse(
            path=html_path,
            media_type="text/html"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error serving map: {str(e)}")


@app.get("/api/reports/executive")
async def get_executive_summary():
    """Get executive summary text"""
    try:
        txt_path = OUTPUTS_DIR / "EXECUTIVE_SUMMARY.txt"
        if not txt_path.exists():
            raise HTTPException(status_code=404, detail="Executive summary not found")

        with open(txt_path, 'r') as f:
            content = f.read()

        return JSONResponse(content={"content": content})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading executive summary: {str(e)}")


@app.get("/api/reports/community")
async def get_community_summary():
    """Get community summary text"""
    try:
        txt_path = OUTPUTS_DIR / "COMMUNITY_SUMMARY.txt"
        if not txt_path.exists():
            raise HTTPException(status_code=404, detail="Community summary not found")

        with open(txt_path, 'r') as f:
            content = f.read()

        return JSONResponse(content={"content": content})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading community summary: {str(e)}")


@app.get("/api/reports/cost-benefit")
async def get_cost_benefit_full():
    """Get full cost-benefit analysis text"""
    try:
        txt_path = OUTPUTS_DIR / "COST_BENEFIT_ANALYSIS.txt"
        if not txt_path.exists():
            raise HTTPException(status_code=404, detail="Cost-benefit analysis not found")

        with open(txt_path, 'r') as f:
            content = f.read()

        return JSONResponse(content={"content": content})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading cost-benefit analysis: {str(e)}")


@app.post("/api/run-analysis")
async def trigger_analysis(background_tasks: BackgroundTasks):
    """
    Trigger new analysis run (requires authentication in production)
    This is a placeholder - actual implementation would require admin auth
    """
    # In production, add authentication here
    return JSONResponse(
        content={
            "status": "not_implemented",
            "message": "Analysis trigger requires manual execution via GitHub Actions"
        },
        status_code=501
    )


@app.get("/api/stats")
async def get_statistics():
    """Get key statistics for dashboard"""
    try:
        # Read recommendations
        rec_path = OUTPUTS_DIR / "recommendations.csv"
        if rec_path.exists():
            rec_df = pd.read_csv(rec_path)
            total_affected = rec_df['Affected_Population'].sum() if 'Affected_Population' in rec_df.columns else 0
            num_recommendations = len(rec_df)
        else:
            total_affected = 0
            num_recommendations = 0

        # Read facilities
        fac_path = OUTPUTS_DIR / "recommended_facility_locations.csv"
        if fac_path.exists():
            fac_df = pd.read_csv(fac_path)
            num_facilities = len(fac_df)
            total_served = fac_df['estimated_impact'].sum() if 'estimated_impact' in fac_df.columns else 0
        else:
            num_facilities = 0
            total_served = 0

        # Read cost-benefit for ROI
        cb_path = OUTPUTS_DIR / "COST_BENEFIT_ANALYSIS.txt"
        roi = "540%"  # Default
        net_benefit = "$3.5B"  # Default
        total_investment = "$645M"  # Default

        if cb_path.exists():
            with open(cb_path, 'r') as f:
                content = f.read()
                for line in content.split('\n'):
                    if '10-year ROI:' in line or '• 10-year ROI:' in line:
                        roi = line.split(':')[-1].strip()
                    elif '10-year net benefit:' in line or '• 10-year net benefit:' in line:
                        if '$' in line:
                            net_benefit = '$' + line.split('$')[1].strip().split()[0].replace(',', '')
                            # Convert to billions if over 1B
                            val = float(net_benefit.replace('$', '').replace(',', ''))
                            if val >= 1000000000:
                                net_benefit = f"${val / 1000000000:.1f}B"
                            elif val >= 1000000:
                                net_benefit = f"${val / 1000000:.0f}M"
                    elif '10-year total investment:' in line or '• 10-year total investment:' in line:
                        if '$' in line:
                            total_investment = '$' + line.split('$')[1].strip().split()[0].replace(',', '')
                            # Convert to millions/billions with 1 decimal precision
                            val = float(total_investment.replace('$', '').replace(',', ''))
                            if val >= 1000000000:
                                total_investment = f"${val / 1000000000:.1f}B"
                            elif val >= 1000000:
                                total_investment = f"${val / 1000000:.1f}M"

        return JSONResponse(content={
            "population_affected": int(total_affected),
            "population_served_by_facilities": int(total_served),
            "num_recommendations": num_recommendations,
            "num_facilities": num_facilities,
            "roi": roi,
            "net_benefit": net_benefit,
            "total_investment": total_investment
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating statistics: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
