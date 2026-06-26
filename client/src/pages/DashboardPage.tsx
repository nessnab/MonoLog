import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CreateMemberForm from '../components/MemberForm'
import ProjectForm from '../components/ProjectForm'
import LogForm from '../components/LogForm'

import MemberList from '../components/MemberList'
import ProjectList from '../components/ProjectList'
import LogList from '../components/LogList'

function DashboardPage() {
  interface Project {
    id: number
    name: string
    description?: string
  }

  const navigate = useNavigate()
  
  const [user, setUser] = useState(null)
  const [members, setMembers] = useState([]);

  const [projectName, setProjectName] = useState("")
  const [projectDesc, setProjectDesc] = useState("")

  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  
  const [logs, setLogs] = useState<any[]>([])
  const [content, setContent] = useState("")
  const [editingLogId, setEditingLogId] = useState<number | null>(null)

  useEffect(() => {
  if (!user) return;

  fetch(
    `http://localhost:3000/workspace/${user.workspaceId}/users`,
    {
      credentials: "include",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("members", data);
      setMembers(data);
    });
  }, [user]);

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

  // // Create Project for admin

  const handleSubmitProject = async () => {
    try {
      if (editingProjectId) {
        // EDIT
        const res = await fetch(
          `http://localhost:3000/projects/${editingProjectId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: projectName,
              description: projectDesc,
            }),
          }
        );
        const data = await res.json()
        setProjects((prev) =>
          prev.map((project) =>
            project.id === data.id
              ? data
              : project
          )
        )
      } else {
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
        setProjects((prev) => [...prev, data])
      }

      setEditingProjectId(null)
      setProjectName((""))
      setProjectDesc((""))
    }
    catch (err) {
      console.error(err)
    }
  }

  // Edit btn project
  const handleEditProject = (project: any) => {
    setEditingProjectId(project.id);
    setProjectName(project.name);
    setProjectDesc(project.description);
  }


  // Create logs
  const handleSubmitLog = async () => {
    if (!selectedProject) {
      alert("select a project first");
      return
    }

    try {
      if (editingLogId) {
        const res = await fetch(
          `http://localhost:3000/logs/${editingLogId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              content,
            }),
          }
        );
        const data = await res.json();
        setLogs((prev) =>
          prev.map((log) =>
            log.id === data.id
              ? data
              : log
          )
        )  
      } else {
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
      }
      setEditingLogId(null)
      setContent((""))
    } catch (err) {
      console.error(err)
    }
  } 

  // Edit btn log
  const handleEditLog = (log: any) => {
    setEditingLogId(log.id);
    setContent(log.content);
  }


  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost:3000/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      navigate("/auth")
    }
    catch (err) {
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
          <h2>Create Member</h2>
          <CreateMemberForm
            workspaceId={user?.workspaceId}
            // onMemberCreated={fetchMembers}
          />
        </div>
      )}

      <MemberList members={members} />
      <ProjectForm
        projectName={projectName}
        projectDesc={projectDesc}
        setProjectName={setProjectName}
        setProjectDesc={setProjectDesc}
        handleSubmitProject={handleSubmitProject}
        editingProjectId={editingProjectId}
      />

      <ProjectList 
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onEditProject={handleEditProject}
      />

     <LogForm
        content={content}
        setContent={setContent}
        handleSubmitLog={handleSubmitLog}
        editingLogId={editingLogId}
     />
      
      <LogList 
        logs={logs}
        onEditLog={handleEditLog}
      />

      <button onClick={handleLogout}>
        Logout
      </button>
      
    </div>
  )
}

export default DashboardPage