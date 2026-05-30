import { ProjectController } from '../controllers/project.controller';
import { roleMiddleware } from '../middleware/role.middleware';
import { Router } from 'express';

const router = Router();

const projectController = new ProjectController();

router.get("/workspaces/:workspaceId/projects", roleMiddleware, projectController.getProjects);
router.post("/projects", roleMiddleware, projectController.createProject);
router.get("/workspaces/:workspaceId/projects/:projectId", projectController.getProjectById);

export default router;