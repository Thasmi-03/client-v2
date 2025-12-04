'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface StylerRegisterFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

interface StylerRegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function StylerRegisterForm({ onSuccess, onSwitchToLogin }: StylerRegisterFormProps) {
  const { register: registerUser, loading } = useAuth();
  const { register, handleSubmit } = useForm<StylerRegisterFormValues>();
  const [error, setError] = useState('');

  const onSubmit = async (data: StylerRegisterFormValues) => {
    setError('');
    try {
      await registerUser(data.email, data.password, 'styler', {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address
      });

      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 100);
    } catch (err: any) {
      console.error('Styler register error:', err);
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Create Account</h2>
      <p className="text-gray-600 text-sm mb-6">Sign up as a styler</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            {...register('fullName')}
            id="fullName"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            {...register('phone')}
            id="phone"
            placeholder="+1234567890"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            {...register('address')}
            id="address"
            placeholder="123 Main St, City, Country"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            {...register('password')}
            id="password"
            type="password"
            required
            className="mt-1"
          />
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>

      {onSwitchToLogin && (
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      )}
    </div>
  );
}
