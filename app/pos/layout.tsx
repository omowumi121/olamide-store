"use client";
import { ReactNode, useState, useEffect, cloneElement, isValidElement } from "react";
// Path remains the same as your current GitHub structure
import { useAuth, AuthProvider } from "../auth-sdk/auth-sdk-package"; 
import { useRouter } from "next/navigation";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";

export default function POSLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <POSLayoutContent>{children}</POSLayoutContent>
    </AuthProvider>
  );
}

function POSLayoutContent({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  // New state for mobile sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user?.authenticated) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return <div className="h-screen w-full flex items-center justify-center">Loading POS...</div>;
  if (!user?.authenticated) return null;

  return (
    <div className="flex h-screen bg-[#F0F5F9] font-sans text-[#1A1A1A] overflow-hidden">
      {/* Sidebar now receives toggle state */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
        {/* Header now receives toggle function for the Menu button */}
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setIsOpen={setIsSidebarOpen} 
        />
        
        <div className="flex flex-1 overflow-hidden">
          {isValidElement(children) 
            ? cloneElement(children as any, { searchTerm }) 
            : children}
        </div>
      </main>
    </div>
  );
}