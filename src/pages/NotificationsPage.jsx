
import '../styles/NotificationsPage.css';
import {useEffect, useState} from "react";

const NotificationsPage = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Vervang met je backend endpoint
                const response = await fetch(`YOUR_BACKEND_ENDPOINT/notifications?userId=${userId}`);
                const data = await response.json();
                setNotifications(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="notifications-page">
            <h1>Meldingen</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        <p>{notification.message}</p>
                        <span>{new Date(notification.date).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsPage;
