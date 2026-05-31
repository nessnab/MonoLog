import { ProjectController } from '../controllers/project.controller';
import { roleMiddleware } from '../middleware/role.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { Router } from 'express';

const router = Router();

const projectController = new ProjectController();

router.get("/workspace/projects", authMiddleware, projectController.getProjects);
router.post("/projects", roleMiddleware, projectController.createProject);
router.get("/workspace/projects/:projectId", authMiddleware, projectController.getProjectById);

export default router;