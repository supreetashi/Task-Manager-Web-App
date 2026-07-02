import { getCsrfToken } from "../utils/csrf";

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

const jsonHeaders = () => ({
    "Content-Type": "application/json",
    "X-CSRF-Token": getCsrfToken(),
});

const handleResponse = async(res) => {
    if (res.status === 204) return null;
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
};

export const fetchTasks = async(filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const res = await fetch(`${BASE_URL}/tasks${params ? `?${params}` : ""}`, {
    credentials: "include",
  });
  return handleResponse(res);
};

export const createTask = async (taskData) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: jsonHeaders(),
    credentials: "include",
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

export const updateTask = async (id, taskData) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    credentials: "include",
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: jsonHeaders(),
    credentials: "include",
  });
  return handleResponse(res);
};

export const suggestTask = async (title) => {
  const res = await fetch(`${BASE_URL}/ai/suggest`, {
    method: "POST",
    headers: jsonHeaders(),
    credentials: "include",
    body: JSON.stringify({ title }),
  });
  return handleResponse(res);
};