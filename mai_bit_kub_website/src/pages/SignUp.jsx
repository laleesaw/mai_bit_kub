
import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import logo from "../assets/logo_mai_bit_kub.png";

export default function SignUp() {
    return (
        <div className="signup-bg">
            <div className="signup-container fade-in">
                <div className="signup-left">
                    <img src={logo} alt="Mai Bit Kub Logo" className="signup-logo" />
                    <p className="signup-desc">Mai bit kub helps you connect with your friend</p>
                </div>
                <div className="signup-right">
                    <h2 className="signup-form-title">Sign up for MAi Bit Kub</h2>
                    <form className="signup-form">
                        <input type="email" placeholder="EMAIL" className="signup-input" />
                        <input type="text" placeholder="USERNAME" className="signup-input" />
                        <input type="password" placeholder="PASSWORD" className="signup-input" />
                        <button type="submit" className="signup-btn">Sign Up</button>
                    </form>
                    <div className="signup-bottom-text">
                        ALREADY HAVE AN ACCOUNT? <Link to="/signin" className="signup-link">SIGN IN</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

