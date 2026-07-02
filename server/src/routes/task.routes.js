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
import { verifyCsrf } from "../middleware/csrf.js";

const router = Router();

router.use(requireAuth);

router.get("/", getTasks);
router.get("/:id", validateTaskId, getTask);
router.post("/", verifyCsrf, validateTask, postTask);
router.put("/:id", verifyCsrf, validateTaskId, validateTask, putTask);
router.delete("/:id", verifyCsrf, validateTaskId, removeTask);

export default router;