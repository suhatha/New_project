// API helpers for frontend
export const getApiUrl = (endpoint) => `http://localhost:8000/api${endpoint}`;
export const getAuthHeaders = (headers = {}) => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...headers,
  };
};
