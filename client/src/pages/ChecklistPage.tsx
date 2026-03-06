import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChecklistPage.scss";

type Status = "possible" | "partial" | "not-possible" | null;

interface Requirement {
  id: string;
  text: string;
  notes: string;
  defaultStatus: Status;
  demoPath?: string;
  demoLabel?: string;
}

interface Category {
  id: string;
  label: string;
  requirements: Requirement[];
}

const CATEGORIES: Category[] = [
  {
    id: "visual-design",
    label: "Visual Design & Design System Consistency",
    requirements: [
      {
        id: "design-tokens",
        text: "Map UI elements and charts to OT4R design tokens (colors, fonts, spacing, type scale, font weights)",
        notes: "Fully supported via the Metabase SDK theme API. Colors, typography, backgrounds, borders, and chart palette are all configurable.",
        defaultStatus: "possible",
        demoPath: "/theme",
        demoLabel: "Theme Playground",
      },
      {
        id: "dark-mode",
        text: "Support customizable dark mode so the experience is seamless when switching system settings",
        notes: "Supported via SDK theme — pass a dark theme object to MetabaseProvider. Manual toggle or prefers-color-scheme detection can be wired in the host app.",
        defaultStatus: "possible",
        demoPath: "/theme",
        demoLabel: "Theme Playground",
      },
      {
        id: "design-system-sync",
        text: "Frontend automatically stays in sync with OT4R design system components (buttons, inputs, etc.)",
        notes: "Theme tokens (colors, fonts) apply globally. However, Metabase component shapes (button radius, input height) are not fully overridable — there is no component-level slot API.",
        defaultStatus: "partial",
        demoPath: "/theme",
        demoLabel: "Theme Playground",
      },
      {
        id: "icon-set",
        text: "Support the OT4R icon set instead of Metabase's proprietary icons",
        notes: "Not supported. The Metabase SDK does not expose an icon override API. Metabase's own icon set is always used within embedded components.",
        defaultStatus: "not-possible",
      },
      {
        id: "loading-states",
        text: "Support OT4R themed loading states (spinners, skeleton loading)",
        notes: "Loading background colors adapt to theme tokens. However, there is no API to replace Metabase's built-in spinner or skeleton with custom OT4R-branded equivalents.",
        defaultStatus: "partial",
      },
      {
        id: "labels-verbiage",
        text: "Customize labels and verbiage (e.g., \"JOIN\" instead of \"SIGN UP\") to align with OT4R terminology",
        notes: "Limited. The SDK does not provide a full string/i18n override API. Some UI strings in embedded components cannot be changed without forking Metabase.",
        defaultStatus: "partial",
      },
    ],
  },
  {
    id: "interaction-usability",
    label: "Interaction & Usability",
    requirements: [
      {
        id: "hover-focus",
        text: "Focus interaction (background transparency) when hovering over chart segments to isolate data",
        notes: "Built-in behavior in all Metabase chart types. Hovering a segment or bar highlights it and dims others automatically.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "tooltips",
        text: "Contextual tooltips on chart legends that can be customized with additional information",
        notes: "Tooltips are built-in and styled via the theme API (colors, backgrounds). Content customization (adding extra copy) is limited to what Metabase renders from the question data.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "custom-metrics",
        text: "Data points customizable with additional metrics (e.g., % change) to understand data better",
        notes: "Supported via custom expressions in the Metabase question builder. You can add calculated columns like % change, YoY delta, etc., and display them in tooltips or table columns.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "drill-down",
        text: "Drill down into specific data points to see granular details (individual transactions or events)",
        notes: "Fully supported via InteractiveDashboard. Clicking a data point opens a drill-through menu with options to see records, filter, break out by another dimension, etc.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "empty-states",
        text: "Helpful and visually consistent \"No Data\" or error states so users understand why information is missing",
        notes: "Built-in. Metabase renders a \"No results\" state automatically. Colors adapt to theme. The message text is not customizable via the SDK.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "responsive",
        text: "Dashboard layout adapts gracefully to different device screens (desktop, tablet, mobile)",
        notes: "Built-in responsive behavior. Metabase dashboards have a mobile layout mode that can be configured in the Metabase admin. The embedded component inherits this.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
    ],
  },
  {
    id: "chart-types",
    label: "Data Visualization — Chart Types",
    requirements: [
      {
        id: "chart-table",
        text: "Table",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-table-bar",
        text: "Table with bar chart (mini-bars in cells)",
        notes: "Supported via conditional formatting / mini bar option on table columns.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-table-heatmap",
        text: "Table with heatmap (cell color scaling)",
        notes: "Supported via conditional formatting on table columns.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-metric-card",
        text: "KPI — Metric card",
        notes: "Fully supported. The Number visualization in Metabase.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-metric-trendline",
        text: "KPI — Metric card with trendline",
        notes: "Supported. Enable \"Show sparkline\" on a Number visualization.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-line",
        text: "Time — Line chart",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-sparkline",
        text: "Time — Sparkline",
        notes: "Available as the trendline option on metric cards. Not available as a standalone sparkline widget type.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-bar-vertical",
        text: "Bar — Vertical bar chart",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-bar-stacked",
        text: "Bar — Stacked vertical bar chart",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-bar-100",
        text: "Bar — 100% stacked vertical bar chart",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-bar-horizontal",
        text: "Bar — Horizontal bar chart",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-bar-horizontal-stacked",
        text: "Bar — Stacked horizontal bar chart",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-bar-horizontal-100",
        text: "Bar — 100% stacked horizontal bar chart",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-pie",
        text: "Pie — Pie chart",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-donut",
        text: "Pie — Donut chart",
        notes: "Fully supported (same as Pie, toggle in settings).",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-bubble-map",
        text: "Maps — Bubble map",
        notes: "Supported via the Pin Map visualization type with latitude/longitude columns.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-filled-map",
        text: "Maps — Filled map (choropleth)",
        notes: "Supported via the Region Map visualization when using country/state/region data.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-combo-map",
        text: "Maps — Combo map (pins + regions)",
        notes: "Not a dedicated combo map type. Pin maps and region maps are separate — combining them requires a custom implementation.",
        defaultStatus: "partial",
      },
      {
        id: "chart-combo-bar-line",
        text: "Line — Combo bar and line",
        notes: "Fully supported via the combo chart visualization (bar + line series on same axes).",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-combo-stacked",
        text: "Line — Stacked combo bar and line",
        notes: "Supported — enable stacking on the bar series within a combo chart.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-line-2",
        text: "Line — Line chart (multi-series)",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-boxplot",
        text: "Line — Boxplot",
        notes: "Not available. Metabase does not have a boxplot visualization type.",
        defaultStatus: "not-possible",
      },
      {
        id: "chart-candlestick",
        text: "Line — Candlestick",
        notes: "Not available. Metabase does not have a candlestick visualization type.",
        defaultStatus: "not-possible",
      },
      {
        id: "chart-area-stacked",
        text: "Area — Stacked area",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-area-overlapping",
        text: "Area — Area chart (overlapping)",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-scatter",
        text: "Scatter — Scatter chart",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-bubble",
        text: "Scatter — Bubble chart",
        notes: "Supported. Use a scatter chart and map a third numeric column to the bubble size.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-pivot",
        text: "Pivot — Pivot table",
        notes: "Fully supported.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-pivot-bar",
        text: "Pivot — Pivot table with bar chart",
        notes: "Supported via the mini-bar option on pivot table cells.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-pivot-heatmap",
        text: "Pivot — Pivot table with heatmap",
        notes: "Supported via conditional formatting on pivot table cells.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-bullet",
        text: "Bullet chart",
        notes: "Not available. Metabase does not have a bullet chart visualization type.",
        defaultStatus: "not-possible",
      },
      {
        id: "chart-treemap",
        text: "Treemap",
        notes: "Not available. Metabase does not have a treemap visualization type.",
        defaultStatus: "not-possible",
      },
      {
        id: "chart-gauge",
        text: "Gauge",
        notes: "Not available as a dedicated gauge chart. A progress bar number visualization is the closest alternative.",
        defaultStatus: "not-possible",
      },
      {
        id: "chart-timeline",
        text: "Timeline",
        notes: "Not available. Metabase does not have a timeline/Gantt visualization type.",
        defaultStatus: "not-possible",
      },
      {
        id: "chart-funnel",
        text: "Funnel",
        notes: "Fully supported as a native visualization type.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "chart-calendar-heatmap",
        text: "Calendar heatmap (Preset)",
        notes: "Not available as a built-in visualization. Would require a custom component outside of Metabase.",
        defaultStatus: "not-possible",
      },
    ],
  },
  {
    id: "period-over-period",
    label: "Period-over-Period & Trend Analysis",
    requirements: [
      {
        id: "yoy-week",
        text: "Native Period-over-Period comparisons (YoY Week-to-Week, ISO week alignment)",
        notes: "Metabase has a built-in \"Compare to previous period\" feature. However, ISO week-aligned YoY (comparing week #3 of 2025 vs week #3 of 2026) requires a custom SQL expression — the native UI only supports calendar-date offsets.",
        defaultStatus: "partial",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "comparison-lines",
        text: "Comparison lines or trend indicators on charts",
        notes: "Supported. Metabase's comparison feature adds a trend line or previous-period overlay to line and bar charts via the question settings.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
    ],
  },
  {
    id: "filters",
    label: "Filters",
    requirements: [
      {
        id: "global-filters",
        text: "Apply global filters (date ranges, regions) that affect the entire dashboard",
        notes: "Fully supported via InteractiveDashboard. Dashboard-level filters propagate to all connected cards automatically.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "widget-filters",
        text: "Apply widget-level filters (date ranges, regions) that affect one specific widget",
        notes: "Supported. Each card on a dashboard can have its own filter configuration that overrides or augments global filters.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "inline-filters",
        text: "Display filters inline on the page (similar to OT4R), not hidden behind a click",
        notes: "Partial. Dashboard filters are shown in a top bar by default. The exact placement and collapsing behavior is controlled by Metabase's UI — the SDK does not expose a prop to force inline rendering.",
        defaultStatus: "partial",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "preset-filters",
        text: "Define a list of preset filters (e.g., supplied dates 30, 60, 90 days) for users on the dashboard",
        notes: "Supported. Date filter widgets in Metabase support configuring preset relative date options (last 30 days, last 60 days, etc.) via the dashboard filter settings.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "filter-persistence",
        text: "Filters persist during the session (navigating away and back keeps current filter state)",
        notes: "Supported within the Metabase embedded component during a session. To persist across navigation in an SPA, the host app needs to store filter state (e.g., in URL params or React state) and re-apply on mount.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
    ],
  },
  {
    id: "self-service",
    label: "Functionality & Self-Service",
    requirements: [
      {
        id: "add-remove-widgets",
        text: "Add and remove widgets from reports",
        notes: "Supported via EditableDashboard component. Users can add, remove, resize, and rearrange cards.",
        defaultStatus: "possible",
        demoPath: "/editable",
        demoLabel: "Editable Dashboard",
      },
      {
        id: "custom-filter-views",
        text: "Create and save custom filter views (e.g., \"My Weekly Sales\") without altering the main dashboard",
        notes: "Not natively supported as \"saved filter presets\". Workaround: users can duplicate a dashboard and apply their filters to the copy. Bookmarking a URL with filter params is another partial solution.",
        defaultStatus: "partial",
      },
      {
        id: "create-own-report",
        text: "Create own report and set it as default view or homepage",
        notes: "Supported. Users can create questions/dashboards and pin them to a collection. The host app can read the user's pinned collection and route to it on login.",
        defaultStatus: "possible",
        demoPath: "/editable",
        demoLabel: "Editable Dashboard",
      },
      {
        id: "share-reports",
        text: "Share custom reports with other users in the organization",
        notes: "Supported via Metabase's collection sharing and permissions model. The CollectionBrowser component lets users navigate shared collections.",
        defaultStatus: "possible",
        demoPath: "/collections",
        demoLabel: "Collections",
      },
      {
        id: "set-default-for-group",
        text: "Set default reports for all employees at a specific restaurant/group",
        notes: "Supported via Metabase group permissions and pinned items in group-specific collections. Requires admin configuration in Metabase.",
        defaultStatus: "possible",
        demoPath: "/collections",
        demoLabel: "Collections",
      },
      {
        id: "manage-reports",
        text: "Manage (edit, create, see shared reports) all in one place and navigate between them",
        notes: "Supported via the CollectionBrowser component. Users can browse, open, and manage all their questions and dashboards from one view.",
        defaultStatus: "possible",
        demoPath: "/collections",
        demoLabel: "Collections",
      },
      {
        id: "native-reporting",
        text: "Native reporting experience within OT4R — create and modify charts without switching platforms",
        notes: "Supported via the Metabase SDK. InteractiveQuestion and EditableDashboard embed the full question builder and dashboard editor inside the host app.",
        defaultStatus: "possible",
        demoPath: "/explore",
        demoLabel: "Question Explorer",
      },
      {
        id: "widget-library",
        text: "Curated library of pre-configured widgets (e.g., Covers, Sales) for instant dashboard population",
        notes: "Supported via Metabase curated collections. Pre-built questions/dashboards can be organized in a collection that users can clone from. Requires initial setup by the data team.",
        defaultStatus: "possible",
        demoPath: "/collections",
        demoLabel: "Collections",
      },
    ],
  },
  {
    id: "architecture",
    label: "Architecture & Technical Performance",
    requirements: [
      {
        id: "performance",
        text: "Charts render quickly even with large datasets",
        notes: "Depends on Metabase server configuration. Metabase supports result caching, database-level query optimization, and materialized views. The SDK itself adds no rendering overhead beyond the host React app.",
        defaultStatus: "partial",
      },
      {
        id: "export",
        text: "Export reports to PDF, CSV, or Image formats",
        notes: "Supported via the withDownloads prop on InteractiveDashboard and StaticDashboard. Exposes download buttons per card for CSV/XLSX/JSON/image.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "data-freshness",
        text: "Clear indicator of when data was last updated",
        notes: "Built-in. Metabase shows a \"last updated\" timestamp on dashboards. The caching configuration determines how stale data can be.",
        defaultStatus: "possible",
        demoPath: "/",
        demoLabel: "Dashboard",
      },
      {
        id: "updates",
        text: "Receive updates from Metabase when they make product changes",
        notes: "Yes. Metabase publishes a changelog at metabase.com/changelog, maintains a GitHub repo, and has an active Slack community. Breaking SDK changes are communicated via the @metabase/embedding-sdk-react CHANGELOG.",
        defaultStatus: "possible",
      },
    ],
  },
];

const STORAGE_KEY = "ot4r-checklist-statuses";

const STATUS_CONFIG = {
  possible: { label: "Possible", className: "status--possible" },
  partial: { label: "Partial", className: "status--partial" },
  "not-possible": { label: "Not Possible", className: "status--not-possible" },
} as const;

const STATUS_CYCLE: Status[] = ["possible", "partial", "not-possible", null];

function getNextStatus(current: Status): Status {
  const idx = STATUS_CYCLE.indexOf(current);
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}

function loadStatuses(): Record<string, Status> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function buildDefaultStatuses(): Record<string, Status> {
  const result: Record<string, Status> = {};
  for (const cat of CATEGORIES) {
    for (const req of cat.requirements) {
      result[req.id] = req.defaultStatus;
    }
  }
  return result;
}

export default function ChecklistPage() {
  const [statuses, setStatuses] = useState<Record<string, Status>>(() => {
    const saved = loadStatuses();
    const defaults = buildDefaultStatuses();
    return { ...defaults, ...saved };
  });

  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<Status>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  }, [statuses]);

  const cycleStatus = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: getNextStatus(prev[id] ?? null) }));
  };

  const toggleNote = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (id: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFilter = (status: Status) => {
    setActiveFilter((prev) => (prev === status ? null : status));
  };

  const resetAll = () => {
    setStatuses(buildDefaultStatuses());
  };

  const counts = Object.values(statuses).reduce(
    (acc, s) => {
      if (s === "possible") acc.possible++;
      else if (s === "partial") acc.partial++;
      else if (s === "not-possible") acc.notPossible++;
      else acc.unset++;
      return acc;
    },
    { possible: 0, partial: 0, notPossible: 0, unset: 0 }
  );

  const total = Object.values(statuses).length;

  return (
    <div className="checklist-page">
      <header className="checklist-page__header">
        <div className="checklist-page__title-row">
          <div>
            <h1>Requirements Checklist</h1>
            <p>
              All requirements from the UX assessment, pre-assessed against Metabase's capabilities.
              Click a status badge to filter. Click a category header to collapse. Click a row to see notes.
            </p>
          </div>
          <button className="checklist-page__reset-btn" onClick={resetAll}>
            Reset to defaults
          </button>
        </div>

        <div className="checklist-page__summary">
          <button
            className={`summary-badge summary-badge--possible${activeFilter === "possible" ? " summary-badge--active" : ""}`}
            onClick={() => toggleFilter("possible")}
          >
            {counts.possible} Possible
          </button>
          <button
            className={`summary-badge summary-badge--partial${activeFilter === "partial" ? " summary-badge--active" : ""}`}
            onClick={() => toggleFilter("partial")}
          >
            {counts.partial} Partial
          </button>
          <button
            className={`summary-badge summary-badge--not-possible${activeFilter === "not-possible" ? " summary-badge--active" : ""}`}
            onClick={() => toggleFilter("not-possible")}
          >
            {counts.notPossible} Not Possible
          </button>
          {counts.unset > 0 && (
            <button
              className={`summary-badge summary-badge--unset${activeFilter === null && counts.unset > 0 ? "" : ""}`}
              onClick={() => toggleFilter(null)}
            >
              {counts.unset} Unset
            </button>
          )}
          <span className="summary-badge summary-badge--total">{total} Total</span>
          {activeFilter !== null && (
            <button className="checklist-page__clear-filter" onClick={() => setActiveFilter(null)}>
              ✕ Clear filter
            </button>
          )}
        </div>
      </header>

      <div className="checklist-page__body">
        {CATEGORIES.map((category) => {
          const visibleRequirements = activeFilter !== null
            ? category.requirements.filter((req) => statuses[req.id] === activeFilter)
            : category.requirements;

          if (visibleRequirements.length === 0) return null;

          const isCollapsed = collapsedCategories[category.id] ?? false;

          const catCounts = category.requirements.reduce(
            (acc, req) => {
              const s = statuses[req.id];
              if (s === "possible") acc.possible++;
              else if (s === "partial") acc.partial++;
              else if (s === "not-possible") acc.notPossible++;
              return acc;
            },
            { possible: 0, partial: 0, notPossible: 0 }
          );

          return (
            <section key={category.id} className="checklist-category">
              <div
                className="checklist-category__header"
                onClick={() => toggleCategory(category.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggleCategory(category.id)}
              >
                <div className="checklist-category__title">
                  <span className="checklist-category__chevron">
                    {isCollapsed ? "▸" : "▾"}
                  </span>
                  <h2>{category.label}</h2>
                </div>
                <div className="checklist-category__counts">
                  <span className="cat-count cat-count--possible">{catCounts.possible}</span>
                  <span className="cat-count cat-count--partial">{catCounts.partial}</span>
                  <span className="cat-count cat-count--not-possible">{catCounts.notPossible}</span>
                </div>
              </div>

              {!isCollapsed && (
                <ul className="checklist-category__list">
                  {visibleRequirements.map((req) => {
                    const status = statuses[req.id] ?? null;
                    const isExpanded = expandedNotes[req.id] ?? false;
                    const statusCfg = status ? STATUS_CONFIG[status] : null;

                    return (
                      <li
                        key={req.id}
                        className={`checklist-item${isExpanded ? " checklist-item--expanded" : ""}`}
                      >
                        <div
                          className="checklist-item__row"
                          onClick={() => toggleNote(req.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && toggleNote(req.id)}
                        >
                          <span className="checklist-item__expand-icon">
                            {isExpanded ? "▾" : "▸"}
                          </span>

                          <span className="checklist-item__text">{req.text}</span>

                          <div className="checklist-item__actions">
                            {req.demoPath && (
                              <Link
                                to={req.demoPath}
                                className="checklist-item__demo-link"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {req.demoLabel ?? "Demo"}
                              </Link>
                            )}
                            <button
                              className={`checklist-item__status-btn${statusCfg ? ` ${statusCfg.className}` : " status--unset"}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                cycleStatus(req.id);
                              }}
                              title="Click to change status"
                            >
                              {statusCfg ? statusCfg.label : "Unset"}
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="checklist-item__notes">
                            {req.notes}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
