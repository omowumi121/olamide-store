"use client";
import { Minus, Plus, Trash2, X, ShoppingCart, RotateCcw } from "lucide-react";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface BillSidebarProps {
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  handlePlaceOrder: () => void; // ADDED THIS
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function BillSidebar({ 
  cart = [], 
  updateQuantity, 
  clearCart, 
  handlePlaceOrder, // DESTRUCTURED HERE
  isOpen, 
  setIsOpen 
}: BillSidebarProps) {

  const subTotal = cart?.reduce((sum: number, item: CartItem) => sum + (item.price * item.qty), 0) || 0;
  const tax = subTotal * 0.10; 
  const total = subTotal + tax;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 right-0 z-[70] w-full max-w-[340px] bg-white border-l border-[#D9EAF3] flex flex-col p-6 h-full transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#1B3B48] flex items-center gap-2">
            <ShoppingCart size={20} className="lg:hidden text-[#6297A1]" />
            Bills
          </h2>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 no-scrollbar space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm italic">
              <span className="text-4xl mb-2">🛒</span>
              Your bill is empty
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-[#F0F5F9]/50 rounded-2xl border border-[#D9EAF3]/50">
                <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-[#D9EAF3]">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[11px] md:text-xs text-[#1B3B48] truncate">{item.name}</p>
                  <p className="text-xs md:text-sm font-black text-[#6297A1]">₦{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1 md:gap-2 bg-white rounded-lg p-1 border border-[#D9EAF3]">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 rounded-md">
                    <Minus size={12} className={item.qty <= 1 ? "text-gray-300" : "text-[#6297A1]"} />
                  </button>
                  <span className="font-bold text-xs w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 rounded-md">
                    <Plus size={12} className="text-[#6297A1]" />
                  </button>
                </div>
                <button onClick={() => updateQuantity(item.id, -999)} className="text-red-400 hover:text-red-600 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

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

          <div className="flex flex-col gap-2 mt-2">
            <button 
              onClick={handlePlaceOrder} // CONNECTED TO ACTION
              disabled={cart.length === 0} 
              className="w-full bg-[#1B3B48] text-white py-3 md:py-4 rounded-2xl font-bold transition hover:bg-[#244F61] shadow-lg active:scale-95 disabled:opacity-50"
            >
              Place Order
            </button>
            
            <button 
              onClick={clearCart}
              disabled={cart.length === 0}
              className="w-full flex items-center justify-center gap-2 bg-white border border-red-200 text-red-500 py-3 rounded-2xl font-bold transition hover:bg-red-50 active:scale-95 disabled:opacity-0"
            >
              <RotateCcw size={16} />
              Cancel Order
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}