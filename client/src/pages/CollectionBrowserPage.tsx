import { CollectionBrowser } from "@metabase/embedding-sdk-react";
import "./CollectionBrowserPage.scss";

export default function CollectionBrowserPage() {
  return (
    <div className="collections-page">
      <header className="collections-page__header">
        <h1>Collections</h1>
        <p>
          Browse and manage saved dashboards, questions, and reports.
          Covers: report management, navigation, sharing.
        </p>
      </header>

      <div className="collections-page__content">
        <CollectionBrowser />
      </div>
    </div>
  );
}
