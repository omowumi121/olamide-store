"use client";
import { Home, LayoutDashboard, ShoppingBag, CreditCard, Box, PieChart, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../auth-sdk/auth-sdk-package";

export default function Sidebar() {
  const { logout } = useAuth();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: false },
    { icon: <Home size={20} />, label: "Home", active: true },
    { icon: <ShoppingBag size={20} />, label: "Order", active: false },
    { icon: <CreditCard size={20} />, label: "Payment", active: false },
    { icon: <Box size={20} />, label: "Inventory", active: false },
    { icon: <PieChart size={20} />, label: "Report", active: false },
    { icon: <Settings size={20} />, label: "Settings", active: false },
  ];

  return (
    <aside className="w-[240px] bg-[#1B3B48] text-white flex flex-col p-6 h-screen">
      <div className="text-2xl font-black mb-10 flex items-center gap-2">
        <span className="text-[#6297A1]">POS</span>.COM
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              item.active ? "bg-[#244F61] text-white" : "text-gray-400 hover:text-white hover:bg-[#244F61]/50"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <button 
        onClick={logout}
        className="flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 transition-colors mt-auto"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}