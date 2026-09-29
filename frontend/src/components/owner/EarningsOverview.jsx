import { useState } from "react";
import OwnerIcon from "./OwnerIcon";

function formatAmount(value, currencySymbol, locale) {
    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return currencySymbol + "0";
    }

    return currencySymbol + new Intl.NumberFormat(locale, {
        maximumFractionDigits: 0,
    }).format(amount);
}

function EarningsOverview({
    data = [],
    title = "Earnings Overview",
    subtitle = "Monthly rental income",
    total,
    currencySymbol = "₹",
    locale = "en-IN",
    timeframe,
    timeframes = ["This month", "Last 6 months", "This year"],
    onTimeframeChange,
    loading = false,
    error,
    onRetry,
    className = "",
}) {
    const [internalTimeframe, setInternalTimeframe] = useState(timeframes[0] || "");
    const selectedTimeframe = timeframe ?? internalTimeframe;
    const chartData = Array.isArray(data) ? data : [];
    const values = chartData.map((item) => Math.max(0, Number(item?.value) || 0));
    const highestValue = Math.max(...values, 1);
    const calculatedTotal = values.reduce((sum, value) => sum + value, 0);
    const displayedTotal = total ?? calculatedTotal;

    function handleTimeframeChange(event) {
        const nextTimeframe = event.target.value;

        if (timeframe === undefined) {
            setInternalTimeframe(nextTimeframe);
        }

        onTimeframeChange?.(nextTimeframe);
    }

    if (loading) {
        return (
            <section
                className={"rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 " + className}
                aria-label="Loading earnings overview"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="h-5 w-36 animate-pulse rounded bg-zinc-100" />
                        <div className="mt-2 h-3 w-28 animate-pulse rounded bg-zinc-100" />
                    </div>
                    <div className="h-10 w-28 animate-pulse rounded-lg bg-zinc-100" />
                </div>
                <div className="mt-7 h-56 animate-pulse rounded-xl bg-zinc-50" />
            </section>
        );
    }

    return (
        <section className={"rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 " + className}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-amber-300">
                            <OwnerIcon name="rupee" size={17} />
                        </span>
                        <h2 className="text-base font-semibold text-zinc-950">{title}</h2>
                    </div>
                    <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                        {formatAmount(displayedTotal, currencySymbol, locale)}
                    </p>
                </div>

                <label className="relative inline-flex w-full sm:w-auto">
                    <span className="sr-only">Earnings time period</span>
                    <select
                        value={selectedTimeframe}
                        onChange={handleTimeframeChange}
                        className="w-full appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-zinc-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100 sm:w-auto"
                    >
                        {timeframes.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <OwnerIcon
                        name="chevronDown"
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                </label>
            </div>

            {error ? (
                <div className="mt-7 flex min-h-56 flex-col items-center justify-center rounded-xl border border-rose-100 bg-rose-50 px-5 text-center">
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
            ) : chartData.length ? (
                <div className="mt-7">
                    <div className="relative h-56">
                        <div className="pointer-events-none absolute inset-0 grid grid-rows-4">
                            {[0, 1, 2, 3].map((line) => (
                                <div key={line} className="border-t border-dashed border-zinc-100" />
                            ))}
                        </div>

                        <div className="relative z-10 flex h-full items-end gap-2 pt-3 sm:gap-4">
                            {chartData.map((item, index) => {
                                const value = Math.max(0, Number(item?.value) || 0);
                                const height = Math.max(7, Math.round((value / highestValue) * 100));
                                const label = item?.label || item?.month || String(index + 1);

                                return (
                                    <div key={item?.id || label} className="group flex h-full min-w-0 flex-1 flex-col justify-end">
                                        <div className="relative flex flex-1 items-end justify-center">
                                            <div
                                                className="w-full min-w-4 rounded-t-lg bg-gradient-to-t from-amber-500 to-amber-300 shadow-[0_8px_20px_-12px_rgba(217,119,6,0.9)] transition duration-200 group-hover:from-amber-600 group-hover:to-amber-400"
                                                style={{ height: height + "%" }}
                                                title={label + ": " + formatAmount(value, currencySymbol, locale)}
                                                aria-label={label + ": " + formatAmount(value, currencySymbol, locale)}
                                            />
                                        </div>
                                        <span className="mt-3 truncate text-center text-xs font-medium text-zinc-500">{label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                        <span className="h-2.5 w-2.5 rounded-sm bg-amber-400" />
                        Rental earnings
                    </p>
                </div>
            ) : (
                <div className="mt-7 flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-5 text-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                        <OwnerIcon name="rupee" size={20} />
                    </span>
                    <p className="mt-3 text-sm font-medium text-zinc-800">No earnings data yet</p>
                    <p className="mt-1 max-w-xs text-sm text-zinc-500">Income will appear here after your first rent payment is recorded.</p>
                </div>
            )}
        </section>
    );
}

export default EarningsOverview;
