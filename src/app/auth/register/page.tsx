'use client';
import { StylerRegisterForm } from '@/components/auth/StylerRegisterForm';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleSwitchToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg border border-border">
        <StylerRegisterForm onSwitchToLogin={handleSwitchToLogin} />
      </div>
    </div>
  );
}
