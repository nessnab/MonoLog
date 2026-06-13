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

      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => onSelectProject(project)}
            style={{cursor: 'pointer'}}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectList