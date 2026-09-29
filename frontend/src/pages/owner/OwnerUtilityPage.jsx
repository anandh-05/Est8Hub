import OwnerEmptyState from "../../components/owner/OwnerEmptyState";
import OwnerPageHeader from "../../components/owner/OwnerPageHeader";

function OwnerUtilityPage({ type }) {
    const isMessages = type === "messages";
    const content = isMessages
        ? {
            title: "Messages",
            description: "Keep conversations with prospective tenants organised in one place.",
            icon: "message",
            emptyTitle: "Your inbox is clear",
            emptyDescription: "Tenant messages will appear here when messaging is connected to your account.",
        }
        : {
            title: "Settings",
            description: "Manage preferences for your owner workspace.",
            icon: "settings",
            emptyTitle: "Settings are on their way",
            emptyDescription: "Workspace preferences will appear here as they become available.",
        };

    return (
        <div>
            <OwnerPageHeader title={content.title} description={content.description} />
            <OwnerEmptyState icon={content.icon} title={content.emptyTitle} description={content.emptyDescription} />
        </div>
    );
}

export default OwnerUtilityPage;
