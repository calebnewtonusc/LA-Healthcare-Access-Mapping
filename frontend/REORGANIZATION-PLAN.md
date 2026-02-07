# Information Architecture Reorganization Plan

## Current Structure (Needs Reorganization)
```
/                  - Main dashboard (metrics, maps, recommendations, financial)
/about             - Methodology text (too much text, not well organized)
/resources         - External tools
/analytics         - NEW: Charts and visualizations
/algorithms        - NEW: Technical methods
/api-docs          - NEW: API documentation
```

## Proposed New Structure

### 1. **/ (Home Dashboard)** - Executive Summary
**Purpose**: First impression, key findings at-a-glance
**Content**:
- Hero section with top 3 findings (80K access desert, 539% ROI, 3M+ impact)
- Quick stats grid (4,512 facilities, 2,498 tracts, etc.)
- "Learn More" CTAs to other sections
- Live status indicator
- Quick navigation cards to main sections

**What to Move Here**:
- Keep current key metrics
- Keep key findings hero
- Remove detailed charts (move to /analysis)
- Remove full recommendations list (move to /recommendations)
- Remove detailed financial section (move to /recommendations)

---

### 2. **/analysis** - Comprehensive Data Analysis
**Purpose**: All data visualizations, charts, regional breakdowns
**Content**:
- Regional breakdown chart (from /analytics)
- Impact comparison chart (from /analytics)
- Access desert heatmap
- Facility distribution maps
- Demographic analysis
- Temporal trends (if applicable)
- Data export options

**What to Move Here**:
- Regional breakdown from /analytics
- Impact comparison from /analytics
- Current vs Recommended comparison from /
- All map visualizations from /

---

### 3. **/recommendations** - Policy & Implementation
**Purpose**: Actionable recommendations with implementation details
**Content**:
- Priority matrix (from /analytics)
- Implementation timeline (from /analytics)
- Full recommendations list with details
- Cost-benefit analysis
- ROI breakdown
- Detailed financial projections
- Phased implementation plan

**What to Move Here**:
- Priority matrix from /analytics
- Implementation timeline from /analytics
- Recommendations list from /
- Financial analysis from /

---

### 4. **/methodology** - Technical Details
**Purpose**: How the analysis was conducted, algorithms, validation
**Content**:
- Data sources and collection
- Algorithms (KD-tree, CRS, composite scoring, optimization)
- Validation against HPSA/MUA
- Reproducibility guide
- Data pipeline visualization
- Code transparency links
- Academic disclaimers

**What to Move Here**:
- All content from /algorithms
- Methodology text from /about
- Data pipeline visualization from /about
- Validation section from /about

---

### 5. **/data** - Data Dictionary & API
**Purpose**: Complete data reference and API documentation
**Content**:
- Data dictionary (all fields, formulas, sources)
- API documentation (from /api-docs)
- Data download links
- Field definitions
- Calculation formulas
- Data quality metrics

**What to Move Here**:
- All content from /api-docs
- Data sources from /about
- Field definitions (NEW - need to create)

---

### 6. **/resources** - External Tools
**Purpose**: Links to official government tools and datasets
**Content**:
- Keep current structure
- Maybe add: Related research, similar projects

**Keep As-Is**:
- Current external resources page

---

## Proposed Navigation Structure

```
Main Nav:
├── Home (/)
├── Analysis (/analysis) - "View Data"
├── Recommendations (/recommendations) - "Policy Actions"
├── Methodology (/methodology) - "How It Works"
├── Data & API (/data) - "Access Data"
└── Resources (/resources) - "External Tools"
```

## Implementation Priority

1. **High Priority**: Create clear navigation
2. **High Priority**: Move charts to /analysis
3. **High Priority**: Move recommendations to /recommendations
4. **Medium Priority**: Consolidate methodology + algorithms
5. **Medium Priority**: Create data dictionary page
6. **Low Priority**: Add breadcrumbs to all pages

## Benefits of New Structure

✅ **Clearer user journey**: Home → Analysis → Recommendations → Methodology → Data
✅ **Separation of concerns**: Data separate from policy, technical separate from executive
✅ **Better discoverability**: Related content grouped together
✅ **Scalability**: Easy to add new analysis types or recommendations
✅ **Professional**: Matches standard data dashboard IA patterns

## Next Steps

1. Get user approval on structure
2. Create /analysis page with all charts
3. Create /recommendations page with all policy content
4. Rename /about to /methodology and merge with /algorithms
5. Create /data page merging /api-docs + data dictionary
6. Update navigation in layout.tsx
7. Add proper breadcrumbs to all pages
8. Test all links and ensure no broken navigation
