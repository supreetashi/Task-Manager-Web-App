import { DndContext, closestCorners } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";

const STATUSES = ["TODO", "IN_PROGRESS", "DONE"];

const KanbanBoard = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const draggedTask = tasks.find((t) => t.id === taskId);
    if (!draggedTask) return;

    let newStatus = over.id;
    if (!STATUSES.includes(newStatus)) {
      const overTask = tasks.find((t) => t.id === over.id);
      newStatus = overTask?.status;
    }

    if (newStatus && newStatus !== draggedTask.status) {
      onStatusChange(taskId, newStatus);
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUSES.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;