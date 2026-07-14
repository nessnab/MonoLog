interface Project {
    id: number;
    name: string;
    description?: string;
}

interface User {
    id: number;
    name: string;
    role: string;
    workspaceId: number;
}

interface ProjectSectionProps {
  user: User | null;

  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;

  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<Project | null>
  >;
}


import { useState } from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

function ProjectSection({
  user,
  projects,
  setProjects,
  selectedProject,
  setSelectedProject,
}: ProjectSectionProps) {
  const [projectName, setProjectName] = useState("")
  const [projectDesc, setProjectDesc] = useState("")
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)

  const handleSubmitProject = async () => {
    try {
      if (!projectName.trim()) {
          alert("Project name is required");
          return;
      }
      if (editingProjectId) {
        // EDIT
        const res = await fetch(
          `http://localhost:3000/projects/${editingProjectId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: projectName,
              description: projectDesc,
            }),
          }
        );
        const data = await res.json()
        setProjects((prev) =>
          prev.map((project) =>
            project.id === data.id
              ? data
              : project
          )
        )
      } else {
        const res = await fetch(
          "http://localhost:3000/projects",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: projectName,
              description: projectDesc,
              workspaceId: user.workspaceId,
            }),
          }
        );
        const data = await res.json()
        setProjects((prev) => [...prev, data])
      }

      setEditingProjectId(null)
      setProjectName((""))
      setProjectDesc((""))
    }
    catch (err) {
      console.error(err)
    }
  }

  // Edit btn project
  const handleEditProject = (project: any) => {
    setEditingProjectId(project.id);
    setProjectName(project.name);
    setProjectDesc(project.description);
  }

  return (
      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
        <ProjectList 
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
          onEditProject={handleEditProject}
        />
        {user && user.role === "admin" && (
        <ProjectForm
            projectName={projectName}
            projectDesc={projectDesc}
            setProjectName={setProjectName}
            setProjectDesc={setProjectDesc}
            handleSubmitProject={handleSubmitProject}
            editingProjectId={editingProjectId}
          />
        )}

      </div>
  )
}

export default ProjectSection;