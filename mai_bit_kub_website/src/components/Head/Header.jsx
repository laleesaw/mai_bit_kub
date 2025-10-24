import './Header.css'
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

import menu_first from '../../assets/menu.png'
import menu_second from '../../assets/menu_second.png'
import profilePic from '../../assets/logo_mai_bit_kub.png'
import home_first from '../../assets/home_first.png'
import home_second from '../../assets/home_second.png'
import notice_first from '../../assets/notice_first.png'
import notice_second from '../../assets/notice_second.png'
import profile_first from '../../assets/profile_first.png'
import profile_second from '../../assets/profile_second.png'

function button(first, second){
    return(
        <div className="button">
            <img id="first" src={first} alt="" />
            <img id="second" src={second} alt="" />
        </div>
    );
}

function Header(){

    const username = localStorage.getItem('username');
    const isSignedIn = !!username;
    const location = useLocation();
    const isMainPage = location.pathname === '/main_page';

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [maxMembers, setMaxMembers] = useState(10);
    const [showJoinGroup, setShowJoinGroup] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setShowProfileMenu(false);
        navigate('/');
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                toast.error('Please login first');
                return;
            }

            const res = await fetch('http://localhost:3000/api/group', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    group_name: newGroupName,
                    max_members: parseInt(maxMembers),
                    created_by: parseInt(userId)
                })
            });

            if (!res.ok) throw new Error('Failed to create group');

            toast.success('Group created successfully!');
            // Dispatch event to notify GroupList
            window.dispatchEvent(new Event('groupCreated'));
            setNewGroupName('');
            setMaxMembers(10);
            setShowCreateGroup(false);
        } catch (err) {
            console.error(err);
            toast.error('Failed to create group');
        }
    };

    const handleJoinGroup = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                toast.error('Please login first');
                return;
            }

            const res = await fetch('http://localhost:3000/api/group/joincode', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    join_code: joinCode.toUpperCase(),
                    user_id: parseInt(userId)
                })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Failed to join group');
                return;
            }

            toast.success(`Successfully joined ${data.group_name}!`);
            // Dispatch event to notify GroupList
            window.dispatchEvent(new Event('groupCreated'));
            setJoinCode('');
            setShowJoinGroup(false);
        } catch (err) {
            console.error(err);
            toast.error('Failed to join group');
        }
    };

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

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (isSignedIn) {
                try {
                    const userId = localStorage.getItem('userId');
                    if (userId) {
                        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
                        if (response.ok) {
                            const userData = await response.json();
                            setProfileImage(userData.profile_image);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching profile image:', error);
                }
            }
        };

        fetchProfileImage();

        // Listen for profile updates
        const handleProfileUpdate = () => {
            fetchProfileImage();
        };
        window.addEventListener('profileUpdated', handleProfileUpdate);

        return () => {
            window.removeEventListener('profileUpdated', handleProfileUpdate);
        };
    }, [isSignedIn]);

    return (
        <header>
            {/* Logo */}
            <Link to="/" className="logo">
                <img id="logo" src={profilePic} alt="Logo" />
            </Link>

            {/* ปุ่มด้านขวา */}
            <div className="button_bar">
                {isSignedIn && isMainPage && (
                    <>
                        <button 
                            className="create-group-btn"
                            onClick={() => setShowCreateGroup(true)}
                        >
                            Create Group
                        </button>
                        <button 
                            className="join-group-btn"
                            onClick={() => setShowJoinGroup(true)}
                        >
                            Join Group
                        </button>
                    </>
                )}
                <div 
                    onClick={() => {
                        if (isSignedIn) {
                            navigate('/main_page');
                        }
                    }} 
                    className="home_button" 
                    style={{ cursor: isSignedIn ? 'pointer' : 'default' }}
                >
                    {button(home_first, home_second)}
                </div>
                <div className="notice_button">{button(notice_first, notice_second)}</div>

                {/* ปุ่มโปรไฟล์ */}
                {isSignedIn && (
                    <div className="profile_button" ref={profileRef}>
                        <div 
                            onClick={() => setShowProfileMenu((v) => !v)}
                            className="profile-button-wrapper"
                            style={{cursor: 'pointer'}}
                        >
                            {profileImage ? (
                                <img 
                                    src={profileImage} 
                                    alt="Profile" 
                                    className="profile-image-header"
                                />
                            ) : (
                                button(profile_first, profile_second)
                            )}
                        </div>
                        {showProfileMenu && (
                            <div className="profile-dropdown">
                                <Link to="/edit-profile" className="username-link">
                                    {username}
                                </Link>
                                <button className="logout-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal สร้างกลุ่ม */}
            {showCreateGroup && (
                <div className="modal-overlay">
                    <div className="modal-content create-modal">
                        <h2>Create New Group</h2>
                        <form onSubmit={handleCreateGroup}>
                            <div className="form-group">
                                <label>Group Name:</label>
                                <input
                                    type="text"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    placeholder="Enter group name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Max Members:</label>
                                <input
                                    type="number"
                                    value={maxMembers}
                                    onChange={(e) => setMaxMembers(e.target.value)}
                                    min="2"
                                    max="50"
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Create</button>
                                <button type="button" onClick={() => setShowCreateGroup(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal เข้าร่วมกลุ่ม */}
            {showJoinGroup && (
                <div className="modal-overlay">
                    <div className="modal-content join-modal">
                        <h2>Join Group</h2>
                        <form onSubmit={handleJoinGroup}>
                            <div className="form-group">
                                <label>Join Code:</label>
                                <input
                                    type="text"
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                    placeholder="Enter 8-character code"
                                    maxLength="8"
                                    required
                                    style={{ textTransform: 'uppercase' }}
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Join</button>
                                <button type="button" onClick={() => {
                                    setShowJoinGroup(false);
                                    setJoinCode('');
                                }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
