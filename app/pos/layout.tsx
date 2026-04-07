"use client";
import { ReactNode, useState, useEffect, cloneElement, isValidElement } from "react";
// Import both useAuth and the AuthProvider from your local SDK
import { useAuth, AuthProvider } from "../auth-sdk/auth-sdk-package"; 
import { useRouter } from "next/navigation";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";

export default function POSLayout({ children }: { children: ReactNode }) {
  return (
    /* 1. Wrap everything in AuthProvider to fix the preredering error */
    <AuthProvider>
      <POSLayoutContent>{children}</POSLayoutContent>
    </AuthProvider>
  );
}

// Move the logic into a sub-component so it can access the Auth context
function POSLayoutContent({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!loading && !user?.authenticated) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return <div className="h-screen w-full flex items-center justify-center">Loading POS...</div>;
  if (!user?.authenticated) return null;

  return (
    <div className="flex h-screen bg-[#F0F5F9] font-sans text-[#1A1A1A]">
      <Sidebar />
      
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* 2. Header props are now satisfied, clearing the Type Error */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* 3. Inject searchTerm into child pages */}
          {isValidElement(children) 
            ? cloneElement(children as any, { searchTerm }) 
            : children}
        </div>
      </main>
    </div>
  );
}