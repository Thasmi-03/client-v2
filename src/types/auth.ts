export type Role = 'user' | 'admin' | 'styler' | 'partner';

// User type definition - last updated: 2025-12-08 22:30 IST
export interface User {
    _id: string;
    email: string;
    role: Role;
    name?: string;
    phone?: string;
    profilePhoto?: string;
    skinTone?: string;
    skinToneDetectedAt?: string; // Timestamp when skin tone was auto-detected
    preferredStyle?: string;
    // Add other common user fields here
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterResponse {
    token?: string;
    user?: User;
    message?: string;
}
