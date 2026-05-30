import { UserController } from '../controllers/user.controller';
import { roleMiddleware } from '../middleware/role.middleware';
import { Router } from 'express';

const router = Router();

const userController = new UserController();

router.post("/users", roleMiddleware, userController.createUser);

export default router;