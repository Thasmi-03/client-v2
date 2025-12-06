"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { authService } from "@/services/auth.service";
import { User } from "@/types/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const { user } = await authService.getCurrentUser();
        setUser(user);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
      Cookies.remove("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string, userData: User) => {
    setIsLoggingOut(false);
    Cookies.set("token", token);
    setUser(userData);
    router.push(userData.role === 'admin' ? '/admin' : '/styler');
  };

  const logout = () => {
    setIsLoggingOut(true);
    Cookies.remove("token");
    router.push("/");
    // Delay state update to prevent ProtectedRoute from redirecting to login
    setTimeout(() => {
      setUser(null);
      setIsLoggingOut(false);
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isLoggingOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
