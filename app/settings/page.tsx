"use client";
import { Trash2, Store, RefreshCcw } from "lucide-react";

export default function SettingsPage() {
  
  const resetDatabase = () => {
    if (window.confirm("Warning: This will delete all order history and reset stock to default. Proceed?")) {
      localStorage.removeItem("olamide_orders");
      localStorage.removeItem("olamide_inventory");
      window.location.reload(); // Refresh to apply changes
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#F8FBFE] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1B3B48] mb-8">System Settings</h1>

        <div className="space-y-6">
          {/* Store Profile */}
          <div className="bg-white p-6 rounded-3xl border border-[#D9EAF3] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Store className="text-[#6297A1]" />
              <h2 className="font-bold text-[#1B3B48]">Store Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Store Name</label>
                <input type="text" defaultValue="Olamide Store" className="w-full p-3 bg-gray-50 border border-[#D9EAF3] rounded-xl focus:outline-none focus:border-[#6297A1]" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Currency Symbol</label>
                <input type="text" defaultValue="₦ (Naira)" disabled className="w-full p-3 bg-gray-100 border border-[#D9EAF3] rounded-xl text-gray-400" />
              </div>
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="bg-red-50 p-6 rounded-3xl border border-red-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCcw className="text-red-500" />
              <h2 className="font-bold text-red-600">Danger Zone</h2>
            </div>
            <p className="text-sm text-red-500/70 mb-4">
              Use these actions to clear your browser data for this app. This cannot be undone.
            </p>
            <button 
              onClick={resetDatabase}
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
            >
              <Trash2 size={18} />
              Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}