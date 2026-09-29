import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OwnerIcon from "../../components/owner/OwnerIcon";
import publicApi from "../../services/publicApi";

function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProperty() {
            try { setProperty((await publicApi.get(`properties/${id}/`)).data); } catch { setError(true); }
        }
        fetchProperty();
    }, [id]);

    if (error) return <div className="mx-auto max-w-3xl p-8 text-center"><h1 className="text-xl font-bold">Unable to load this property.</h1><Link className="mt-4 inline-block text-[#8b6615] underline" to="/properties">Back to properties</Link></div>;
    if (!property) return <div className="mx-auto max-w-3xl p-8"><div className="h-80 animate-pulse rounded-2xl bg-zinc-200" /></div>;
    const image = property.images?.[0]?.image;
    return <main className="mx-auto max-w-4xl p-4 sm:p-8"><Link to="/properties" className="text-sm font-semibold text-[#8b6615]">← Back to properties</Link><div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"><div className="h-72 bg-zinc-100 sm:h-96">{image ? <img src={image} alt={property.title} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center bg-gradient-to-br from-[#ead9ad] to-[#9e7a41] text-[#6c501e]"><OwnerIcon name="building" size={50} /></div>}</div><div className="p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#9d741d]">{property.property_type}</p><h1 className="mt-2 text-3xl font-bold text-zinc-900">{property.title}</h1><p className="mt-2 flex items-center gap-2 text-zinc-500"><OwnerIcon name="pin" size={18} />{property.location}</p><p className="mt-6 text-2xl font-bold text-zinc-900">₹{Number(property.price || 0).toLocaleString("en-IN")}<span className="text-base font-medium text-zinc-400"> / month</span></p><div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-zinc-600"><span className="rounded-lg bg-zinc-100 px-3 py-2">{property.bedrooms ?? "—"} Beds</span><span className="rounded-lg bg-zinc-100 px-3 py-2">{property.bathrooms ?? "—"} Baths</span><span className="rounded-lg bg-zinc-100 px-3 py-2">{property.area} ft²</span></div><p className="mt-6 leading-7 text-zinc-600">{property.description}</p></div></div></main>;
}
export default PropertyDetails;
