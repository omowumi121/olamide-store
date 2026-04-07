// "use client";
// import { Search, Bell, Filter } from "lucide-react";
// import Image from "next/image";

// export default function Header() {
//   return (
//     <header className="flex justify-between items-center mb-6 h-16">
//       <div className="relative w-[400px]">
//         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//         <input 
//           type="text" 
//           placeholder="Search items here..."
//           className="w-full bg-white pl-12 pr-12 py-3 rounded-full border border-[#D9EAF3] shadow-sm focus:ring-2 focus:ring-[#6297A1] outline-none transition"
//         />
//         <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//       </div>

//       <div className="flex items-center gap-6">
//         <button className="relative p-2 bg-white rounded-full shadow-sm">
//           <Bell className="w-6 h-6 text-gray-600" />
//           <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
//         </button>
//         <div className="flex items-center gap-3">
//           {/* UPDATED: Path now points to your local public folder */}
//           <Image 
//             src="/images/profile.jpg" 
//             alt="Akib Siddiquee" 
//             width={40} 
//             height={40} 
//             className="rounded-full object-cover" 
//           />
//           <div>
//             <div className="font-bold text-sm text-[#1B3B48]">Olamide Gabriel</div>
//             <div className="text-xs text-gray-500">Manager</div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";
import { Search, Bell, Filter } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-6 h-16">
      <div className="relative w-[400px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items here..."
          className="w-full bg-white pl-12 pr-12 py-3 rounded-full border border-[#D9EAF3] shadow-sm focus:ring-2 focus:ring-[#6297A1] outline-none transition"
        />
        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 bg-white rounded-full shadow-sm">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3">
          <Image 
            src="/images/profile.jpg" 
            alt="Olamide Gabriel" 
            width={40} 
            height={40} 
            className="rounded-full object-cover" 
          />
          <div>
            <div className="font-bold text-sm text-[#1B3B48]">Olamide Gabriel</div>
            <div className="text-xs text-gray-500">Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
}