import axios from 'axios';

const geocode = async (latitude, longitude) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
                format: 'json',
                lat: latitude,
                lon: longitude,
            }
        });

        const address = response.data.address;
        const location = address.city || address.town || address.village || address.hamlet || address.locality || address.state || address.country;
        return location || `${latitude}, ${longitude}`;
    } catch (error) {
        console.error('Geocoding error:', error);
        return `${latitude}, ${longitude}`;
    }
};

export default geocode;