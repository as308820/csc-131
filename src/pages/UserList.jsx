import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

      <h3>Admin</h3>
      <div>
        {admins.map((admin) => (
          <p key={admin._id}>{admin.name}</p>
        ))}
      </div>

      <h3>Users</h3>
      <div>
        {users.map((user) => (
          <p key={user._id}>{user.name}</p>
        ))}
      </div>

      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default UserList;
