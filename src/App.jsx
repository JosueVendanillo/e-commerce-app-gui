import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import UpdateUserPage from './pages/UpdateUserPage';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    {/* Default Route - Login */}
                    <Route path="/" element={<LoginPage />} />

                    {/* Login Route */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Dashboard Route */}
                    <Route path="/dashboard" element={<UserDashboard />} />

                    {/* Register Route */}
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Update User Route */}
                    <Route path="/update/:id" element={<UpdateUserPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
