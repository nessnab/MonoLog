interface Workspace {
  name: string;
}

interface Project {
    id: number;
    name: string;
    description?: string;
}

interface User {
    id: number;
    name: string;
    role: string;
    workspaceId: number;
}

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//UI
import DashboardStat from '../components/dashboard/DashboardStat'
import ProjectSection from '../components/project/ProjectSection'
import LogSection from '../components/log/LogSection'
import MemberSection from '../components/member/MemberSection'

function DashboardPage() {
  

  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(null)
  const [members, setMembers] = useState([]);
  const [workspace, setWorkspace] = useState<Workspace | null>(null)

  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  
  const [logs, setLogs] = useState<any[]>([])

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
  const fetchMembers = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:3000/workspace/${user.workspaceId}/users`,
        {
          credentials: "include",
        }
      )

      const data = await res.json();
      setMembers(data);
    }
    catch (err) {
      console.error(err)
    }
  
  }

  useEffect(() => {
    fetchMembers()
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
    <div className='font-sans p-4'>
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

        <DashboardStat
            user={user}
            members={members}
        />

        <ProjectSection
          user={user}
          projects={projects}
          setProjects={setProjects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <LogSection
          // user={user}
          selectedProject={selectedProject}
          logs={logs}
          setLogs={setLogs}
        />

        <MemberSection 
          user={user}
          members={members}
          refreshMembers={fetchMembers}
        />

        {/* {user?.role === "admin" && (
          <div>
            <h2>Create Member</h2>
            <CreateMemberForm
              workspaceId={user?.workspaceId}
              // onMemberCreated={fetchMembers}
            />
          </div>
        )}

        <MemberList members={members} /> */}

      </div>
    </div>
  )
}

export default DashboardPage