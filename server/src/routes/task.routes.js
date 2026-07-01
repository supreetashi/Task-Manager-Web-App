import { Router } from "express";
import {
    getTasks,
    getTask,
    postTask,
    putTask,
    removeTask,
} from "../controllers/task.controller.js";
import { validateTask, validateTaskId } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/", getTasks);
router.get("/:id", validateTaskId, getTask);
router.post("/", validateTask, postTask);
router.put("/:id", validateTaskId, validateTask, putTask);
router.delete("/:id", validateTaskId, removeTask);

export default router;