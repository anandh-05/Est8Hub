import { useState } from "react";
import OwnerIcon from "./OwnerIcon";

const statusStyles = {
    AVAILABLE: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    BOOKED: "bg-amber-50 text-amber-700 ring-amber-100",
    RENTED: "bg-sky-50 text-sky-700 ring-sky-100",
};

function formatStatus(status) {
    if (!status) {
        return "Available";
    }

    return String(status)
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

function OwnerPropertyCard({ property, onAction, onViewDetails, loading = false }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (loading) {
        return (
            <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm" aria-label="Loading property">
                <div className="h-48 animate-pulse bg-zinc-100" />
                <div className="space-y-3 p-5"><div className="h-4 w-20 animate-pulse rounded bg-zinc-100" /><div className="h-5 w-2/3 animate-pulse rounded bg-zinc-100" /><div className="h-4 w-full animate-pulse rounded bg-zinc-100" /><div className="h-4 w-1/2 animate-pulse rounded bg-zinc-100" /></div>
            </article>
        );
    }

    const status = String(property?.status || "AVAILABLE").toUpperCase();
    const image = property?.images?.[0]?.image;
    const price = Number(property?.price ?? property?.rent_price ?? 0);

    const handleAction = (action) => {
        setIsMenuOpen(false);
        onAction?.(property, action);
    };

    return (
        <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-lg hover:shadow-zinc-900/5">
            <div className="relative h-48 overflow-hidden bg-zinc-100">
                {image ? (
                    <img src={image} alt={property?.title || "Property"} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#d9c08b] via-[#f1e5c7] to-[#a17c40] text-[#665022]">
                        <OwnerIcon name="building" size={40} />
                    </div>
                )}
                <span className={`absolute left-3 top-3 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 backdrop-blur ${statusStyles[status] || statusStyles.AVAILABLE}`}>
                    {formatStatus(status)}
                </span>
                <div className="absolute right-3 top-3">
                    <button type="button" aria-label={`Actions for ${property?.title || "property"}`} onClick={() => setIsMenuOpen((open) => !open)} className="grid size-8 place-items-center rounded-lg bg-white/90 text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white focus-visible:ring-4 focus-visible:ring-white/50">
                        <OwnerIcon name="more" size={18} />
                    </button>
                    {isMenuOpen ? (
                        <div className="absolute right-0 top-10 z-10 w-36 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl shadow-zinc-900/10">
                            <button type="button" onClick={() => handleAction("edit")} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"><OwnerIcon name="edit" size={15} />Edit listing</button>
                            <button type="button" onClick={() => handleAction("status")} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"><OwnerIcon name="checkCircle" size={15} />Update status</button>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="p-5">
                <h3 className="truncate text-base font-bold tracking-[-0.02em] text-zinc-900">{property?.title || "Untitled property"}</h3>
                <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-zinc-500"><OwnerIcon name="pin" size={15} className="shrink-0 text-zinc-400" />{property?.location || "Location not added"}</p>
                <p className="mt-4 text-lg font-bold tracking-[-0.025em] text-zinc-900">₹{price.toLocaleString("en-IN")}<span className="ml-1 text-sm font-medium text-zinc-400">/month</span></p>
                <div className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-4 text-xs font-semibold text-zinc-500">
                    <span className="flex items-center gap-1"><OwnerIcon name="bed" size={16} className="text-zinc-400" />{property?.bedrooms ?? "—"} Beds</span>
                    <span className="flex items-center gap-1"><OwnerIcon name="bath" size={16} className="text-zinc-400" />{property?.bathrooms ?? "—"} Baths</span>
                    <span className="flex items-center gap-1"><OwnerIcon name="area" size={16} className="text-zinc-400" />{property?.area ? `${property.area} ft²` : "—"}</span>
                </div>
                {onViewDetails ? <button type="button" onClick={() => onViewDetails(property)} className="mt-4 text-sm font-semibold text-[#8a6516] transition hover:text-[#5f450d]">View property details</button> : null}
            </div>
        </article>
    );
}

export default OwnerPropertyCard;
