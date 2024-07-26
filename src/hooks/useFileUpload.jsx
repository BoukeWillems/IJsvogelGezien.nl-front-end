import { useState } from 'react';

const useFileUpload = () => {
    const [photo, setPhoto] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileClick = () => {
        document.getElementById('photo-upload').click();
    };

    return {
        photo,
        handleFileChange,
        handleFileClick,
    };
};

export default useFileUpload;
