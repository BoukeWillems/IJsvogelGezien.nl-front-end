import { useState, useEffect } from 'react';

const useUserLocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError(new Error("Geolocation is not supported by your browser"));
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error);
                setIsLoading(false);
            }
        );
    }, []);

    return { data: location, error, isLoading };
};

export default useUserLocation;