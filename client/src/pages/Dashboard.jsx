import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, error } = useTasks();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Task Manager
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            {user?.email}
          </span>

          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {loading && <p className="text-gray-500">Loading tasks...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <p className="text-gray-600 dark:text-gray-300">
          {tasks.length} task(s) loaded — board UI coming next.
        </p>
      )}
    </div>
  );
};

export default Dashboard;