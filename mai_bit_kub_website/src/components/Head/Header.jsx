import './Header.css'
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [maxMembers, setMaxMembers] = useState(10);
    const [showJoinGroup, setShowJoinGroup] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [showGroupsDropdown, setShowGroupsDropdown] = useState(false);
    const [userGroups, setUserGroups] = useState([]);
    const groupsDropdownRef = useRef(null);

    // ดึงข้อมูลกลุ่มของ user
    useEffect(() => {
        const fetchUserGroups = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:3000/api/group/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserGroups(data || []);
                }
            } catch (error) {
                console.error('Error fetching user groups:', error);
            }
        };

        if (isSignedIn) {
            fetchUserGroups();
        }

        // Listen for group updates
        const handleGroupUpdate = () => fetchUserGroups();
        window.addEventListener('groupCreated', handleGroupUpdate);
        
        return () => {
            window.removeEventListener('groupCreated', handleGroupUpdate);
        };
    }, [isSignedIn]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (groupsDropdownRef.current && !groupsDropdownRef.current.contains(event.target)) {
                setShowGroupsDropdown(false);
            }
        }
        if (showGroupsDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showGroupsDropdown]);
    const [profileImage, setProfileImage] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setShowProfileMenu(false);
        navigate('/');
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
                
                {/* Dropdown สำหรับดู Group Availability - แสดงเฉพาะในหน้า main_page */}
                {isSignedIn && isMainPage && (
                    <div className="groups-dropdown-container" ref={groupsDropdownRef}>
                        <button 
                            className="view-availability-btn"
                            onClick={() => setShowGroupsDropdown(!showGroupsDropdown)}
                        >
                            📅 View Availability
                        </button>
                        {showGroupsDropdown && (
                            <div className="groups-dropdown-menu">
                                <div className="dropdown-header">Select Group</div>
                                {userGroups.length > 0 ? (
                                    userGroups.map(group => (
                                        <div
                                            key={group.id}
                                            className="dropdown-group-item"
                                            onClick={() => {
                                                navigate('/group-availability', { 
                                                    state: { groupId: group.id } 
                                                });
                                                setShowGroupsDropdown(false);
                                            }}
                                        >
                                            <span className="group-name">{group.group_name}</span>
                                            <span className="group-members">
                                                {group.current_members}/{group.max_members}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="dropdown-no-groups">No groups available</div>
                                )}
                            </div>
                        )}
                    </div>
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
        </header>
    );
}

export default Header;
