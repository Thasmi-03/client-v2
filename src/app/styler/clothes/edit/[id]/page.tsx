'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getClothesById, updateClothes } from '@/lib/api/clothes';
import { toast } from 'sonner';
import { Category, Color } from '@/types/clothes';

const categories: Category[] = ['dress', 'shirt', 'pants', 'jacket', 'skirt', 'top', 'shorts', 'suit', 'gown', 'blazer', 'sweater', 'coat'];
const colors: Color[] = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'gray', 'brown', 'pink', 'purple', 'orange', 'beige', 'navy', 'maroon', 'teal', 'coral', 'multi'];
const occasions = ['casual', 'formal', 'business', 'party', 'wedding', 'sports', 'beach'] as const;

export default function EditClothesPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        color: '',
        occasion: '',
        description: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (id) {
            loadClothes();
        }
    }, [id]);

    const loadClothes = async () => {
        try {
            setFetching(true);
            const response = await getClothesById(id);
            const item = response.clothes;

            // Check if item exists
            if (!item) {
                toast.error('Clothes not found');
                router.push('/styler/clothes');
                return;
            }

            setFormData({
                name: item.name || '',
                category: item.category || '',
                color: item.color || '',
                occasion: item.occasion || '',
                description: item.description || (item as any).note || '',
                imageUrl: item.imageUrl || (item as any).image || '',
            });
        } catch (error: any) {
            console.error('Error loading clothes:', error);
            toast.error(error?.response?.data?.error || 'Failed to load clothes');
            router.push('/styler/clothes');
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Build update payload
            const updatePayload: any = {
                name: formData.name,
                category: formData.category,
                color: formData.color,
            };

            // Only add optional fields if they have values
            if (formData.occasion) {
                updatePayload.occasion = formData.occasion;
            }
            if (formData.description && formData.description.trim() !== '') {
                updatePayload.note = formData.description;
            }
            if (formData.imageUrl && formData.imageUrl.trim() !== '') {
                updatePayload.image = formData.imageUrl;
            }

            console.log('Sending update payload:', updatePayload);

            await updateClothes(id, updatePayload);

            toast.success('Clothes updated successfully!');
            router.push('/styler/clothes');
        } catch (error: any) {
            console.error('Error updating clothes:', error);
            const errorMessage = error?.response?.data?.message || error?.response?.data?.error || 'Failed to update clothes';
            const errorDetails = error?.response?.data?.details;

            if (errorDetails && Array.isArray(errorDetails)) {
                const detailsMsg = errorDetails.map((d: any) => `${d.field}: ${d.message}`).join(', ');
                toast.error(`${errorMessage} - ${detailsMsg}`);
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <ProtectedRoute allowedRoles={['styler']}>
                <div className="flex min-h-screen bg-gray-50">
                    <DashboardSidebar role="styler" />
                    <main className="flex-1 p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                            <p className="mt-4 text-gray-600">Loading...</p>
                        </div>
                    </main>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['styler']}>
            <div className="flex min-h-screen bg-gray-50">
                <DashboardSidebar role="styler" />

                <main className="flex-1 p-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <Link href="/styler/clothes">
                                <Button variant="ghost" className="mb-4">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Wardrobe
                                </Button>
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">Edit Clothes</h1>
                            <p className="mt-2 text-gray-600">
                                Update the details of your clothing item
                            </p>
                        </div>

                        {/* Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Clothes Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="name">Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g., Blue Denim Jacket"
                                                required
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="category">Category *</Label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(value) => handleSelectChange('category', value)}
                                                required
                                            >
                                                <SelectTrigger className="mt-1 w-full">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat} value={cat}>
                                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="color">Color *</Label>
                                            <Select
                                                value={formData.color}
                                                onValueChange={(value) => handleSelectChange('color', value)}
                                                required
                                            >
                                                <SelectTrigger className="mt-1 w-full">
                                                    <SelectValue placeholder="Select color" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {colors.map((color) => (
                                                        <SelectItem key={color} value={color}>
                                                            {color.charAt(0).toUpperCase() + color.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="occasion">Occasion</Label>
                                            <Select
                                                value={formData.occasion}
                                                onValueChange={(value) => handleSelectChange('occasion', value)}
                                            >
                                                <SelectTrigger className="mt-1 w-full">
                                                    <SelectValue placeholder="Select occasion" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {occasions.map((occasion) => (
                                                        <SelectItem key={occasion} value={occasion}>
                                                            {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="md:col-span-2">
                                            <Label htmlFor="imageUrl">Image URL</Label>
                                            <Input
                                                id="imageUrl"
                                                name="imageUrl"
                                                value={formData.imageUrl}
                                                onChange={handleChange}
                                                placeholder="https://example.com/image.jpg"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Describe the item, its style, and any special features..."
                                            rows={4}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <Button type="submit" disabled={loading} className="flex-1">
                                            {loading ? 'Updating...' : 'Update Clothes'}
                                        </Button>
                                        <Link href="/styler/clothes" className="flex-1">
                                            <Button type="button" variant="outline" className="w-full">
                                                Cancel
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
