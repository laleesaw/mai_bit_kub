import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './GroupList.css';

function GroupList() {
    const [groups, setGroups] = useState([]);
    const userId = localStorage.getItem('userId');

    const fetchGroups = async () => {
        if (!userId) {
            console.log('No user ID found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/group/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched groups:', data);
            setGroups(data || []);
        } catch (error) {
            console.error('Error fetching groups:', error);
            toast.error('Failed to load groups. Please try again later.');
        }
    };

    useEffect(() => {
        if (userId) {
            fetchGroups();
        }

        // Listen for group creation event
        const handleGroupCreated = () => {
            fetchGroups();
        };

        window.addEventListener('groupCreated', handleGroupCreated);

        return () => {
            window.removeEventListener('groupCreated', handleGroupCreated);
        };
    }, [userId]);

    return (
        <div className="group-list-container">
            <h2>My Groups</h2>
            <div className="groups-container">
                {groups.map(group => (
                    <div key={group.id} className="group-item">
                        <span className="group-name">{group.group_name}</span>
                        <span className="member-count">
                            {group.current_members}/{group.max_members} members
                        </span>
                    </div>
                ))}
                {groups.length === 0 && (
                    <div className="no-groups">
                        No groups yet
                    </div>
                )}
            </div>
        </div>
    );
}

export default GroupList;