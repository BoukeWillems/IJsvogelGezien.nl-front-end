import { useState, useEffect } from 'react';

const useAccountSettings = (userId) => {
    const [settings, setSettings] = useState({
        profileImage: '',
        username: '',
        email: '',
        shareObservations: true,
        emailNotifications: true,
        language: 'nl',
        theme: 'light',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                // Vervang met je backend endpoint
                const response = await fetch(`YOUR_BACKEND_ENDPOINT/account-settings?userId=${userId}`);
                const data = await response.json();
                setSettings(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [userId]);

    const updateSettings = async (newSettings) => {
        try {
            setLoading(true);
            // Vervang met je backend endpoint
            const response = await fetch(`YOUR_BACKEND_ENDPOINT/account-settings?userId=${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSettings),
            });
            if (response.ok) {
                setSettings(newSettings);
            } else {
                throw new Error('Failed to update settings');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        settings,
        loading,
        error,
        updateSettings,
    };
};

export default useAccountSettings;
