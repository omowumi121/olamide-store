"use client";

// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useMemo, useCallback } from "react";

// src/api/auth.ts
var createAuthApi = (baseUrl) => {
  const cleanUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return {
    loginRequest: async (data) => {
      const res = await fetch(
        `${cleanUrl}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("SDK Error: Server returned HTML. Check your baseUrl.");
      }
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || result.error || "Login failed");
      }
      return result;
    },
    registerRequest: async (data) => {
      const res = await fetch(`${cleanUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("SDK Error: Server returned HTML instead of JSON.");
      }
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || result.error || "Registration failed");
      }
      return result;
    }
  };
};

// src/utils/token.ts
var tokenManager = {
  set: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  },
  get: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  },
  remove: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }
};

// src/context/AuthContext.tsx
import { jsx } from "react/jsx-runtime";
var DEFAULT_CONFIG = {
  baseUrl: "http://localhost:8080"
  // Change this to your Go backend default
};
var AuthContext = createContext(null);
var AuthProvider = ({
  children,
  config = DEFAULT_CONFIG
  // Provides a fallback if config is missing
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = useMemo(() => createAuthApi(config.baseUrl), [config.baseUrl]);
  const login = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await api.loginRequest(data);
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
  const register = useCallback(async (data) => {
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
        setUser({ authenticated: true });
      }
      setLoading(false);
    };
    initAuth();
  }, []);
  const value = useMemo(() => ({
    user,
    login,
    logout,
    register,
    loading
  }), [user, login, logout, register, loading]);
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value, children });
};

// src/hooks/useAuth.ts
import { useContext } from "react";
var useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export {
  AuthContext,
  AuthProvider,
  tokenManager,
  useAuth
};
