import { useState, useEffect } from 'react';
import axios from 'axios';

const useObservationMarkers = () => {
    const [markers, setMarkers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMarkers = async () => {
            const token = localStorage.getItem('token');
            const now = new Date();
            const threeDaysAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000);
            const startDate = threeDaysAgo.toISOString();
            const endDate = now.toISOString();

            console.log('Fetching observations from API...');

            try {
                const response = await axios.get('http://localhost:8080/api/observations/period', {
                    params: {
                        startDate,
                        endDate
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Fetched observations:', response.data);


                response.data.forEach(obs => {
                    console.log('Observation:', obs);
                });


                const validObservations = response.data.filter(obs => obs.latitude && obs.longitude);

                console.log('Valid observations:', validObservations);

                const mappedObservations = validObservations.map(obs => ({
                    lat: obs.latitude,
                    lon: obs.longitude,
                    date: obs.date,
                    description: obs.description,
                    username: obs.username,
                    photoUrl: `http://localhost:8080/api/observations/uploads/${obs.photoPath.split('/').pop()}`
                }));

                setMarkers(mappedObservations);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching markers:', err);
                setError(err);
                setIsLoading(false);
            }
        };

        fetchMarkers();
    }, []);

    return { markers, error, isLoading };
};

export default useObservationMarkers;
