import { useState, useEffect } from 'react'

function DashboardPage() {
  interface Project {
    id: number
    name: string
    description?: string
  }
  
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState<Project[]>([])

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
            <li key={project.id}>
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DashboardPage