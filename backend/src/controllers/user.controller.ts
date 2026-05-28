import { Request, Response } from 'express';
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';

export class UserController {
  // Create a new user
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, role, workspaceId } = req.body;

      // Check if email is already in use
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
          workspaceId,
        },
      });
      res.status(201).json({ name, email, role });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
}