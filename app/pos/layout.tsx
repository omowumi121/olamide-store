// "use client";

// import { useAuth } from "@omowunmi/auth-sdk";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function POSLayout({ children }: { children: React.ReactNode }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     // If auth check is finished and no user is found, kick back to login
//     if (!loading && !user?.authenticated) {
//       router.push("/");
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   // Only render if authenticated
//   return user?.authenticated ? <>{children}</> : null;
// }

"use client";
import { ReactNode, useState, useEffect, cloneElement, isValidElement } from "react";
import { useAuth } from "@omowunmi/auth-sdk";
import { useRouter } from "next/navigation";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";

export default function POSLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Lifted search state
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
        {/* Pass state to Header to fix TypeScript Error */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Pass searchTerm down to the page component */}
          {isValidElement(children) 
            ? cloneElement(children as any, { searchTerm }) 
            : children}
        </div>
      </main>
    </div>
  );
}