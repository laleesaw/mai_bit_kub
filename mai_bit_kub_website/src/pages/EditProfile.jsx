import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditProfile.css';

function EditProfile() {
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState({
        name: '',
        email: ''
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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

                console.log('Fetching user data for ID:', userId);
                const response = await fetch(`/api/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Response status:', response.status);
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    throw new Error(`Failed to fetch user data: ${response.status}`);
                }

                const userData = await response.json();
                console.log('Received user data:', userData);
                const initialValues = {
                    name: userData.name || '',
                    email: userData.email || ''
                };
                setInitialData(initialValues);
                setFormData(prevState => ({
                    ...prevState,
                    ...initialValues
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

        const updateData = {};
        let hasChanges = false;

        // Check if name has changed
        if (formData.name !== initialData.name) {
            updateData.name = formData.name;
            hasChanges = true;
        }

        // Check if email has changed
        if (formData.email !== initialData.email) {
            updateData.email = formData.email;
            hasChanges = true;
        }

        // Check for password change
        if (formData.newPassword) {
            if (formData.newPassword !== formData.confirmNewPassword) {
                toast.error('New passwords do not match');
                return;
            }
            if (!formData.currentPassword) {
                toast.error('Current password is required to change password');
                return;
            }
            updateData.current_password = formData.currentPassword;
            updateData.new_password = formData.newPassword;
            hasChanges = true;
        }

        if (!hasChanges) {
            toast.info('No changes detected');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updateData)
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
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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