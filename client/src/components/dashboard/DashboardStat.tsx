interface Project {
    id: number;
    name: string;
    description?: string;
}
interface DashboardStatProps {
  user: any;
  members: any[];
  projects: Project[]
}

import Card from "../ui/Card";
import { Folders, UserRound, UsersRound } from 'lucide-react'

function DashboardStat({
  user,
  members,
  projects,
}: DashboardStatProps) {

  const isEmpty =
    projects.length === 0 &&
    members.length <= 1;
  
  return (
      
      <div>
      {user && (
        <div>
            {isEmpty ? (
                <div className="mb-6 rounded-xl border border-primary-light bg-primary-light p-5">
            
                    <h2 className="font-bold text-lg">
                        Welcome to MonoLog, <span className="capitalize">
                        {user?.name}!
                        </span>
                    </h2>
            
                    <p className="mt-2 text-sm text-text-secondary">
                        You're almost ready. Here's how to get started:
                    </p>
            
                    <ol className="mt-4 space-y-2 text-sm">
                        <li>① Create your first project</li>
                        <li>② Create your teammates account</li>
                        <li>③ Start posting daily logs</li>
                    </ol>
            
                </div>
            ) : (
                <p className='mb-2'>
                  <h2 className='text-xl font-bold'>Dashboard</h2>
                  Welcome back, <span className='text-primary capitalize'>
                  {user?.name}!
                  </span>
                </p>
            )}

              <div className="grid grid-cols-4 gap-4">
                
                  <Card
                      title="Your Role"
                      value={user.role}
                      icon={<UserRound size={22} />}
                  />
    
                  <Card
                      title="Total Members"
                      value={members.length}
                      icon={<UsersRound size={22} />}
                  />

                  <Card
                      title="Total Projects"
                      value={projects.length}
                      icon={<Folders size={22} />}
                  />
              </div>
        </div>

      )
      }
    </div>
  )
}

export default DashboardStat;