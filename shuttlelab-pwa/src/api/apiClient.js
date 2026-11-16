import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const fetchCategories = async () => {
  const response = await apiClient.get('/categories');
  return response.data;
};

export const fetchGears = async (params = {}) => {
  const response = await apiClient.get('/gears', { params });
  return response.data;
};

export const fetchGearById = async (id) => {
  const response = await apiClient.get(`/gears/${id}`);
  return response.data;
};

export const fetchTechniques = async (params = {}) => {
  const response = await apiClient.get('/techniques', { params });
  return response.data;
};

export const fetchTechniqueById = async (id) => {
  const response = await apiClient.get(`/techniques/${id}`);
  return response.data;
};
