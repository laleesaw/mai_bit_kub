import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import logo from "../assets/logo_mai_bit_kub.png";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Login successful!");
                navigate("/main_page"); // ไปหน้า main
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login fetch error:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="sign-bg">
            <div className="sign-container fade-in">
                <div className="sign-left">
                    <img src={logo} alt="Mai Bit Kub Logo" className="sign-logo" />
                    <p className="sign-desc">Mai bit kub helps you connect with your friend</p>
                </div>
                <div className="sign-right">
                    <h2 className="sign-form-title">Sign in to MAi Bit Kub</h2>
                    <form className="sign-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="USERNAME"
                            className="sign-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            className="sign-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="sign-remember">
                            <span>REMEMBER</span>
                            <span
                                className={`toggle-remember${remember ? " active" : ""}`}
                                onClick={() => setRemember(!remember)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={remember}
                            >
                                <span className="toggle-circle" />
                            </span>
                        </div>
                        <button type="submit" className="sign-btn login-btn">Login</button>
                    </form>
                    <div className="sign-bottom-text">
                        DON’T HAVE AN ACCOUNT? <Link to="/signup" className="sign-link">SIGN UP</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
