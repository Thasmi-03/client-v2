import { z } from 'zod';

/**
 * Sign In validation schema
 */
export const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

/**
 * Sign Up validation schema (for Stylers/Customers)
 */
export const signUpSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().min(5, 'Address is required'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

/**
 * Partner Registration validation schema
 */
export const partnerRegisterSchema = z.object({
    shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type PartnerRegisterFormData = z.infer<typeof partnerRegisterSchema>;
