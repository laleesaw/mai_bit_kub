import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import './GroupList.css';

function GroupList() {
    const [groups, setGroups] = useState([]);
    const userId = localStorage.getItem('userId');
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [currentGroupCode, setCurrentGroupCode] = useState('');
    const [currentGroupId, setCurrentGroupId] = useState(null);

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

    const handleGenerateCode = async (groupId) => {
        try {
            console.log('Generating code for group:', groupId, 'user:', userId);
            const res = await fetch('http://localhost:3000/api/group/joincode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    group_id: groupId,
                    user_id: parseInt(userId)
                })
            });

            const data = await res.json();

            if (!res.ok) {
                // แสดง notification และรอให้ user อ่านได้
                toast.error(data.message || 'Failed to generate join code', {
                    autoClose: 3000, // แสดง 3 วินาที
                    position: 'top-center',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            // แสดง success notification สำหรับ admin
            toast.success('Join code generated successfully!', {
                autoClose: 2000,
                position: 'top-right',
            });

            setCurrentGroupCode(data.join_code);
            setCurrentGroupId(groupId);
            
            // เพิ่ม delay เล็กน้อยก่อนแสดง modal เพื่อให้เห็น notification
            setTimeout(() => {
                setShowCodeModal(true);
            }, 300);
            
            // Update the group in the list
            setGroups(prevGroups => prevGroups.map(g => 
                g.id === groupId ? {...g, join_code: data.join_code} : g
            ));
        } catch (err) {
            console.error(err);
            toast.error('Failed to generate join code', {
                autoClose: 3000,
                position: 'top-center',
            });
        }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(currentGroupCode);
        toast.success('Join code copied to clipboard!');
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
        <>
            <div className="group-list-container">
                <h2>My Groups</h2>
                <div className="groups-container">
                    {groups.map(group => (
                        <div key={group.id} className="group-item">
                            <div className="group-info">
                                <span className="group-name">{group.group_name}</span>
                                <span className="member-count">
                                    {group.current_members}/{group.max_members} members
                                </span>
                            </div>
                            <button 
                                className="generate-code-btn"
                                onClick={() => handleGenerateCode(group.id)}
                            >
                                {group.join_code ? 'Show Code' : 'Generate Code'}
                            </button>
                        </div>
                    ))}
                    {groups.length === 0 && (
                        <div className="no-groups">
                            No groups yet
                        </div>
                    )}
                </div>
            </div>

            {/* Modal แสดงรหัส - ใช้ Portal เพื่อแสดงนอก container */}
            {showCodeModal && ReactDOM.createPortal(
                <div className="modal-overlay" onClick={() => setShowCodeModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Join Code</h2>
                        <div className="code-display">
                            {currentGroupCode}
                        </div>
                        <p className="code-instruction">Share this code with others to join the group</p>
                        <div className="modal-buttons">
                            <button onClick={handleCopyCode}>Copy Code</button>
                            <button onClick={() => setShowCodeModal(false)}>Close</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

export default GroupList;