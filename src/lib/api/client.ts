import axios, { AxiosInstance, AxiosError } from 'axios';
import { getToken, removeToken, removeUser } from '@/utils/storage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
console.log('Using API URL:', API_URL);

const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            removeToken();
            removeUser();
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
                window.location.href = '/auth/login';
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
