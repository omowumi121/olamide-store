"use client";

import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { createAuthApi } from "../api/auth";
import { tokenManager } from "../utils/token";

// Define a default config in case one isn't provided
const DEFAULT_CONFIG = {
  baseUrl: "http://localhost:8080", // Change this to your Go backend default
};

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ 
  children, 
  config = DEFAULT_CONFIG // Provides a fallback if config is missing
}: { 
  children: React.ReactNode; 
  config?: { baseUrl: string }; // Made optional with '?'
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Memoize the API instance so it only recreates if the URL changes
  const api = useMemo(() => createAuthApi(config.baseUrl), [config.baseUrl]);

  const login = useCallback(async (data: any) => {
    setLoading(true);
    try {
      const res = await api.loginRequest(data);
      // Assuming your Go backend returns a token in the body or handles HttpOnly cookies
      if (res?.token) {
        tokenManager.set(res.token);
        setUser({ email: data.email, authenticated: true });
        return res;
      }
    } catch (error) {
      setUser(null);
      throw error; 
    } finally {
      setLoading(false);
    }
  }, [api]);

  const register = useCallback(async (data: any) => {
    setLoading(true);
    try {
      return await api.registerRequest(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const logout = useCallback(() => {
    tokenManager.remove();
    setUser(null);
  }, []);

  useEffect(() => {
    const initAuth = () => {
      const token = tokenManager.get();
      if (token) {
        // You might want to call a /me endpoint here eventually 
        // to get actual user data from the Go backend
        setUser({ authenticated: true });
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // Memoize the context value to prevent children from re-rendering on every state change
  const value = useMemo(() => ({
    user,
    login,
    logout,
    register,
    loading
  }), [user, login, logout, register, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};