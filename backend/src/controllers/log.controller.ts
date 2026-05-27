import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class LogController {
  // Get all logs for a project
  async getLogs(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const logs = await prisma.log.findMany({
        where: { projectId: Number(projectId) },
        include: {
          user: {
            select: {
              role: true,
              
            },
          }
        },
      });
      res.json(logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
      res.status(500).json({ error: "Failed to fetch logs" });
    }
  }


  // Create a new log entry
  async createLog(req: Request, res: Response) {
    try {
      const { content, attachment, projectId, userId } = req.body;
      const log = await prisma.log.create({
        data: {
          content,
          attachment,
          project: {
            connect: { id: projectId },
          },
          user: {
            connect: { id: userId },
          },
        },
      });
      res.status(201).json(log);
    }
    catch (error) {
      console.error("Error creating log:", error);
      res.status(500).json({ error: "Failed to create log" });
    }
  }
}