import { useState, useEffect } from 'react'
import ProjectList from '../components/ProjectList'
import LogList from '../components/LogList'

function DashboardPage() {
  interface Project {
    id: number
    name: string
    description?: string
  }
  
  const [user, setUser] = useState(null)

  const [projectName, setProjectName] = useState("")
  const [projectDesc, setProjectDesc] = useState("")

  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const [logs, setLogs] = useState<any[]>([])
  const [content, setContent] = useState("")

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

  // Create Project for admin

  const handleCreateProject = async () => {
    try {
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

      console.log(data)
      setProjects((prev) => [...prev, data])

      setProjectName((""))
      setProjectDesc((""))
    }
    catch (err) {
      console.error(err)
    }
  }


  // Create logs
  const handleCreateLog = async () => {
    if (!selectedProject) {
      alert("select a project first");
      return
    }

    try {
      const res = await fetch(
        "http://localhost:3000/logs",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            content,
            projectId: selectedProject.id,
          }),
        }
      )

      const data = await res.json();
      console.log(data);
      setLogs((prev) => [data, ...prev]);
      setContent((""))
    } catch (err) {
      console.error(err)
    }
  } 

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

      {user?.role === "admin" && (
        <div>
          <h2>Create Project</h2>

          <input 
            type="text" 
            placeholder="Project Name" 
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)}
            required
          />

          <input 
            type="text" 
            placeholder="Project Description" 
            value={projectDesc} 
            onChange={(e) => setProjectDesc(e.target.value)}
          />

          <button onClick={handleCreateProject}>
            Create
          </button>

        </div>
      )}

      <ProjectList 
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
      />

      <div>
        <h2>New Log</h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you work on today?"
        />

        <button onClick={handleCreateLog}>
          Submit
        </button>
      </div>
      
      <LogList 
        logs={logs}
      />
      
    </div>
  )
}

export default DashboardPage