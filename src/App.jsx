import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import NewObservationPage from './pages/NewObservationPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage.jsx';
import TipsPage from './pages/TipsPage';
import SettingsPage from './pages/SettingsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AccountSettingsPage from './pages/AccountSettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import './styles/global.css';
import { UserProvider } from "./context/UserContext";

const App = () => {
    const userId = 'current-user-id';
    const location = useLocation();

    const showHeaderAndFooter = location.pathname !== '/' && location.pathname !== '/register';

    return (
        <UserProvider>
            <div className="app-container">
                {showHeaderAndFooter && <Header />}
                <div className="content">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/map" element={<MapPage />} />
                        <Route path="/new-observation" element={<NewObservationPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/ProfilePage" element={<ProfilePage />} />
                        <Route path="/tips" element={<TipsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/account-settings" element={<AccountSettingsPage userId={userId} />} />
                        <Route path="/notifications" element={<NotificationsPage userId={userId} />} />
                    </Routes>
                </div>
                {showHeaderAndFooter && <Footer />}
            </div>
        </UserProvider>
    );
};

export default App;