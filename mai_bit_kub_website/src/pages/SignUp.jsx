import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import logo from "../assets/logo_mai_bit_kub.png";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // เก็บผลลัพธ์จาก backend

    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกัน form reload หน้า
        try {
            const res = await fetch("http://localhost:3000/api/user", { // ลิงก์ไป backend API
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name: username, password })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Sign up successful!");
                console.log(data); // ข้อมูล user ที่สร้างจาก backend
            } else {
                setMessage(data.message || "Sign up failed");
            }
        } catch (err) {
            console.error(err);
            setMessage("Sign up fail");
        }
    };

    return (
        <div className="signup-bg">
            <div className="signup-container fade-in">
                <div className="signup-left">
                    <img src={logo} alt="Mai Bit Kub Logo" className="signup-logo" />
                    <p className="signup-desc">Mai bit kub helps you connect with your friend</p>
                </div>
                <div className="signup-right">
                    <h2 className="signup-form-title">Sign up for MAi Bit Kub</h2>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="EMAIL" 
                            className="signup-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="USERNAME" 
                            className="signup-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="PASSWORD" 
                            className="signup-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="signup-btn">Sign Up</button>
                    </form>
                    {message && <p>{message}</p>}
                    <div className="signup-bottom-text">
                        ALREADY HAVE AN ACCOUNT? <Link to="/signin" className="signup-link">SIGN IN</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
