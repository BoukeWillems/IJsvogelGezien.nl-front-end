import { useState, useEffect } from 'react';
import useUserObservations from '../hooks/useUserObservations';
import '../styles/ProfilePage.css';

const placeholderObservations = Array(5).fill({
    description: "Beschrijving",
    photoPath: "placeholder_ijsvogel.png",
    location: "Unknown location",
    date: new Date().toLocaleString(),
    username: "username"
});

const ProfilePage = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        // Stel hier eventueel logica in om de token te updaten
        setToken(localStorage.getItem('token') || '');
    }, []);

    const { data: userObservations, error, isLoading } = useUserObservations(token);

    const renderObservations = (observations) => {
        console.log('Observations to render:', observations);
        return (Array.isArray(observations) && observations.length > 0 ? observations : placeholderObservations).map((observation, index) => {
            const photoFilename = observation.photoPath.split('/').pop();
            const photoUrl = `http://localhost:8080/uploads/${photoFilename}`;
            console.log(photoUrl);
            return (
                <figure key={index} className={`pic pic${index + 1}`}>
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
        <div className="profile-page">
            <h2>Mijn Waarnemingen</h2>
            {isLoading && <p>Laden...</p>}
            {error && <p>Er is een fout opgetreden: {error.message}</p>}
            <div id="user-gallery">
                {renderObservations(userObservations)}
            </div>
        </div>
    );
};

export default ProfilePage;
