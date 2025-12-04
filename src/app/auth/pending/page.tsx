'use client'

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default function PendingPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                        <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                    <CardTitle>Account Pending Approval</CardTitle>
                    <CardDescription>
                        Your account is waiting for admin approval
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Your registration has been received. An administrator will review and
                        approve your account shortly. You'll be able to log in once your
                        account is approved.
                    </p>
                </CardContent>

                <CardFooter>
                    <Button onClick={() => window.location.href = '/'} variant="outline" className="w-full">
                        Back to Home
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}