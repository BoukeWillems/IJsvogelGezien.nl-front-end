import { useState, useEffect } from 'react';

const useLocationPicker = () => {
    const [location, setLocation] = useState(null);
    const [municipality, setMunicipality] = useState('');

    useEffect(() => {
        if (location) {
            const fetchMunicipality = async () => {
                try {
                    // Replace with your reverse geocoding endpoint
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location[0]}&lon=${location[1]}`);
                    const data = await response.json();
                    setMunicipality(data.address.city || data.address.town || data.address.village || 'Onbekende locatie');
                } catch (error) {
                    console.error('Error fetching municipality:', error);
                }
            };

            fetchMunicipality();
        }
    }, [location]);

    return {
        location,
        setLocation,
        municipality,
    };
};

export default useLocationPicker;
