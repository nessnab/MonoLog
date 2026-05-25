import express, { Request, Response } from "express";
import morgan from "morgan";
// import helmet from "helmet";

import workspaceRoutes from "./routes/workspace.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

// routes
app.get("/", (req, res) => {
  console.log("Route hit");
  res.send("Backend works");
});

app.use("/", workspaceRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});