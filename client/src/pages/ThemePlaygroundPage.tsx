import { useState } from "react";
import {
  MetabaseProvider,
  StaticDashboard,
} from "@metabase/embedding-sdk-react";
import { authConfig, DASHBOARD_ID } from "../config/metabase";
import { ot4rLightTheme, ot4rDarkTheme, type ThemePreset } from "../config/theme";
import "./ThemePlaygroundPage.scss";

const presets: { key: ThemePreset; label: string }[] = [
  { key: "light", label: "Light (OT4R)" },
  { key: "dark", label: "Dark (OT4R)" },
];

export default function ThemePlaygroundPage() {
  const [activePreset, setActivePreset] = useState<ThemePreset>("light");

  const currentTheme = activePreset === "dark" ? ot4rDarkTheme : ot4rLightTheme;

  return (
    <div className="theme-page">
      <header className="theme-page__header">
        <h1>Theme Playground</h1>
        <p>
          Toggle themes to preview how embedded components adapt.
          Edit <code>client/src/config/theme.ts</code> to customize all brand tokens.
        </p>

        <div className="theme-page__presets">
          {presets.map((preset) => (
            <button
              key={preset.key}
              onClick={() => setActivePreset(preset.key)}
              className={`theme-page__preset-btn${
                activePreset === preset.key ? " theme-page__preset-btn--active" : ""
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </header>

      <div
        className="theme-page__preview"
        style={{ backgroundColor: currentTheme.colors.background }}
      >
        <MetabaseProvider authConfig={authConfig} theme={currentTheme}>
          <StaticDashboard
            dashboardId={DASHBOARD_ID}
            withTitle
            className="theme-page__embed"
          />
        </MetabaseProvider>
      </div>

      <div className="theme-page__footer">
        <strong>Active theme:</strong> {activePreset} |{" "}
        <strong>Brand color:</strong> {currentTheme.colors.brand} |{" "}
        <strong>Background:</strong> {currentTheme.colors.background} |{" "}
        <strong>Font:</strong> {currentTheme.fontFamily}
      </div>
    </div>
  );
}
