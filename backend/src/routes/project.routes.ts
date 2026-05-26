import { ProjectController } from '../controllers/project.controller';
import { Router } from 'express';

const router = Router();

const projectController = new ProjectController();

router.get("/workspaces/:workspaceId/projects", projectController.getProjects);
router.post("/projects", projectController.createProject);

export default router;