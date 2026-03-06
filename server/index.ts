import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.SERVER_PORT || 4200;
const JWT_SECRET = process.env.METABASE_JWT_SECRET || "";

app.use(cors({ origin: ["http://localhost:3001", "http://localhost:5173"] }));
app.use(express.json());

/**
 * JWT signing endpoint for Metabase SDK authentication.
 * In production, replace the hardcoded user with your app's session/auth logic.
 * Metabase JWT docs: https://www.metabase.com/docs/latest/people-and-groups/authenticating-with-jwt
 */
app.post("/api/metabase/auth", (_req, res) => {
  if (!JWT_SECRET) {
    res.status(500).json({ error: "METABASE_JWT_SECRET not configured" });
    return;
  }

  const token = jwt.sign(
    {
      email: "demo@example.com",
      first_name: "Demo",
      last_name: "User",
      groups: ["All Users"],
      exp: Math.round(Date.now() / 1000) + 60 * 10, // 10 min
    },
    JWT_SECRET,
  );

  res.json(token);
});

app.use(express.static(path.resolve(__dirname, "../../client/dist")));

app.get("*", (_req, res) => {
  const indexPath = path.resolve(__dirname, "../../client/dist/index.html");
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`JWT auth endpoint: POST http://localhost:${PORT}/api/metabase/auth`);
});
