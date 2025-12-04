export type SkinTone = 'fair' | 'light' | 'medium' | 'tan' | 'deep' | 'dark';
export type Occasion = 'casual' | 'formal' | 'party' | 'wedding' | 'business' | 'sports' | 'beach';
<<<<<<< HEAD
export type Gender = 'male' | 'female' | 'unisex';
export type Category = 'dress' | 'shirt' | 'pants' | 'jacket' | 'skirt' | 'top' | 'shorts' | 'suit' | 'Frock' | 'blazer' | 'sweater' | 'coat' | 'Tshirt' | 'gown';
export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'black' | 'white' | 'gray' | 'brown' | 'pink' | 'purple' | 'orange' | 'beige' | 'navy' | 'maroon' | 'teal' | 'coral' | 'multi';

export interface Clothes {
    id: string;
    _id?: string; // MongoDB ID (for backward compatibility)
    name: string;
    category: string;
    color: string;
    // Styler-specific fields
    skinTone?: SkinTone;
    gender?: Gender;
    age?: number;
    // Partner-specific fields
    size?: string; // Only for partner clothes
    price?: number;
    description?: string;
    imageUrl?: string;
    image?: string; // Backend field name
    note?: string; // Backend field name
=======

export interface Clothes {
    id: string;
    name: string;
    category: string;
    size: string;
    color: string;
    price?: number; // Optional, mainly for partners
    description: string;
    imageUrl?: string;
>>>>>>> origin/main
    userId: string;
    createdAt: string;
    updatedAt: string;
    // New fields for suggestions and matching
<<<<<<< HEAD
    occasion?: Occasion; // Changed from array to single string to match backend
    usageCount?: number;
=======
    skinTone?: SkinTone[];
    occasion?: Occasion[];
>>>>>>> origin/main
    // Partner-specific fields
    stock?: number;
    sales?: number;
}

export interface CreateClothesInput {
    name: string;
    category: string;
<<<<<<< HEAD
    color: string;
    description?: string;
    imageUrl?: string;
    // Backend field names
    note?: string;
    image?: string;
    // Styler-specific fields
    skinTone?: SkinTone;
    gender?: Gender;
    age?: number;
    // Partner-specific fields
    size?: string;
    price?: number;
    occasion?: Occasion; // Single occasion value, not array
=======
    size: string;
    color: string;
    price?: number;
    description: string;
    imageUrl?: string;
    skinTone?: SkinTone[];
    occasion?: Occasion[];
>>>>>>> origin/main
    stock?: number;
}

export interface UpdateClothesInput extends Partial<CreateClothesInput> {
    id: string;
}

<<<<<<< HEAD
export interface PartnerClothesInput {
    name: string;
    category: string;
    color: string;
    brand: string;
    price: number;
    stock?: number;
    image?: string;
    description?: string;
    note?: string;
    visibility?: 'public' | 'private';
}

=======
>>>>>>> origin/main
export interface DressSuggestion {
    id: string;
    clothes: Clothes;
    matchScore: number;
    reason: string;
    analystNote?: string;
}

export interface OutfitMatch {
    id: string;
    name: string;
    items: Clothes[];
    occasion: Occasion;
<<<<<<< HEAD
    skinTone?: SkinTone;
    createdAt: string;
}

export interface CreateOutfitInput {
    name: string;
    items: string[]; // Array of Clothes IDs
    occasion: Occasion;
    skinTone?: SkinTone;
}

export interface UpdateOutfitInput extends Partial<CreateOutfitInput> {
    id: string;
}
=======
    createdAt: string;
}
>>>>>>> origin/main
