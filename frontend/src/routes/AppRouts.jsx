import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import BrowseProperties from "../pages/BrowseProperties";
import Navbar from "../components/Navbar";
import OwnerDashboard from "../pages/owner/Dashboard";
import TenantDashboard from "../pages/tanent/Dashboard";
import TenantUtilityPage from "../pages/tanent/TenantUtilityPage";
import TenantProfile from "../pages/tanent/Profile";
import PropertyDetails from "../pages/tanent/PropertyDetails";
import AddProperty from "../pages/owner/AddProperty";
import MyProperties from "../pages/owner/MyProperties";
import Bookings from "../pages/owner/Bookings";
import Payments from "../pages/owner/Payments";
import Notifications from "../pages/owner/Notifications";
import Profile from "../pages/owner/Profile";
import OwnerUtilityPage from "../pages/owner/OwnerUtilityPage";
import ProtectedRoute from "../components/ProtectedRoute";
import OwnerLayout from "../components/owner/OwnerLayout";
import TenantLayout from "../components/tenant/TenantLayout";
import { getDashboardPath, isAuthenticated } from "../utils/auth";


function AuthRedirect() {
    return <Navigate to={isAuthenticated() ? getDashboardPath() || "/login" : "/login"} replace />;
}


function AppRoutes() {
    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<AuthRedirect />} />

                <Route path="/home" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<ProtectedRoute><AuthRedirect /></ProtectedRoute>} />
                <Route path="/owner-dashboard" element={<ProtectedRoute role="OWNER"><Navigate to="/owner/dashboard" replace /></ProtectedRoute>} />
                <Route element={<ProtectedRoute role="OWNER"><OwnerLayout /></ProtectedRoute>}>
                    <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                    <Route path="/owner/properties" element={<MyProperties />} />
                    <Route path="/owner/bookings" element={<Bookings />} />
                    <Route path="/owner/payments" element={<Payments />} />
                    <Route path="/owner/notifications" element={<Notifications />} />
                    <Route path="/owner/profile" element={<Profile />} />
                    <Route path="/owner/messages" element={<OwnerUtilityPage type="messages" />} />
                    <Route path="/owner/settings" element={<OwnerUtilityPage type="settings" />} />
                    <Route path="/add-property" element={<AddProperty />} />
                </Route>

                <Route element={<ProtectedRoute role="TENANT"><TenantLayout /></ProtectedRoute>}>
                    <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                    <Route path="/tenant/bookings" element={<TenantUtilityPage type="bookings" />} />
                    <Route path="/tenant/payments" element={<TenantUtilityPage type="payments" />} />
                    <Route path="/tenant/notifications" element={<TenantUtilityPage type="notifications" />} />
                    <Route path="/tenant/profile" element={<TenantProfile />} />
                    <Route path="/tenant/settings" element={<TenantUtilityPage type="settings" />} />
                    <Route path="/tenant/dashboard" element={<Navigate to="/tenant-dashboard" replace />} />
                </Route>

                <Route
                    path="/properties"
                    element={<BrowseProperties />}
                />

                <Route
                    path="/properties/:id"
                    element={<PropertyDetails />}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;
