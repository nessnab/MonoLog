import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRole = req.user?.role; 
    console.log(req.user?.role);

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Access denied: insufficient permissions" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}