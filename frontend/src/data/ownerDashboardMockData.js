/**
 * TEMPORARY OWNER DASHBOARD DATA
 *
 * Bookings, payments, notifications, and earnings do not currently have
 * owner-facing API endpoints. These exports are intentionally isolated from
 * UI components so replacing them with API responses only changes the page
 * data layer. mockOwnerProperties follows the existing Django property
 * serializer shape and is only a visual fallback while property data loads.
 */

export const mockOwnerProperties = [
    {
        id: 101,
        owner: 1,
        title: "Parkview Residences",
        description: "A bright, furnished two-bedroom home near the city centre.",
        price: 28000,
        location: "Anna Nagar, Chennai",
        google_map_url: "",
        property_type: "APARTMENT",
        bedrooms: 2,
        bathrooms: 2,
        area: 1120,
        status: "RENTED",
        created_at: "2026-08-12T10:30:00Z",
        updated_at: "2026-09-12T10:30:00Z",
        images: [
            {
                id: 1001,
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            },
        ],
    },
    {
        id: 102,
        owner: 1,
        title: "The Veranda House",
        description: "An airy family home with a landscaped outdoor sitting area.",
        price: 42000,
        location: "Adyar, Chennai",
        google_map_url: "",
        property_type: "HOUSE",
        bedrooms: 3,
        bathrooms: 3,
        area: 1850,
        status: "BOOKED",
        created_at: "2026-08-20T10:30:00Z",
        updated_at: "2026-09-13T10:30:00Z",
        images: [
            {
                id: 1002,
                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
            },
        ],
    },
    {
        id: 103,
        owner: 1,
        title: "Marina Bay Studio",
        description: "A compact, thoughtfully designed studio for working professionals.",
        price: 18500,
        location: "Mylapore, Chennai",
        google_map_url: "",
        property_type: "APARTMENT",
        bedrooms: 1,
        bathrooms: 1,
        area: 620,
        status: "AVAILABLE",
        created_at: "2026-09-02T10:30:00Z",
        updated_at: "2026-09-15T10:30:00Z",
        images: [
            {
                id: 1003,
                image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
            },
        ],
    },
];

export const mockBookings = [
    {
        id: "BK-1048",
        tenant: {
            name: "Priya Raman",
            avatar: "https://i.pravatar.cc/80?img=47",
        },
        property: "The Veranda House",
        date: "18 Sep 2026",
        status: "PENDING",
    },
    {
        id: "BK-1047",
        tenant: {
            name: "Arjun Mehta",
            avatar: "https://i.pravatar.cc/80?img=12",
        },
        property: "Marina Bay Studio",
        date: "20 Sep 2026",
        status: "VISIT_SCHEDULED",
    },
    {
        id: "BK-1045",
        tenant: {
            name: "Nisha Kapoor",
            avatar: "https://i.pravatar.cc/80?img=32",
        },
        property: "Parkview Residences",
        date: "01 Oct 2026",
        status: "CONFIRMED",
    },
    {
        id: "BK-1043",
        tenant: {
            name: "Vikram Shah",
            avatar: "https://i.pravatar.cc/80?img=68",
        },
        property: "Marina Bay Studio",
        date: "14 Sep 2026",
        status: "CANCELLED",
    },
];

export const mockNotifications = [
    {
        id: "NT-01",
        type: "booking",
        title: "New booking request",
        message: "Priya Raman requested a visit to The Veranda House.",
        time: "12 min ago",
        isRead: false,
    },
    {
        id: "NT-02",
        type: "payment",
        title: "Rent payment received",
        message: "₹28,000 was received for Parkview Residences.",
        time: "2 hours ago",
        isRead: false,
    },
    {
        id: "NT-03",
        type: "visit",
        title: "Property visit scheduled",
        message: "Arjun Mehta is visiting Marina Bay Studio tomorrow.",
        time: "5 hours ago",
        isRead: true,
    },
    {
        id: "NT-04",
        type: "property",
        title: "Property marked as rented",
        message: "Parkview Residences is now shown as rented.",
        time: "Yesterday",
        isRead: true,
    },
];

export const mockPayments = [
    {
        id: "PAY-2084",
        property: "Parkview Residences",
        tenant: "Nisha Kapoor",
        amount: 28000,
        date: "15 Sep 2026",
        status: "PAID",
    },
    {
        id: "PAY-2083",
        property: "The Veranda House",
        tenant: "Priya Raman",
        amount: 42000,
        date: "12 Sep 2026",
        status: "PENDING",
    },
    {
        id: "PAY-2079",
        property: "Marina Bay Studio",
        tenant: "Arjun Mehta",
        amount: 18500,
        date: "01 Sep 2026",
        status: "PAID",
    },
];

export const mockEarnings = [
    { label: "Jan", value: 24000 },
    { label: "Feb", value: 31000 },
    { label: "Mar", value: 28000 },
    { label: "Apr", value: 36000 },
    { label: "May", value: 33000 },
    { label: "Jun", value: 41000 },
    { label: "Jul", value: 48000 },
];

export const mockOwnerStats = [
    {
        id: "total-properties",
        icon: "buildings",
        value: "5",
        label: "Total Properties",
        trend: "+1 this month",
        tone: "gold",
    },
    {
        id: "rented-properties",
        icon: "checkCircle",
        value: "3",
        label: "Rented Properties",
        trend: "60% occupancy",
        tone: "emerald",
    },
    {
        id: "pending-bookings",
        icon: "calendar",
        value: "4",
        label: "Pending Bookings",
        trend: "Needs your action",
        tone: "amber",
    },
    {
        id: "total-earnings",
        icon: "rupee",
        value: "₹48,000",
        label: "Total Earnings",
        trend: "This month",
        tone: "blue",
    },
];

export const mockQuickActions = [
    {
        id: "add-property",
        title: "Add Property",
        description: "Create a new listing",
        icon: "plus",
        to: "/add-property",
    },
    {
        id: "view-bookings",
        title: "View Bookings",
        description: "Review tenant requests",
        icon: "calendar",
        to: "/owner/bookings",
    },
    {
        id: "manage-payments",
        title: "Manage Payments",
        description: "Track rent collections",
        icon: "wallet",
        to: "/owner/payments",
    },
    {
        id: "edit-profile",
        title: "Edit Profile",
        description: "Update owner details",
        icon: "user",
        to: "/owner/profile",
    },
];

const ownerDashboardMockData = {
    properties: mockOwnerProperties,
    bookings: mockBookings,
    notifications: mockNotifications,
    payments: mockPayments,
    earnings: mockEarnings,
    stats: mockOwnerStats,
    quickActions: mockQuickActions,
};

export default ownerDashboardMockData;
