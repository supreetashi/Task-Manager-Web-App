import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authCookieOptions, csrfCookieOptions } from "../utils/cookieOptions.js";

export const register = asyncHandler(async(req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await authService.registerUser(email, password);
    res.status(201).json(user);
});

export const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const { token, csrfToken, user } = await authService.loginUser(email, password);

    res.cookie("token", token, authCookieOptions);
    res.cookie("csrfToken", csrfToken, csrfCookieOptions);
    res.status(200).json({ user });
});

export const logout = asyncHandler(async(req, res) => {
    res.clearCookie("token", authCookieOptions);
    res.clearCookie("csrfToken", csrfCookieOptions);
    res.status(200).json({ message: "Logged out" });
});

export const me = asyncHandler(async(req, res) => {
    // req.userId and req.userEmail are set by requireAuth
    res.status(200).json({ user: { id: req.userId, email: req.userEmail } });
});