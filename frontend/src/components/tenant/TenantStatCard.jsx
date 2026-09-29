import OwnerIcon from "../owner/OwnerIcon";

function TenantStatCard({ icon, label, value, hint }) {
    return <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><span className="grid size-10 place-items-center rounded-xl bg-[#fff7df] text-[#9b701b]"><OwnerIcon name={icon} size={20} /></span><p className="mt-5 text-2xl font-bold tracking-[-0.04em] text-zinc-900">{value}</p><p className="mt-1 text-sm font-semibold text-zinc-700">{label}</p><p className="mt-1 text-xs text-zinc-400">{hint}</p></section>;
}
export default TenantStatCard;
