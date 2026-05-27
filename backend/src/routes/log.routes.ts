import { LogController } from "../controllers/log.controller";
import { Router } from 'express';

const router = Router();

const logController = new LogController();

router.get("/workspaces/:workspaceId/projects/:projectId/logs", logController.getLogs);
router.post("/logs", logController.createLog);

export default router;