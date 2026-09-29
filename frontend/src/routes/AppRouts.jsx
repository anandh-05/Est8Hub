import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import OwnerDashboard from "../pages/owner/Dashboard";
import TenantDashboard from "../pages/tanent/Dashboard";
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
import { getUser } from "../utils/auth";


function Dashboard() {
    const user = getUser();

    return user?.role === "OWNER" ? <Navigate to="/owner/dashboard" replace /> : <TenantDashboard />;
}


function AppRoutes() {
    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
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

                <Route
                    path="/tenant/dashboard"
                    element={
                        <ProtectedRoute role="TENANT">
                            <TenantDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/properties"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/properties/:id"
                    element={
                        <ProtectedRoute>
                            <PropertyDetails />
                        </ProtectedRoute>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;
