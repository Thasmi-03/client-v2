import apiClient from './client';
import { Clothes, CreateClothesInput, UpdateClothesInput } from '@/types/clothes';

<<<<<<< HEAD
export type { Clothes };

export const getClothes = async (): Promise<{ clothes: Clothes[] }> => {
    const response = await apiClient.get('/api/stylerclothes/mine');
=======
export const getClothes = async (): Promise<{ clothes: Clothes[] }> => {
    const response = await apiClient.get('/clothes');
>>>>>>> origin/main
    return response.data;
};

export const getClothesById = async (id: string): Promise<{ clothes: Clothes }> => {
<<<<<<< HEAD
    const response = await apiClient.get(`/api/stylerclothes/${id}`);
    return { clothes: response.data };
};

// Fashion Hub API
export const getSkinToneSuggestions = async (skinTone: string) => {
    const response = await apiClient.get(`/api/styler/suggestions/skin-tone?skinTone=${skinTone}`);
    return response.data;
};

export const getUsageStats = async (sort: 'asc' | 'desc' = 'desc') => {
    const response = await apiClient.get(`/api/styler/suggestions/usage?sort=${sort}`);
    return response.data;
};

export const getOccasionSuggestions = async (occasion: string) => {
    const response = await apiClient.get(`/api/styler/suggestions/occasion?occasion=${occasion}`);
=======
    const response = await apiClient.get(`/clothes/${id}`);
>>>>>>> origin/main
    return response.data;
};

export const addClothes = async (data: CreateClothesInput): Promise<{ clothes: Clothes }> => {
<<<<<<< HEAD
    const response = await apiClient.post('/api/stylerclothes', data);
=======
    const response = await apiClient.post('/clothes', data);
>>>>>>> origin/main
    return response.data;
};

export const updateClothes = async (id: string, data: Partial<CreateClothesInput>): Promise<{ clothes: Clothes }> => {
<<<<<<< HEAD
    const response = await apiClient.put(`/api/stylerclothes/${id}`, data);
=======
    const response = await apiClient.put(`/clothes/${id}`, data);
>>>>>>> origin/main
    return response.data;
};

export const deleteClothes = async (id: string): Promise<{ message: string }> => {
<<<<<<< HEAD
    const response = await apiClient.delete(`/api/stylerclothes/${id}`);
=======
    const response = await apiClient.delete(`/clothes/${id}`);
>>>>>>> origin/main
    return response.data;
};
