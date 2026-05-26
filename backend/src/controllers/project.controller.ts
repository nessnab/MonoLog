import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class ProjectController {

  // Get all projects in a workspace
  async getProjects(req: Request, res: Response) {
    try {
      const { workspaceId } = req.params;
      const projects = await prisma.project.findMany({
        where: { workspaceId: Number(workspaceId) },
      });
      res.json(projects);
    }
    catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  }

  // Create a new project
  async createProject(req: Request, res: Response) {
    try {
      const { name, description, workspaceId } = req.body;
      const project = await prisma.project.create({
        data: {
          name,
          description,
          workspace: {
            connect: { id: workspaceId },
          },
        },
      });
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  }
}