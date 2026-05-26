// import { Request, Response } from 'express';
import { WorkspaceController } from '../controllers/workspace.controller';
import { getWorkspaceById } from '../controllers/workspace.controller';
import { Router } from 'express';

const router = Router();

const workspaceController = new WorkspaceController();

router.get("/workspaces", workspaceController.getWorkspaces);
router.post("/workspaces", workspaceController.createWorkspace);
router.get("/workspaces/:id", getWorkspaceById);

export default router;