'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import { Role } from '@/types/auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine((phone) => {
      // Remove spaces and special characters for validation
      const cleaned = phone.replace(/[\s\-\(\)]/g, '');

      // Sri Lankan mobile: 0771234567 (10 digits starting with 07)
      const localMobile = /^07[0-9]{8}$/;

      // Sri Lankan landline: 0112345678 (10 digits, area code + number)
      const localLandline = /^0[1-9][0-9]{8}$/;

      // International format: +94771234567 or 94771234567
      const intlMobile = /^(\+?94|94)7[0-9]{8}$/;
      const intlLandline = /^(\+?94|94)[1-9][0-9]{8}$/;

      return localMobile.test(cleaned) ||
        localLandline.test(cleaned) ||
        intlMobile.test(cleaned) ||
        intlLandline.test(cleaned);
    }, 'Please enter a valid Sri Lankan phone number (e.g., 0771234567 or +94771234567)'),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must not exceed 200 characters')
    
    .refine((addr) => addr.trim().split(/\s+/).length >= 3,
      'Please provide a complete address (e.g. Galle Road, Colombo)'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'styler', 'partner']),
  // Styler-specific fields
  gender: z.enum(['male', 'female', 'other']).optional(),
  dateOfBirth: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  isPartnerPage?: boolean;
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterForm({ isPartnerPage = false, onSuccess, onSwitchToLogin }: RegisterFormProps = {}) {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      gender: undefined,
      dateOfBirth: '',
    },
  });

  useEffect(() => {
    setValue('role', isPartnerPage ? 'partner' : 'styler');
  }, [setValue, isPartnerPage]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const registerData = {
        email: data.email,
        password: data.password,
        role: data.role as Role,
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        ...(data.role === 'styler' && data.gender ? { gender: data.gender } : {}),
        ...(data.role === 'styler' && data.dateOfBirth ? { dateOfBirth: data.dateOfBirth } : {}),
      };

      const response = await authService.register(registerData);

      // Partners don't receive a token (they need admin approval)
      // Stylers and first admin receive a token immediately
      if (response.token && response.user) {
        // Auto-approved users (stylers, first admin) - require manual login
        toast.success('Registration successful! Please sign in.', {
          duration: 3000,
        });
        // Do not auto-login
        if (onSwitchToLogin) {
          onSwitchToLogin();
        } else if (onSuccess) {
          // If no switch handler, maybe close modal? 
          // But user wants to click "Sign In". 
          // If this is the standalone page, we might want to redirect to login?
          // The user said "clicking Sign In".
          // If I redirect automatically, it violates "clicking Sign In".
          // But if I don't redirect, they are stuck on the register form.
          // Let's look at the form. It has "Already have an account? Login".
          // So I should just show the toast.
          // However, for better UX, maybe I should clear the form?
          // For now, I'll just show the toast and NOT login.
        }
      } else {
        // Partners and subsequent admins need approval
        toast.success(response.message || 'Registration successful! Waiting for admin approval.', {
          duration: 3000,
        });
        // Redirect to login page for partners to wait for approval
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMessage = err?.response?.data?.error || err.message || 'Registration failed';
      toast.error(errorMessage, {
        duration: Infinity,
        closeButton: true,
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-3xl font-bold mb-2 text-[#4F433E]">Create Account</h2>
      <p className="text-gray-600 text-sm mb-6">
        {isPartnerPage ? 'Sign up as a partner' : 'Create your styler account'}
      </p>

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="block text-sm font-medium text-[#4F433E] mb-2">
            Full Name
          </Label>
          <Input
            {...register('fullName')}
            id="fullName"
            placeholder="Full Name"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A57C65] focus:border-transparent text-[#4F433E] placeholder:text-gray-400"
          />
          {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-[#4F433E] mb-2">
            Email
          </Label>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="Email"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A57C65] focus:border-transparent text-[#4F433E] placeholder:text-gray-400"
          />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="block text-sm font-medium text-[#4F433E] mb-2">
            Phone
          </Label>
          <Input
            {...register('phone')}
            id="phone"
            placeholder="+1234567890"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A57C65] focus:border-transparent text-[#4F433E] placeholder:text-gray-400"
          />
          {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address" className="block text-sm font-medium text-[#4F433E] mb-2">
            Address
          </Label>
          <Input
            {...register('address')}
            id="address"
            placeholder="123 Main St, City, Country"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A57C65] focus:border-transparent text-[#4F433E] placeholder:text-gray-400"
          />
          {errors.address && <p className="text-destructive text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-[#4F433E] mb-2">
            Password
          </Label>
          <Input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A57C65] focus:border-transparent text-[#4F433E] placeholder:text-gray-400"
          />
          {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Styler-specific fields */}
        {!isPartnerPage && (
          <>
            <div>
              <Label htmlFor="gender" className="block text-sm font-medium text-[#4F433E] mb-2">
                Gender
              </Label>
              <select
                {...register('gender')}
                id="gender"
                disabled={loading}
                className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A57C65] focus:border-transparent text-[#4F433E]"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-destructive text-sm mt-1">{errors.gender.message}</p>}
            </div>

            <div>
              <Label htmlFor="dateOfBirth" className="block text-sm font-medium text-[#4F433E] mb-2">
                Date of Birth
              </Label>
              <Input
                {...register('dateOfBirth')}
                id="dateOfBirth"
                type="date"
                disabled={loading}
                className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A57C65] focus:border-transparent text-[#4F433E]"
              />
              {errors.dateOfBirth && <p className="text-destructive text-sm mt-1">{errors.dateOfBirth.message}</p>}
            </div>
          </>
        )}

        <input {...register('role')} type="hidden" value="partner" />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#A57C65] hover:bg-[#8d6952] text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>

      {/* Social Login Buttons - Only show for non-partner pages */}
      {!isPartnerPage && (
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => toast.info('Apple login coming soon!')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Apple</span>
          </button>

          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => toast.info('Google login coming soon!')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
        </div>
      )}

      {/* Footer Links - Only show for non-partner pages */}
      {!isPartnerPage && (
        <div className="mt-6 flex items-center justify-between text-sm">
          <p className="text-gray-600">
            {onSwitchToLogin ? (
              <>
                Have any Account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-[#A57C65] hover:text-[#8d6952] font-semibold"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Have any Account?{' '}
                <Link href="/auth/login" className="text-[#A57C65] hover:text-[#8d6952] font-semibold">
                  Sign in
                </Link>
              </>
            )}
          </p>
          <Link href="/terms" className="text-gray-600 hover:text-[#A57C65]">
            Terms and Condition
          </Link>
        </div>
      )}
    </div>
  );
}
