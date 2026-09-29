import RecentNotifications from "../../components/owner/RecentNotifications";
import OwnerPageHeader from "../../components/owner/OwnerPageHeader";
import useOwnerData from "../../hooks/useOwnerData";

function Notifications() {
    const { mockData } = useOwnerData({ loadProperties: false });

    return (
        <div>
            <OwnerPageHeader
                title="Notifications"
                description="Stay informed about bookings, rent payments, and activity across your properties."
            />
            <RecentNotifications notifications={mockData.notifications} />
            <p className="mt-3 text-xs leading-5 text-zinc-400">Notifications are isolated sample data until the Django notification API is connected.</p>
        </div>
    );
}

export default Notifications;
