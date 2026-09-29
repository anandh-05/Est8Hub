/**
 * Small, dependency-free icon set shared by the owner workspace.
 * Add an icon here instead of adding a page-level SVG so the visual language
 * stays consistent without introducing an icon-library dependency.
 */
function OwnerIcon({
    name = "sparkles",
    size = 20,
    className = "",
    strokeWidth = 1.8,
    ariaLabel,
}) {
    let artwork;

    switch (name) {
        case "dashboard":
        case "grid":
            artwork = (
                <>
                    <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" />
                    <rect x="14" y="3.5" width="6.5" height="6.5" rx="1" />
                    <rect x="3.5" y="14" width="6.5" height="6.5" rx="1" />
                    <rect x="14" y="14" width="6.5" height="6.5" rx="1" />
                </>
            );
            break;
        case "home":
        case "house":
            artwork = (
                <>
                    <path d="m3.5 10.5 8.5-7 8.5 7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.5 9.5v10.25c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.25 21v-5.75c0-.69.56-1.25 1.25-1.25h3c.69 0 1.25.56 1.25 1.25V21" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "buildings":
        case "building":
        case "properties":
            artwork = (
                <>
                    <path d="M4 21V5.75C4 4.78 4.78 4 5.75 4h7.5c.97 0 1.75.78 1.75 1.75V21" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 9h4.25c.97 0 1.75.78 1.75 1.75V21" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 21h19M8 8h2M8 12h2M8 16h2M16.5 14h1.5M16.5 17.5h1.5" strokeLinecap="round" />
                </>
            );
            break;
        case "calendar":
            artwork = (
                <>
                    <rect x="3.5" y="5.5" width="17" height="15" rx="2.25" />
                    <path d="M7.5 3.5v4M16.5 3.5v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" strokeLinecap="round" />
                </>
            );
            break;
        case "plusSquare":
            artwork = (
                <>
                    <rect x="4" y="4" width="16" height="16" rx="2.25" />
                    <path d="M12 8v8M8 12h8" strokeLinecap="round" />
                </>
            );
            break;
        case "rupee":
            artwork = (
                <>
                    <path d="M5 4h13M5 8h13M7 4c0 2.21 1.79 4 4 4h1c2.21 0 4 1.79 4 4s-1.79 4-4 4H7l10 4" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "wallet":
        case "payment":
        case "payments":
            artwork = (
                <>
                    <path d="M4 7.25A2.25 2.25 0 0 1 6.25 5H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6.25A2.25 2.25 0 0 1 4 18.75v-11.5Z" strokeLinejoin="round" />
                    <path d="M4 8h12.5A1.5 1.5 0 0 0 18 6.5v0A1.5 1.5 0 0 0 16.5 5H6.75M15 14h5M17.5 14h.01" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "bell":
        case "notifications":
            artwork = (
                <>
                    <path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "message":
        case "messages":
            artwork = (
                <>
                    <path d="M20.5 11.5a7.8 7.8 0 0 1-8.25 7.75 9.32 9.32 0 0 1-3.58-.76L4 20l1.47-4.2A7.53 7.53 0 0 1 3.5 11.5a7.8 7.8 0 0 1 8.25-7.75A7.8 7.8 0 0 1 20.5 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeLinecap="round" strokeWidth="2.6" />
                </>
            );
            break;
        case "user":
        case "profile":
            artwork = (
                <>
                    <circle cx="12" cy="8" r="3.25" />
                    <path d="M5 20.25c.9-3.12 3.32-5 7-5s6.1 1.88 7 5" strokeLinecap="round" />
                </>
            );
            break;
        case "users":
        case "tenant":
            artwork = (
                <>
                    <circle cx="9" cy="8.25" r="3" />
                    <path d="M3.75 20c.83-3.15 2.58-5 5.25-5s4.42 1.85 5.25 5M16 5.5a3 3 0 0 1 0 5.5M18.5 15.5c1.33.7 2.16 2.2 2.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "settings":
            artwork = (
                <>
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.45 2.45-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56v.09h-3.46v-.09A1.7 1.7 0 0 0 9.9 19a1.7 1.7 0 0 0-1.88.34l-.06.06-2.45-2.45.06-.06A1.7 1.7 0 0 0 5.91 15a1.7 1.7 0 0 0-1.56-1.03h-.09v-3.46h.09A1.7 1.7 0 0 0 5.91 9.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.45-2.45.06.06A1.7 1.7 0 0 0 9.9 5.5a1.7 1.7 0 0 0 1.03-1.56v-.09h3.46v.09A1.7 1.7 0 0 0 15.4 5.5a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.45 2.45-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.09v3.46h-.09A1.7 1.7 0 0 0 19.4 15Z" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "logout":
            artwork = (
                <>
                    <path d="M10 5H6.5A2.5 2.5 0 0 0 4 7.5v9A2.5 2.5 0 0 0 6.5 19H10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m14 8 4 4-4 4M18 12H9" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "search":
            artwork = (
                <>
                    <circle cx="10.75" cy="10.75" r="5.75" />
                    <path d="m15 15 4.25 4.25" strokeLinecap="round" />
                </>
            );
            break;
        case "menu":
            artwork = <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />;
            break;
        case "plus":
            artwork = <path d="M12 5v14M5 12h14" strokeLinecap="round" />;
            break;
        case "trendingUp":
        case "trendUp":
        case "trend":
            artwork = (
                <>
                    <path d="m4 16 5-5 3.5 3.5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 7h5v5" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "arrowUpRight":
            artwork = (
                <>
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "arrowRight":
            artwork = <path d="M5 12h14m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />;
            break;
        case "chevronDown":
            artwork = <path d="m6.5 9 5.5 5.5L17.5 9" strokeLinecap="round" strokeLinejoin="round" />;
            break;
        case "chevronRight":
            artwork = <path d="m9 6.5 5.5 5.5L9 17.5" strokeLinecap="round" strokeLinejoin="round" />;
            break;
        case "more":
        case "moreHorizontal":
            artwork = <path d="M5 12h.01M12 12h.01M19 12h.01" strokeLinecap="round" strokeWidth="3" />;
            break;
        case "bed":
            artwork = (
                <>
                    <path d="M4 19V9.75C4 8.78 4.78 8 5.75 8h12.5C19.22 8 20 8.78 20 9.75V19M4 15h16M7 12h3.5c.83 0 1.5-.67 1.5-1.5S11.33 9 10.5 9H7v3Z" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "bath":
            artwork = (
                <>
                    <path d="M4 12h16M6 12v2.5A5.5 5.5 0 0 0 11.5 20h1A5.5 5.5 0 0 0 18 14.5V12M7 20v1M17 20v1M7 12V8a2 2 0 0 1 4 0v1" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "ruler":
        case "area":
            artwork = (
                <>
                    <path d="m5.5 18.5 13-13 2 2-13 13-2-2Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m10 14 1.5 1.5M13 11l1.5 1.5M16 8l1.5 1.5" strokeLinecap="round" />
                </>
            );
            break;
        case "mapPin":
        case "pin":
        case "location":
            artwork = (
                <>
                    <path d="M19 10.5c0 5.25-7 10-7 10s-7-4.75-7-10a7 7 0 1 1 14 0Z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10.5" r="2.25" />
                </>
            );
            break;
        case "eye":
            artwork = (
                <>
                    <path d="M2.75 12s3.35-5.5 9.25-5.5S21.25 12 21.25 12 17.9 17.5 12 17.5 2.75 12 2.75 12Z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="2.4" />
                </>
            );
            break;
        case "edit":
        case "pencil":
            artwork = (
                <>
                    <path d="m13.75 5.25 5 5M4 20l3.72-.83L19.5 7.4a1.77 1.77 0 0 0 0-2.5l-.4-.4a1.77 1.77 0 0 0-2.5 0L4.83 16.28 4 20Z" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "check":
        case "checkCircle":
            artwork = (
                <>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="m8.25 12 2.4 2.4 5.1-5.1" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "clock":
            artwork = (
                <>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7v5l3 1.75" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "xCircle":
        case "cancel":
            artwork = (
                <>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="m9 9 6 6m0-6-6 6" strokeLinecap="round" />
                </>
            );
            break;
        case "close":
            artwork = <path d="m7 7 10 10M17 7 7 17" strokeLinecap="round" />;
            break;
        case "mail":
            artwork = (
                <>
                    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                    <path d="m4.5 7 7.5 5.75L19.5 7" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "at":
            artwork = (
                <>
                    <circle cx="12" cy="12" r="8.5" />
                    <circle cx="12" cy="11.5" r="3" />
                    <path d="M15 11.5v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-1.25" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "phone":
            artwork = (
                <>
                    <path d="M8.07 4.5 6.2 5.18a1.78 1.78 0 0 0-1.12 1.94c.8 5.47 5.1 9.77 10.57 10.57a1.78 1.78 0 0 0 1.94-1.12l.68-1.87a1.8 1.8 0 0 0-.55-2l-1.64-1.28a1.8 1.8 0 0 0-2.15-.04l-.93.71a.7.7 0 0 1-.8.03 10.6 10.6 0 0 1-2.32-2.32.7.7 0 0 1 .03-.8l.71-.93a1.8 1.8 0 0 0-.04-2.15L10.1 5.05a1.8 1.8 0 0 0-2.03-.55Z" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
            break;
        case "info":
            artwork = (
                <>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 10.75V16M12 8h.01" strokeLinecap="round" strokeWidth="2.2" />
                </>
            );
            break;
        case "alert":
        case "warning":
            artwork = (
                <>
                    <path d="m12 3.75 8.25 15a1.15 1.15 0 0 1-1 1.75H4.75a1.15 1.15 0 0 1-1-1.75l8.25-15Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 9v4M12 16h.01" strokeLinecap="round" strokeWidth="2.2" />
                </>
            );
            break;
        case "support":
        case "help":
            artwork = (
                <>
                    <path d="M20 12a8 8 0 0 1-8 8 7.67 7.67 0 0 1-3.4-.8L4 20l.8-3.2A8 8 0 1 1 20 12Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.75 9.5a2.3 2.3 0 1 1 3.68 1.85c-.92.7-1.43 1.08-1.43 2.15M12 16.5h.01" strokeLinecap="round" strokeWidth="2.1" />
                </>
            );
            break;
        case "sparkles":
        default:
            artwork = (
                <>
                    <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" strokeLinecap="round" strokeLinejoin="round" />
                </>
            );
    }

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className={className}
            aria-hidden={ariaLabel ? undefined : true}
            aria-label={ariaLabel}
            role={ariaLabel ? "img" : undefined}
        >
            {ariaLabel ? <title>{ariaLabel}</title> : null}
            {artwork}
        </svg>
    );
}

export default OwnerIcon;
