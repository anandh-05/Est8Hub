import { Outlet } from "react-router-dom";
import TenantSidebar from "./TenantSidebar";

function TenantLayout() {
    return <div className="min-h-screen bg-[#f7f7f5] text-[#1d1d1b]"><TenantSidebar /><main className="mx-auto w-full max-w-[1680px] px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:ml-64 lg:w-[calc(100%-16rem)] lg:px-10 lg:pb-8"><Outlet /></main></div>;
}

export default TenantLayout;
