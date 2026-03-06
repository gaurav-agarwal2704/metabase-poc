import { defineMetabaseAuthConfig } from "@metabase/embedding-sdk-react";

const METABASE_INSTANCE_URL =
  import.meta.env.VITE_METABASE_INSTANCE_URL || "http://localhost:3000";

const AUTH_MODE = import.meta.env.VITE_AUTH_MODE || "apikey";

export const authConfig =
  AUTH_MODE === "jwt"
    ? defineMetabaseAuthConfig({
        metabaseInstanceUrl: METABASE_INSTANCE_URL,
        jwtProviderUri: "/api/metabase/auth",
      })
    : defineMetabaseAuthConfig({
        metabaseInstanceUrl: METABASE_INSTANCE_URL,
        apiKey: import.meta.env.VITE_METABASE_API_KEY || "",
      });

export const DASHBOARD_ID = 'gt6ll3ilkTmQpAWJ1IPHl'
//  || import.meta.env.VITE_DASHBOARD_ID || "1",
;
