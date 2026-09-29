import { Link } from "react-router-dom";
import OwnerIcon from "./OwnerIcon";

const toneStyles = {
    gold: "bg-[#fff7df] text-[#9a701a] group-hover:bg-[#f3dfaa]",
    blue: "bg-sky-50 text-sky-700 group-hover:bg-sky-100",
    green: "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100",
    charcoal: "bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200",
};

function QuickActions({ actions = [] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {actions.map((action, index) => {
                const title = action.label || action.title || "Action";
                const Content = action.to ? Link : "button";

                return (
                    <Content
                        key={action.id || action.to || title || index}
                        to={action.to}
                        type={action.to ? undefined : "button"}
                        onClick={action.onClick}
                        className="group flex min-h-28 items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md focus-visible:ring-4 focus-visible:ring-amber-100"
                    >
                        <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition ${toneStyles[action.tone] || toneStyles.gold}`}><OwnerIcon name={action.icon || "plus"} size={21} /></span>
                        <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-zinc-900">{title}</span><span className="mt-1 block text-xs leading-5 text-zinc-500">{action.description}</span></span>
                        <OwnerIcon name="arrowRight" size={17} className="shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-[#9a701a]" />
                    </Content>
                );
            })}
        </div>
    );
}

export default QuickActions;
