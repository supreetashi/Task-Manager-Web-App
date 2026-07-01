import * as taskService from "../services/task.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getTasks = asyncHandler(async(req, res) => {
    const { status, priority } = req.query;
    const tasks = await taskService.getAllTasks({ status, priority });
    res.status(200).json(tasks);
});

export const getTask = asyncHandler(async(req, res) => {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
});

export const postTask = asyncHandler(async(req, res) => {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
});

export const putTask = asyncHandler(async(req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json(task);
});

export const removeTask = asyncHandler(async(req, res) => {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
});