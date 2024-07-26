import { useState, useEffect } from 'react';

const useObservationMarkers = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                // Replace with your backend endpoint
                const response = await fetch('YOUR_BACKEND_ENDPOINT/observations');
                const data = await response.json();
                setMarkers(data);
            } catch (error) {
                console.error('Error fetching observation markers:', error);
            }
        };

        fetchMarkers();
    }, []);

    return markers;
};

export default useObservationMarkers;
