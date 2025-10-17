import { useState, useEffect } from 'react';

const AvailabilityManager = ({ groupId, userId }) => {
    const [availabilities, setAvailabilities] = useState([]);
    const [commonTimes, setCommonTimes] = useState([]);

    const fetchGroupAvailabilities = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/availability?group_id=${groupId}`);
            if (!res.ok) throw new Error('Failed to fetch availabilities');
            const data = await res.json();
            setAvailabilities(data);
        } catch (err) {
            console.error('Error fetching availabilities:', err);
        }
    };

    const saveAvailability = async (startTime, endTime, note) => {
        try {
            const res = await fetch('http://localhost:3000/api/availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    group_id: groupId,
                    start_datetime: startTime,
                    end_datetime: endTime,
                    note
                })
            });
            
            if (!res.ok) throw new Error('Failed to save availability');
            await fetchGroupAvailabilities();
            return await res.json();
        } catch (err) {
            console.error('Error saving availability:', err);
            throw err;
        }
    };

    const fetchCommonTimes = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/find-common-time?group_id=${groupId}`);
            if (!res.ok) throw new Error('Failed to fetch common times');
            const data = await res.json();
            setCommonTimes(data);
        } catch (err) {
            console.error('Error fetching common times:', err);
        }
    };

    useEffect(() => {
        if (groupId && userId) {
            fetchGroupAvailabilities();
            fetchCommonTimes();
        }
    }, [groupId, userId]);

    return {
        availabilities,
        commonTimes,
        saveAvailability,
        fetchGroupAvailabilities,
        fetchCommonTimes
    };
};

export default AvailabilityManager;