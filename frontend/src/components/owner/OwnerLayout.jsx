import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getUser } from "../../utils/auth";
import OwnerSidebar from "./OwnerSidebar";
import OwnerTopbar from "./OwnerTopbar";

function OwnerLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = getUser();

    useEffect(() => {
        if (!isSidebarOpen) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isSidebarOpen]);

    return (
        <div className="min-h-screen bg-[#f7f7f5] text-[#1d1d1b]">
            <OwnerSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="min-h-screen lg:pl-72">
                <OwnerTopbar
                    user={user}
                    onMenuClick={() => setIsSidebarOpen(true)}
                    notificationCount={4}
                />

                <main className="mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default OwnerLayout;
