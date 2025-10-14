import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import logo from "../assets/logo_mai_bit_kub.png";

function SignIn() {
    const [remember, setRemember] = useState(false);
    return (
        <div className="sign-bg">
            <div className="sign-container fade-in">
                <div className="sign-left">
                      <img src={logo} alt="Mai Bit Kub Logo" className="sign-logo" />
                      <p className="sign-desc">Mai bit kub helps you connect with your friend</p>
                </div>
                <div className="sign-right">
                    <h2 className="sign-form-title">Sign in to MAi Bit Kub</h2>
                    <form className="sign-form">
                        <input type="text" placeholder="USERNAME" className="sign-input" />
                        <input type="password" placeholder="PASSWORD" className="sign-input" />
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