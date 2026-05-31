import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class ProjectController {

  // Get one project by ID
  async getProjectById(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const project = await prisma.project.findUnique({
        where: { id: Number(projectId) },
      });
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    }
    catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  }

  // Get all projects in a workspace
  async getProjects(req: Request, res: Response) {
    try {
      const { workspaceId } = req.params;
      const projects = await prisma.project.findMany({
        where: { workspaceId: workspaceId },
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
            connect: { id: Number(workspaceId) },
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