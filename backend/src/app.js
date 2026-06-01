// app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { registerRoutes } from "./registerRoutes/index.js";

const app = express();

// Global middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(helmet());

// Register Routes
registerRoutes(app)

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;