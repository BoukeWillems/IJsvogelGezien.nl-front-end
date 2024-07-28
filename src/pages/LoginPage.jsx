import '../styles/LoginPage.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../assets/Logo.png';

const LoginPage = () => {
    const [active, setActive] = useState(false);
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signinUsername, setSigninUsername] = useState('');
    const [signinPassword, setSigninPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        setActive(true);
    };

    const handleLoginClick = () => {
        setActive(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/signup", {
                username: signupUsername,
                email: signupEmail,
                password: signupPassword,
            });
            alert("Registration successful");
        } catch (error) {
            alert("Registration failed");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signin", {
                username: signinUsername,
                password: signinPassword,
            });
            localStorage.setItem("token", response.data.accessToken);
            alert("Login successful");
            navigate("/home");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div className="login-body">
            <img src={logo} alt="IJsvogelGezien.nl Logo" className="logo" />
            <div className={`container ${active ? 'active' : ''}`} id="container">
                <div className="form-container sign-up">
                    <form onSubmit={handleRegister}>
                        <h1>Maak een account aan</h1>
                        <input
                            type="text"
                            placeholder="Gebruikersnaam"
                            value={signupUsername}
                            onChange={(e) => setSignupUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Wachtwoord"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                        />
                        <button type="submit">Registreer</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleLogin}>
                        <h1>Inloggen</h1>
                        <input
                            type="text"
                            placeholder="Gebruikersnaam"
                            value={signinUsername}
                            onChange={(e) => setSigninUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Wachtwoord"
                            value={signinPassword}
                            onChange={(e) => setSigninPassword(e.target.value)}
                        />
                        <a href="#">Wachtwoord vergeten?</a>
                        <button type="submit">Log in</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Heb je al een account?</h1>
                            <p>Log dan hier in om je waarneming te delen</p>
                            <button className="hidden" id="login" onClick={handleLoginClick}>Log in</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Welkom!</h1>
                            <p>Registreer hier om je IJsvogel waarneming te delen of IJsvogels te ontdekken.</p>
                            <button className="hidden" id="register" onClick={handleRegisterClick}>Registreer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
