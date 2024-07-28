import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/Logo.png';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/home">
                    <img src={logo} alt="Logo" className="logo-header" />
                </Link>
            </div>
            <nav>
                <ul className="navbar">
                    <li className="nav-item">
                        <Link to="/new-observation" className="nav-link add-post">Nieuwe Waarneming</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link">Ontdek</Link>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item">
                                <Link to="/map" className="dropdown-link">Kaart</Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to="/search" className="dropdown-link">Waarnemingen database</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link to="/tips" className="nav-link">Tips</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ProfilePage" className="nav-link">Mijn Waarnemingen</Link>
                    </li>
                    <li className="nav-item user-menu">
                        <FontAwesomeIcon icon={faUser} className="icon" onClick={toggleDropdown} />
                        {dropdownVisible && (
                            <div className="dropdown-menu">
                                <Link to="/account-settings" className="dropdown-link">Account Instellingen</Link>
                                <Link to="/notifications" className="dropdown-link">Meldingen</Link>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
