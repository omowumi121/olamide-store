"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { CATEGORIES, Product } from "../data";

interface MenuGridProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  addToCart: (item: Product) => void;
  searchTerm: string;
  inventory: Product[];
}

export default function MenuGrid({ 
  activeCategory, 
  setActiveCategory, 
  addToCart, 
  searchTerm,
  inventory 
}: MenuGridProps) {

  const filteredItems = inventory.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-1 flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden bg-[#F8FBFE]">
      {/* Responsive Category Header: Scrollable on mobile, wrap on desktop */}
      <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap items-center gap-2 mb-6 md:mb-8 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 sm:px-6 py-2 rounded-xl font-bold transition-all text-xs sm:text-sm shadow-sm whitespace-nowrap ${
              activeCategory === cat 
                ? "bg-[#1B3B48] text-white scale-105" 
                : "bg-white text-gray-500 hover:bg-[#6297A1]/10 border border-[#D9EAF3]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Food Grid: 1 column on tiny phones, 2 on mobile, 3 on tablet, 4+ on large screens */}
      <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 pb-24 lg:pb-8">
          {filteredItems.map((item) => {
            const isOutOfStock = item.stock <= 0;
            
            return (
              <div 
                key={item.id} 
                className={`group bg-white rounded-2xl sm:rounded-3xl p-3 border border-[#D9EAF3] hover:border-[#6297A1] hover:shadow-xl transition-all relative flex flex-col ${
                  isOutOfStock ? "opacity-60 grayscale-[0.5]" : ""
                }`}
              >
                {/* Stock Badge */}
                <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-lg text-[9px] font-bold border ${
                  isOutOfStock 
                    ? "bg-red-50 text-red-500 border-red-100" 
                    : "bg-[#6297A1]/10 text-[#6297A1] border-[#6297A1]/20"
                }`}>
                  {isOutOfStock ? "SOLD OUT" : `${item.stock} left`}
                </div>

                <div className="relative w-full aspect-square mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden bg-[#F0F5F9]">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                
                <div className="flex flex-col flex-1">
                  <h3 className="font-bold text-[#1B3B48] text-xs sm:text-sm md:text-base mb-1 line-clamp-1 sm:line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-1 sm:pt-2">
                    <span className="font-black text-[#6297A1] text-sm sm:text-base md:text-lg">
                      ₦{item.price.toLocaleString()}
                    </span>
                    <button 
                      disabled={isOutOfStock}
                      onClick={() => addToCart(item)}
                      className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all active:scale-90 ${
                        isOutOfStock 
                          ? "bg-gray-100 text-gray-400" 
                          : "bg-[#1B3B48] text-white hover:bg-[#6297A1]"
                      }`}
                    >
                      <Plus size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}