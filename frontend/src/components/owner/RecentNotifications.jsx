import OwnerIcon from "./OwnerIcon";

const notificationStyles = {
    booking: {
        icon: "calendar",
        iconClass: "bg-amber-100 text-amber-700",
    },
    payment: {
        icon: "wallet",
        iconClass: "bg-emerald-100 text-emerald-700",
    },
    visit: {
        icon: "mapPin",
        iconClass: "bg-sky-100 text-sky-700",
    },
    property: {
        icon: "buildings",
        iconClass: "bg-violet-100 text-violet-700",
    },
    message: {
        icon: "messages",
        iconClass: "bg-blue-100 text-blue-700",
    },
    system: {
        icon: "info",
        iconClass: "bg-zinc-100 text-zinc-700",
    },
};

function getNotificationStyle(type) {
    const normalizedType = String(type || "system").toLowerCase().replace(/[\s-]+/g, "_");

    if (normalizedType.includes("booking")) {
        return notificationStyles.booking;
    }

    if (normalizedType.includes("payment") || normalizedType.includes("rent")) {
        return notificationStyles.payment;
    }

    if (normalizedType.includes("visit")) {
        return notificationStyles.visit;
    }

    if (normalizedType.includes("property") || normalizedType.includes("listing")) {
        return notificationStyles.property;
    }

    if (normalizedType.includes("message")) {
        return notificationStyles.message;
    }

    return notificationStyles.system;
}

function RecentNotifications({
    notifications = [],
    title = "Recent Notifications",
    viewAllLabel = "View all",
    onViewAll,
    onNotificationClick,
    loading = false,
    error,
    onRetry,
    emptyMessage = "You're all caught up.",
    className = "",
}) {
    const items = Array.isArray(notifications) ? notifications : [];

    return (
        <section className={"rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 " + className}>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-base font-semibold text-zinc-950">{title}</h2>
                    {items.length && !loading ? (
                        <p className="mt-1 text-sm text-zinc-500">
                            {items.filter((item) => item?.isRead === false).length} unread
                        </p>
                    ) : null}
                </div>
                {onViewAll ? (
                    <button
                        type="button"
                        onClick={onViewAll}
                        className="shrink-0 text-sm font-semibold text-amber-700 transition hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
                    >
                        {viewAllLabel}
                    </button>
                ) : null}
            </div>

            {loading ? (
                <div className="mt-5 divide-y divide-zinc-100">
                    {[0, 1, 2, 3].map((item) => (
                        <div key={item} className="flex gap-3 py-4">
                            <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-zinc-100" />
                            <div className="min-w-0 flex-1">
                                <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-100" />
                                <div className="mt-2 h-3 w-full animate-pulse rounded bg-zinc-100" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="mt-5 flex min-h-52 flex-col items-center justify-center rounded-xl border border-rose-100 bg-rose-50 px-5 text-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                        <OwnerIcon name="alert" size={20} />
                    </span>
                    <p className="mt-3 text-sm font-medium text-rose-900">{error}</p>
                    {onRetry ? (
                        <button
                            type="button"
                            onClick={onRetry}
                            className="mt-4 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-rose-700 shadow-sm ring-1 ring-inset ring-rose-200 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        >
                            Try again
                        </button>
                    ) : null}
                </div>
            ) : items.length ? (
                <div className="mt-5 divide-y divide-zinc-100">
                    {items.map((notification, index) => {
                        const style = getNotificationStyle(notification?.type);
                        const isUnread = notification?.isRead === false;
                        const ContentTag = onNotificationClick ? "button" : "div";

                        return (
                            <ContentTag
                                key={notification?.id || index}
                                type={onNotificationClick ? "button" : undefined}
                                onClick={onNotificationClick ? () => onNotificationClick(notification) : undefined}
                                className={
                                    "flex w-full gap-3 py-4 text-left transition " +
                                    (onNotificationClick
                                        ? "rounded-lg outline-none hover:bg-zinc-50 focus:bg-zinc-50 focus:ring-2 focus:ring-amber-200"
                                        : "")
                                }
                            >
                                <span className={"relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " + style.iconClass}>
                                    <OwnerIcon name={style.icon} size={19} />
                                    {isUnread ? (
                                        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500" />
                                    ) : null}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="flex items-start justify-between gap-3">
                                        <span className={"truncate text-sm " + (isUnread ? "font-semibold text-zinc-950" : "font-medium text-zinc-800")}>
                                            {notification?.title || "Notification"}
                                        </span>
                                        <span className="shrink-0 text-xs text-zinc-400">{notification?.time || notification?.createdAt || ""}</span>
                                    </span>
                                    {notification?.message ? (
                                        <span className="mt-1 block line-clamp-2 text-sm leading-5 text-zinc-500">{notification.message}</span>
                                    ) : null}
                                </span>
                            </ContentTag>
                        );
                    })}
                </div>
            ) : (
                <div className="mt-5 flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-5 text-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                        <OwnerIcon name="checkCircle" size={20} />
                    </span>
                    <p className="mt-3 text-sm font-medium text-zinc-800">{emptyMessage}</p>
                    <p className="mt-1 text-sm text-zinc-500">New owner activity will appear here.</p>
                </div>
            )}
        </section>
    );
}

export default RecentNotifications;
