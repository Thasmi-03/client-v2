'use client';

import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { StylerRegisterForm } from '@/components/auth/StylerRegisterForm';

interface AuthModalProps {
  open: boolean;
  initialTab?: 'login' | 'signup';
  onClose: () => void;
  isPartnerPage?: boolean;
}

export default function AuthModal({
  open,
  initialTab = 'login',
  onClose,
  isPartnerPage = false,
}: AuthModalProps) {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>(initialTab);

  useEffect(() => {
    if (open) {
      setCurrentView(initialTab);
    }
  }, [open, initialTab]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-card p-8 rounded-lg shadow-lg z-60 w-full max-w-md relative border border-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {currentView === 'login' ? (
          <LoginForm
            onSuccess={onClose}
            onSwitchToSignup={() => setCurrentView('signup')}
          />
        ) : (
          <StylerRegisterForm
            onSuccess={onClose}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
      </div>
    </div>
  );
}
