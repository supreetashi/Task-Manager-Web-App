import * as aiService from "../services/ai.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const suggestTask = asyncHandler(async(req, res) => {
    const { title } = req.body;

    if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: "Title is required" });
    }

    const suggestion = await aiService.suggestTaskDetails(title);
    res.status(200).json(suggestion);
});