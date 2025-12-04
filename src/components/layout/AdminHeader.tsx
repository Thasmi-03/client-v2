'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function AdminHeader() {
    const { logout } = useAuth();

    return (
        <header className="w-full bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>

                <Button
                    onClick={logout}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </header>
    );
}
