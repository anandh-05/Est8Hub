import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import publicApi from "../services/publicApi";
import { getUser } from "../utils/auth";

const initialState = { loading: true, error: null };

function useTenantData({ loadProperties = true } = {}) {
    const [profile, setProfile] = useState(() => getUser());
    const [properties, setProperties] = useState([]);
    const [profileState, setProfileState] = useState(initialState);
    const [propertiesState, setPropertiesState] = useState({ loading: loadProperties, error: null });

    const loadProfile = useCallback(async () => {
        setProfileState({ loading: true, error: null });
        try {
            const response = await api.get("profile/");
            setProfile(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            setProfileState({ loading: false, error: null });
        } catch (error) {
            setProfileState({ loading: false, error });
        }
    }, []);

    const loadPropertiesList = useCallback(async () => {
        if (!loadProperties) return;
        setPropertiesState({ loading: true, error: null });
        try {
            const response = await publicApi.get("properties/");
            setProperties(Array.isArray(response.data) ? response.data : []);
            setPropertiesState({ loading: false, error: null });
        } catch (error) {
            setPropertiesState({ loading: false, error });
        }
    }, [loadProperties]);

    useEffect(() => {
        let active = true;
        async function fetchProfile() {
            try {
                const response = await api.get("profile/");
                if (!active) return;
                setProfile(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                setProfileState({ loading: false, error: null });
            } catch (error) {
                if (active) setProfileState({ loading: false, error });
            }
        }
        fetchProfile();
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (!loadProperties) return undefined;
        let active = true;
        async function fetchProperties() {
            try {
                const response = await publicApi.get("properties/");
                if (!active) return;
                setProperties(Array.isArray(response.data) ? response.data : []);
                setPropertiesState({ loading: false, error: null });
            } catch (error) {
                if (active) setPropertiesState({ loading: false, error });
            }
        }
        fetchProperties();
        return () => { active = false; };
    }, [loadProperties]);

    return { profile, properties, profileState, propertiesState, reloadProfile: loadProfile, reloadProperties: loadPropertiesList };
}

export default useTenantData;
