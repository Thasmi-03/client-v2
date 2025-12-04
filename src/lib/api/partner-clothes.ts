import apiClient from './client';

export interface PartnerClothes {
    id: string;
    _id?: string; // MongoDB ID (for backward compatibility)
    name: string;
    category: string;
    color: string;
    brand: string;
    price: number;
    stock?: number;
    sales?: number;
    image?: string;
    description?: string;
    note?: string; // Backend field name
    size: string;
    visibility: 'public' | 'private';
    ownerId: string | {
        _id: string;
        name?: string;
        location?: string;
        phone?: string;
        email?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface PartnerClothesInput {
    name: string;
    category: string;
    color: string;
    brand: string;
    price: number;
    stock?: number;
    image?: string;
    description?: string;
    size: string;
    note?: string; // Backend field name
    visibility?: 'public' | 'private';
}

// Get partner's own clothes
export const getPartnerClothes = async (): Promise<{ clothes: PartnerClothes[] }> => {
    const response = await apiClient.get('/api/partnerclothes/mine');
    return { clothes: response.data.data };
};

// Get public partner clothes (for styler suggestions)
export const getPublicPartnerClothes = async (): Promise<{ clothes: PartnerClothes[] }> => {
    const response = await apiClient.get('/api/partnerclothes');
    return { clothes: response.data.data };
};

// Get single partner clothes by ID
export const getPartnerClothesById = async (id: string): Promise<{ clothes: PartnerClothes }> => {
    const response = await apiClient.get(`/api/partnerclothes/${id}`);
    return { clothes: response.data };
};

// Add new partner clothes
// Add new partner clothes
export const addPartnerClothes = async (data: PartnerClothesInput): Promise<{ clothes: PartnerClothes }> => {
    console.log("Sending addPartnerClothes data:", data);
    try {
        const response = await apiClient.post('/api/partnerclothes', data);
        return { clothes: response.data.cloth };
    } catch (error) {
        console.error("addPartnerClothes error:", error);
        throw error;
    }
};

// Update partner clothes
export const updatePartnerClothes = async (id: string, data: Partial<PartnerClothesInput>): Promise<{ clothes: PartnerClothes }> => {
    const response = await apiClient.put(`/api/partnerclothes/${id}`, data);
    return { clothes: response.data.cloth };
};

// Delete partner clothes
export const deletePartnerClothes = async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/api/partnerclothes/${id}`);
    return response.data;
};
