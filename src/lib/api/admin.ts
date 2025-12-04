import apiClient from './client';
import { User, PendingUser } from '@/types/auth';

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
export const getPendingUsers = async (): Promise<{ users: PendingUser[] }> => {
    const response = await apiClient.get('/api/admin/pending-users');
    return response.data;
};

/**
 * Approve a user (admin only)
 */
export const approveUser = async (userId: string): Promise<{ message: string; user: User }> => {
    const response = await apiClient.post(`/api/admin/approve-user/${userId}`);
    return response.data;
};

/**
 * Reject a user (admin only)
 */
export const rejectUser = async (userId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/api/admin/reject-user/${userId}`);
    return response.data;
};

/**
 * Get admin analytics
 */
export const getAdminAnalytics = async (): Promise<AdminAnalytics> => {
    const response = await apiClient.get('/api/admin/analytics');
    return response.data;
};

/**
 * Get all users (admin only)
 */
export const getUsers = async (): Promise<{ users: AdminUser[] }> => {
    const response = await apiClient.get('/api/admin/users');
    return response.data;
};

/**
 * Get all partners (admin only)
 */
export const getAllPartners = async (): Promise<{ users: AdminUser[] }> => {
    const response = await apiClient.get('/api/admin/users?role=partner');
    return response.data;
};
