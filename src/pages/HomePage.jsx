import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/HomePage.css';

import useNearbyObservations from '../hooks/useNearbyObservations';
import useUserLocation from '../hooks/useUserLocation';
import useRecentObservations from '../hooks/useRecentObservations'; // Importeer de hook
import L from 'leaflet';
import ObservationModal from "../components/ObservationModal.jsx";

const { BaseLayer } = LayersControl;

const placeholderObservations = Array(5).fill({
    description: "Beschrijving",
    photoPath: "placeholder_ijsvogel.png",
    location: "Unknown location",
    date: new Date().toLocaleString(),
    username: "username"
});

const userLocationIcon = new L.Icon({
    iconUrl: '/images/Markers/MarkerOwnLocation.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [41, 41]
});

const observation24hrIcon = new L.Icon({
    iconUrl: '/images/Markers/GreenMarker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [41, 41]
});

const observation48hrIcon = new L.Icon({
    iconUrl: '/images/Markers/YellowMarker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [41, 41]
});

const observation72hrIcon = new L.Icon({
    iconUrl: '/images/Markers/RedMarker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [41, 41]
});

const RefreshButton = () => {
    const map = useMap();
    const handleRefresh = () => {
        map.setView(map.getCenter(), map.getZoom(), { animate: true });
    };

    return (
        <button className="refresh-button" onClick={handleRefresh}>Refresh Map</button>
    );
};

const HomePage = () => {
    const { data: userLocation } = useUserLocation();
    const { data: nearbyObservations, error: nearbyError, isLoading: nearbyLoading } = useNearbyObservations(userLocation);
    const { data: recentObservations, error: recentError, isLoading: recentLoading } = useRecentObservations('YOUR_TOKEN_HERE');

    console.log('Recent Observations in HomePage:', recentObservations);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedObservation, setSelectedObservation] = useState(null);

    const openModal = (observation) => {
        setSelectedObservation(observation);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedObservation(null);
        setModalIsOpen(false);
    };

    const getObservationIcon = (observationDate) => {
        const now = new Date();
        const observationTime = new Date(observationDate);
        const timeDiff = now - observationTime;
        const oneDay = 24 * 60 * 60 * 1000;
        const twoDays = 48 * 60 * 60 * 1000;
        const threeDays = 72 * 60 * 60 * 1000;

        if (timeDiff <= oneDay) {
            return observation24hrIcon;
        } else if (timeDiff <= twoDays) {
            return observation48hrIcon;
        } else if (timeDiff <= threeDays) {
            return observation72hrIcon;
        } else {
            return null;
        }
    };

    const renderMarkers = () => {
        const markers = [];

        if (userLocation) {
            markers.push(
                <Marker key="user-location" position={[userLocation.latitude, userLocation.longitude]} icon={userLocationIcon}>
                    <Popup>Je bent hier</Popup>
                </Marker>
            );
        }

        if (Array.isArray(nearbyObservations)) {
            nearbyObservations.forEach((observation, index) => {
                const icon = getObservationIcon(observation.date);
                if (icon) {
                    markers.push(
                        <Marker key={index} position={[observation.latitude, observation.longitude]} icon={icon}>
                            <Popup>
                                <strong>{observation.username}</strong><br />
                                {observation.description}
                            </Popup>
                        </Marker>
                    );
                }
            });
        }

        return markers;
    };

    const renderObservations = (observations) => {
        console.log('Observations to render:', observations);
        return (Array.isArray(observations) && observations.length > 0 ? observations.slice(0, 5) : placeholderObservations).map((observation, index) => {
            const photoFilename = observation.photoPath.split('/').pop(); // Haal alleen de bestandsnaam
            const photoUrl = `http://localhost:8081/uploads/${photoFilename}`;
            console.log(photoUrl);
            return (
                <figure key={index} className={`pic pic${index + 1}`} onClick={() => openModal(observation)}>
                    <div className="details">
                        <span className="date-time">{new Date(observation.date).toLocaleString()}</span>
                        <span className="location">{observation.location}</span>
                    </div>
                    <div className="image-container">
                        <img src={photoUrl} alt="Observation" className="observation-image"/>
                    </div>
                    <figcaption className="observation-caption">
                        <strong>{observation.username}:</strong>
                        <div>{observation.description}</div>
                    </figcaption>
                </figure>
            );
        });
    };

    return (
        <div className={`home-page ${modalIsOpen ? 'modal-open' : ''}`}>
            <div className="container recent-section">
                <h2 className="h2-recent">Recente waarnemingen</h2>
                {recentLoading && <p>Laden...</p>}
                {recentError && <p>Er is een fout opgetreden: {recentError.message}</p>}
                <div id="recent-gallery">
                    {renderObservations(recentObservations)}
                </div>
            </div>

            <div className="container nearby-section">
            <h2 className="h2-nearby">Waarnemingen in de buurt</h2>
                {nearbyLoading && <p>Laden...</p>}
                {nearbyError && <p>Er is een fout opgetreden: {nearbyError.message}</p>}
                <div id="nearby-gallery">
                    {renderObservations(nearbyObservations)}
                </div>
            </div>

            <div className="container nearby-map">
                <h2 className="h2-map">Kaart van IJsvogels bij U in de buurt</h2>
                {userLocation && (
                    <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={13} className="map-container">
                        <LayersControl position="topright">
                            <BaseLayer checked name="Standaard kaart">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                            </BaseLayer>
                            <BaseLayer name="Sattelietkaart">
                                <TileLayer
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    attribution='Tiles &copy; Esri &mdash; Source: Esri'
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
                        {renderMarkers()}
                        <RefreshButton />
                        <div className="legend-HomepageMap">
                            <h4>Legenda</h4>
                            <p><span className="legend-marker current-location"></span> Huidige Locatie</p>
                            <p><span className="legend-marker observation-24hr"></span> Waarneming (laatste 24 uur)</p>
                            <p><span className="legend-marker observation-48hr"></span> Waarneming (laatste 48 uur)</p>
                            <p><span className="legend-marker observation-72hr"></span> Waarneming (laatste 72 uur)</p>
                        </div>
                    </MapContainer>
                )}
            </div>

            <ObservationModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                observation={selectedObservation}
            />
        </div>
    );
};

export default HomePage;