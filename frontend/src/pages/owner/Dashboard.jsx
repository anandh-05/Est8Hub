import { Link, useNavigate } from "react-router-dom";
import EarningsOverview from "../../components/owner/EarningsOverview";
import OwnerEmptyState from "../../components/owner/OwnerEmptyState";
import OwnerIcon from "../../components/owner/OwnerIcon";
import OwnerPropertyCard from "../../components/owner/OwnerPropertyCard";
import OwnerStatCard from "../../components/owner/OwnerStatCard";
import QuickActions from "../../components/owner/QuickActions";
import RecentBookings from "../../components/owner/RecentBookings";
import RecentNotifications from "../../components/owner/RecentNotifications";
import useOwnerData from "../../hooks/useOwnerData";

function OwnerDashboard() {
    const navigate = useNavigate();
    const {
        ownerName,
        properties,
        propertiesState,
        mockData,
        usingMockProperties,
    } = useOwnerData();

    const rentedProperties = properties.filter((property) => property.status === "RENTED").length;
    const bookedProperties = properties.filter((property) => property.status === "BOOKED").length;
    const totalEarnings = mockData.earnings.reduce((sum, item) => sum + Number(item.value || 0), 0);
    const monthlyEarnings = Math.round(totalEarnings / Math.max(mockData.earnings.length, 1));
    const stats = [
        {
            icon: "building",
            value: properties.length,
            label: "Total Properties",
            trend: properties.length ? "+1 this month" : "Build your portfolio",
            tone: "gold",
        },
        {
            icon: "checkCircle",
            value: rentedProperties,
            label: "Rented Properties",
            trend: properties.length ? `${Math.round((rentedProperties / properties.length) * 100)}% occupancy` : "No rentals yet",
            tone: "emerald",
        },
        {
            icon: "calendar",
            value: mockData.bookings.filter((booking) => booking.status === "PENDING").length,
            label: "Pending Bookings",
            trend: bookedProperties ? "Needs your action" : "Needs your action",
            tone: "amber",
        },
        {
            icon: "rupee",
            value: `₹${monthlyEarnings.toLocaleString("en-IN")}`,
            label: "Total Earnings",
            trend: "This month",
            tone: "blue",
        },
    ];

    const quickActions = [
        { label: "Add Property", description: "List a new space", icon: "plusSquare", to: "/add-property", tone: "gold" },
        { label: "View Bookings", description: "Review tenant requests", icon: "calendar", to: "/owner/bookings", tone: "blue" },
        { label: "Manage Payments", description: "Track rent payments", icon: "wallet", to: "/owner/payments", tone: "green" },
        { label: "Edit Profile", description: "Keep your details current", icon: "user", to: "/owner/profile", tone: "charcoal" },
    ];

    return (
        <div className="space-y-7 sm:space-y-8">
            <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87c23]">Owner workspace</p>
                    <h1 className="mt-2 text-2xl font-bold tracking-[-0.045em] text-zinc-900 sm:text-3xl">
                        Welcome back, {ownerName.split(" ")[0]}! <span aria-hidden="true">👋</span>
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">Here&apos;s what&apos;s happening with your properties today.</p>
                </div>
                <Link
                    to="/add-property"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1d1d1b] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(29,29,27,0.12)] transition hover:bg-[#35332f] focus-visible:ring-4 focus-visible:ring-[#d9ad45]/25"
                >
                    <OwnerIcon name="plus" size={18} className="text-[#e9c66f]" />
                    Add Property
                </Link>
            </section>

            {usingMockProperties ? (
                <div className="flex gap-3 rounded-xl border border-[#e9ca80] bg-[#fff9e8] px-4 py-3 text-sm text-[#75551b]">
                    <OwnerIcon name="info" size={19} className="mt-0.5 shrink-0" />
                    <p>Live property data is unavailable right now, so you&apos;re seeing clearly marked sample properties.</p>
                </div>
            ) : null}

            <section aria-label="Portfolio overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <OwnerStatCard key={stat.label} {...stat} loading={propertiesState.loading && stat.label !== "Pending Bookings" && stat.label !== "Total Earnings"} />
                ))}
            </section>

            <section className="grid gap-6 2xl:grid-cols-[minmax(0,1.6fr)_minmax(22rem,0.9fr)]">
                <EarningsOverview data={mockData.earnings} />
                <RecentNotifications
                    notifications={mockData.notifications.slice(0, 4)}
                    onViewAll={() => navigate("/owner/notifications")}
                />
            </section>

            <section>
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold tracking-[-0.025em] text-zinc-900">My Properties</h2>
                        <p className="mt-1 text-sm text-zinc-500">A quick view of your latest listings.</p>
                    </div>
                    <Link to="/owner/properties" className="inline-flex items-center gap-1 text-sm font-semibold text-[#8b6615] transition hover:text-[#5e440c]">
                        View All <OwnerIcon name="arrowRight" size={16} />
                    </Link>
                </div>

                {propertiesState.loading ? (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {[0, 1, 2].map((index) => <OwnerPropertyCard key={index} loading />)}
                    </div>
                ) : properties.length ? (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {properties.slice(0, 3).map((property) => (
                            <OwnerPropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <OwnerEmptyState
                        title="No properties yet"
                        description="Add your first property to start receiving booking requests."
                        actionLabel="Add Property"
                    />
                )}
            </section>

            <section>
                <RecentBookings
                    bookings={mockData.bookings.slice(0, 4)}
                    onViewAll={() => navigate("/owner/bookings")}
                    onAction={() => navigate("/owner/bookings")}
                />
            </section>

            <section>
                <div className="mb-4">
                    <h2 className="text-lg font-bold tracking-[-0.025em] text-zinc-900">Quick Actions</h2>
                    <p className="mt-1 text-sm text-zinc-500">Jump straight to the things you do most.</p>
                </div>
                <QuickActions actions={quickActions} />
            </section>
        </div>
    );
}

export default OwnerDashboard;
