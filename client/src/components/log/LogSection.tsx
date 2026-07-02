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
  // setSelectedProject: React.Dispatch<
  //   React.SetStateAction<Project | null>
  // >;
}

import { useState } from "react";
import LogForm from "./LogForm";
import LogList from "./LogList";


function LogSection({
  selectedProject,
  logs,
  setLogs,
  // setSelectedProject,
  // onEditLog,
}: LogSectionProps) {

  // const [logs, setLogs] = useState<any[]>([])
  const [content, setContent] = useState("")
  const [editingLogId, setEditingLogId] = useState<number | null>(null)

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

  return (
    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
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
  )
}

export default LogSection