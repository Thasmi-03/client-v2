'use client';

import { RegisterForm } from "@/components/auth/RegisterForm"
import { useRouter } from "next/navigation";

export default function PartnerRegisterPage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <RegisterForm isPartnerPage={true} onSuccess={handleSuccess} />
            </div>
        </div>
    )
}
