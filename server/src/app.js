import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use("/api/ai", aiRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;