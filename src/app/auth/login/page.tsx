'use client';
import { LoginForm } from '@/components/auth/LoginForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}