interface LogFormProps {
  editingLogId: number | null;
  content: string;
  setContent: (value: string) => void;

  handleSubmitLog: () => void;
}

function LogForm({
  editingLogId,
  content,
  setContent,
  handleSubmitLog
}: LogFormProps) {

  return (
     <div>
        <h2>New Log</h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you work on today?"
        />

        <button onClick={handleSubmitLog}>
          {editingLogId ? "Edit Log" : "Submit Log"}
        </button>
      </div>
  )
}

export default LogForm