import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api/userService';  // Assuming userService is set up

const UserDashboard = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const loadUsers = async () => {
        try {
            const response = await fetchUsers(1, 10);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage('Error fetching users.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage('Error deleting user.');
        }
    };

    const handleUpdate = (id) => {
        // Assuming you are using React Router for navigation
        window.location.href = `/update/${id}`;
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div>
            <h1>User Dashboard</h1>
            {message && <p>{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.roles?.join(', ')}</td>
                            <td>
                                <button onClick={() => handleUpdate(user.id)}>Update</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDashboard;
