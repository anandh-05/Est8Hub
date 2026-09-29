import OwnerIcon from "./OwnerIcon";

const bookingStyles = {
    PENDING: "bg-amber-50 text-amber-700 ring-amber-100",
    CONFIRMED: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    VISIT_SCHEDULED: "bg-sky-50 text-sky-700 ring-sky-100",
    CANCELLED: "bg-red-50 text-red-700 ring-red-100",
};

function readableStatus(status) {
    return String(status || "PENDING").toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function TenantAvatar({ tenant }) {
    const name = typeof tenant === "string" ? tenant : tenant?.name || "Tenant";
    const initials = name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

    return <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-[#efe0b8] text-[10px] font-bold text-[#715317]">{tenant?.avatar ? <img src={tenant.avatar} alt="" className="h-full w-full object-cover" /> : initials}</span>;
}

function RecentBookings({ bookings = [], title = "Recent Bookings", onViewAll, onAction, loading = false, error, onRetry }) {
    const items = Array.isArray(bookings) ? bookings : [];

    return (
        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4 sm:px-6">
                <div><h2 className="text-base font-bold text-zinc-900">{title}</h2><p className="mt-1 text-sm text-zinc-500">The latest requests across your listings.</p></div>
                {onViewAll ? <button type="button" onClick={onViewAll} className="shrink-0 text-sm font-semibold text-[#8a6516] hover:text-[#5d430d]">View all</button> : null}
            </div>
            {loading ? (
                <div className="space-y-3 p-5">{[0, 1, 2].map((index) => <div key={index} className="h-12 animate-pulse rounded-lg bg-zinc-100" />)}</div>
            ) : error ? (
                <div className="flex min-h-48 flex-col items-center justify-center px-5 text-center"><OwnerIcon name="alert" size={23} className="text-red-500" /><p className="mt-3 text-sm font-semibold text-red-800">{error}</p>{onRetry ? <button type="button" onClick={onRetry} className="mt-3 text-sm font-semibold text-red-700 underline">Try again</button> : null}</div>
            ) : items.length ? (
                <div className="overflow-x-auto">
                    <table className="min-w-[720px] w-full text-left text-sm">
                        <thead className="bg-zinc-50 text-xs font-bold uppercase tracking-[0.1em] text-zinc-400"><tr><th className="px-5 py-3.5 sm:px-6">#</th><th className="px-5 py-3.5">Tenant</th><th className="px-5 py-3.5">Property</th><th className="px-5 py-3.5">Visit / Move-in Date</th><th className="px-5 py-3.5">Status</th><th className="px-5 py-3.5 text-right sm:px-6">Action</th></tr></thead>
                        <tbody className="divide-y divide-zinc-100">
                            {items.map((booking, index) => {
                                const status = String(booking.status || "PENDING").toUpperCase();
                                const tenantName = typeof booking.tenant === "string" ? booking.tenant : booking.tenant?.name || "Tenant";
                                return <tr key={booking.id || index} className="transition hover:bg-zinc-50/80"><td className="px-5 py-4 font-semibold text-zinc-400 sm:px-6">{String(index + 1).padStart(2, "0")}</td><td className="px-5 py-4"><span className="flex items-center gap-2.5"><TenantAvatar tenant={booking.tenant} /><span className="font-semibold text-zinc-800">{tenantName}</span></span></td><td className="px-5 py-4 font-medium text-zinc-600">{booking.property?.title || booking.property || "Property"}</td><td className="px-5 py-4 text-zinc-500">{booking.date || booking.visit_date || "—"}</td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${bookingStyles[status] || bookingStyles.PENDING}`}>{readableStatus(status)}</span></td><td className="px-5 py-4 text-right sm:px-6"><button type="button" onClick={() => onAction?.(booking)} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#875f10] transition hover:bg-[#fff7df]">Review</button></td></tr>;
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex min-h-48 flex-col items-center justify-center px-5 text-center"><span className="grid size-10 place-items-center rounded-xl bg-[#fff7df] text-[#96701d]"><OwnerIcon name="calendar" size={20} /></span><p className="mt-3 text-sm font-semibold text-zinc-800">No bookings yet</p><p className="mt-1 text-sm text-zinc-500">New tenant requests will appear here.</p></div>
            )}
        </section>
    );
}

export default RecentBookings;
