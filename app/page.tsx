// "use client";

// import { useState } from "react";
// import { useAuth } from "@omowunmi/auth-sdk";

// export default function LoginPage() {
//   const { login, user, loading, logout } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     try {
//       // This calls the login function in your AuthContext.tsx
//       await login({ email, password });
//       alert("Login successful!");
//     } catch (err: any) {
//       setError(err.message || "Failed to login. Check your Go backend.");
//     }
//   };

//   // If the SDK successfully sets the user state
//   if (user?.authenticated) {
//     return (
//       <div className="p-10 flex flex-col items-center gap-4">
//         <h1 className="text-2xl font-bold text-green-600">Authenticated!</h1>
//         <p>Logged in as: <span className="font-mono">{user.email}</span></p>
//         <button 
//           onClick={logout}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     );
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <div className="z-10 w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center text-black">SDK Login Test</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {loading ? "Authenticating..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }


"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { useAuth } from "./auth-sdk/auth-sdk-package";
import { useRouter } from "next/navigation"; // Added for redirection

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter(); // Initialize router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect automatically if user is already logged in
  useEffect(() => {
    if (user?.authenticated) {
      router.push("/pos");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      // On success, move to the POS interface
      router.push("/pos");
    } catch (err: any) {
      setError(err.message || "Invalid staff credentials.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="z-10 w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase">Staff Portal</h2>
          <p className="text-gray-500 text-sm">Log in to access POS Terminal</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="waiter@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
            <input
              type="password"
              className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
          >
            {loading ? "Verifying..." : "Open Terminal"}
          </button>
        </form>
      </div>
    </main>
  );
}