import { LogController } from "../controllers/log.controller";
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const logController = new LogController();

router.get("/workspaces/:workspaceId/projects/:projectId/logs", logController.getLogs);
router.post("/logs", authMiddleware, logController.createLog);

export default router;