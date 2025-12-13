'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { loginSchema, LoginFormValues } from '@/schemas/auth.schema';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authService.login({ email: data.email, password: data.password });
      await login(response.token, response.user);

      toast.success('Login successful!', {
        duration: 3000,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err?.response?.data?.error || err?.message || 'Login failed';
      toast.error(errorMessage, {
        duration: Infinity,
        closeButton: true,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-foreground">Login</h2>
      <p className="text-muted-foreground text-sm mb-6">Enter your credentials to access your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="you@example.com"
            disabled={loading}
            className="mt-1"
          />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Input
              {...register('password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
              disabled={loading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      {onSwitchToSignup && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      )}
    </div>
  );
}
