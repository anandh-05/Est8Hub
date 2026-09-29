import { Navigate } from "react-router-dom";
import { getDashboardPath, getUser, isAuthenticated, logout } from "../utils/auth";

function ProtectedRoute({ children, role }) {
    if (!isAuthenticated()) {
        logout();
        return <Navigate to="/login" replace />;
    }

    const user = getUser();

    if (role && user?.role !== role) {
        return <Navigate to={getDashboardPath(user) || "/login"} replace />;
    }

    return children;
}

export default ProtectedRoute;
