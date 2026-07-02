import { useState, useEffect } from "react";
import * as taskApi from "../api/taskApi";

const TaskForm = ({ task, onClose, onSubmit }) => {
  const isEditing = !!task;

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.slice(0, 10) : ""
  );
  const [priority, setPriority] = useState(task?.priority || "MEDIUM");
  const [status, setStatus] = useState(task?.status || "TODO");

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiSuggested, setAiSuggested] = useState(false); // tracks if fields came from AI

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleAiSuggest = async () => {
    if (!title.trim()) {
      setAiError("Enter a task title first");
      return;
    }
    setAiError("");
    setAiLoading(true);
    try {
      const suggestion = await taskApi.suggestTask(title);
      setDescription(suggestion.description);
      setPriority(suggestion.priority);
      setAiSuggested(true);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  setSaving(true);
  setSaveError("");
  try {
    await onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      priority,
      status,
    });
    onClose();
  } catch (err) {
    setSaveError(err.message);
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {isEditing ? "Edit Task" : "New Task"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setAiSuggested(false);
            }}
            placeholder="e.g. fix login bug"
            required
            className="w-full mb-2 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <button
            type="button"
            onClick={handleAiSuggest}
            disabled={aiLoading || !title.trim()}
            className="text-sm mb-3 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50 dark:bg-purple-900 dark:text-purple-200"
          >
            {aiLoading ? "Thinking..." : "✨ AI Suggest"}
          </button>

          {aiError && <p className="text-red-500 text-xs mb-2">{aiError}</p>}
          {aiSuggested && (
            <p className="text-xs text-purple-600 dark:text-purple-300 mb-2">
              AI-suggested — feel free to edit below before saving
            </p>
          )}

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full mb-3 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          {saveError && <p className="text-red-500 text-sm mb-3">{saveError}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;