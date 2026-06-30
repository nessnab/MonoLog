import { useState, useEffect, use } from 'react'
import { useNavigate } from 'react-router-dom'

import CreateMemberForm from '../components/MemberForm'
import ProjectForm from '../components/ProjectForm'
import LogForm from '../components/LogForm'

import MemberList from '../components/MemberList'
import ProjectList from '../components/ProjectList'
import LogList from '../components/LogList'

import { CircleUser } from 'lucide-react'

function DashboardPage() {
  interface Project {
    id: number
    name: string
    description?: string
  }

  const navigate = useNavigate()
  
  const [user, setUser] = useState(null)
  const [members, setMembers] = useState([]);
  const [workspace, setWorkspace] = useState(null)

  const [projectName, setProjectName] = useState("")
  const [projectDesc, setProjectDesc] = useState("")

  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  
  const [logs, setLogs] = useState<any[]>([])
  const [content, setContent] = useState("")
  const [editingLogId, setEditingLogId] = useState<number | null>(null)

  // USER
  useEffect(() => {
      fetch('http://localhost:3000/auth/me', {
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          console.log("user:", data)
          setUser(data)
        })
  }, [])

  // WORKSPACE
  useEffect(() => {
    fetch(`http://localhost:3000/workspace/`, {
      credentials: "include",
    })
      .then(response => response.json())
      .then(data => {
        setWorkspace(data)
      })
  }, [])
// MEMBER
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


  // PROJECT
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

  // LOGS
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
    <div className='font-sans'>
      <aside className='fixed top-0 left-0 z-40 w-55 h-full transition-transform -translate-x-full sm:translate-x-0 bg-background-side'>
        <div className='h-full px-3 py-4 overflow-y-auto border-e border-default'>
          <h2 className='font-extrabold text-text-white text-2xl'>MonoLog</h2>
            <ul className='space-x-md text-text-white mt-10'>
              <p className='text-text-muted text-xs'>MAIN</p>

              <li>
                <a href="#" className="flex items-center px-2 py-1.5 rounded-md hover:bg-primary transition-all duration-200">
               <span>Dashboard</span>
                </a>
              </li>
              
              <p className='text-text-muted text-xs mt-5'>WORKSPACE</p>
              <li>
                <div className="items-center px-2 py-1.5 rounded-md bg-background-side-secondary">
                  <p>{workspace?.name}</p>
                  {/* <p className='text-sm text-text-muted'>Workspace</p> */}
                </div>
              </li>


            </ul>
            <div className='fixed bottom-0 text-text-white mb-10'>
              <button className='flex items-center px-2 py-1.5 text-body rounded-base'
                  onClick={handleLogout}>
                  Logout
              </button>
            </div>
        </div>

      </aside>

      <div className='p-4 sm:ml-55'>

        {user && 
          <div>
            <h2 className='text-xl font-bold'>Dashboard</h2>
            <p>Welcome back, <span className='text-primary capitalize'>{user?.name}!</span></p>
            
            <div className='flex w-full gap-3'>

              <div className='flex py-3 rounded-xl bg-surface shadow-sm border border-border w-1/4 items-center justify-between'>
                <div className='ml-2'>
                  <p className='text-sm mb-2 max-w-lg'>Your Role</p>
                  <p className='text-md font-bold text-primary capitalize'>{user?.role}</p>
                </div>
                <div className='bg-success-light p-2 rounded-md mr-2 text-success'>
                  <CircleUser />
                </div>
              </div>

              <div className='flex py-3 rounded-xl bg-surface shadow-sm border border-border w-1/4 items-center justify-between'>
                <div className='ml-2'>
                  <p className='text-sm mb-2 max-w-lg'>Total Members</p>
                  <p className='text-md font-bold text-primary capitalize'>
                    {/* {user?.workspaceId} */}
                  </p>
                </div>
                <div className='bg-success-light p-2 rounded-md mr-2 text-success'>
                  <CircleUser />
                </div>
              </div>

            </div>
          </div>
        }

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


      </div>
    </div>
  )
}

export default DashboardPage