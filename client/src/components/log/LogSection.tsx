interface Project {
    id: number;
    name: string;
    description?: string;
}
interface Log {
    id: number;
    content: string;
    projectId: number;
}
interface LogSectionProps {
  selectedProject: Project | null;

  logs: Log[];
  setLogs: React.Dispatch<
    React.SetStateAction<Log[]>
  >;
}

import { useState } from "react";
import LogForm from "./LogForm";
import LogList from "./LogList";


function LogSection({
  selectedProject,
  logs,
  setLogs,
}: LogSectionProps) {

  const [content, setContent] = useState("")
  const [error, setError] = useState("");
  const [editingLogId, setEditingLogId] = useState<number | null>(null)

  // Create logs
  const handleSubmitLog = async () => {
    if (!selectedProject) {
      setError("Select a project first");
      return
    }
    if (!content.trim()) {
      setError("Log can not be empty");
      return;
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
        if (!res.ok) {
          setError(data.error);
          return;
        } 
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
        if (!res.ok) {
          setError(data.error);
          return;
        } 
        setLogs((prev) => [data, ...prev]);
      }
      setEditingLogId(null)
      setContent((""))
      setError((""))
    } catch (err) {
      console.error(err)
    }
  } 

  // Edit btn log
  const handleEditLog = (log: any) => {
    setEditingLogId(log.id);
    setContent(log.content);
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
      <LogList
        logs={logs}
        onEditLog={handleEditLog}
      />
      <LogForm
        content={content}
        error={error}
        setContent={setContent}
        handleSubmitLog={handleSubmitLog}
        editingLogId={editingLogId}
      />

    </div>
  )
}

export default LogSection