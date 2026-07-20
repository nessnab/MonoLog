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

  if (projects.length === 0) {
  return (
    <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-border bg-surface text-center">
      <p className="text-4xl mb-2">📁</p>

      <h3 className="font-semibold">
        No projects yet
      </h3>

      <p className="text-sm text-text-secondary mt-1 max-w-xs">
        Create your first project to start tracking your team's progress.
      </p>
    </div>
  );
}

  return (
    <div className="h-62 overflow-y-auto items-center rounded-xl border border-border bg-surface shadow-sm p-4">
      <h2 className="font-bold text-base">Projects</h2>

        {
        
        projects.map((project) => (
          
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