'use client';

import { AuthContextType } from '@/types';
import { loginAuth } from '@/utils/auth';
import { deleteCookie, hasCookie } from 'cookies-next';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async (email, pass) => console.warn('login not implemented'),
  logout: () => console.warn('logout not implemented')
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = hasCookie('loginUser');
    if (storedUser) setIsLoggedIn(true);
  }, []);

  const login = async (email: string, pass: string) => {
    await loginAuth(email, pass);
    setIsLoggedIn(true);
  };

  const logout = () => {
    deleteCookie('loginUser');
    setIsLoggedIn(false);
  };

  const authContextValue = { isLoggedIn, login, logout };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
