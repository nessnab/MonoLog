import { Request, Response } from 'express';
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export class UserController {
  // Create a new user
  async createUserAdmin(req: Request, res: Response) {
    try {
      const { name, email, password, workspaceName } = req.body;
      if (
          !name?.trim() ||
          !email?.trim() ||
          !password?.trim()
      ) {
          return res.status(400).json({
              error: "Missing required fields",
          });
      }
      // Check if email is already in use
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const workspace = await prisma.workspace.create({
        data: {
          name: workspaceName,
        },
      });

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role:"admin",
          workspaceId: workspace.id
        },
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 3 * 60 * 60 * 1000,
      });
      
      res.status(201).json({ 
        name: user.name,
        email: user.email,
        role: user.role,
        workspaceId: user.workspaceId,
        workspaceName: workspace.name 
      });

    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  
  async createUserMember(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (
          !name?.trim() ||
          !email?.trim() ||
          !password?.trim()
      ) {
          return res.status(400).json({
              error: "Missing required fields",
          });
      }
      const workspaceId = req.user?.workspaceId;

      // Check if email is already in use
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role:"member",
          workspaceId: workspaceId,
        },
      });
      res.status(201).json({ 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        workspaceId 
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
}