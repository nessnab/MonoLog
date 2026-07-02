interface LogListProps {
  logs: any[]
  onEditLog: (log: any) => void
}

import { PencilLine } from 'lucide-react'

function LogList({ 
  logs, 
  onEditLog,
 }: LogListProps) {

  return (
    <div className="h-45 overflow-y-auto items-center rounded-xl border border-border bg-surface shadow-sm p-4">
      <h2 className="font-bold text-base">Logs</h2>

      {logs.map((log) => (
        <div 
          key={log.id}
          className="flex items-center justify-between rounded-sm ml-1 my-1 py-2 px-2 cursor-pointer transition border-b border-border first-letter:uppercase">
          {log.content}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditLog(log);
            }}>
            <PencilLine size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default LogList