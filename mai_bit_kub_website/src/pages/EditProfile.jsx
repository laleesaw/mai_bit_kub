import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditProfile.css';

function EditProfile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        // Get user data when component mounts
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    navigate('/signin');
                    return;
                }

                const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch user data');

                const userData = await response.json();
                setFormData(prevState => ({
                    ...prevState,
                    username: userData.username || '',
                    email: userData.email || '',
                    firstName: userData.first_name || '',
                    lastName: userData.last_name || ''
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to load user data');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password fields if user is trying to change password
        if (formData.newPassword || formData.confirmNewPassword) {
            if (!formData.currentPassword) {
                toast.error('Please enter your current password');
                return;
            }
            if (formData.newPassword !== formData.confirmNewPassword) {
                toast.error('New passwords do not match');
                return;
            }
        }

        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    current_password: formData.currentPassword,
                    new_password: formData.newPassword
                })
            });

            if (!response.ok) throw new Error('Failed to update profile');

            toast.success('Profile updated successfully');
            navigate('/main_page');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="edit-profile-container">
            <h2 className="edit-profile-title">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Required to change password"
                    />
                </div>

                <div className="form-input-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                    />
                </div>

                <div className="form-input-group">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                    />
                </div>

                <div className="edit-profile-buttons">
                    <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => navigate('/main_page')}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="save-button">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;