import { Link } from "react-router-dom";
import OwnerIcon from "../owner/OwnerIcon";

function TenantEmptyState({ icon = "calendar", title, description, actionLabel, actionTo = "/properties" }) {
    return <section className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-8 text-center"><span className="grid size-12 place-items-center rounded-2xl bg-[#fff7df] text-[#9b701b]"><OwnerIcon name={icon} size={23} /></span><h2 className="mt-4 text-base font-bold text-zinc-900">{title}</h2><p className="mt-1 max-w-sm text-sm leading-6 text-zinc-500">{description}</p>{actionLabel ? <Link to={actionTo} className="mt-5 inline-flex min-h-10 items-center rounded-xl bg-[#1d1d1b] px-4 text-sm font-semibold text-white transition hover:bg-[#35332f]">{actionLabel}</Link> : null}</section>;
}
export default TenantEmptyState;
