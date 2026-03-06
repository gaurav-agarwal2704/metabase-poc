# Metabase POC - OT4R Embedded Analytics

A demo app for evaluating Metabase as an embedded analytics solution. Uses the Metabase Modular Embedding SDK (React) to embed interactive dashboards, editable dashboards, question explorer, collection browser, and a theme playground.

## Prerequisites

- **Node.js 20+** (check with `node -v`)
- **An existing Metabase instance** (v52+, EE recommended for full theming)
- **A Metabase API key** (Admin > Settings > Authentication > API Keys)

## Quick Start

### 1. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in:

```
VITE_METABASE_INSTANCE_URL=https://your-metabase-instance.com
VITE_METABASE_API_KEY=your_api_key_here
VITE_DASHBOARD_ID=1
```

### 2. Install and run the client

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:3001** in your browser.

### 3. (Optional) Run the JWT auth server

Only needed when testing production-style JWT authentication:

```bash
cd server
npm install
npm run dev
```

Then set `VITE_AUTH_MODE=jwt` in `.env` and configure `METABASE_JWT_SECRET`.

## Project Structure

```
metabase-poc/
├── .env.example                    # Environment template
├── server/
│   ├── index.ts                    # Express server with JWT auth endpoint
│   └── package.json
├── client/
│   ├── src/
│   │   ├── config/
│   │   │   ├── theme.ts            # ** Brand theming - edit this file **
│   │   │   └── metabase.ts         # Auth config (API key / JWT)
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx       # InteractiveDashboard
│   │   │   ├── EditableDashboardPage.tsx   # EditableDashboard
│   │   │   ├── QuestionExplorerPage.tsx    # InteractiveQuestion
│   │   │   ├── CollectionBrowserPage.tsx   # CollectionBrowser
│   │   │   └── ThemePlaygroundPage.tsx     # Theme switching demo
│   │   ├── components/
│   │   │   └── Layout.tsx          # Sidebar navigation
│   │   ├── App.tsx                 # MetabaseProvider + Router
│   │   └── main.tsx
│   └── package.json
└── tool-ux-assessment.md           # OT4R requirements document
```

## Customizing Brand Theming

All theming is centralized in **`client/src/config/theme.ts`**. Edit this single file to:

- Change brand colors, text colors, and background colors
- Set chart color palette (up to 8 colors)
- Override font family and size
- Customize individual components: dashboard cards, tooltips, tables, pivot tables, number charts
- Switch between light and dark presets

The Theme Playground page (`/theme`) lets you toggle between light and dark themes with live preview.

> **Note:** Advanced theming (per-component colors, custom fonts) requires a Metabase Pro or Enterprise plan. OSS/Starter only supports light/dark presets.

## Demo Pages

| Page | Route | SDK Component | What It Demonstrates |
|------|-------|--------------|---------------------|
| Interactive Dashboard | `/` | `InteractiveDashboard` | Filters, drill-down, tooltips, downloads |
| Editable Dashboard | `/editable` | `EditableDashboard` | Add/remove widgets, create inline questions |
| Question Explorer | `/explore` | `InteractiveQuestion` | Query builder, chart type exploration |
| Collections | `/collections` | `CollectionBrowser` | Browse saved dashboards/questions |
| Theme Playground | `/theme` | `StaticDashboard` | Live light/dark theme switching |

## Connecting Databricks

Databricks is configured in the **Metabase Admin UI** (not in this app's code):

1. Go to **Admin > Databases > Add a Database**
2. Select **Databricks**
3. You can paste a JDBC connection string to auto-fill fields, or fill manually:
   - **Host**: `xxxxxxxxxx.cloud.databricks.com` (Server Hostname from your Databricks compute)
   - **HTTP Path**: `/sql/1.0/endpoints/abcdef1234567890` (from your SQL Warehouse)
   - **Authentication**: Personal Access Token (PAT) or OAuth M2M
   - **Default Catalog**: required (e.g., `main`)
4. Click **Save**

Metabase will sync your Databricks schema and you can immediately build questions/dashboards against it.

## Auth Modes

| Mode | When to Use | Config |
|------|-------------|--------|
| **API Key** (default) | Local development, evaluation | Set `VITE_AUTH_MODE=apikey` and `VITE_METABASE_API_KEY` |
| **JWT** | Production, multi-tenant | Set `VITE_AUTH_MODE=jwt`, configure `METABASE_JWT_SECRET`, run the Express server |

API key auth only works on localhost. For production, you must use JWT SSO (requires Pro/Enterprise).

## Next Steps

To extend this POC toward production:

1. **Enable JWT SSO**: Configure JWT authentication in Metabase Admin (Settings > Authentication > JWT). Set the shared secret in `.env` as `METABASE_JWT_SECRET`. Update the Express server's `/api/metabase/auth` endpoint to embed real user identity (email, groups) from your app's session.

2. **Connect Databricks**: Follow the Databricks section above to connect your data warehouse. Once connected, build dashboards in Metabase and reference their IDs in this app.

3. **Row-Level Security**: Use Metabase's data sandboxing or impersonation to ensure users only see their own data. Configure in Admin > Permissions.

4. **Custom Drill-Through Actions**: Use the `mapQuestionClickActions` plugin to customize what happens when users click data points. See [SDK plugins docs](https://www.metabase.com/docs/latest/embedding/sdk/plugins).

5. **CORS Configuration**: In Metabase Admin > Embedding, add your production domain to the allowed CORS origins.

6. **Evaluate Chart Types**: Use the Question Explorer page to test each chart type from the assessment against your Databricks data. Metabase supports: table, bar, line, area, pie/donut, scatter, combo, pivot, gauge, funnel, map, waterfall, trend/sparkline, number/KPI, and more.

7. **Export Capabilities**: Metabase supports PDF, CSV, and image exports via dashboard subscriptions and the download button (enabled with `withDownloads` prop).

8. **Period-over-Period Comparisons**: Use Metabase's "Compare to previous period" feature in the query builder to create YoY, MoM comparisons with trend indicators.

9. **Filter Persistence**: Dashboard filters persist within a session automatically. For cross-page persistence, implement filter state in your app's state management (React context, URL params, etc.).

10. **Design System Integration**: Update `theme.ts` with your exact OT4R design tokens. Note that Metabase's SDK currently does not support custom icon sets or CSS variables ([feature request](https://github.com/metabase/metabase/issues/59237)).
