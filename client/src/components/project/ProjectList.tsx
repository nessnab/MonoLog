interface ProjectListProps {
  projects: any[]
  selectedProject: any
  onSelectProject: (project: any) => void
  onEditProject: (project: any) => void
}

function ProjectList({
  projects,
  // selectedProjects,
  onSelectProject,
  onEditProject
}: ProjectListProps) {

  return (
    <div>
      <h2>Projects</h2>

        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            style={{cursor: 'pointer'}}
          >
            {project.name}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditProject(project)
              }}>
              Edit
            </button>
          </div>
        ))}
    </div>
  )
}

export default ProjectList