import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { Router } from 'express';

const router = Router();

const userController = new UserController();

router.post("/admin", userController.createUserAdmin);
router.post("/member", authMiddleware, roleMiddleware, userController.createUserMember);

export default router;