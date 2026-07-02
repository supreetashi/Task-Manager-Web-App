import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const columnStyles = {
  TODO: "border-t-4 border-gray-400",
  IN_PROGRESS: "border-t-4 border-blue-500",
  DONE: "border-t-4 border-green-500",
};

const columnLabels = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const TaskColumn = ({ status, tasks, onEdit, onDelete }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[280px] bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 ${columnStyles[status]} ${
        isOver ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-4 flex justify-between">
        {columnLabels[status]}
        <span className="text-sm font-normal text-gray-400">{tasks.length}</span>
      </h2>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="min-h-[100px]">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
          {tasks.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-8">No tasks</p>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default TaskColumn;