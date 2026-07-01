import prisma from "../config/db.js";

export const getAllTasks = async(userId, filters = {}) => {
    const where = { userId };
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;

    return prisma.task.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });
};

export const getTaskById = async(userId, id) => {
    return prisma.task.findFirst({ where: { id, userId } });
};

export const createTask = async(userId, data) => {
    return prisma.task.create({ data: {...data, userId } });
};

export const updateTask = async(userId, id, data) => {
    const task = await prisma.task.findFirst({ where: { id, userId } });
    if (!task) {
        const err = new Error("Task not found");
        err.status = 404;
        throw err;
    }
    return prisma.task.update({ where: { id }, data });
};

export const deleteTask = async(userId, id) => {
    const task = await prisma.task.findFirst({ where: { id, userId } });
    if (!task) {
        const err = new Error("Task not found");
        err.status = 404;
        throw err;
    }
    return prisma.task.delete({ where: { id } });
};