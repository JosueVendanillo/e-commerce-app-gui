import axios from 'axios';

// Create an Axios instance with default configurations
const apiClient = axios.create({
    baseURL: 'http://localhost:8081/api', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Optional: Timeout after 10 seconds
});

// Request Interceptor (e.g., Attach Authorization Token)
apiClient.interceptors.request.use(
    (config) => {
        // Example: Attach token to Authorization header if available
        const token = localStorage.getItem('token'); // Replace with your token logic
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor (e.g., Handle API Errors Globally)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error.response || error.message);
        // You can handle specific error codes here (e.g., 401 Unauthorized)
        return Promise.reject(error);
    }
);

export default apiClient;
