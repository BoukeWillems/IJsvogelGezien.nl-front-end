import React from 'react';
import useObservationMarkers from '../hooks/useObservationMarkers';
import useMarkerPopup from '../hooks/useMarkerPopup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.css';

const MapPage = () => {
    const markers = useObservationMarkers();
    const { selectedMarker, isPopupVisible, showPopup, hidePopup } = useMarkerPopup();

    return (
        <div className="map-page">
            <h1>Observations Map</h1>
            <MapContainer center={[52.3676, 4.9041]} zoom={7} style={{ height: '600px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={[marker.lat, marker.lon]}
                        eventHandlers={{
                            click: () => showPopup(marker),
                        }}
                    />
                ))}
                {selectedMarker && isPopupVisible && (
                    <Popup
                        position={[selectedMarker.lat, selectedMarker.lon]}
                        onClose={hidePopup}
                    >
                        <div className="popup-content">
                            <h2>{selectedMarker.description}</h2>
                            <p>{selectedMarker.date}</p>
                            <p>{selectedMarker.time}</p>
                            <div className="popup-comments">
                                {/* Comments section can be implemented here */}
                            </div>
                        </div>
                    </Popup>
                )}
            </MapContainer>
            {isPopupVisible && <div className="overlay" onClick={hidePopup}></div>}
        </div>
    );
};

export default MapPage;
