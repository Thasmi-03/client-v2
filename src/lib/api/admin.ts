import apiClient from './client';
import { User, PendingUser } from '@/types/auth';

<<<<<<< HEAD
export interface AdminUser {
    _id: string;
    id?: string;
    email: string;
    role: 'styler' | 'partner' | 'admin';
    isApproved: boolean;
    name?: string;
    location?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminAnalytics {
    weeklyTrend: {
        week: string;
        registrations: number;
        logins: number;
    }[];
    totalUsers: number;
    totalStylists: number;
    totalPartners: number;
    totalPayments: number;
    totalRevenue: number;
}

/**
 * Get pending users (admin only)
 * Uses correct admin endpoint
 */
=======
>>>>>>> origin/main
export const getPendingUsers = async (): Promise<{ count: number; users: PendingUser[] }> => {
    const response = await apiClient.get<{ count: number; users: PendingUser[] }>('/api/admin/pending');
    return response.data;
};

export const approveUser = async (userId: string): Promise<{ message: string; user: User }> => {
    const response = await apiClient.put<{ message: string; user: User }>(`/api/admin/approve/${userId}`);
    return response.data;
<<<<<<< HEAD
};

/**
 * Reject a user (admin only)
 * Uses correct admin endpoint
 */
export const rejectUser = async (userId: string): Promise<{ message: string }> => {
    const response = await apiClient.patch<{ message: string }>(`/api/admin/partners/${userId}/reject`);
    return response.data;
};

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (): Promise<{ users: AdminUser[] }> => {
    const response = await apiClient.get<{ users: AdminUser[] }>('/api/admin/users');
    return response.data;
};

/**
 * Get all partners (admin only)
 */
export const getAllPartners = async (): Promise<{ users: AdminUser[] }> => {
    const response = await apiClient.get<{ users: AdminUser[] }>('/api/admin/partners');
    return response.data;
};

/**
 * Get all stylists (admin only)
 */
export const getAllStylists = async (): Promise<{ users: AdminUser[] }> => {
    const response = await apiClient.get<{ users: AdminUser[] }>('/api/admin/stylists');
    return response.data;
};

/**
 * Get admin analytics (admin only)
 */
export const getAdminAnalytics = async (): Promise<AdminAnalytics> => {
    const response = await apiClient.get<AdminAnalytics>('/api/admin/analytics');
    return response.data;
};

/**
 * Get all payments (admin only)
 */
export const getAllPayments = async (): Promise<{ payments: any[] }> => {
    const response = await apiClient.get('/api/admin/payments');
    return response.data;
};

/**
 * Get pending partners (admin only)
 */
export const getPendingPartners = async (): Promise<{ count: number; users: PendingUser[] }> => {
    const response = await apiClient.get<{ count: number; users: PendingUser[] }>('/api/admin/partners/pending');
    return response.data;
};

/**
 * Approve a partner (admin only)
 */
export const approvePartner = async (userId: string): Promise<{ message: string; user: User }> => {
    const response = await apiClient.patch<{ message: string; user: User }>(`/api/admin/partners/${userId}/approve`);
    return response.data;
};

/**
 * Reject a partner (admin only)
 */
export const rejectPartner = async (userId: string): Promise<{ message: string }> => {
    const response = await apiClient.patch<{ message: string }>(`/api/admin/partners/${userId}/reject`);
    return response.data;
};
=======
};
>>>>>>> origin/main
