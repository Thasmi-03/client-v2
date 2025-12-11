'use client';

import { RegisterForm } from "@/components/auth/RegisterForm"
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

export default function PartnerRegisterPage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/auth/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            {/* Main Card Container */}
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

                {/* Left Side - Form Section */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-[#f5f0eb] to-[#ebe4dd]">
                    {/* Mobile Logo */}
                    <Link href="/" className="inline-block mb-6 lg:hidden">
                        <Image
                            src="/logo.svg"
                            alt="FitFlow Logo"
                            width={150}
                            height={50}
                            className="h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Logo */}
                    <Link href="/" className="hidden lg:inline-block mb-6">
                        <Image
                            src="/logo.svg"
                            alt="FitFlow Logo"
                            width={180}
                            height={60}
                            className="h-14 w-auto"
                            priority
                        />
                    </Link>

                    {/* Register Form */}
                    <RegisterForm isPartnerPage={true} onSuccess={handleSuccess} />
                </div>

                {/* Right Side - Image Section */}
                <div className="hidden lg:block lg:w-1/2 relative h-64 lg:h-auto">
                    <Image
                        src="https://images.pexels.com/photos/5709322/pexels-photo-5709322.jpeg"
                        alt="Fashion clothing display"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
