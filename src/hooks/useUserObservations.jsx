// src/hooks/useUserObservations.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserObservations = (token) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchObservations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/observations', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchObservations();
    }, [token]);

    return { data, error, isLoading };
};

export default useUserObservations;
