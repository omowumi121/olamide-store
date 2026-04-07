"use client";
import { ReactNode, useState, useEffect, cloneElement, isValidElement } from "react";
// This path matches your new GitHub structure
import { useAuth, AuthProvider } from "../auth-sdk/auth-sdk-package"; 
import { useRouter } from "next/navigation";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";

export default function POSLayout({ children }: { children: ReactNode }) {
  return (
    /* Wrapping in AuthProvider fixes the 'useAuth must be used within an AuthProvider' build error */
    <AuthProvider>
      <POSLayoutContent>{children}</POSLayoutContent>
    </AuthProvider>
  );
}

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
        {/* Passing these props fixes the Header Type Error */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex flex-1 overflow-hidden">
          {isValidElement(children) 
            ? cloneElement(children as any, { searchTerm }) 
            : children}
        </div>
      </main>
    </div>
  );
}