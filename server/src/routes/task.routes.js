import { Router } from "express";
import {
    getTasks,
    getTask,
    postTask,
    putTask,
    removeTask,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", postTask);
router.put("/:id", putTask);
router.delete("/:id", removeTask);

export default router;