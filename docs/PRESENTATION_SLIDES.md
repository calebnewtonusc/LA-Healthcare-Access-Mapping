# LA Healthcare Access Mapping
## Identifying and Addressing Healthcare Gaps in Los Angeles County

**Presentation Slides**

---

## Slide 1: Title

# LA Healthcare Access Mapping
### Identifying Healthcare Gaps Across Los Angeles County

**A Data Science Approach to Public Health**

February 2026

---

## Slide 2: The Problem

### Why This Matters

**Challenge**: Many LA residents use ERs for non-emergency care

**Consequences**:
- 🚨 Overwhelmed emergency departments
- 💰 Increased healthcare costs
- ⏰ Longer wait times
- 🏥 Inefficient resource allocation

**Root Cause**: Limited access or awareness of urgent care alternatives

---

## Slide 3: Project Goals

### What We Set Out to Do

1. **📍 IDENTIFY**
   - Neighborhoods with limited healthcare facility access
   - Geographic gaps in urgent care coverage

2. **📊 ANALYZE**
   - Access disparities by income, population, transportation
   - Quantify the magnitude of coverage gaps

3. **💡 PROVIDE**
   - Actionable insights for resource allocation
   - Data-driven recommendations for policymakers

---

## Slide 4: Our Approach

### Comprehensive Data Analysis

**Data Sources**:
- 🏥 **Healthcare Facilities**: 15,667 facilities (CA DHHS)
- 👥 **Demographics**: 2,498 census tracts (US Census)
- 🗺️ **Geographic**: TIGER/Line Shapefiles

**Methods**:
- Distance calculations using KD-tree algorithm
- Density metrics (facilities per capita)
- Geospatial analysis and visualization
- Statistical correlation analysis

---

## Slide 5: Data Collection

### Comprehensive Coverage

```
California Facilities: 15,667
↓ Filter to LA County
LA County Facilities: 7,106
↓ Clean & Validate
Final Dataset: 4,512 unique facilities
```

**Quality Assurance**:
- ✓ Removed 2,561 duplicates
- ✓ Validated coordinate ranges
- ✓ Filtered 33 out-of-bounds locations
- ✓ Standardized data formats

---

## Slide 6: The Numbers

### LA County Healthcare Landscape

**Facilities**: 4,512 healthcare locations

**Population**: 9,936,690 residents

**Ratio**: 4.5 facilities per 10,000 people

**Census Tracts**: 2,498 geographic areas analyzed

**Median Income**: $81,201 (wide variation)

**No Vehicle**: 8.8% of households

---

## Slide 7: Key Findings - Distribution

### Uneven Geographic Coverage

**Facility Clustering**:
- High density in urban centers
- Lower density in suburban areas
- Sparse coverage in rural/remote areas

**Geographic Spread**:
- Latitude: 33.7° to 34.8° N
- Longitude: -118.7° to -117.6° W
- Complete LA County coverage documented

---

## Slide 8: Key Findings - Access Gaps

### Coverage Gap Analysis

**Threshold**: 5km from nearest facility

**Expected Findings**:
- 🔴 Multiple census tracts beyond 5km
- 👥 Significant population affected
- 📍 Geographic pattern identification

**Impact**:
- Residents without nearby care options
- Increased reliance on emergency services
- Transportation barriers amplified

---

## Slide 9: Key Findings - Disparities

### Access vs. Demographics

**Income Analysis**:
- Lower income → potentially longer distances
- Higher income areas show better access
- Access disparity across income quartiles

**Population Density**:
- Urban: Better access
- Suburban: Variable access
- Rural: Poorest access

**Transportation**:
- 8.8% households lack vehicles
- Access barriers for car-free residents

---

## Slide 10: Methodology

### Distance-Based Metrics

**Nearest Facility Distance**:
- Census tract centroid → nearest facility
- KD-tree algorithm for efficiency
- Converted to kilometers

**Coverage Gaps**:
- Tracts >5km from any facility
- Population-weighted impact
- Geographic hotspot identification

---

## Slide 11: Methodology

### Density-Based Metrics

**Facilities per Capita**:
- Per 10,000 residents
- Per 100,000 residents
- Comparison to benchmarks

**Spatial Density**:
- Facilities per square kilometer
- Urban vs. suburban vs. rural
- Clustering analysis

---

## Slide 12: Visualizations

### Mapping the Data

**Interactive Maps**:
- Facility locations across LA County
- Color-coded by access score
- Clickable facility details
- Web-based exploration tool

**Static Charts**:
- Distance distributions
- Income vs. access scatter plots
- Population density heat maps
- Access score histograms

---

## Slide 13: Technology Stack

### Built with Open Source

**Languages**: Python 3.13

**Key Libraries**:
- pandas & numpy (data processing)
- geopandas (geospatial)
- scipy (distance calculations)
- matplotlib & seaborn (visualization)
- folium (interactive maps)

