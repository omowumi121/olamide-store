"use client";
import { Search, Bell, Filter, Menu } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setIsOpen: (value: boolean) => void; 
}

export default function Header({ searchTerm, setSearchTerm, setIsOpen }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-4 md:mb-6 h-14 md:h-16 gap-2 sm:gap-4 px-1">
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        {/* Mobile Menu Button - Hamburger */}
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white rounded-xl shadow-sm md:hidden border border-[#D9EAF3] hover:bg-gray-50 active:scale-95 transition"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B3B48]" />
        </button>

        {/* Search Bar - Expands to fill space */}
        <div className="relative w-full max-w-[400px]">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full bg-white pl-9 sm:pl-12 pr-4 sm:pr-10 py-2 sm:py-3 rounded-xl sm:rounded-full border border-[#D9EAF3] shadow-sm focus:ring-2 focus:ring-[#6297A1] outline-none transition text-xs sm:text-sm"
          />
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 hidden lg:block" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification - Hidden on very small screens */}
        <button className="relative p-2 bg-white rounded-full shadow-sm border border-[#D9EAF3] hidden xs:block">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Profile Section */}
        <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-0">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 border-2 border-white shadow-sm rounded-full overflow-hidden">
            <Image 
              src="/images/profile.jpg" 
              alt="Olamide Gabriel" 
              fill
              className="object-cover" 
            />
          </div>
          {/* Text hidden on Tablet and Mobile to save space */}
          <div className="hidden xl:block">
            <div className="font-bold text-xs sm:text-sm text-[#1B3B48] leading-none">Olamide Gabriel</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
}