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
    return Boolean(localStorage.getItem("access") && getUser());
};

export const getDashboardPath = (user = getUser()) => {
    if (user?.role === "OWNER") return "/owner-dashboard";
    if (user?.role === "TENANT") return "/tenant-dashboard";
    return null;
};

export const saveAuthSession = ({ access, refresh, user }) => {
    if (!access || !refresh || !getDashboardPath(user)) {
        throw new Error("The login response did not include a valid user role.");
    }

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
};
