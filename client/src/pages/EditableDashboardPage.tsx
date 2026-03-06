import { useState } from "react";
import {
  EditableDashboard,
  CreateDashboardModal,
} from "@metabase/embedding-sdk-react";
import type { MetabaseDashboard } from "@metabase/embedding-sdk-react";
import { DASHBOARD_ID } from "../config/metabase";
import "./EditableDashboardPage.scss";

export default function EditableDashboardPage() {
  const [activeDashboardId, setActiveDashboardId] = useState<
    number | string
  >(DASHBOARD_ID);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="editable-page">
      <header className="editable-page__header">
        <div>
          <h1>Editable Dashboard</h1>
          <p>
            Add/remove widgets, edit layout, create questions inline.
            Covers: self-service report editing, widget management.
          </p>
        </div>
        <button
          className="editable-page__create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + New Dashboard
        </button>
      </header>

      {showCreateModal && (
        <CreateDashboardModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(dashboard: MetabaseDashboard) => {
            setActiveDashboardId(dashboard.id);
            setShowCreateModal(false);
          }}
        />
      )}

      <div className="editable-page__content">
        <EditableDashboard
          dashboardId={activeDashboardId}
          withTitle
          withDownloads
          className="editable-page__embed"
        />
      </div>
    </div>
  );
}
