"use client";

import { AuthProvider } from "../app/auth-sdk/auth-sdk-package";

export function Providers({ children }: { children: React.ReactNode }) {
  const authConfig = {
    // Updated to your live Render backend URL
    baseUrl: "https://go-ecommerce-d46r.onrender.com",
  };

  return (
    <AuthProvider config={authConfig}>
      {children}
    </AuthProvider>
  );
}