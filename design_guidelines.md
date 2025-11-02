# SEO Dashboard Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design) + Reference Inspiration (Google Analytics, Vercel Analytics, Linear)

**Justification:** This is a data-intensive analytics dashboard requiring clear information hierarchy, consistent patterns, and efficient data visualization. The utility-focused nature prioritizes clarity and scannability over visual flair.

**Key Design Principles:**
- Data clarity above all - metrics should be immediately scannable
- Professional trustworthiness - inspire confidence in business insights
- Progressive disclosure - show overview first, details on demand
- Responsive data display - charts and tables adapt gracefully

---

## Typography

**Font Family:**
- Primary: Inter (Google Fonts) - exceptional readability for data displays
- Monospace: JetBrains Mono - for numerical data, metrics, percentages

**Hierarchy:**
- Dashboard Headers: text-3xl font-bold (32px, 700 weight)
- Section Titles: text-xl font-semibold (20px, 600 weight)
- Card Headers: text-lg font-medium (18px, 500 weight)
- Metric Labels: text-sm font-medium uppercase tracking-wide (14px, 500 weight)
- Metric Values: text-4xl font-bold using monospace (36px, 700 weight)
- Body Text: text-base font-normal (16px, 400 weight)
- Supporting Text: text-sm (14px)
- Micro Text: text-xs (12px) for chart labels, table footnotes

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (between related elements): p-2, gap-2
- Standard spacing (card padding, section gaps): p-4, p-6, gap-4
- Large spacing (section separations): p-8, py-12
- Extra large (page margins): p-16

**Grid Structure:**
- Dashboard Container: max-w-screen-2xl mx-auto px-6
- Main Content Area: Uses sidebar navigation (260px fixed width) with flex-1 content area
- Responsive Breakpoints: Mobile (base), Tablet (md: 768px), Desktop (lg: 1024px), Wide (xl: 1280px)

**Dashboard Layout Pattern:**
```
[Sidebar Navigation (fixed)] [Main Content (flex-1)]
                             [Top Bar with user/actions]
                             [Page Header]
                             [Metrics Grid]
                             [Charts/Tables Section]
```

---

## Component Library

### Navigation Components

**Sidebar Navigation:**
- Width: w-64 (256px) on desktop, collapsible to w-16 on tablet
- Full-height sticky positioning
- Logo at top (h-16)
- Navigation items with icons (h-12 each)
- Active state: stronger visual weight with left border accent
- Grouping: space-y-1 between items, space-y-8 between groups

**Top Bar:**
- Height: h-16
- Contains: breadcrumb navigation, search, notifications, user profile dropdown
- Fixed to top of content area

### Data Display Components

**Metric Cards:**
- Compact card: p-6 with rounded-lg border
- Layout: flex flex-col gap-2
- Structure: Label (top) → Large Value (center) → Change Indicator (bottom)
- Change indicators: Use arrows (↑↓) with percentage in text-sm
- Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4

**Stat Cards (Alternative Dense Layout):**
- Horizontal layout: flex items-center justify-between
- Icon on left, metrics on right
- Usage: For secondary metrics in Overview section

**Data Tables:**
- Header: sticky top-0 with font-medium text-sm
- Rows: hover state for interactivity, h-12 min height
- Cell padding: px-6 py-3
- Borders: Border between rows, no vertical borders
- Sorting indicators in headers
- Pagination below table: flex justify-between items-center

**Chart Containers:**
- Wrapper: rounded-lg border p-6
- Title: text-lg font-semibold mb-6
- Chart height: h-80 for primary charts, h-64 for secondary
- Legend: positioned below chart with horizontal layout
- Responsive: Stack charts vertically on mobile

### Form Components

**Connection Cards (OAuth Integration):**
- Large clickable card: p-8 rounded-lg border-2 hover state
- Google Analytics/Search Console branding prominent
- Connection status indicator (Connected/Disconnected)
- "Connect Account" button within card
- Icon + Service Name + Description layout

**Settings Forms:**
- Form groups with space-y-6
- Label above input pattern
- Input fields: h-12 with rounded-md border
- Helper text below inputs: text-sm
- Submit buttons: prominent with h-12

### Action Components

**Primary Buttons:**
- Height: h-12, h-10 for secondary contexts
- Padding: px-6
- Border radius: rounded-md
- Font: text-base font-medium
- Full width on mobile, inline on desktop

**Icon Buttons:**
- Size: h-10 w-10 for standard, h-8 w-8 for compact
- Rounded: rounded-md
- Use for: Refresh data, export, settings, etc.

