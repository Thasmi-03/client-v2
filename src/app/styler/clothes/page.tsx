'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { getClothes, deleteClothes } from '@/lib/api/clothes';
import { Clothes } from '@/types/clothes';
import { toast } from 'sonner';

export default function StylerClothesPage() {
    const [clothes, setClothes] = useState<Clothes[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterColor, setFilterColor] = useState('all');
    const [filterSkinTone, setFilterSkinTone] = useState('all');
    const [filterGender, setFilterGender] = useState('all');

    useEffect(() => {
        loadClothes();
    }, []);

    const loadClothes = async () => {
        try {
            setLoading(true);
            const response = await getClothes();
            setClothes(response.clothes);
        } catch (error) {
            console.error('Error loading clothes:', error);
            toast.error('Failed to load clothes');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            await deleteClothes(id);
            toast.success('Clothes deleted successfully');
            loadClothes();
        } catch (error) {
            console.error('Error deleting clothes:', error);
            toast.error('Failed to delete clothes');
        }
    };

    // Filter and search logic
    const filteredClothes = useMemo(() => {
        return clothes.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.color.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
            const matchesColor = filterColor === 'all' || item.color === filterColor;
            const matchesSkinTone = filterSkinTone === 'all' || item.skinTone === filterSkinTone;
            const matchesGender = filterGender === 'all' || item.gender === filterGender;

            return matchesSearch && matchesCategory && matchesColor && matchesSkinTone && matchesGender;
        });
    }, [clothes, searchTerm, filterCategory, filterColor, filterSkinTone, filterGender]);

    // Get unique values for filters
    const categories = useMemo(() => Array.from(new Set(clothes.map(c => c.category))), [clothes]);
    const colors = useMemo(() => Array.from(new Set(clothes.map(c => c.color))), [clothes]);
    const skinTones = useMemo(() => {
        const tones = clothes.map(c => c.skinTone).filter(t => t !== undefined);
        return Array.from(new Set(tones));
    }, [clothes]);
    const genders = useMemo(() => {
        const genderList = clothes.map(c => c.gender).filter(g => g !== undefined);
        return Array.from(new Set(genderList));
    }, [clothes]);

    return (
        <ProtectedRoute allowedRoles={['styler']}>
            <div className="flex min-h-screen bg-gray-50">
                <DashboardSidebar role="styler" />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">My Wardrobe</h1>
                            <p className="mt-2 text-gray-600">
                                Manage your clothing collection
                            </p>
                        </div>

                        {/* Search and Filters */}
                        <Card className="mb-6">
                            <CardContent className="pt-6">
                                <div className="grid gap-4 md:grid-cols-5">
                                    {/* Search */}
                                    <div className="md:col-span-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                placeholder="Search clothes..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <Select value={filterCategory} onValueChange={setFilterCategory}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Categories</SelectItem>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Color Filter */}
                                    <div>
                                        <Select value={filterColor} onValueChange={setFilterColor}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Colors</SelectItem>
                                                {colors.map((color) => (
                                                    <SelectItem key={color} value={color}>
                                                        {color.charAt(0).toUpperCase() + color.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Skin Tone Filter */}
                                    <div>
                                        <Select value={filterSkinTone} onValueChange={setFilterSkinTone}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Skin Tone" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Skin Tones</SelectItem>
                                                {skinTones.map((tone) => (
                                                    <SelectItem key={tone} value={tone}>
                                                        {tone.charAt(0).toUpperCase() + tone.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Clothes List */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    All Clothes ({filteredClothes.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                                        <p className="mt-4 text-gray-600">Loading...</p>
                                    </div>
                                ) : filteredClothes.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500 mb-4">
                                            {clothes.length === 0 ? 'No clothes in wardrobe yet' : 'No clothes match your filters'}
                                        </p>
                                        {clothes.length === 0 && (
                                            <Link href="/styler/clothes/add">
                                                <Button>Add Your First Item</Button>
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {filteredClothes.map((item) => {
                                            // Handle both id and _id (for backward compatibility)
                                            const itemId = item.id || (item as any)._id;
                                            const imageUrl = item.imageUrl || (item as any).image;

                                            return (
                                                <div
                                                    key={itemId}
                                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col h-full"
                                                >
                                                    {imageUrl && (
                                                        <img
                                                            src={imageUrl}
                                                            alt={item.name}
                                                            className="w-full h-48 object-cover rounded-md mb-3"
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                                                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                                                            <p>Category: <span className="font-medium">{item.category}</span></p>
                                                            <p>Color: <span className="font-medium">{item.color}</span></p>
                                                            {item.skinTone && <p>Skin Tone: <span className="font-medium">{item.skinTone}</span></p>}
                                                            {item.gender && <p>Gender: <span className="font-medium">{item.gender}</span></p>}
                                                            {item.age && <p>Age: <span className="font-medium">{item.age}</span></p>}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 mt-auto">
                                                        <Link href={`/styler/clothes/edit/${itemId}`} className="flex-1">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="w-full"
                                                            >
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDelete(itemId)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div >
        </ProtectedRoute >
    );
}
