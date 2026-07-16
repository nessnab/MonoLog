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

  return (

    <div>
      {user && 
        <div>
              <h2 className='text-xl font-bold'>Dashboard</h2>
              <p className='mb-2'>
                Welcome back, <span className='text-primary capitalize'>
                {user?.name}!
                </span>
              </p>
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
      }
    </div>
  )
}

export default DashboardStat;