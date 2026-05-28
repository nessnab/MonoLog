import { UserController } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

const userController = new UserController();

router.post("/users", userController.createUser);

export default router;