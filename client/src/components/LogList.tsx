interface LogListProps {
  logs: any[]
}

function LogList({ logs }) {

  return (
    <div>
      <h2>Logs</h2>

      {logs.map((log) => (
        <div key={log.id}>
          {log.content}
        </div>
      ))}
    </div>
  )
}

export default LogList