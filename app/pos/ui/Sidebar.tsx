"use client";
import Link from 'next/link'; // IMPORTED LINK COMPONENT
import { usePathname } from 'next/navigation'; // TO HANDLE ACTIVE STATES AUTOMATICALLY
import { Home, LayoutDashboard, ShoppingBag, CreditCard, Box, PieChart, Settings, LogOut, X } from "lucide-react";
import { useAuth } from "../../auth-sdk/auth-sdk-package";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { logout } = useAuth();
  const pathname = usePathname(); // GETS THE CURRENT URL PATH

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Home size={20} />, label: "Home", path: "/pos" }, // Your main POS page
    { icon: <ShoppingBag size={20} />, label: "Order", path: "/order" },
    { icon: <CreditCard size={20} />, label: "Payment", path: "/payment" },
    { icon: <Box size={20} />, label: "Inventory", path: "/inventory" },
    { icon: <PieChart size={20} />, label: "Report", path: "/report" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[240px] bg-[#1B3B48] text-white flex flex-col p-6 h-screen transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        <button 
          className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>

        <div className="text-2xl font-black mb-10 flex items-center gap-2">
          <span className="text-[#6297A1]">POS</span>.COM
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            // Check if this item is currently active based on the URL
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.label}
                href={item.path}
                onClick={() => setIsOpen(false)} // Close sidebar on mobile after clicking
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#244F61] text-white shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-[#244F61]/50"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 transition-colors mt-auto"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>
    </>
  );
}