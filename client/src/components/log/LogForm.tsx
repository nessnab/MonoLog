interface LogFormProps {
  editingLogId: number | null;
  content: string;
  setContent: (value: string) => void;
  error: any

  handleSubmitLog: () => void;
}

import Button from '../ui/Button'

function LogForm({
  editingLogId,
  content,
  error,
  setContent,
  handleSubmitLog
}: LogFormProps) {

  return (
     <div className="items-center rounded-xl border border-border bg-surface shadow-sm p-4">
        <h2 className="font-bold text-base">New Log</h2>

        <textarea
          className="text-sm my-1 w-full rounded-md border border-border px-4 py-3 focus:border-primary focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you work on today?"
        />
        {error && (
          <p className="text-sm text-danger">
            {error}
          </p>
        )}
        <Button onClick={handleSubmitLog}>
          {editingLogId ? "Edit Log" : "Submit Log"}
        </Button>
      </div>
  )
}

export default LogForm