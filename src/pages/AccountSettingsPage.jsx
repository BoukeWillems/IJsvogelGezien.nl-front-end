
import useAccountSettings from '../hooks/useAccountSettings';
import '../styles/AccountSettingsPage.css';
import {useState} from "react";

const AccountSettingsPage = ({ userId }) => {
    const { settings, loading, error, updateSettings } = useAccountSettings(userId);
    const [newSettings, setNewSettings] = useState(settings);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewSettings({
            ...newSettings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSettings(newSettings);
    };

    return (
        <div className="account-settings-page">
            <h1>Account Instellingen</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Profielfoto</label>
                    <input type="file" name="profileImage" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Gebruikersnaam</label>
                    <input type="text" name="username" value={newSettings.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={newSettings.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="shareObservations"
                            checked={newSettings.shareObservations}
                            onChange={handleChange}
                        />
                        Waarnemingen delen
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={newSettings.emailNotifications}
                            onChange={handleChange}
                        />
                        E-mailmeldingen
                    </label>
                </div>
                <div className="form-group">
                    <label>Taal</label>
                    <select name="language" value={newSettings.language} onChange={handleChange}>
                        <option value="nl">Nederlands</option>
                        <option value="en">Engels</option>
                        {/* Voeg meer talen toe indien nodig */}
                    </select>
                </div>
                <div className="form-group">
                    <label>Thema</label>
                    <select name="theme" value={newSettings.theme} onChange={handleChange}>
                        <option value="light">Licht</option>
                        <option value="dark">Donker</option>
                    </select>
                </div>
                <button type="submit">Opslaan</button>
            </form>
        </div>
    );
};

export default AccountSettingsPage;
