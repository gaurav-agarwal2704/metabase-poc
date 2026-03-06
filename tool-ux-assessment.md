
## Visual design and design system consistency

- As a Designer, I want the BI tool's frontend to automatically stay in sync with OT4R design system components (buttons, inputs, etc.) so that our platform maintains a unified brand experience without manual CSS overrides.

- As a Designer, I want to map the tool's UI elements and charts to our design tokens (colors, fonts, spacing, type scale, and font weights) so that the reporting interface is indistinguishable from our native app.

- As a Designer, I want the tool to support the OT4R icon set instead of proprietary icons to ensure consistent visual metaphors across the platform.

- As a Designer, I want the reporting tool to support a customizable dark mode so that the experience is seamless when I switch system settings.

- As a Designer, I want the tool to support OT4R themed loading states. 
Note: this may include spinners, skeleton loading, etc. Please document what flexibility we have with it

- As a Designer, I want to customize labels and verbiage (e.g., using “JOIN” instead of “SIGN UP”) to align with OT4R’s specific terminology.


## Interaction & usability

- As a Designer, I want a focus interaction (like background transparency) when hovering over chart segments so that I can clearly isolate the data I'm interested in.

- As a User, I want contextual tooltips on chart legends that I can customize with additional information so that I can understand the "why" behind the numbers without leaving the view.

- As a User, I want data points that I can customize with additional metrics (e.g. % change) so that I can understand the data better.

- As a User, I want to drill down into specific data points to see granular details so that I can investigate individual transactions or events.

- As a User, I want helpful and visually consistent "No Data" or error states so that I understand why information is missing and how to resolve it.

- As a User, I want the dashboard layout to adapt gracefully to my device screen (desktop, tablet, or mobile) so that I can check performance on the go.

Data visualization capabilities
- As an User, I want access to a robust library of chart types so that I can visualize complex restaurant data effectively.

- Table
  - Table
  - Table with bar chart
  - Table with heatmap
- KPIs
  - Metric card
  - Metric card with trendline
- Time
  - Line chart
  - Sparkline
- Bar
  - Vertical bar chart
  - Stacked vertical bar chart
  - 100% stacked vertical bar chart
  - Horizontal bar chart
  - Stacked horizontal bar chart
  - 100% stacked horizontal bar chart
- Pie
  - Pie chart
  - Donut chart
- Maps
  - Bubble map
  - Filled map
  - Combo map
- Line
  - Combo bar and line
  - Stacked combo bar and line
  - Line chart
  - Boxplot
  - Candlestick
- Area
  - Stacked area
  - Area chart (overlapping)
- Scatter
  - Scatter chart
  - Bubble chart
- Pivot
  - Pivot table
  - Pivot table with bar chart
  - Pivot table with heatmap
- Bullet chart
- Treemap
- Gauge
- Timeline
- Funnel
- Calendar heatmap (Preset)



- As a User, I want native support for Period-over-Period comparisons (e.g., YoY Week-to-Week analysis ) and trend indicators so that I can quickly assess growth.

YoY Week-to-Week analysis means instead of matching the calendar dates, I’m aligning the data by ISO week number. This ensures we’re comparing the third week of January 2025 against the third week of January 2026, which keeps our 'day-of-week' trends consistent

- As a User, I want to be able to see comparison lines or trend indicators easily.

- As a User, I want to be able to apply global filters (date ranges, regions) that affect the entire dashboard

- As a user, I want to be able to apply widget-level filters (date ranges, regions) that affect one specific widget

- As a Designer, I’d like to be able to display filters on the page similar to OT4R, not behind a click

- As a Designer, I’d like to be able to define a list of preset filters (e.g. supplied dates 30, 60, 90 days) to users on the dashboard
Functionality and self service

- As a User, I want my filters to persist during the session to keep the view I’m looking at.
For example, the user filters on the Covers report, navigates to another page, then comes back to the Covers report during the same session, those filters persist

- As a user, I want to add and remove widgets to reports.

- As a user, I want to be able to create and save my own filter views (e.g., "My Weekly Sales") without altering the main dashboard

- As a user, I want to create my own report and set it as my default view or homepage.

- As a user, I want to share custom reports with other users in my organization to ensure everyone is aligned on the same metrics.

- As a User or OT Account Manager, I want to set default reports for all employees at a specific restaurant/group to ensure they see the most relevant data upon login.

- As a user, I want a place to manage (edit, create, see shared reports) all in one place, and be able to navigate between them through OT4R.

- As a user, I want a native reporting experience within OT4R so that I can create and modify charts without the friction of switching between different platforms. 

- As a Designer/PM/Eng, I want to curate a library of pre-configured widgets (e.g., 'Covers' or 'Sales') so that restaurant users can instantly populate their reports with verified data and standardized visualizations without manual configuration. 
Architecture & technical performance

- As a user, I want the charts to render quickly even with large datasets to ensure a high-performance user experience.

- As a User, I want to export reports to PDF, CSV, or Image formats so that I can include them in external presentations or offline analysis.

- As a User, I want a clear indicator of when data was last updated so that I can trust the freshness of the information.

- As an Engineer, I want updates from the BI tool when they make changes to the product. Where would we find that out?