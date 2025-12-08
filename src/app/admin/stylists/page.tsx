'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminDashboardSidebar } from '@/components/layout/AdminDashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import { UserProfile } from '@/types/user';
import { toast } from 'sonner';

export default function StylistsPage() {
    const [stylists, setStylists] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStylists();
    }, []);

    const loadStylists = async () => {
        try {
            setLoading(true);
            const response = await adminService.getAllStylists();
            setStylists(response.users);
        } catch (error: any) {
            if (error?.response?.status === 404) {
                console.log('Stylists endpoint not found (404) - using empty fallback');
                toast.error('Stylists endpoint not yet implemented on backend', {
                    duration: Infinity,
                    closeButton: true,
                });
                setStylists([]);
            } else {
                console.error('Error loading stylists:', error);
                toast.error('Failed to load stylists', {
                    duration: Infinity,
                    closeButton: true,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const approvedStylists = stylists.filter(s => s.isApproved);
    const pendingStylists = stylists.filter(s => !s.isApproved);

    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <div className="flex min-h-screen bg-background">
                <AdminDashboardSidebar />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                                <ShoppingBag className="h-8 w-8 text-primary" />
                                Stylist Management
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Manage stylist accounts and their details
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid gap-6 md:grid-cols-3 mb-8">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        Total Stylists
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{stylists.length}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Registered stylist accounts</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        Approved Stylists
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-success">{approvedStylists.length}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Active stylists</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        Pending Approval
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-warning">{pendingStylists.length}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Stylists List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Stylist Directory</CardTitle>
                                <CardDescription>All registered stylists with contact details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="text-center py-12">
                                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                                        <p className="mt-4 text-muted-foreground">Loading stylists...</p>
                                    </div>
                                ) : stylists.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground font-medium">No stylists found</p>
                                        <p className="text-sm text-muted-foreground mt-1">No stylist accounts registered yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {stylists.map((stylist) => (
                                            <div
                                                key={stylist._id}
                                                className="rounded-lg border p-6 hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                                            <ShoppingBag className="h-8 w-8 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-xl text-foreground">
                                                                {stylist.name || 'Stylist'}
                                                            </h3>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                Joined: {new Date(stylist.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${stylist.isApproved
                                                        ? 'bg-success/10 text-success'
                                                        : 'bg-warning/10 text-warning'
                                                        }`}>
                                                        {stylist.isApproved ? 'Approved' : 'Pending'}
                                                    </span>
                                                </div>

                                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                                    {/* Email */}
                                                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="text-xs text-muted-foreground">Email</p>
                                                            <p className="text-sm font-medium">{stylist.email}</p>
                                                        </div>
                                                    </div>

                                                    {/* Phone */}
                                                    {stylist.phone && (
                                                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                                            <Phone className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <p className="text-xs text-muted-foreground">Phone</p>
                                                                <p className="text-sm font-medium">{stylist.phone}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Location */}
                                                    {stylist.location && (
                                                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <p className="text-xs text-muted-foreground">Location</p>
                                                                <p className="text-sm font-medium">{stylist.location}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
