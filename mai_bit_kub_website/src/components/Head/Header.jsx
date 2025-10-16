import './Header.css'
import React, { useState, useRef, useEffect } from 'react';
import menu_first from '../../assets/menu.png'
import menu_second from '../../assets/menu_second.png'
import profilePic from '../../assets/logo_mai_bit_kub.png'
import home_first from '../../assets/home_first.png'
import home_second from '../../assets/home_second.png'
import notice_first from '../../assets/notice_first.png'
import notice_second from '../../assets/notice_second.png'
import profile_first from '../../assets/profile_first.png'
import profile_second from '../../assets/profile_second.png'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"
import Main_page from '../../pages/main_page.jsx'


function button(first, second){
    return(
        <div className = "button">
            <img id = "first" src = {first}></img>
            <img id = "second" src = {second}></img>
        </div>
    );
}

function Header(){
    

    // Get username from localStorage
    const username = localStorage.getItem('username');
    const isSignedIn = !!username;

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    // Logout handler: remove token and username, then redirect to home
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setShowProfileMenu(false);
        navigate('/');
    };

    // Close dropdown if click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        }
        if (showProfileMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showProfileMenu]);

    return(
        <header>
            <Link to="/" className="logo">
                <img id="logo" src={profilePic} alt="Logo" />
            </Link>
            <div className='button_bar'>
                <Link to="/" className="home_button">
                    {button(home_first, home_second)}
                </Link>
                <div className="notice_button">{button(notice_first, notice_second)}</div>
                <div className="profile_button" ref={profileRef}>
                    <div onClick={() => isSignedIn && setShowProfileMenu((v) => !v)} style={{cursor: isSignedIn ? 'pointer' : 'default'}}>
                        {button(profile_first, profile_second)}
                    </div>
                    {isSignedIn && showProfileMenu && (
                        <div className="profile-dropdown">
                            <span className="username">{username}</span>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
export default Header