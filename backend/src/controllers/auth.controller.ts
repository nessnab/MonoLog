import { Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  // Login user
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      res.json({ token, name: user.name, email: user.email, role: user.role });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  }
}