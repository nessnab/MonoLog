import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class WorkspaceController {

  // Get all workspaces
  async getWorkspaces(req: Request, res: Response) {
    try {
      const workspaces = await prisma.workspace.findMany();
      res.json(workspaces);
    }
    catch (error) {
      console.error("Error fetching workspaces:", error);
      res.status(500).json({ error: "Failed to fetch workspaces" });
    }
  }

  // Create a new workspace
  async createWorkspace(req: Request, res: Response) {
     try {
      const { name } = req.body;

      const workspace = await prisma.workspace.create({
        data: {
          name,
        },
      });

      res.status(201).json(workspace);

    } catch (error) {
      console.error("Error creating workspace:", error);

      res.status(500).json({
        error: "Failed to create workspace",
      });
    }
  }
}

