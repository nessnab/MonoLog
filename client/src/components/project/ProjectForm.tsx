interface ProjectFormProps {
  editingProjectId: number | null
  projectName: string;
  projectDesc: string;

  setProjectName: (value: string) => void;
  setProjectDesc: (value: string) => void;

  handleSubmitProject: () => void;
}

import Input from '../ui/Input'
import Button from '../ui/Button'

function ProjectForm({
  editingProjectId,
  projectName,
  projectDesc,
  setProjectName,
  setProjectDesc,
  handleSubmitProject
}: ProjectFormProps) {

  return (
    <div className="items-center rounded-xl border border-border bg-surface shadow-sm p-4">
      <h2 className='font-bold text-base'>Create New Project</h2>

      <label>Project Name</label>
      <Input
        value={projectName}
        placeholder="Enter project name"
        onChange={setProjectName}
      />

      <label>Description (optional)</label>
      <Input
        value={projectDesc}
        placeholder="Enter project description"
        onChange={setProjectDesc}
      />

      <Button onClick={handleSubmitProject}>
        {editingProjectId
          ? "Update Project"
          : "Create Project"}
      </Button>
    </div>
  )
}

export default ProjectForm