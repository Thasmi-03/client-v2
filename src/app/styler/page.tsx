'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
<<<<<<< HEAD
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Sparkles, Shirt, Plus, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

import { getClothes, Clothes } from '@/lib/api/clothes';
import { getPublicPartnerClothes, PartnerClothes } from '@/lib/api/partner-clothes';
import { getMyProfile, getFavorites } from '@/lib/api/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StylerDashboard() {
    const router = useRouter();
    const [suggestions, setSuggestions] = useState<Clothes[]>([]);
    const [myClothes, setMyClothes] = useState<Clothes[]>([]);
    const [favoriteSuggestions, setFavoriteSuggestions] = useState<PartnerClothes[]>([]);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    // Helper function to get smart suggestions from user's clothes
    const getSmartSuggestions = (clothes: Clothes[]): Clothes[] => {
        if (clothes.length === 0) return [];

        // Filter clothes that have occasion or skin tone data
        const smartMatches = clothes.filter(item =>
            item.occasion?.length || item.skinTone
        );

        // If we have smart matches, prioritize them
        if (smartMatches.length > 0) {
            return smartMatches.slice(0, 3);
        }

        // Otherwise, suggest complementary items (e.g., tops with bottoms)
        const tops = clothes.filter(c =>
            ['shirt', 'top', 'Tshirt', 'blouse', 'sweater'].includes(c.category.toLowerCase())
        );
        const bottoms = clothes.filter(c =>
            ['pants', 'jeans', 'shorts', 'skirt'].includes(c.category.toLowerCase())
        );

        // Mix tops and bottoms for matching suggestions
        const suggestions: Clothes[] = [];
        for (let i = 0; i < Math.min(2, Math.min(tops.length, bottoms.length)); i++) {
            if (tops[i]) suggestions.push(tops[i]);
            if (bottoms[i]) suggestions.push(bottoms[i]);
        }

        // Fill remaining slots with any clothes
        while (suggestions.length < 3 && suggestions.length < clothes.length) {
            const remaining = clothes.filter(c => !suggestions.includes(c));
            if (remaining.length > 0) {
                suggestions.push(remaining[0]);
            } else {
                break;
            }
        }

        return suggestions.slice(0, 3);
    };

    const loadData = async () => {
        try {
            setLoading(true);
            // Load user's own clothes
            const myClothesRes = await getClothes().catch(() => ({ clothes: [] }));
            setMyClothes(myClothesRes.clothes);

            // Get smart suggestions from user's own clothes
            setSuggestions(getSmartSuggestions(myClothesRes.clothes));

            // Load favorites
            const favoritesRes = await getFavorites().catch(() => ({ favorites: [] }));
            setFavoriteCount(favoritesRes.favorites.length);

            // Show only first 3 favorites as preview
            setFavoriteSuggestions(favoritesRes.favorites.slice(0, 3));
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

=======

export default function StylerDashboard() {
>>>>>>> origin/main
    return (
        <ProtectedRoute allowedRoles={['styler']}>
            <div className="flex min-h-screen bg-gray-50">
                <DashboardSidebar role="styler" />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
<<<<<<< HEAD
                        {/* Header */}
=======
>>>>>>> origin/main
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Styler Dashboard</h1>
                            <p className="mt-2 text-gray-600">
                                Manage your wardrobe and discover perfect outfits
                            </p>
                        </div>
<<<<<<< HEAD

                        {/* Stats Grid */}
                        <div className="grid gap-6 md:grid-cols-3 mb-8 items-stretch">
                            <Card className="flex flex-col min-h-[140px]">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Total Clothes
                                    </CardTitle>
                                    <Package className="h-4 w-4 text-gray-600" />
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-center">
                                    <div className="text-2xl font-bold">{myClothes.length}</div>
                                    <p className="text-xs text-gray-500 mt-1">Items in wardrobe</p>
                                </CardContent>
                            </Card>

                            <Card className="flex flex-col min-h-[140px]">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Suggestions
                                    </CardTitle>
                                    <Sparkles className="h-4 w-4 text-gray-600" />
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-center">
                                    <div className="text-2xl font-bold">{suggestions.length}</div>
                                    <p className="text-xs text-gray-500 mt-1">Smart matches</p>
                                </CardContent>
                            </Card>

                            <Card className="flex flex-col min-h-[140px]">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Favorites
                                    </CardTitle>
                                    <Heart className="h-4 w-4 text-gray-600" />
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-center">
                                    <div className="text-2xl font-bold">{favoriteCount}</div>
                                    <p className="text-xs text-gray-500 mt-1">Favorite items</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Favourite Suggestions Section */}
                        <Card className="mb-8 flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Heart className="h-5 w-5 text-[#e2c2b7]" />
                                        Favourite Suggestions
                                    </CardTitle>
                                    <CardDescription>Your favorited dresses from partner shops</CardDescription>
                                </div>
                                <Link href="/styler/suggestions">
                                    <Button variant="outline" className="flex items-center gap-2">
                                        View All
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent className="flex-1">
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                                        <p className="mt-2 text-sm text-gray-500">Loading favorites...</p>
                                    </div>
                                ) : favoriteSuggestions.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>No favorites yet. Browse dress suggestions and add your favorites!</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-3">
                                        {favoriteSuggestions.map((item) => (
                                            <Card key={item._id || item.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                                                <div className="aspect-[3/4] bg-gradient-to-br from-[#e2c2b7] to-[#d4b5a8] flex items-center justify-center relative">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="h-16 w-16 text-white opacity-50" />
                                                    )}
                                                    <div className="absolute top-2 right-2">
                                                        <Heart className="h-5 w-5 text-red-500 fill-current" />
                                                    </div>
                                                </div>
                                                <CardContent className="p-4 flex-1 flex flex-col">
                                                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1 capitalize">{item.color} • {item.category}</p>
                                                    {item.brand && (
                                                        <p className="text-xs text-gray-500 mt-1">Brand: {item.brand}</p>
                                                    )}
                                                    {item.price && (
                                                        <p className="text-sm font-bold text-[#e2c2b7] mt-2">${item.price.toFixed(2)}</p>
                                                    )}
                                                    <div className="flex items-center justify-between mt-auto pt-3">
                                                        <span className="text-sm text-gray-600">Partner shop</span>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => router.push(`/styler/suggestions/${item._id || item.id}`)}
                                                        >
                                                            View
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Manage your wardrobe</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/styler/clothes/add">
                                        <Button className="flex items-center gap-2 bg-[#e2c2b7] hover:bg-[#d4b5a8] text-gray-900">
                                            <Plus className="h-4 w-4" />
                                            Add New Clothes
                                        </Button>
                                    </Link>
                                    <Link href="/styler/clothes">
                                        <Button variant="outline">View All Clothes</Button>
                                    </Link>
                                    <Link href="/styler/suggestions">
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <Sparkles className="h-4 w-4" />
                                            Browse Suggestions
                                        </Button>
                                    </Link>
                                    <Link href="/styler/matching">
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <Shirt className="h-4 w-4" />
                                            Create Outfit
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
=======
>>>>>>> origin/main
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}