// import { Request, Response } from 'express';
import { WorkspaceController } from '../controllers/workspace.controller';
import { getWorkspaceById } from '../controllers/workspace.controller';
import { roleMiddleware } from '../middleware/role.middleware';
import { Router } from 'express';

const router = Router();

const workspaceController = new WorkspaceController();

router.get("/workspaces", roleMiddleware, workspaceController.getWorkspaces);
router.post("/workspaces", roleMiddleware, workspaceController.createWorkspace);
router.get("/workspaces/:id", getWorkspaceById);

export default router;