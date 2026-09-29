export const getUser = () => {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined") {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch {
        localStorage.removeItem("user");
        return null;
    }
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("access");
};

export const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
};
