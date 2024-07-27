import React, { useState } from 'react';
import useObservationMarkers from '../hooks/useObservationMarkers';
import useUserLocation from '../hooks/useUserLocation';
import ObservationMap from '../components/ObservationMap';
import ObservationModal from '../components/ObservationModal';
import '../styles/MapPage.css';

const MapPage = () => {
    const { data: userLocation, error: locationError, isLoading: locationLoading } = useUserLocation();
    const { markers, error: markersError, isLoading: markersLoading } = useObservationMarkers();
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

    console.log('Markers:', markers); // Log markers to check the structure

    return (
        <div className="map-page">
            <h1>Kaart met alle waarnemingen in Nederland</h1>
            {locationLoading && <p>Locatie wordt geladen...</p>}
            {locationError && <p>Er is een fout opgetreden bij het ophalen van uw locatie: {locationError.message}</p>}
            {markersLoading && <p>Waarnemingen worden geladen...</p>}
            {markersError && <p>Er is een fout opgetreden bij het ophalen van de waarnemingen: {markersError.message}</p>}
            {!locationLoading && !markersLoading && (
                <ObservationMap
                    center={[52.3676, 4.9041]} // Default center (Amsterdam)
                    zoom={7} // Default zoom level
                    markers={markers}
                    onMarkerClick={openModal}
                    userLocation={userLocation}
                />
            )}
            <ObservationModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                observation={selectedObservation}
            />
        </div>
    );
};

export default MapPage;
