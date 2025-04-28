import axios from 'axios';

const API = axios.create({ baseURL: 'https://demand-back-avgc.onrender.com/api' });

export const getTasks = () => API.get('/tasks');
export const createTask = (taskData) => API.post('/tasks', taskData);
export const updateTask = (id, updatedData) => API.put(`/tasks/${id}`, updatedData);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const getTaskById = (id) => API.get(`/tasks/${id}`);
