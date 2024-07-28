import { useState } from 'react';
import useNearbyObservations from '../hooks/useNearbyObservations';
import useUserLocation from '../hooks/useUserLocation';
import useRecentObservations from '../hooks/useRecentObservations';
import ObservationMap from '../components/ObservationMap';
import ObservationModal from "../components/ObservationModal.jsx";
import '../styles/HomePage.css';

const HomePage = () => {
    const { data: userLocation, error: locationError, isLoading: locationLoading } = useUserLocation();
    const { data: nearbyObservations, error: nearbyError, isLoading: nearbyLoading } = useNearbyObservations(userLocation);
    const { data: recentObservations, error: recentError, isLoading: recentLoading } = useRecentObservations('YOUR_TOKEN_HERE');

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

    const [selectedMarker, setSelectedMarker] = useState(null);

    const showPopup = (marker) => {
        setSelectedMarker(marker);
    };

    const hidePopup = () => {
        setSelectedMarker(null);
    };

    const renderObservations = (observations) => {
        const placeholderObservations = Array(5).fill({
            description: "Beschrijving",
            photoPath: "placeholder_ijsvogel.png",
            location: "Unknown location",
            date: new Date().toLocaleString(),
            username: "username"
        });

        return (Array.isArray(observations) && observations.length > 0 ? observations.slice(0, 5) : placeholderObservations).map((observation, index) => {
            const photoFilename = observation.photoPath.split('/').pop();
            const photoUrl = `http://localhost:8080/uploads/${photoFilename}`;
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
                {locationLoading && <p>Locatie wordt geladen...</p>}
                {locationError && <p>Er is een fout opgetreden bij het ophalen van uw locatie: {locationError.message}</p>}
                {userLocation && (
                    <ObservationMap
                        center={[userLocation.latitude, userLocation.longitude]}
                        zoom={13}
                        markers={nearbyObservations || []}
                        onMarkerClick={showPopup}
                        selectedMarker={selectedMarker}
                        onClosePopup={hidePopup}
                        userLocation={userLocation}
                    />
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
