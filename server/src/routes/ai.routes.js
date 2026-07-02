import { Router } from "express";
import { suggestTask } from "../controllers/ai.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { verifyCsrf } from "../middleware/csrf.js";

const router = Router();

router.use(requireAuth);
router.post("/suggest", verifyCsrf, suggestTask);

export default router;