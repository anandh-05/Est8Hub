import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import OwnerIcon from "../owner/OwnerIcon";

const links = [["Dashboard", "/tenant-dashboard", "grid"], ["Browse", "/properties", "building"], ["My Bookings", "/tenant/bookings", "calendar"], ["Payments", "/tenant/payments", "wallet"], ["Notifications", "/tenant/notifications", "bell"], ["Profile", "/tenant/profile", "user"], ["Settings", "/tenant/settings", "settings"]];

function TenantSidebar() {
    const navigate = useNavigate();
    const signOut = () => { logout(); navigate("/login", { replace: true }); };
    const linkClass = ({ isActive }) => `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${isActive ? "bg-[#d9ad45] text-[#1b1915]" : "text-zinc-300 hover:bg-white/10 hover:text-white"}`;
    return <><aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#1d1d1b] px-4 py-6 lg:flex"><NavLink to="/tenant-dashboard" className="px-2"><span className="text-xl font-bold tracking-[-0.04em] text-white">Est8<span className="text-[#e6c36e]">Hub</span></span><span className="mt-1 block text-[10px] font-bold tracking-[0.14em] text-zinc-500">SMART RENTALS. BETTER LIVING.</span></NavLink><nav className="mt-10 space-y-1.5">{links.map(([label, to, icon]) => <NavLink key={to} to={to} end={to === "/tenant-dashboard"} className={linkClass}><OwnerIcon name={icon} size={19} /><span>{label}</span></NavLink>)}</nav><button type="button" onClick={signOut} className="mt-auto flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-zinc-400 transition hover:bg-red-500/10 hover:text-red-300"><OwnerIcon name="logout" size={19} />Logout</button></aside><nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-zinc-200 bg-white px-2 lg:hidden">{links.slice(0, 5).map(([label, to, icon]) => <NavLink key={to} to={to} end={to === "/tenant-dashboard"} className={({ isActive }) => `flex min-h-12 min-w-12 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${isActive ? "text-[#96701d]" : "text-zinc-500"}`}><OwnerIcon name={icon} size={18} /><span>{label}</span></NavLink>)}</nav></>;
}

export default TenantSidebar;
