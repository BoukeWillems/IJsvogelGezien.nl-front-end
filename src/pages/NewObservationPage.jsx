import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/NewObservationPage.css';
import { useState, useEffect, useRef } from "react";
import L from 'leaflet';
import useUserLocation from '../hooks/useUserLocation';
import axios from 'axios';
import SuccessModal from '../components/SuccessModal';
import { useNavigate } from 'react-router-dom';

const { BaseLayer } = LayersControl;

const currentLocationIcon = new L.Icon({
    iconUrl: '/images/Markers/MarkerOwnLocation.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [41, 41]
});

const observationMarkerIcon = new L.Icon({
    iconUrl: '/images/Markers/NewMarker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [41, 41]
});

const NewObservationPage = () => {
    const { data: userLocation } = useUserLocation();
    const [formData, setFormData] = useState({
        description: '',
        photo: null,
        date: '',
        time: '',
        username: '',
        latitude: null,
        longitude: null,
        location: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const navigate = useNavigate();
    const formRef = useRef(null);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get('/api/auth/user'); // Change this to your auth endpoint
                setFormData((prevFormData) => ({ ...prevFormData, username: response.data.username }));
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };
        fetchUsername();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }

        const { description, photo, date, time, latitude, longitude } = formData;
        const newErrorMessages = {};

        // Validate the form fields
        if (!description) newErrorMessages.description = 'Beschrijving is verplicht.';
        if (!photo) newErrorMessages.photo = 'Foto is verplicht.';
        if (!date) newErrorMessages.date = 'Datum is verplicht.';
        if (!time) newErrorMessages.time = 'Tijd is verplicht.';

        if (Object.keys(newErrorMessages).length > 0) {
            setErrorMessages(newErrorMessages);
            return;
        }

        const observationDate = `${date}T${time}:00`; // Combine date and time

        const formDataToSend = new FormData();
        formDataToSend.append('description', description);
        formDataToSend.append('latitude', latitude);
        formDataToSend.append('longitude', longitude);
        formDataToSend.append('date', observationDate);
        formDataToSend.append('photo', photo);

        try {
            const response = await axios.post('http://localhost:8080/api/observations/upload', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Observation uploaded:', response.data);
            setIsModalOpen(true); // Show modal upon successful upload
            setErrorMessages({}); // Clear any previous error messages
        } catch (error) {
            console.error('Error uploading observation:', error);
            setErrorMessages({ upload: 'Er is een fout opgetreden bij het uploaden van de waarneming. Probeer het opnieuw.' });
        }
    };

    const fetchLocationName = async (lat, lon) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
            if (response.data && response.data.address) {
                const { city, town, village } = response.data.address;
                const locationName = city || town || village || "Onbekende locatie";
                setFormData((prevFormData) => ({ ...prevFormData, location: locationName }));
            }
        } catch (error) {
            console.error("Error fetching location name:", error);
        }
    };

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setFormData({
                    ...formData,
                    latitude: lat,
                    longitude: lng,
                });
                fetchLocationName(lat, lng);
            },
        });

        return formData.latitude && formData.longitude ? (
            <Marker position={[formData.latitude, formData.longitude]} icon={observationMarkerIcon} />
        ) : null;
    };

    const renderMarkers = () => {
        return (
            userLocation && (
                <Marker position={[userLocation.latitude, userLocation.longitude]} icon={currentLocationIcon}>
                    <Popup>Je bent hier</Popup>
                </Marker>
            )
        );
    };

    const handleUploadAnother = () => {
        setIsModalOpen(false);
        setFormData({
            description: '',
            photo: null,
            date: '',
            time: '',
            username: formData.username,
            latitude: null,
            longitude: null,
            location: ''
        });
    };

    const handleGoHome = () => {
        navigate('/Home');
    };

    return (
        <div className="new-observation-page">
            <h2>Nieuwe Waarneming Toevoegen</h2>
            <div className="form-and-map">
                <div className="form-container">
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <div className="polaroid-upload">
                            <div className="details">
                                <div className="date-time">
                                    <label htmlFor="date">Datum</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errorMessages.date && <p className="error-message">{errorMessages.date}</p>}
                                    <label htmlFor="time">Tijd</label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errorMessages.time && <p className="error-message">{errorMessages.time}</p>}
                                </div>
                                <div className="location">
                                    <p className={!formData.latitude && !formData.longitude ? "location-missing" : ""}>
                                        Locatie: {formData.location || 'Klik op de kaart'}
                                    </p>
                                </div>
                            </div>
                            <div className="photo">
                                <div className="photo-frame">
                                    {formData.photo ? (
                                        <img
                                            src={URL.createObjectURL(formData.photo)}
                                            alt="Observation"
                                            className="preview"
                                        />
                                    ) : (
                                        <label htmlFor="photo" className="photo-upload-label">Klik hier om een foto te uploaden</label>
                                    )}
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        required
                                        className="photo-input"
                                    />
                                    {errorMessages.photo && <p className="error-message">{errorMessages.photo}</p>}
                                </div>
                            </div>
                            <div className="username">
                                <p>{formData.username}</p>
                            </div>
                            <div className="description">
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    maxLength="250"
                                    placeholder="Voer hier een beschrijving van je waarneming in..."
                                    required
                                />
                                {errorMessages.description && <p className="error-message">{errorMessages.description}</p>}
                            </div>
                        </div>
                        <button type="submit" className="upload-button">Uploaden</button>
                    </form>
                    {errorMessages.upload && <p className="error-message">{errorMessages.upload}</p>}
                </div>

                <div className="map-container">
                    {userLocation && (
                        <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={13} className="map">
                            <LayersControl position="topright">
                                <BaseLayer checked name="Standaard kaart">
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                </BaseLayer>
                                <BaseLayer name="Satteliet">
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                    />
                                </BaseLayer>
                                <BaseLayer name="Waterkaart">
                                    <TileLayer
                                        url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/water/EPSG:3857/{z}/{x}/{y}.png"
                                        minZoom={6}
                                        maxZoom={19}
                                        bounds={[[50.5, 3.25], [54, 7.6]]}
                                        attribution='Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
                                    />
                                </BaseLayer>
                            </LayersControl>
                            <LocationMarker />
                            {renderMarkers()}
                            <div className="legend-uploadMap">
                                <h4>Legenda</h4>
                                <p><span className="legend-marker current-location"></span> Huidige Locatie</p>
                                <p><span className="legend-marker observation-marker"></span> Waarneming</p>
                            </div>
                        </MapContainer>
                    )}
                </div>
            </div>

            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUploadAnother={handleUploadAnother}
                onGoHome={handleGoHome}
            />
        </div>
    );
};

export default NewObservationPage;
