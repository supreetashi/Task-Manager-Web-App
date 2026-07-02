export const verifyCsrf = (req, res, next) => {
    const cookieToken = req.cookies ? req.cookies.csrfToken : undefined;
    const headerToken = req.headers["x-csrf-token"];

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
        return res.status(403).json({ message: "Invalid CSRF token" });
    }
    next();
};