import prisma from "../config/db.js";

export const getAllTasks = async(filters = {}) => {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;

    return prisma.task.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });
};

export const getTaskById = async(id) => {
    return prisma.task.findUnique({ where: { id } });
};

export const createTask = async(data) => {
    return prisma.task.create({ data });
};

export const updateTask = async(id, data) => {
    return prisma.task.update({ where: { id }, data });
};

export const deleteTask = async(id) => {
    return prisma.task.delete({ where: { id } });
};