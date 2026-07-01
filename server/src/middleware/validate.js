const VALID_PRIORITIES = ["LOW", "MEDIUM", "HIGH"];
const VALID_STATUSES = ["TODO", "IN_PROGRESS", "DONE"];
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateTask = (req, res, next) => {
    const { title, priority, status, dueDate } = req.body || {};
    const errors = [];

    if (req.method === "POST" && (!title || !title.trim())) {
        errors.push("Title is required");
    }

    if (priority && !VALID_PRIORITIES.includes(priority)) {
        errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(", ")}`);
    }

    if (status && !VALID_STATUSES.includes(status)) {
        errors.push(`Status must be one of: ${VALID_STATUSES.join(", ")}`);
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
        errors.push("dueDate must be a valid date");
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
    }

    next();
};

export const validateTaskId = (req, res, next) => {
    const { id } = req.params;

    if (!UUID_REGEX.test(id)) {
        return res.status(400).json({ message: "Invalid task ID format" });
    }

    next();
};