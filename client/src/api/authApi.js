const BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

const handleResponse = async(res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
};

export const registerUser = async(email, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
};

export const loginUser = async(email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
};

export const logoutUser = async() => {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
    return handleResponse(res);
};

export const fetchMe = async() => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
        credentials: "include",
    });
    return handleResponse(res);
};