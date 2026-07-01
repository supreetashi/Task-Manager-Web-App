export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.code === "P2025") {
        // Prisma: record not found
        return res.status(404).json({ message: "Resource not found" });
    }

    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
    });
};