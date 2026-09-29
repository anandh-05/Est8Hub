import OwnerIcon from "../../components/owner/OwnerIcon";
import OwnerPageHeader from "../../components/owner/OwnerPageHeader";
import useOwnerData from "../../hooks/useOwnerData";

const statusStyles = {
    PAID: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    PENDING: "bg-amber-50 text-amber-700 ring-amber-100",
    FAILED: "bg-red-50 text-red-700 ring-red-100",
};

function Payments() {
    const { mockData } = useOwnerData({ loadProperties: false });
    const payments = mockData.payments;
    const receivedTotal = payments
        .filter((payment) => String(payment.status || payment.payment_status).toUpperCase() === "PAID")
        .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    const pendingTotal = payments
        .filter((payment) => String(payment.status || payment.payment_status).toUpperCase() === "PENDING")
        .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

    return (
        <div>
            <OwnerPageHeader
                title="Payments"
                description="Keep an eye on rent collections and payment activity."
                actionLabel="Add Property"
            />

            <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><OwnerIcon name="wallet" size={20} /></span><OwnerIcon name="trendUp" size={18} className="text-emerald-500" /></div>
                    <p className="mt-5 text-2xl font-bold tracking-[-0.04em] text-zinc-900">₹{receivedTotal.toLocaleString("en-IN")}</p>
                    <p className="mt-1 text-sm font-medium text-zinc-500">Payments received</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <span className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-600"><OwnerIcon name="clock" size={20} /></span>
                    <p className="mt-5 text-2xl font-bold tracking-[-0.04em] text-zinc-900">₹{pendingTotal.toLocaleString("en-IN")}</p>
                    <p className="mt-1 text-sm font-medium text-zinc-500">Awaiting payment</p>
                </div>
                <div className="rounded-2xl border border-[#ead18d] bg-[#fffaf0] p-5 shadow-sm sm:col-span-2 xl:col-span-1">
                    <span className="grid size-10 place-items-center rounded-xl bg-[#f3dc9b] text-[#78570e]"><OwnerIcon name="info" size={20} /></span>
                    <p className="mt-5 text-sm font-bold text-zinc-900">Payment automation is coming soon.</p>
                    <p className="mt-1 text-sm leading-5 text-zinc-500">These values are temporary dashboard data until the payment API is connected.</p>
                </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 sm:px-6">
                    <div><h2 className="text-base font-bold text-zinc-900">Recent payment activity</h2><p className="mt-1 text-sm text-zinc-500">Your latest rent collection records.</p></div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-[650px] w-full text-left text-sm">
                        <thead className="bg-zinc-50 text-xs font-bold uppercase tracking-[0.1em] text-zinc-400"><tr><th className="px-5 py-3.5 sm:px-6">Tenant</th><th className="px-5 py-3.5">Property</th><th className="px-5 py-3.5">Amount</th><th className="px-5 py-3.5">Method</th><th className="px-5 py-3.5">Status</th><th className="px-5 py-3.5">Date</th></tr></thead>
                        <tbody className="divide-y divide-zinc-100">
                            {payments.map((payment) => {
                                const status = String(payment.status || payment.payment_status || "PENDING").toUpperCase();
                                return (
                                    <tr key={payment.id} className="text-zinc-600 hover:bg-zinc-50/70">
                                        <td className="px-5 py-4 font-semibold text-zinc-800 sm:px-6">{payment.tenant}</td>
                                        <td className="px-5 py-4">{payment.property}</td>
                                        <td className="px-5 py-4 font-bold text-zinc-900">₹{Number(payment.amount || 0).toLocaleString("en-IN")}</td>
                                        <td className="px-5 py-4">{payment.method || payment.payment_method || "UPI"}</td>
                                        <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusStyles[status] || statusStyles.PENDING}`}>{status.charAt(0) + status.slice(1).toLowerCase()}</span></td>
                                        <td className="px-5 py-4 text-zinc-500">{payment.date || payment.paid_at || "—"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Payments;
