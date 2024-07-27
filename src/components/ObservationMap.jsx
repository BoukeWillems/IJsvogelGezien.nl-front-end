import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import getObservationIcon from '../utils/getObservationIcon';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const { BaseLayer } = LayersControl;

const userLocationIcon = new L.Icon({
    iconUrl: '/images/Markers/MarkerOwnLocation.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [41, 41]
});

const ObservationMap = ({ center, zoom, markers, onMarkerClick, selectedMarker, onClosePopup, userLocation }) => {
    return (
        <MapContainer center={center} zoom={zoom} className="map-container">
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
            {userLocation && userLocation.latitude && userLocation.longitude && (
                <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userLocationIcon}>
                    <Popup>Je bent hier</Popup>
                </Marker>
            )}
            {markers.map((marker, index) => {
                if (marker.latitude && marker.longitude) {
                    const icon = getObservationIcon(marker.date);
                    return (
                        icon && (
                            <Marker
                                key={index}
                                position={[marker.latitude, marker.longitude]}
                                icon={icon}
                                eventHandlers={{
                                    click: () => onMarkerClick(marker),
                                }}
                            >
                                <Popup>
                                    <strong>{marker.username}</strong><br />
                                    {marker.description}
                                </Popup>
                            </Marker>
                        )
                    );
                }
                return null;
            })}
            {selectedMarker && (
                <Popup
                    position={[selectedMarker.latitude, selectedMarker.longitude]}
                    onClose={onClosePopup}
                >
                    <div className="popup-content">
                        <h2>{selectedMarker.description}</h2>
                        <p>{new Date(selectedMarker.date).toLocaleString()}</p>
                        <p>{selectedMarker.location}</p>
                        <div className="popup-comments">
                            {/* Comments section can be implemented here */}
                        </div>
                    </div>
                </Popup>
            )}
            <div className="legend-HomepageMap">
                <h4>Legenda</h4>
                <p><span className="legend-marker current-location"></span> Huidige Locatie</p>
                <p><span className="legend-marker observation-24hr"></span> Waarneming (laatste 24 uur)</p>
                <p><span className="legend-marker observation-48hr"></span> Waarneming (laatste 48 uur)</p>
                <p><span className="legend-marker observation-72hr"></span> Waarneming (laatste 72 uur)</p>
            </div>
        </MapContainer>
    );
};

ObservationMap.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            description: PropTypes.string,
            username: PropTypes.string.isRequired,
        })
    ).isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    selectedMarker: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string,
        username: PropTypes.string.isRequired,
        location: PropTypes.string,  // Added location to propTypes
    }),
    onClosePopup: PropTypes.func.isRequired,
    userLocation: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number
    })
};

export default ObservationMap;
