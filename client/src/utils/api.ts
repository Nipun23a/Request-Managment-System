export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://request-managment-system-api.vercel.app';

console.log('API_BASE_URL:', API_BASE_URL);

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;