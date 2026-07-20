import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import workspaceRoutes from "./routes/workspace.routes";
import projectRoutes from "./routes/project.routes";
import logRoutes from "./routes/log.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    "https://monolog.vercel.app",
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// routes
app.get("/", (req, res) => {
  console.log("Route hit");
  res.send("Backend works");
});

app.use("/", workspaceRoutes);
app.use("/", projectRoutes);
app.use("/", logRoutes);
app.use("/", userRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});