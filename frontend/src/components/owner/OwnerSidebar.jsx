import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import OwnerIcon from "./OwnerIcon";

const primaryNavigation = [
    { label: "Dashboard", to: "/owner/dashboard", icon: "grid" },
    { label: "My Properties", to: "/owner/properties", icon: "building" },
    { label: "Add Property", to: "/add-property", icon: "plusSquare" },
    { label: "Bookings", to: "/owner/bookings", icon: "calendar" },
    { label: "Payments", to: "/owner/payments", icon: "wallet" },
];

const secondaryNavigation = [
    { label: "Messages", to: "/owner/messages", icon: "message", badge: "2" },
    { label: "Notifications", to: "/owner/notifications", icon: "bell", badge: "4" },
    { label: "Profile", to: "/owner/profile", icon: "user" },
    { label: "Settings", to: "/owner/settings", icon: "settings" },
];

function SidebarLink({ item, onClose }) {
    return (
        <NavLink
            to={item.to}
            end={item.to === "/owner/dashboard" || item.to === "/add-property"}
            onClick={onClose}
            className={({ isActive }) => `group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${
                isActive
                    ? "bg-[#d9ad45] text-[#1b1915] shadow-[0_8px_18px_rgba(217,173,69,0.2)]"
                    : "text-zinc-300 hover:bg-white/8 hover:text-white focus-visible:bg-white/8 focus-visible:text-white"
            }`}
        >
            {({ isActive }) => (
                <>
                    <OwnerIcon
                        name={item.icon}
                        size={19}
                        className={isActive ? "text-[#1b1915]" : "text-zinc-400 group-hover:text-[#e8c36c]"}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? (
                        <span
                            className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold ${
                                isActive ? "bg-[#1b1915] text-[#f5dc95]" : "bg-[#d9ad45] text-[#1b1915]"
                            }`}
                        >
                            {item.badge}
                        </span>
                    ) : null}
                </>
            )}
        </NavLink>
    );
}

function OwnerSidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        onClose();
        navigate("/login", { replace: true });
    };

    return (
        <>
            <button
                type="button"
                aria-label="Close navigation menu"
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-zinc-950/55 backdrop-blur-[1px] transition lg:hidden ${
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            <aside
                aria-label="Owner navigation"
                className={`fixed inset-y-0 left-0 z-50 flex w-[18rem] flex-col border-r border-white/8 bg-[#191918] px-4 py-5 shadow-2xl transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-start justify-between px-2">
                    <NavLink to="/owner/dashboard" onClick={onClose} className="group">
                        <div className="flex items-center gap-2.5">
                            <span className="grid size-9 place-items-center rounded-xl bg-[#d9ad45] text-[#1b1915] shadow-[0_8px_18px_rgba(217,173,69,0.18)]">
                                <OwnerIcon name="building" size={20} strokeWidth={2.3} />
                            </span>
                            <span className="text-xl font-bold tracking-[-0.04em] text-white">
                                Est8<span className="text-[#e6c36e]">Hub</span>
                            </span>
                        </div>
                        <p className="mt-2 text-[11px] font-medium tracking-[0.08em] text-zinc-500">
                            FIND. RENT. LIVE BETTER.
                        </p>
                    </NavLink>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close navigation"
                        className="grid size-9 place-items-center rounded-lg text-zinc-400 hover:bg-white/8 hover:text-white focus-visible:bg-white/8 lg:hidden"
                    >
                        <OwnerIcon name="close" size={20} />
                    </button>
                </div>

                <nav className="mt-9 space-y-1.5">
                    <p className="px-3 pb-2 text-[10px] font-bold tracking-[0.16em] text-zinc-600">WORKSPACE</p>
                    {primaryNavigation.map((item) => (
                        <SidebarLink key={item.to} item={item} onClose={onClose} />
                    ))}
                </nav>

                <nav className="mt-7 space-y-1.5 border-t border-white/8 pt-6">
                    <p className="px-3 pb-2 text-[10px] font-bold tracking-[0.16em] text-zinc-600">ACCOUNT</p>
                    {secondaryNavigation.map((item) => (
                        <SidebarLink key={item.to} item={item} onClose={onClose} />
                    ))}
                </nav>

                <div className="mt-auto space-y-3 pt-6">
                    <div className="rounded-2xl border border-[#d9ad45]/20 bg-[#24231f] p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                            <OwnerIcon name="help" size={18} className="text-[#e6c36e]" />
                            Need help?
                        </div>
                        <p className="mt-1 text-xs leading-5 text-zinc-400">Our support team is here when you need us.</p>
                        <a
                            href="mailto:support@est8hub.com"
                            className="mt-3 flex min-h-9 items-center justify-center rounded-lg border border-[#d9ad45]/45 px-3 text-xs font-semibold text-[#efd48b] transition hover:bg-[#d9ad45] hover:text-[#1b1915] focus-visible:bg-[#d9ad45] focus-visible:text-[#1b1915]"
                        >
                            Contact Support
                        </a>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-zinc-400 transition hover:bg-red-500/10 hover:text-red-300 focus-visible:bg-red-500/10 focus-visible:text-red-300"
                    >
                        <OwnerIcon name="logout" size={19} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

export default OwnerSidebar;
