import { useMemo, useState } from "react";
import OwnerEmptyState from "../../components/owner/OwnerEmptyState";
import OwnerIcon from "../../components/owner/OwnerIcon";
import OwnerPageHeader from "../../components/owner/OwnerPageHeader";
import OwnerPropertyCard from "../../components/owner/OwnerPropertyCard";
import useOwnerData from "../../hooks/useOwnerData";

const filters = ["All", "Available", "Booked", "Rented"];

function MyProperties() {
    const [activeFilter, setActiveFilter] = useState("All");
    const { properties, propertiesState, usingMockProperties, reloadProperties } = useOwnerData();

    const visibleProperties = useMemo(() => {
        if (activeFilter === "All") {
            return properties;
        }

        return properties.filter((property) => property.status === activeFilter.toUpperCase());
    }, [activeFilter, properties]);

    return (
        <div>
            <OwnerPageHeader
                title="My Properties"
                description="Manage your listings, check availability, and keep your portfolio moving."
                actionLabel="Add Property"
            />

            {usingMockProperties ? (
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e9ca80] bg-[#fff9e8] px-4 py-3 text-sm text-[#75551b]">
                    <span className="flex gap-3"><OwnerIcon name="info" size={19} className="mt-0.5 shrink-0" />Live listings could not be reached; these cards are sample data.</span>
                    <button type="button" onClick={reloadProperties} className="font-semibold underline underline-offset-2 hover:text-[#51380b]">Try again</button>
                </div>
            ) : null}

            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2" aria-label="Filter properties by status">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`min-h-9 rounded-lg px-3 text-sm font-semibold transition ${
                                activeFilter === filter
                                    ? "bg-[#1d1d1b] text-[#f3d984]"
                                    : "bg-zinc-100 text-zinc-600 hover:bg-[#fff7df] hover:text-[#805e14]"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <p className="text-sm text-zinc-500">
                    <span className="font-bold text-zinc-900">{visibleProperties.length}</span> {visibleProperties.length === 1 ? "listing" : "listings"}
                </p>
            </div>

            {propertiesState.loading ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => <OwnerPropertyCard key={index} loading />)}
                </div>
            ) : visibleProperties.length ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {visibleProperties.map((property) => <OwnerPropertyCard key={property.id} property={property} />)}
                </div>
            ) : (
                <OwnerEmptyState
                    title={properties.length ? `No ${activeFilter.toLowerCase()} properties` : "No properties yet"}
                    description={properties.length ? "Try another status filter to view more listings." : "Add your first property to start receiving booking requests."}
                    actionLabel={properties.length ? undefined : "Add Property"}
                />
            )}
        </div>
    );
}

export default MyProperties;
