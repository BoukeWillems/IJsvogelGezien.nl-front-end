import { useState } from 'react';
import useFileUpload from './useFileUpload';

const useObservationForm = (onSubmit) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const { photo, handleFileChange, handleFileClick } = useFileUpload();
    const [location, setLocation] = useState(null);
    const [municipality, setMunicipality] = useState('');
    const [username, setUsername] = useState('Gebruikersnaam'); // This should be dynamic

    const handleSubmit = async (event) => {
        event.preventDefault();
        const observation = {
            location,
            date,
            time,
            description,
            photo,
            username,
            municipality,
        };
        console.log(observation);

        // Call the onSubmit function passed to the hook
        onSubmit(observation);
    };

    return {
        date,
        setDate,
        time,
        setTime,
        description,
        setDescription,
        photo,
        handleFileChange,
        handleFileClick,
        handleSubmit,
        location,
        setLocation,
        municipality,
        setMunicipality,
        username,
    };
};

export default useObservationForm;
