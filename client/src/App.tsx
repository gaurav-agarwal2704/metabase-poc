import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MetabaseProvider } from "@metabase/embedding-sdk-react";
import { authConfig } from "./config/metabase";
import { ot4rLightTheme } from "./config/theme";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import EditableDashboardPage from "./pages/EditableDashboardPage";
import QuestionExplorerPage from "./pages/QuestionExplorerPage";
import CollectionBrowserPage from "./pages/CollectionBrowserPage";
import ThemePlaygroundPage from "./pages/ThemePlaygroundPage";
import ChecklistPage from "./pages/ChecklistPage";

export default function App() {
  return (
    <MetabaseProvider authConfig={authConfig} theme={ot4rLightTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="editable" element={<EditableDashboardPage />} />
            <Route path="explore" element={<QuestionExplorerPage />} />
            <Route path="collections" element={<CollectionBrowserPage />} />
            <Route path="theme" element={<ThemePlaygroundPage />} />
            <Route path="checklist" element={<ChecklistPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MetabaseProvider>
  );
}
