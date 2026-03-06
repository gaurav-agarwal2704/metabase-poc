/**
 * OT4R Brand Theming for Metabase Embedded Analytics
 *
 * Edit this file to match your design system tokens.
 * All values map to the Metabase SDK theme API:
 * https://www.metabase.com/docs/latest/embedding/appearance
 *
 * Pro/Enterprise plan required for advanced theming (colors, components).
 * OSS/Starter plans only support the "light" and "dark" presets.
 */

export const ot4rLightTheme = {
  // -- Font --
  fontFamily: "Custom",
  // fontSize: "16px",    // Uncomment to override base font size
  // lineHeight: 1.5,     // Uncomment to override base line height

  colors: {
    // Primary brand color (buttons, links, active states)
    brand: "#247F9E",
    "brand-hover": "#DDECFA",
    "brand-hover-light": "#EEF6FC",

    // Text hierarchy
    "text-primary": "#1F2937",
    "text-secondary": "#6B7280",
    "text-tertiary": "#9CA3AF",

    // Backgrounds
    background: "#FFFFFF",
    "background-light": "#F9FAFB",
    "background-secondary": "#F3F4F6",
    "background-hover": "#F9FAFB",
    "background-disabled": "#E5E7EB",

    // Borders
    border: "#E5E7EB",

    // Semantic contexts
    filter: "#7C3AED",
    summarize: "#059669",
    positive: "#10B981",
    negative: "#EF4444",

    // Focus and shadow
    focus: "#BFDBFE",
    shadow: "rgba(0, 0, 0, 0.08)",

    // Chart color palette (up to 8 colors)
    // Customize these to match your OT4R data visualization palette
    charts: [
      "#4A6FDE",
      "#39A25E",
      "#1FA888",
      "#FDAF08",
      "#BB6ACD",
      "#DF4E96",
      "#D86441",
      "#6C8AE4",
    ],
  },

  components: {
    dashboard: {
      backgroundColor: "#fff",
      // gridBorderColor: "#E5E7EB",  // Shown only when editing
      card: {
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
      },
    },

    question: {
      backgroundColor: "#FFFFFF",
      toolbar: {
        backgroundColor: "#F3F4F6",
      },
    },

    tooltip: {
      textColor: "#FFFFFF",
      secondaryTextColor: "#9CA3AF",
      backgroundColor: "#1F2937",
      focusedBackgroundColor: "#111827",
    },

    table: {
      cell: {
        textColor: "#1F2937",
        backgroundColor: "#FFFFFF",
        fontSize: "13px",
      },
      idColumn: {
        textColor: "#1A73E8",
        backgroundColor: "#EFF6FF",
      },
    },

    number: {
      value: {
        fontSize: "24px",
        lineHeight: "21px",
      },
    },

    cartesian: {
      padding: "4px 8px",
    },

    pivotTable: {
      cell: {
        fontSize: "12px",
      },
      rowToggle: {
        textColor: "#FFFFFF",
        backgroundColor: "#6B7280",
      },
    },

    popover: {
      zIndex: 4,
    },
  },
};

export const ot4rDarkTheme = {
  ...ot4rLightTheme,

  colors: {
    ...ot4rLightTheme.colors,

    brand: "#60A5FA",
    "brand-hover": "#1E3A5F",
    "brand-hover-light": "#172554",

    "text-primary": "#F9FAFB",
    "text-secondary": "#D1D5DB",
    "text-tertiary": "#9CA3AF",

    background: "#111827",
    "background-light": "#1F2937",
    "background-secondary": "#1F2937",
    "background-hover": "#374151",
    "background-disabled": "#374151",

    border: "#374151",

    focus: "#1E3A5F",
    shadow: "rgba(0, 0, 0, 0.3)",
  },

  components: {
    ...ot4rLightTheme.components,

    dashboard: {
      backgroundColor: "#111827",
      card: {
        backgroundColor: "#1F2937",
        border: "1px solid #374151",
      },
    },

    question: {
      backgroundColor: "#1F2937",
      toolbar: {
        backgroundColor: "#374151",
      },
    },

    tooltip: {
      textColor: "#F9FAFB",
      secondaryTextColor: "#9CA3AF",
      backgroundColor: "#374151",
      focusedBackgroundColor: "#1F2937",
    },

    table: {
      cell: {
        textColor: "#F9FAFB",
        backgroundColor: "#1F2937",
        fontSize: "13px",
      },
      idColumn: {
        textColor: "#60A5FA",
        backgroundColor: "#172554",
      },
    },

    pivotTable: {
      cell: {
        fontSize: "12px",
      },
      rowToggle: {
        textColor: "#FFFFFF",
        backgroundColor: "#4B5563",
      },
    },
  },
};

export type ThemePreset = "light" | "dark" | "custom";

export function getTheme(preset: ThemePreset) {
  switch (preset) {
    case "dark":
      return ot4rDarkTheme;
    case "light":
    case "custom":
    default:
      return ot4rLightTheme;
  }
}
