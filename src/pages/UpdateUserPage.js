import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateUser } from '../api/userService';  // Assuming the API service is set up

const UpdateUserPage = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});  // For client-side validation

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                const user = await response.json();
                setFormData({ username: user.username, email: user.email, password: user.password });
            } catch (err) {
                console.error('Error fetching user:', err);
                setMessage('Error fetching user data.');
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) {
            formErrors.username = 'Username is required';
        }
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Invalid email format';
        }
        if (!formData.password) {
            formErrors.password = 'Password is required';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await updateUser(id, formData);  // Use updateUser from userService
                setMessage('User updated successfully!');
            } catch (err) {
                setMessage('Error updating user.');
            }
        } else {
            setMessage('Please fill out the form correctly.');
        }
    };

    return (
        <div className="update-page">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateUserPage;
