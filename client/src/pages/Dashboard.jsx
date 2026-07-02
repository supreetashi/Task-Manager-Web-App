import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";
import KanbanBoard from "../components/KanbanBoard";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import DarkModeToggle from "../components/DarkModeToggle";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    addTask,
    editTask,
    removeTask,
  } = useTasks();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleLogout = async () => {
    await logout();
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await editTask(taskId, { status: newStatus });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await removeTask(taskId);
    } catch (err) {
      alert(err.message);
    }
  };

  const openNewTaskForm = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleFormSubmit = async (taskData) => {
    if (editingTask) {
      await editTask(editingTask.id, taskData);
    } else {
      await addTask(taskData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Task Manager
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 dark:text-gray-300 text-sm hidden sm:inline">
            {user?.email}
          </span>

          <DarkModeToggle />

          <button
            onClick={openNewTaskForm}
            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Task
          </button>

          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      <TaskFilters filters={filters} setFilters={setFilters} />

      {loading && <p className="text-gray-500">Loading tasks...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <KanbanBoard
          tasks={tasks}
          onEdit={openEditForm}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      {formOpen && (
        <TaskForm
          task={editingTask}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Dashboard;