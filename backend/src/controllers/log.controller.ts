import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { error } from 'node:console';

export class LogController {
  // Get all logs for a project
  async getLogs(req: Request, res: Response) {
    try {
      const { workspaceId, projectId } = req.params;
      const logs = await prisma.log.findMany({
        where: {
          projectId: Number(projectId),
          project: {
            workspaceId: Number(workspaceId),
          },
        },
        include: {
          user: {
            select: {
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
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
      const { content, attachment, projectId } = req.body;
      const userId = req.user.id
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

  // update existing log
  async updateLog(req: Request, res: Response) {
    try {
      const { logId } = req.params;
      const { content } = req.body;

      const log = await prisma.log.update({
        where: {
          id: Number(logId),
        }, 
        data: {
          content,
        },
      });

      res.json(log);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Failed to edit Log"
      })
    }
  }
}