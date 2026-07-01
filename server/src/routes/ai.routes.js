import { Router } from "express";
import { suggestTask } from "../controllers/ai.controller.js";

const router = Router();

router.post("/suggest", suggestTask);

export default router;