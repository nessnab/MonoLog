import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // For simplicity, we are using the token as the user's email
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
}