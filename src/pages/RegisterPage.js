import React, { useState } from 'react';
import { registerUser } from '../api/userService';  // Assuming the API service is set up

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});  // For client-side validation

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
        return Object.keys(formErrors).length === 0;  // Returns true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await registerUser(formData);
                setMessage('User registered successfully!');
                setFormData({ username: '', email: '', password: '' });
            } catch (err) {
                setMessage('Error registering user.');
            }
        } else {
            setMessage('Please fill out the form correctly.');
        }
    };

    return (
        <div className="register-page">
            <h2>Register User</h2>
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
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterPage;
