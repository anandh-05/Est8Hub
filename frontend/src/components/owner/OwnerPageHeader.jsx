import { Link } from "react-router-dom";
import OwnerIcon from "./OwnerIcon";

function OwnerPageHeader({ eyebrow = "Owner workspace", title, description, actionLabel, actionTo = "/add-property" }) {
    return (
        <div className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87c23]">{eyebrow}</p>
                <h1 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-zinc-900 sm:text-3xl">{title}</h1>
                {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">{description}</p> : null}
            </div>
            {actionLabel ? (
                <Link
                    to={actionTo}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1d1d1b] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(29,29,27,0.12)] transition hover:bg-[#35332f] focus-visible:ring-4 focus-visible:ring-[#d9ad45]/25"
                >
                    <OwnerIcon name="plus" size={18} className="text-[#e9c66f]" />
                    {actionLabel}
                </Link>
            ) : null}
        </div>
    );
}

export default OwnerPageHeader;
