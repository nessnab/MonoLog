interface ProjectListProps {
  projects: any[]
  selectedProject: any
  onSelectProject: (project: any) => void
}

function ProjectList({
  projects,
  // selectedProjects,
  onSelectProject
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
          </div>
        ))}
    </div>
  )
}

export default ProjectList