**Dropdown Menus:**
- Min width: min-w-48
- Item height: h-10
- Padding: px-4
- Rounded: rounded-lg
- Shadow on open

### Feedback Components

**Empty States:**
- Centered layout with max-w-md mx-auto
- Icon (h-24 w-24) at top
- Heading + description + CTA button
- Use for: No data connected, no keywords found, etc.

**Loading States:**
- Skeleton loaders for metric cards: animated pulse
- Spinner for chart data loading
- Progressive loading: Show structure first, populate data

**Notification Badges:**
- Absolute positioned on icons
- Size: h-5 w-5 with text-xs
- Rounded: rounded-full

---

## Page-Specific Layouts

### Login/Signup Page:
- Centered card: max-w-md mx-auto mt-20
- Logo centered at top
- Form with space-y-4
- Social login buttons (Google OAuth) prominent
- Split into two columns on larger screens: Left (marketing/benefits), Right (form)

### Dashboard Overview:
- Top: 4-column metrics grid (Total Clicks, Impressions, CTR, Avg Position)
- Middle: 2-column chart layout (Traffic Over Time | Top Pages Performance)
- Bottom: Single full-width table (Top Keywords with click data)

### Pages Insights:
- Filter bar at top (date range, device type)
- Table-first layout showing all pages with metrics
- Expandable rows for detailed page metrics
- Side panel for individual page deep dive

### Performance Audit:
- Score cards at top: 4 scores (Performance, SEO, Accessibility, Best Practices)
- Circular progress indicators for scores
- Detailed breakdown sections below
- Mobile vs Desktop toggle tabs

### Keywords Page:
- Search/filter bar prominent
- Table with columns: Keyword, Position, Clicks, Impressions, CTR
- Sparkline charts in position column showing trend
- Sorting by any column

### Settings Page:
- Tab navigation at top (Account, Integrations, Notifications)
- Two-column layout: Settings menu left (w-64), Content right (flex-1)
- Connected accounts section with connection cards

---

## Data Visualization Guidelines

**Chart Types:**
- Line charts: Traffic trends, ranking changes over time
- Bar charts: Page comparisons, keyword performance
- Donut charts: Traffic sources breakdown
- Sparklines: Inline trends within tables

**Chart Styling:**
- Grid lines: subtle, horizontal only
- Axis labels: text-xs
- Tooltips: rounded-lg shadow-lg p-3 with specific data point details
- Responsive: Reduce chart complexity on mobile (fewer data points, simplified legends)

**Metric Presentation:**
- Large numbers: Format with commas (1,234) in monospace font
- Percentages: Always show + or - for changes
- Trends: Use consistent direction indicators (↑ positive, ↓ negative)
- Loading: Show placeholder values during fetch

---

## Interaction Patterns

**Dashboard Refresh:**
- Refresh button in top bar
- Auto-refresh toggle in settings
- Last updated timestamp always visible

**Data Filtering:**
- Date range selector: Quick options (7d, 30d, 90d, Custom) + date picker
- Device filter: All, Desktop, Mobile, Tablet
- Apply button for custom filters

**Chart Interactions:**
- Hover: Show precise values in tooltip
- Click: Drill down to detailed view where applicable
- Zoom: Enable for time-series charts on desktop

**Table Interactions:**
- Sort: Click column header
- Expand: Click row to see additional metrics
- Select: Checkbox for bulk actions where relevant
- Pagination: 25, 50, 100 rows per page options

---

## Responsive Strategy

**Mobile (< 768px):**
- Sidebar collapses to bottom nav or hamburger menu
- Metric cards: Single column, full width
- Charts: Simplified, single column
- Tables: Horizontal scroll with fixed first column OR card-based display

**Tablet (768px - 1024px):**
- Sidebar remains visible but narrower (w-16 icon-only with expand on hover)
- Metrics: 2-column grid
- Charts: Single column or side-by-side where space allows

**Desktop (> 1024px):**
- Full sidebar navigation
- Multi-column layouts active
- Side panels for detail views

---

## Images

This dashboard is data-focused and does not require hero images or marketing imagery. The visual interest comes from data visualizations, metrics, and charts rather than photographic content.

**Icon Usage:**
- Use Heroicons throughout for consistency
- Dashboard metrics: Use relevant icons (trending-up, chart-bar, cursor-click, eye, etc.)
- Navigation: Icon + label pattern
- Empty states: Larger decorative icons