import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import {
    mockOwnerProperties,
    mockBookings,
    mockEarnings,
    mockNotifications,
    mockPayments,
} from "../data/ownerDashboardMockData";
import { getUser } from "../utils/auth";

const EMPTY_REQUEST_STATE = {
    loading: true,
    error: null,
};

function getOwnerName(profile) {
    return [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || profile?.username || "Owner";
}

/**
 * Centralizes the small set of live owner endpoints that already exist. The
 * booking, payment, notification and earnings values intentionally remain
 * isolated mocks until their DRF endpoints are added.
 */
function useOwnerData({ loadProperties = true } = {}) {
    const [profile, setProfile] = useState(() => getUser());
    const [properties, setProperties] = useState([]);
    const [profileState, setProfileState] = useState(EMPTY_REQUEST_STATE);
    const [propertiesState, setPropertiesState] = useState({
        loading: loadProperties,
        error: null,
    });

    const loadProfile = useCallback(async () => {
        setProfileState({ loading: true, error: null });

        try {
            const response = await api.get("profile/");
            setProfile(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            setProfileState({ loading: false, error: null });
            return response.data;
        } catch (error) {
            setProfileState({ loading: false, error });
            return null;
        }
    }, []);

    const loadPropertiesForOwner = useCallback(async () => {
        if (!loadProperties) {
            return [];
        }

        setPropertiesState({ loading: true, error: null });

        try {
            const response = await api.get("properties/my-properties/");
            const nextProperties = Array.isArray(response.data) ? response.data : [];
            setProperties(nextProperties);
            setPropertiesState({ loading: false, error: null });
            return nextProperties;
        } catch (error) {
            setProperties(mockOwnerProperties);
            setPropertiesState({ loading: false, error });
            return mockOwnerProperties;
        }
    }, [loadProperties]);

    useEffect(() => {
        let isCurrent = true;

        async function fetchProfile() {
            try {
                const response = await api.get("profile/");
                if (!isCurrent) return;
                setProfile(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                setProfileState({ loading: false, error: null });
            } catch (error) {
                if (isCurrent) setProfileState({ loading: false, error });
            }
        }

        fetchProfile();
        return () => { isCurrent = false; };
    }, []);

    useEffect(() => {
        if (!loadProperties) return undefined;

        let isCurrent = true;

        async function fetchProperties() {
            try {
                const response = await api.get("properties/my-properties/");
                if (!isCurrent) return;
                setProperties(Array.isArray(response.data) ? response.data : []);
                setPropertiesState({ loading: false, error: null });
            } catch (error) {
                if (!isCurrent) return;
                setProperties(mockOwnerProperties);
                setPropertiesState({ loading: false, error });
            }
        }

        fetchProperties();
        return () => { isCurrent = false; };
    }, [loadProperties]);

    return {
        profile,
        ownerName: getOwnerName(profile),
        properties,
        profileState,
        propertiesState,
        reloadProfile: loadProfile,
        reloadProperties: loadPropertiesForOwner,
        mockData: {
            bookings: mockBookings,
            earnings: mockEarnings,
            notifications: mockNotifications,
            payments: mockPayments,
        },
        usingMockProperties: Boolean(propertiesState.error),
    };
}

export default useOwnerData;
