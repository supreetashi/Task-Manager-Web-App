import { useState, useEffect, useCallback } from "react";
import * as taskApi from "../api/taskApi";

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({ status: "", priority: "" });

    const loadTasks = useCallback(async() => {
        setLoading(true);
        setError("");
        try {
            const activeFilters = Object.fromEntries(
                Object.entries(filters).filter(([, v]) => v)
            );
            const data = await taskApi.fetchTasks(activeFilters);
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const addTask = async(taskData) => {
        const newTask = await taskApi.createTask(taskData);
        setTasks((prev) => [newTask, ...prev]);
    };

    const editTask = async(id, taskData) => {
        const updated = await taskApi.updateTask(id, taskData);
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    };

    const removeTask = async(id) => {
        await taskApi.deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return {
        tasks,
        loading,
        error,
        filters,
        setFilters,
        addTask,
        editTask,
        removeTask,
        reload: loadTasks,
    };
};