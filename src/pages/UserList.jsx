import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import { useAccessibility } from '../accessibility/AccessibilityContext';

const UserList = () => {
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showAdmins, setShowAdmins] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const { textSize } = useAccessibility();

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/auth/users');
            setAdmins(response.data.admins);
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading users...</div>;

    return (
        <div className="user-list">
        <h2>User List</h2>

        <h3>
            <button
                className="user-toggle-button"
                style={{ fontSize: `${textSize}px` }}
                onClick={() => setShowAdmins(!showAdmins)}
            >
                {showAdmins ? '↓' : '→'} Admins
            </button>
        </h3>
        <div className={`user-list-content ${showAdmins ? 'show' : ''}`}>
            {admins.map((admin) => (
                <p key={admin._id} className="user-entry">{admin.name}</p>
            ))}
        </div>
    

        <h3>
            <button
                className="user-toggle-button"
                style={{ fontSize: `${textSize}px` }}
                onClick={() => setShowUsers(!showUsers)}
            >
                {showUsers ? '↓' : '→'} Users
            </button>
        </h3>
        <div className={`user-list-content ${showUsers ? 'show' : ''}`}>    
            {users.map((user) => (
                <p key={user._id} className="user-entry">{user.name}</p>
            ))}
        </div>


        <button
            className="return-home-button"
            style={{ fontSize: `${textSize}px` }}
            onClick={() => navigate('/')}
        >
            Return to Home
        </button>
        </div>
    );
};

export default UserList;
