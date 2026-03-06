import { InteractiveDashboard } from "@metabase/embedding-sdk-react";
import { DASHBOARD_ID } from "../config/metabase";
import "./DashboardPage.scss";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <h1>Interactive Dashboard</h1>
        <p>
          Drill down into data points, apply filters, and explore visualizations.
          Covers: global filters, drill-through, tooltips, responsive layout.
        </p>
      </header>

      <div className="dashboard-page__content">
        <InteractiveDashboard
          dashboardId={DASHBOARD_ID}
          withTitle
          withDownloads
          className="dashboard-page__embed"
        />
      </div>
    </div>
  );
}
