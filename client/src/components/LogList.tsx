interface LogListProps {
  logs: any[]
  onEditLog: (log: any) => void
}

function LogList({ 
  logs, 
  onEditLog,
 }: LogListProps) {

  return (
    <div>
      <h2>Logs</h2>

      {logs.map((log) => (
        <div key={log.id}>
          {log.content}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditLog(log);
            }}>
            Edit
          </button>
        </div>
      ))}
    </div>
  )
}

export default LogList