import { Link } from "react-router-dom";
import OwnerIcon from "./OwnerIcon";

function OwnerEmptyState({ icon = "building", title, description, actionLabel, actionTo = "/add-property" }) {
    return (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#fff7df] text-[#9b701b]">
                <OwnerIcon name={icon} size={23} />
            </span>
            <h2 className="mt-4 text-base font-bold text-zinc-900">{title}</h2>
            <p className="mt-1 max-w-sm text-sm leading-6 text-zinc-500">{description}</p>
            {actionLabel ? (
                <Link
                    to={actionTo}
                    className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#1d1d1b] px-4 text-sm font-semibold text-white transition hover:bg-[#35332f] focus-visible:ring-4 focus-visible:ring-[#d9ad45]/25"
                >
                    <OwnerIcon name="plus" size={17} className="text-[#e9c66f]" />
                    {actionLabel}
                </Link>
            ) : null}
        </div>
    );
}

export default OwnerEmptyState;
