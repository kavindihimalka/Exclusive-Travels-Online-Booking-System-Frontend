import React, { createContext, useContext, useState } from 'react';

const ADMIN_TOKEN_KEY = 'admin_token';

type AdminAuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => (typeof window !== 'undefined' ? sessionStorage.getItem(ADMIN_TOKEN_KEY) : null)
  );
  const isAuthenticated = !!token;

  const login = (t: string) => {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, t);
    setToken(t);
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return ctx;
}
