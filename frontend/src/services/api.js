import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Technicians API
export const getTechnicians = () => api.get('/technicians');
export const createTechnician = (data) => api.post('/technicians', data);
export const updateTechnician = (id, data) => api.put(`/technicians/${id}`, data);
export const deleteTechnician = (id) => api.delete(`/technicians/${id}`);

// Service Bays API
export const getServiceBays = () => api.get('/service-bays');
export const createServiceBay = (data) => api.post('/service-bays', data);
export const updateServiceBay = (id, data) => api.put(`/service-bays/${id}`, data);
export const deleteServiceBay = (id) => api.delete(`/service-bays/${id}`);

// Services API
export const getServices = () => api.get('/services');
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

export default api;
