import { useState } from 'react';

const useMarkerPopup = () => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isPopupVisible, setPopupVisible] = useState(false);

    const showPopup = (marker) => {
        setSelectedMarker(marker);
        setPopupVisible(true);
    };

    const hidePopup = () => {
        setSelectedMarker(null);
        setPopupVisible(false);
    };

    return {
        selectedMarker,
        isPopupVisible,
        showPopup,
        hidePopup,
    };
};

export default useMarkerPopup;
