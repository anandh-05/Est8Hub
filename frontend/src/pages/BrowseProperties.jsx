import { useEffect, useMemo, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import PropertySkeleton from "../components/PropertySkeleton";
import OwnerIcon from "../components/owner/OwnerIcon";
import publicApi from "../services/publicApi";

const emptyFilters = { location: "", types: [], minPrice: "", maxPrice: "", bedrooms: "", bathrooms: "", statuses: [] };

function BrowseProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(emptyFilters);
    const [sort, setSort] = useState("recommended");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const loadProperties = async () => {
        setLoading(true); setError(false);
        try { setProperties((await publicApi.get("properties/")).data); } catch { setError(true); } finally { setLoading(false); }
    };
    useEffect(() => {
        let active = true;
        async function fetchProperties() {
            try {
                const response = await publicApi.get("properties/");
                if (active) setProperties(response.data);
            } catch {
                if (active) setError(true);
            } finally {
                if (active) setLoading(false);
            }
        }
        fetchProperties();
        return () => { active = false; };
    }, []);

    const results = useMemo(() => {
        const query = search.trim().toLowerCase();
        const filtered = properties.filter((property) => {
            const text = `${property.title} ${property.location}`.toLowerCase();
            return (!query || text.includes(query)) && (!filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())) && (!filters.types.length || filters.types.includes(property.property_type)) && (!filters.statuses.length || filters.statuses.includes(property.status)) && (!filters.minPrice || Number(property.price) >= Number(filters.minPrice)) && (!filters.maxPrice || Number(property.price) <= Number(filters.maxPrice)) && (!filters.bedrooms || Number(property.bedrooms || 0) >= Number(filters.bedrooms)) && (!filters.bathrooms || Number(property.bathrooms || 0) >= Number(filters.bathrooms));
        });
        if (sort === "low") return [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
        if (sort === "high") return [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
        if (sort === "newest") return [...filtered].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return filtered;
    }, [properties, search, filters, sort]);
    const clear = () => { setSearch(""); setFilters(emptyFilters); };
    const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

    return <main className="min-h-screen bg-[#f7f7f5] px-4 py-8 sm:px-6 lg:px-10"><div className="mx-auto max-w-[1500px]"><header><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87c23]">Property discovery</p><h1 className="mt-2 text-3xl font-bold tracking-[-0.045em] text-zinc-900">Find your next home</h1><p className="mt-2 text-sm text-zinc-500">Explore quality rental properties in locations you love.</p></header><section className="mt-7 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm"><div className="flex flex-col gap-2 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Search properties</span><OwnerIcon name="search" size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by location, property name..." className="h-11 w-full rounded-xl bg-zinc-50 pl-11 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#d9ad45]/30" />{search ? <button type="button" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"><OwnerIcon name="close" size={18} /></button> : null}</label><button type="button" className="min-h-11 rounded-xl bg-[#1d1d1b] px-5 text-sm font-semibold text-white">Search</button></div></section><div className="mt-5 flex gap-3 lg:hidden"><button type="button" onClick={() => setIsFiltersOpen(true)} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700"><OwnerIcon name="settings" size={17} />Filters</button><label className="flex min-h-10 flex-1 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-700">Sort<select value={sort} onChange={(event) => setSort(event.target.value)} className="ml-2 bg-transparent outline-none"><option value="recommended">Recommended</option><option value="low">Price: Low</option><option value="high">Price: High</option><option value="newest">Newest</option></select></label></div><div className="mt-8 grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]"><aside className="hidden lg:block"><PropertyFilters filters={filters} onChange={setFilters} onClear={clear} onApply={() => undefined} /></aside><section><div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-lg font-bold text-zinc-900">Properties in your area</h2><p className="mt-1 text-sm text-zinc-500">{loading ? "Loading properties…" : `${results.length} ${results.length === 1 ? "property" : "properties"} available`}</p></div><label className="hidden items-center gap-2 text-sm font-semibold text-zinc-600 lg:flex">Sort by:<select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#d9ad45]"><option value="recommended">Recommended</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="newest">Newest</option></select></label></div>{loading ? <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <PropertySkeleton key={index} />)}</div> : error ? <div className="rounded-2xl border border-rose-100 bg-rose-50 p-10 text-center"><OwnerIcon name="alert" size={28} className="mx-auto text-rose-600" /><h2 className="mt-4 font-bold text-rose-900">Unable to load properties</h2><p className="mt-1 text-sm text-rose-700">Something went wrong while loading available properties.</p><button type="button" onClick={loadProperties} className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm">Try again</button></div> : results.length ? <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">{results.map((property) => <PropertyCard key={property.id} property={property} isFavorite={favorites.includes(property.id)} onFavorite={toggleFavorite} />)}</div> : <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center"><OwnerIcon name="search" size={30} className="mx-auto text-[#9d741d]" /><h2 className="mt-4 font-bold text-zinc-900">No properties found</h2><p className="mt-1 text-sm text-zinc-500">Try changing your filters or search location.</p><button type="button" onClick={clear} className="mt-5 rounded-xl bg-[#1d1d1b] px-4 py-2 text-sm font-semibold text-white">Clear filters</button></div>}</section></div>{isFiltersOpen ? <div className="fixed inset-0 z-50 flex items-end bg-zinc-950/45 lg:hidden" role="dialog" aria-modal="true" aria-label="Property filters"><div className="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold">Filters</h2><button type="button" onClick={() => setIsFiltersOpen(false)} aria-label="Close filters"><OwnerIcon name="close" /></button></div><PropertyFilters mobile filters={filters} onChange={setFilters} onClear={clear} onApply={() => setIsFiltersOpen(false)} /></div></div> : null}</div></main>;
}

export default BrowseProperties;
