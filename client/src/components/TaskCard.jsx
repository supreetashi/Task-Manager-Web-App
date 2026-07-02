import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const priorityColors = {
  LOW: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  HIGH: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-3 cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
          {task.title}
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <p className="text-xs text-gray-400 mb-2">
          Due {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="flex gap-2 mt-2" onPointerDown={(e) => e.stopPropagation()}>
        <button
          onClick={() => onEdit(task)}
          className="text-xs text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;