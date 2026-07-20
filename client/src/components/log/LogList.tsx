interface Project {
    id: number;
    name: string;
    description?: string;
}

interface LogListProps {
  logs: any[]
  selectedProject: Project | null; 
  onEditLog: (log: any) => void
}

import { PencilLine } from 'lucide-react'

function LogList({ 
  logs, 
  selectedProject,
  onEditLog,
 }: LogListProps) {

  if (!selectedProject) {
    return (
      <div className="flex h-50 flex-col items-center justify-center rounded-xl border border-border bg-surface text-center shadow-md">
        <p className="text-4xl mb-2">📝</p>

        <h3 className="font-semibold">
          Select a project
        </h3>

        <p className="mt-1 text-sm text-text-secondary max-w-xs">
          Choose a project to view its activity logs.
        </p>
      </div>
    );
  }
  if (logs.length === 0) {
    return (
      <div className="flex h-50 flex-col items-center justify-center rounded-xl border border-border bg-surface text-center shadow-sm">
        <p className="text-4xl mb-2">💬</p>

        <h3 className="font-semibold">
          No logs yet
        </h3>

        <p className="mt-1 text-sm text-text-secondary max-w-xs">
          Be the first to share today's progress.
        </p>
      </div>
    );
  }
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