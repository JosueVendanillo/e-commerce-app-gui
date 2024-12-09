import apiClient from './apiClient';

const USER_ENDPOINT = '/users';

export const registerUser = (userData) => apiClient.post(`${USER_ENDPOINT}/register`, userData);
export const updateUser = (id, userData) => apiClient.put(`${USER_ENDPOINT}/update/${id}`, userData);
export const deleteUser = (id) => apiClient.delete(`${USER_ENDPOINT}/delete/${id}`);
export const fetchUsers = (page, size) => apiClient.get(`${USER_ENDPOINT}/search`, { params: { page, size } });
