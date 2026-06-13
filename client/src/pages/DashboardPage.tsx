import { useState, useEffect } from 'react'

function DashboardPage() {
  interface Project {
    id: number
    name: string
    description?: string
  }
  
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/auth/me', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setUser(data))
  }, [])

  useEffect(() => {
  if (!user) return;

  fetch(
    `http://localhost:3000/workspace/${user.workspaceId}/projects`,
    {
      credentials: "include",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log("projects", data)
      setProjects(data);
    });
}, [user]);

  useEffect(() => {
    if (!selectedProject || !user) return;
    fetch(
      `http://localhost:3000/workspace/${user.workspaceId}/projects/${selectedProject.id}/logs`,
      {
        credentials: 'include',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("logs", data);
        setLogs(data);
      })
  }, [selectedProject, user])

  return (
    <div>
      Dashboard Page

      <div>
        {user && 
        <div>
          <h2>User Information</h2>
          <p>Welcome, {user?.name}!</p>
          <p>Role: {user?.role}</p>
          <p>Workspace: {user?.workspaceId}</p>
        </div>
        }
      </div>

      <div>
        <h2>Projects</h2>
        <ul>
          {projects?.map((project: any) => (
            <li 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{ cursor: 'pointer' }}
            >
              
              {project.name}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2>Logs</h2>

        <ul>
          {logs.map((log: any) => (
            <li key={log.id}>
              {log.content}
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  )
}

export default DashboardPage