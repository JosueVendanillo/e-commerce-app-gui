import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient  from '../api/apiClient'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // const handleLogin = async (e) =>{
    //     e.preventDefault();
    //     try{
    //         const response = await apiClient.post('/auth/login', {email, password});
    //         save token or session if needed
    //         localStorage.setItem('user', JSON.stringify(response.data));
    //         navigate('/dashboard'); // Redirect to the dashboard
    //     }catch(err){
    //         setError('Invalid email or password');
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Attempt login using credentials
            const response = await apiClient.post('/auth/login', {email, password});

            if (response.status === 200) {
                // Redirect user to dashboard or home page after successful login
                console.log('login successful')
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid credentials. Please try again.');
        }
    };

  return (
    <div className='login-page'>
        <h2>LoginPage</h2>
        <form onSubmit={handleLogin}>
            <div>
                <label>Email:</label>
                <input type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                />
            </div>
            <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            {error && <p className='error'>error</p>}
            <button type='submit'>Login</button>
        </form>
        </div>
  )
}

export default LoginPage