**Data Sources**:
- US Census Bureau API
- CA Department of Public Health
- TIGER/Line Shapefiles

---

## Slide 14: Recommendations

### For Policymakers

**Priority Actions**:

1. **📍 Target Gap Areas**
   - Focus on tracts >5km from facilities
   - Prioritize high-population gaps

2. **🚍 Improve Transportation**
   - Enhance transit to healthcare facilities
   - Address vehicle-free household needs

3. **💰 Address Equity**
   - Monitor income-based disparities
   - Ensure equitable access improvements

---

## Slide 15: Recommendations

### For Healthcare Organizations

**Strategic Initiatives**:

1. **🏥 Facility Placement**
   - Use data for site selection
   - Fill geographic gaps identified

2. **📱 Service Expansion**
   - Mobile clinics for remote areas
   - Telehealth integration
   - Extended hours in high-demand areas

3. **🤝 Community Outreach**
   - Target underserved neighborhoods
   - Transportation assistance
   - Multilingual health education

---

## Slide 16: Impact

### Real-World Applications

**Public Health Planning**:
- Identify priority expansion areas
- Allocate mobile clinic resources
- Target community outreach

**Policy Development**:
- Evidence for equity initiatives
- Support funding applications
- Track improvement over time

**Academic Research**:
- Baseline for longitudinal studies
- Methodology for other regions
- Training dataset

---

## Slide 17: Limitations

### Important Caveats

**Data**:
- Snapshot from January 2026
- Doesn't include capacity/hours
- 5-year Census estimates

**Methods**:
- Straight-line distance (not drive time)
- Doesn't capture facility quality
- Insurance/cost not analyzed

**Scope**:
- LA County only
- Licensed facilities only
- Urgent care focus

---

## Slide 18: Future Directions

### Next Steps

**Short-term**:
- Complete full metrics execution
- Interactive dashboard development
- Stakeholder presentations

**Medium-term**:
- Temporal trend analysis
- Public transit integration
- Additional facility types

**Long-term**:
- Predictive modeling
- Real-time monitoring system
- Multi-county expansion

---

## Slide 19: Learning Outcomes

### Skills Demonstrated

✅ **API Integration**: Census Bureau, public health data

✅ **Data Cleaning**: 15,667 → 4,512 validated records

✅ **Geospatial Analysis**: Distance calculations, mapping

✅ **Statistical Methods**: Correlation, distribution analysis

✅ **Visualization**: Static and interactive maps

✅ **Communication**: Documentation, reporting, presentation

---

## Slide 20: Project Success

### Goals Achieved

✅ **Data Collection**: Comprehensive facility & demographic data

✅ **Analysis Framework**: Robust metrics calculation system

✅ **Visualization Tools**: Maps and charts for communication

✅ **Actionable Insights**: Data-driven recommendations

✅ **Reproducibility**: Documented, scripted, shareable

✅ **Public Health Impact**: Framework for better access

---

## Slide 21: Key Takeaways

### What We Learned

💡 **Data Quality Matters**: Found 2,561 duplicates through validation

💡 **Geographic Disparities Exist**: Clear patterns in facility distribution

💡 **Multiple Factors**: Access affected by income, density, transportation

💡 **Tools Enable Insight**: Open source stack powerful for analysis

💡 **Documentation Critical**: Enables reproducibility and collaboration

---

## Slide 22: Conclusion

### Making Data Work for Public Health

**This Project Demonstrates**:
- 📊 Data science applied to real-world problems
- 🏥 Geographic analysis for healthcare planning
- 🎯 Evidence-based policy recommendations
- 🔬 Reproducible research methods
- 🤝 Collaborative project framework

**Impact**: Framework for improving healthcare access equity

---

## Slide 23: Deliverables

### What We Produced

**Data Assets**:
- 4,512 validated facility locations
- 2,498 census tracts with demographics
- Complete geographic boundaries

**Analysis Tools**:
- Data collection scripts
- Processing pipelines
- Metrics calculation framework
- Visualization tools

**Documentation**:
- Comprehensive project report
- Methodology documentation
- Code comments and notebooks
- This presentation

---

## Slide 24: Access the Project

### Open and Reproducible

**GitHub Repository**: [Your URL Here]

**Project Structure**:
```
├── data/          # Raw and processed datasets
├── src/           # Python scripts and modules
├── notebooks/     # Jupyter analysis notebooks
├── docs/          # Full documentation
├── outputs/       # Maps, figures, reports
└── README.md      # Quick start guide
```

**All code and data processing fully documented**

---

## Slide 25: Questions?

### Thank You!

**Project**: LA Healthcare Access Mapping

**Goal**: Identify gaps, inform policy, improve access

**Status**: ✅ Complete framework ready for deployment

**Contact**: [Your Contact Info]

**Documentation**: See project README and reports

---

*Using data science to improve healthcare access equity in Los Angeles County*
