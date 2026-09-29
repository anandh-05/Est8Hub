import OwnerIcon from "./OwnerIcon";

const toneStyles = {
    gold: {
        icon: "bg-amber-100 text-amber-700 ring-amber-200",
        trend: "text-amber-700",
    },
    emerald: {
        icon: "bg-emerald-100 text-emerald-700 ring-emerald-200",
        trend: "text-emerald-700",
    },
    blue: {
        icon: "bg-sky-100 text-sky-700 ring-sky-200",
        trend: "text-sky-700",
    },
    amber: {
        icon: "bg-orange-100 text-orange-700 ring-orange-200",
        trend: "text-orange-700",
    },
    rose: {
        icon: "bg-rose-100 text-rose-700 ring-rose-200",
        trend: "text-rose-700",
    },
};

function getTrendText(trend) {
    if (typeof trend === "string" || typeof trend === "number") {
        return trend;
    }

    return trend?.label || trend?.text || "";
}

function OwnerStatCard({
    icon = "dashboard",
    value,
    label,
    trend,
    tone = "gold",
    loading = false,
    className = "",
}) {
    const styles = toneStyles[tone] || toneStyles.gold;
    const trendText = getTrendText(trend);
    const isPositiveTrend = typeof trend === "object" ? trend?.positive !== false : true;

    if (loading) {
        return (
            <article
                className={"min-h-40 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm " + className}
                aria-label="Loading statistic"
            >
                <div className="flex items-start justify-between">
                    <div className="h-4 w-28 animate-pulse rounded bg-zinc-100" />
                    <div className="h-11 w-11 animate-pulse rounded-xl bg-zinc-100" />
                </div>
                <div className="mt-6 h-8 w-20 animate-pulse rounded bg-zinc-100" />
                <div className="mt-3 h-3 w-24 animate-pulse rounded bg-zinc-100" />
            </article>
        );
    }

    return (
        <article
            className={
                "group min-h-40 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md " +
                className
            }
        >
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium text-zinc-500">{label}</p>
                <span className={"inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 " + styles.icon}>
                    <OwnerIcon name={icon} size={21} ariaLabel={label ? label + " icon" : undefined} />
                </span>
            </div>

            <p className="mt-5 text-3xl font-semibold tracking-tight text-zinc-950">{value ?? "—"}</p>

            {trendText ? (
                <p className={"mt-2 flex items-center gap-1.5 text-xs font-medium " + styles.trend}>
                    <OwnerIcon name={isPositiveTrend ? "trendingUp" : "arrowRight"} size={14} />
                    <span>{trendText}</span>
                </p>
            ) : (
                <span className="mt-2 block h-4" aria-hidden="true" />
            )}
        </article>
    );
}

export default OwnerStatCard;
