import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './UserList.css';

const UserList = () => {
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showAdmins, setShowAdmins] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

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
            <button className="user-toggle-button" onClick={() => setShowAdmins(!showAdmins)}>
                {showAdmins ? '↓' : '→'} Admin
            </button>
            </h3>
            {showAdmins && (
            <div>
                {admins.map((admin) => (
                <p key={admin._id} className="user-entry">{admin.name}</p>
                ))}
            </div>
        )}

        <h3>
            <button className="user-toggle-button" onClick={() => setShowUsers(!showUsers)}>
                {showUsers ? '↓' : '→'} Users
            </button>
        </h3>
        {showUsers && (
            <div>
                {users.map((user) => (
                    <p key={user._id} className="user-entry">{user.name}</p>
                ))}
            </div>
        )}

        <button className="return-home-button" onClick={() => navigate('/')}>
            Return to Home
        </button>
        </div>
    );
};

export default UserList;
