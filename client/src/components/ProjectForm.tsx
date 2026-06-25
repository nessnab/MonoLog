interface ProjectFormProps {
  editingProjectId: number | null
  projectName: string;
  projectDesc: string;

  setProjectName: (value: string) => void;
  setProjectDesc: (value: string) => void;

  handleSubmitProject: () => void;
}

function ProjectForm({
  editingProjectId,
  projectName,
  projectDesc,
  setProjectName,
  setProjectDesc,
  handleSubmitProject
}: ProjectFormProps) {

  return (
        <div>
      <h2>Create Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) =>
          setProjectName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Project Description"
        value={projectDesc}
        onChange={(e) =>
          setProjectDesc(e.target.value)
        }
      />

      <button onClick={handleSubmitProject}>
        {editingProjectId
          ? "Update Project"
          : "Create Project"}
      </button>
    </div>
  )
}

export default ProjectForm