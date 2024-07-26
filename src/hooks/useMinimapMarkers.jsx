import { useState, useEffect } from 'react';
import axios from 'axios';

const useMinimapMarkers = (userLocation) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userLocation) return;

        axios.get(`/api/observations/nearby-markers?lat=${userLocation.latitude}&lon=${userLocation.longitude}&radius=25`)
            .then(response => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, [userLocation]);

    return { data, error, isLoading };
};

export default useMinimapMarkers;