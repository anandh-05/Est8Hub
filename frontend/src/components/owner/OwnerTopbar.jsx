import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import OwnerIcon from "./OwnerIcon";

function initialsFor(user) {
    const name = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.username || "Owner";
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function OwnerTopbar({ user, onMenuClick, notificationCount = 0 }) {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const ownerName = useMemo(
        () => [user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.username || "Property Owner",
        [user],
    );

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
            <div className="flex min-h-[4.75rem] items-center gap-3 px-4 sm:gap-5 sm:px-6 xl:px-10">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                    className="grid size-10 shrink-0 place-items-center rounded-xl border border-zinc-200 text-zinc-700 transition hover:border-[#d9ad45] hover:bg-[#fffaf0] hover:text-[#8a6516] focus-visible:border-[#d9ad45] focus-visible:bg-[#fffaf0] lg:hidden"
                >
                    <OwnerIcon name="menu" size={21} />
                </button>

                <form
                    role="search"
                    onSubmit={(event) => event.preventDefault()}
                    className="hidden max-w-xl flex-1 sm:block"
                >
                    <label className="relative block">
                        <span className="sr-only">Search dashboard</span>
                        <OwnerIcon name="search" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="search"
                            placeholder="Search properties, bookings, tenants..."
                            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#d9ad45] focus:bg-white focus:ring-4 focus:ring-[#d9ad45]/10"
                        />
                    </label>
                </form>

                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                    <Link
                        to="/owner/notifications"
                        aria-label={`Notifications${notificationCount ? `, ${notificationCount} unread` : ""}`}
                        className="relative grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:border-[#d9ad45] hover:bg-[#fffaf0] hover:text-[#8a6516] focus-visible:border-[#d9ad45] focus-visible:bg-[#fffaf0]"
                    >
                        <OwnerIcon name="bell" size={19} />
                        {notificationCount > 0 ? (
                            <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[#c4912d] px-1 text-[10px] font-bold leading-5 text-white ring-2 ring-white">
                                {notificationCount > 9 ? "9+" : notificationCount}
                            </span>
                        ) : null}
                    </Link>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsProfileMenuOpen((open) => !open)}
                            aria-expanded={isProfileMenuOpen}
                            aria-haspopup="menu"
                            className="flex items-center gap-2 rounded-xl p-1 text-left transition hover:bg-zinc-50 focus-visible:bg-zinc-50"
                        >
                            <span className="grid size-9 place-items-center rounded-xl bg-[#1d1d1b] text-xs font-bold text-[#f1d88e]">
                                {initialsFor(user)}
                            </span>
                            <span className="hidden min-w-0 sm:block">
                                <span className="block max-w-32 truncate text-sm font-semibold text-zinc-800">{ownerName}</span>
                                <span className="block text-[11px] font-medium text-zinc-500">Property Owner</span>
                            </span>
                            <OwnerIcon name="chevronDown" size={16} className="hidden text-zinc-400 sm:block" />
                        </button>

                        {isProfileMenuOpen ? (
                            <div
                                role="menu"
                                className="absolute right-0 top-[calc(100%+0.5rem)] w-52 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl shadow-zinc-900/10"
                            >
                                <Link
                                    to="/owner/profile"
                                    role="menuitem"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-[#fff9eb] hover:text-[#78570e]"
                                >
                                    <OwnerIcon name="user" size={16} />
                                    My Profile
                                </Link>
                                <Link
                                    to="/owner/settings"
                                    role="menuitem"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-[#fff9eb] hover:text-[#78570e]"
                                >
                                    <OwnerIcon name="settings" size={16} />
                                    Settings
                                </Link>
                                <div className="my-1 border-t border-zinc-100" />
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                                >
                                    <OwnerIcon name="logout" size={16} />
                                    Logout
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default OwnerTopbar;
