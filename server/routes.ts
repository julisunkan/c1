
import type { Express } from "express";
import { createServer } from "http";

export function registerRoutes(app: Express) {
  const server = createServer(app);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Module progress endpoints (for future implementation)
  app.get("/api/progress", (req, res) => {
    res.json({ progress: {} });
  });

  app.post("/api/progress", (req, res) => {
    res.json({ success: true });
  });

  return server;
}
