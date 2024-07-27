
import L from 'leaflet';

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

export default getObservationIcon;
