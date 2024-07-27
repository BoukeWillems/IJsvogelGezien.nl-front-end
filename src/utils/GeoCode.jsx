import L from 'leaflet';
import 'leaflet-control-geocoder';

const geocode = async (lat, lon) => {
    return new Promise((resolve, reject) => {
        const geocoder = L.Control.Geocoder.nominatim();
        geocoder.reverse(
            { lat, lng: lon },
            18,
            (results) => {
                if (results.length > 0) {
                    const address = results[0].properties.address;
                    const placeName = address.city || address.town || address.village || address.hamlet || address.neighbourhood || 'Unknown location';
                    resolve(placeName);
                } else {
                    resolve(`${lat}, ${lon}`);
                }
            },
            (err) => {
                reject(err);
            }
        );
    });
};

export default geocode;
