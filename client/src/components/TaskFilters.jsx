const TaskFilters = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex gap-3 mb-4">
      <select
        value={filters.status}
        onChange={(e) => handleChange("status", e.target.value)}
        className="px-3 py-1.5 text-sm border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
      >
        <option value="">All Statuses</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => handleChange("priority", e.target.value)}
        className="px-3 py-1.5 text-sm border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
      >
        <option value="">All Priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      {(filters.status || filters.priority) && (
        <button
          onClick={() => setFilters({ status: "", priority: "" })}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default TaskFilters;