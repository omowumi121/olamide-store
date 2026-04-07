"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AuthContext: () => AuthContext,
  AuthProvider: () => AuthProvider,
  tokenManager: () => tokenManager,
  useAuth: () => useAuth
});
module.exports = __toCommonJS(index_exports);

// src/context/AuthContext.tsx
var import_react = require("react");

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
var import_jsx_runtime = require("react/jsx-runtime");
var DEFAULT_CONFIG = {
  baseUrl: "http://localhost:8080"
  // Change this to your Go backend default
};
var AuthContext = (0, import_react.createContext)(null);
var AuthProvider = ({
  children,
  config = DEFAULT_CONFIG
  // Provides a fallback if config is missing
}) => {
  const [user, setUser] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const api = (0, import_react.useMemo)(() => createAuthApi(config.baseUrl), [config.baseUrl]);
  const login = (0, import_react.useCallback)(async (data) => {
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
  const register = (0, import_react.useCallback)(async (data) => {
    setLoading(true);
    try {
      return await api.registerRequest(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [api]);
  const logout = (0, import_react.useCallback)(() => {
    tokenManager.remove();
    setUser(null);
  }, []);
  (0, import_react.useEffect)(() => {
    const initAuth = () => {
      const token = tokenManager.get();
      if (token) {
        setUser({ authenticated: true });
      }
      setLoading(false);
    };
    initAuth();
  }, []);
  const value = (0, import_react.useMemo)(() => ({
    user,
    login,
    logout,
    register,
    loading
  }), [user, login, logout, register, loading]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, { value, children });
};

// src/hooks/useAuth.ts
var import_react2 = require("react");
var useAuth = () => {
  const context = (0, import_react2.useContext)(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthContext,
  AuthProvider,
  tokenManager,
  useAuth
});
