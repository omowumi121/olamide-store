"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export default function BillSidebar({ cart, updateQuantity }: any) {
  const subTotal = cart.reduce((sum: number, item: any) => sum + (item.price * item.qty), 0);
  const tax = subTotal * 0.10; 
  const total = subTotal + tax;

  return (
    <aside className="w-[340px] bg-white border-l border-[#D9EAF3] flex flex-col p-6 h-full">
      <h2 className="text-xl font-bold mb-6 text-[#1B3B48]">Bills</h2>
      
      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar space-y-3">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm italic">
            <span className="text-4xl mb-2">🛒</span>
            Your bill is empty
          </div>
        ) : (
          cart.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-[#F0F5F9]/50 rounded-2xl border border-[#D9EAF3]/50">
              {/* Compact Food Image */}
              <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-[#D9EAF3]">
                <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-[#1B3B48] truncate">{item.name}</p>
                <p className="text-sm font-black text-[#6297A1]">₦{item.price.toLocaleString()}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-[#D9EAF3]">
                <button 
                  onClick={() => updateQuantity(item.id, -1)} 
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Minus size={14} className="text-[#6297A1]" />
                </button>
                <span className="font-bold text-xs w-4 text-center">{item.qty}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Plus size={14} className="text-[#6297A1]" />
                </button>
              </div>

              <button 
                onClick={() => updateQuantity(item.id, -999)} 
                className="text-red-400 hover:text-red-600 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Totals Section */}
      <div className="mt-6 pt-6 border-t border-[#D9EAF3] space-y-3">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Sub Total</span> 
          <span className="font-semibold text-[#1B3B48]">₦{subTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Tax (10%)</span> 
          <span className="font-semibold text-[#1B3B48]">₦{tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-lg font-black border-t border-dashed border-gray-300 pt-4 mt-2">
          <span className="text-[#1B3B48]">Total</span> 
          <span className="text-[#6297A1]">₦{total.toLocaleString()}</span>
        </div>
        <button className="w-full bg-[#1B3B48] text-white py-4 rounded-2xl font-bold transition hover:bg-[#244F61] shadow-lg active:scale-95 mt-2">
          Place Order
        </button>
      </div>
    </aside>
  );
}