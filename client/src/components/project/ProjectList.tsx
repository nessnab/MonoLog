import { PencilLine } from 'lucide-react'

interface ProjectListProps {
  projects: any[]
  selectedProject: any
  onSelectProject: (project: any) => void
  onEditProject: (project: any) => void
}

function ProjectList({
  projects,
  selectedProject,
  onSelectProject,
  onEditProject
}: ProjectListProps) {

  return (
    <div className="h-62 overflow-y-auto items-center rounded-xl border border-border bg-surface shadow-sm p-4">
      <h2 className="font-bold text-base">Projects</h2>

        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className={`
              flex items-center justify-between rounded-sm ml-1 my-1 py-2 px-2 cursor-pointer transition

                ${
                  selectedProject?.id === project.id
                      ? "bg-primary-light border-l-4 border-primary"
                      : "bg-surface hover:bg-primary-light"
                }
            `}
            
          >
            <div>
              <p className="capitalize font-semibold">{project.name}</p>
              <p>{project.description}</p>
            </div>

            <button className='cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                onEditProject(project)
              }}>
              <PencilLine size={18} />
            </button>

          </div>
        ))}
    </div>
  )
}

export default ProjectList