interface DashboardStatProps {
  user: any;
  members: any[];
}

import Card from "../ui/Card";
import { CircleUser } from 'lucide-react'

function DashboardStat({
  user,
  members,
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
                      icon={<CircleUser size={22} />}
                  />
    
                  <Card
                      title="Total Members"
                      value={members.length}
                      icon={<CircleUser size={22} />}
                  />
              </div>
        </div>
      }
    </div>
  )
}

export default DashboardStat;