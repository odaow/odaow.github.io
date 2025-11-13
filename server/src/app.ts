import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import type { ErrorRequestHandler } from "express";
import multer from "multer";

import { CORS_ORIGIN, NODE_ENV, UPLOADS_DIR } from "./config.js";
import authRoutes from "./routes/auth.js";
import mediaRoutes from "./routes/media.js";
import navigationRoutes from "./routes/navigation.js";
import pagesRoutes from "./routes/pages.js";
import settingsRoutes from "./routes/settings.js";
import adminsRoutes from "./routes/admins.js";
import projectsRoutes from "./routes/projects.js";
import publishRoutes from "./routes/publish.js";
import { authenticate } from "./middleware/authenticate.js";
import { ensureDirectory } from "./utils/fileStorage.js";

const app = express();

app.disable("x-powered-by");
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(authenticate);

ensureDirectory(UPLOADS_DIR).catch((error) => {
  console.error("Failed to ensure uploads directory", error);
});
app.use("/uploads", express.static(UPLOADS_DIR));

app.get("/healthz", (_req, res) => {
  res.json({ status: "ok", environment: NODE_ENV });
});

app.use("/api/auth", authRoutes);
app.use("/api/pages", pagesRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/navigation", navigationRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/publish", publishRoutes);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unknown server error" });
};

app.use(errorHandler);

export default app;

