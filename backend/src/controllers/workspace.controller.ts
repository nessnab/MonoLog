import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class WorkspaceController {

  // Get all workspaces
  async getWorkspace(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { workspaceId: true },
      });

      if (!user?.workspaceId) {
        return res.status(404).json({
          error: "User is not assigned to a workspace",
        });
      }
      const workspace = await prisma.workspace.findUnique({
        where: { id: user.workspaceId },
        // select: { id: true, name: true },
      });
      res.json(workspace);
    }
    catch (error) {
      console.error("Error fetching workspace:", error);
      res.status(500).json({ error: "Failed to fetch workspace" });
    }
  }

  // Create a new workspace
  // async createWorkspace(req: Request, res: Response) {
  //    try {
  //     const { name } = req.body;

  //     const workspace = await prisma.workspace.create({
  //       data: {
  //         name,
  //       },
  //     });

  //     res.status(201).json(workspace);

  //   } catch (error) {
  //     console.error("Error creating workspace:", error);

  //     res.status(500).json({
  //       error: "Failed to create workspace",
  //     });
  //   }
  // }
  
}


