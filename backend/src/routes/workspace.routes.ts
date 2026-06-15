// import { Request, Response } from 'express';
import { WorkspaceController } from '../controllers/workspace.controller';
import { roleMiddleware } from '../middleware/role.middleware';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const workspaceController = new WorkspaceController();

router.get("/workspace", authMiddleware, workspaceController.getWorkspace);
// router.post("/workspaces", roleMiddleware, workspaceController.createWorkspace);

export default router;