// import { Request, Response } from 'express';
import { WorkspaceController } from '../controllers/workspace.controller';
import { Router } from 'express';

const router = Router();

const workspaceController = new WorkspaceController();

router.get("/workspaces", workspaceController.getWorkspaces);
router.post("/workspaces", workspaceController.createWorkspace);

export default router;