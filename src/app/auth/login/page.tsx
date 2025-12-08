'use client';
import { LoginForm } from '@/components/auth/LoginForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg border border-border">
        <LoginForm />
      </div>
    </div>
  );
}