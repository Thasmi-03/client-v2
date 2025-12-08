'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminDashboardSidebar } from '@/components/layout/AdminDashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Settings, Bell, Shield, Database, Mail, Globe, User } from 'lucide-react';

export default function SettingsPage() {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <div className="flex min-h-screen bg-background">
                <AdminDashboardSidebar />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                                <Settings className="h-8 w-8 text-primary" />
                                Settings
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Configure platform settings and preferences
                            </p>
                        </div>

                        {/* Settings Sections */}
                        <div className="space-y-6">
                            {/* Profile Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Profile Settings
                                    </CardTitle>
                                    <CardDescription>Manage your personal account details</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Personal Information</p>
                                            <p className="text-sm text-muted-foreground">Update your name and profile photo</p>
                                        </div>
                                        <Link href="/admin/profile">
                                            <Button variant="outline" size="sm">Edit Profile</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* General Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Globe className="h-5 w-5" />
                                        General Settings
                                    </CardTitle>
                                    <CardDescription>Platform-wide configuration</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Site Name</p>
                                            <p className="text-sm text-muted-foreground">FitFlow - Virtual Styling Platform</p>
                                        </div>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Maintenance Mode</p>
                                            <p className="text-sm text-muted-foreground">Currently: Active</p>
                                        </div>
                                        <Button variant="outline" size="sm">Toggle</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">User Registration</p>
                                            <p className="text-sm text-muted-foreground">Allow new user signups</p>
                                        </div>
                                        <Button variant="outline" size="sm">Configure</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Notifications */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bell className="h-5 w-5" />
                                        Notification Settings
                                    </CardTitle>
                                    <CardDescription>Manage notification preferences</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Email Notifications</p>
                                            <p className="text-sm text-muted-foreground">Send email alerts for important events</p>
                                        </div>
                                        <Button variant="outline" size="sm">Configure</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">User Approval Alerts</p>
                                            <p className="text-sm text-muted-foreground">Notify when new users register</p>
                                        </div>
                                        <Button variant="outline" size="sm">Configure</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Security */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Security Settings
                                    </CardTitle>
                                    <CardDescription>Platform security configuration</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Two-Factor Authentication</p>
                                            <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                                        </div>
                                        <Button variant="outline" size="sm">Enable</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Session Timeout</p>
                                            <p className="text-sm text-muted-foreground">Auto-logout after: 30 minutes</p>
                                        </div>
                                        <Button variant="outline" size="sm">Change</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Password Policy</p>
                                            <p className="text-sm text-muted-foreground">Minimum 8 characters, mixed case</p>
                                        </div>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Database */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Database className="h-5 w-5" />
                                        Database Management
                                    </CardTitle>
                                    <CardDescription>Database backup and maintenance</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Automatic Backups</p>
                                            <p className="text-sm text-muted-foreground">Last backup: 2 hours ago</p>
                                        </div>
                                        <Button variant="outline" size="sm">Backup Now</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Database Size</p>
                                            <p className="text-sm text-muted-foreground">Current size: 2.4 GB</p>
                                        </div>
                                        <Button variant="outline" size="sm">Optimize</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Email */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Mail className="h-5 w-5" />
                                        Email Configuration
                                    </CardTitle>
                                    <CardDescription>Email service settings</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">SMTP Server</p>
                                            <p className="text-sm text-muted-foreground">smtp.fitflow.com</p>
                                        </div>
                                        <Button variant="outline" size="sm">Configure</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-medium">Email Templates</p>
                                            <p className="text-sm text-muted-foreground">Customize email templates</p>
                                        </div>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
