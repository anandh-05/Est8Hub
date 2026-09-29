import OwnerPageHeader from "../../components/owner/OwnerPageHeader";
import RecentBookings from "../../components/owner/RecentBookings";
import useOwnerData from "../../hooks/useOwnerData";

function Bookings() {
    const { mockData } = useOwnerData({ loadProperties: false });

    return (
        <div>
            <OwnerPageHeader
                title="Bookings"
                description="Review tenant requests and keep property visits on track."
                actionLabel="Add Property"
            />
            <RecentBookings bookings={mockData.bookings} />
            <p className="mt-3 text-xs leading-5 text-zinc-400">Booking data is shown from isolated temporary data until the booking API is available.</p>
        </div>
    );
}

export default Bookings;
