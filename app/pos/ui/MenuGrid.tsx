// "use client";
// import { Plus } from "lucide-react";
// import Image from "next/image";
// import { MENU_ITEMS, CATEGORIES } from "../data";

// export default function MenuGrid({ activeCategory, setActiveCategory, addToCart }: any) {
//   return (
//     <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
//       {/* SECTION 1: Sticky Categories */}
//       <div className="p-8 pb-4 bg-white z-20"> 
//         <div className="flex gap-4 mb-6 overflow-x-auto no-scrollbar">
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`flex flex-col items-center justify-center min-w-[100px] py-3 px-4 rounded-2xl border transition-all ${
//                 activeCategory === cat 
//                   ? "bg-[#244F61] text-white border-[#244F61] shadow-md" 
//                   : "bg-white border-[#D9EAF3] text-gray-500 hover:border-[#6297A1]"
//               }`}
//             >
//               <span className="text-[10px] font-black uppercase tracking-widest">{cat}</span>
//             </button>
//           ))}
//         </div>
//         <h2 className="text-2xl font-black text-[#1B3B48]">Choose Items</h2>
//       </div>

//       {/* SECTION 2: Responsive Grid */}
//       <div className="flex-1 overflow-y-auto px-8 pb-10 no-scrollbar">
//         {/* Forces 3 columns on large screens to show more items at once */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {MENU_ITEMS.filter(i => activeCategory === "All" || i.category === activeCategory).map((item) => (
//             <div key={item.id} className="group bg-white border border-[#6297A1]/10 rounded-[32px] p-5 hover:shadow-xl transition-all flex flex-col items-center text-center">
              
//               <div className="relative w-28 h-28 mb-3">
//                 <Image 
//                   src={item.image} 
//                   alt={item.name} 
//                   fill 
//                   className="object-contain group-hover:scale-110 transition-transform" 
//                 />
//               </div>
              
//               <h3 className="font-bold text-base text-[#1B3B48] mb-1 truncate w-full">{item.name}</h3>
//               <p className="text-[10px] text-gray-400 mb-4 leading-tight line-clamp-2">
//                 Freshly prepared with premium local ingredients.
//               </p>
              
//               <div className="w-full flex justify-between items-center mt-auto">
//                 <span className="text-lg font-black text-[#1B3B48]">₦{item.price.toLocaleString()}</span>
//                 <button 
//                   onClick={() => addToCart(item)}
//                   className="bg-[#1B3B48] text-white p-2 rounded-xl hover:bg-[#6297A1] shadow-lg active:scale-90 transition-all"
//                 >
//                   <Plus size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { MENU_ITEMS, CATEGORIES } from "../data";

export default function MenuGrid({ activeCategory, setActiveCategory, addToCart, searchTerm }: any) {
  
  // Logic to filter items by BOTH Category and Search Text
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      <div className="p-8 pb-4 bg-white z-20"> 
        <div className="flex gap-4 mb-6 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex flex-col items-center justify-center min-w-[100px] py-3 px-4 rounded-2xl border transition-all ${
                activeCategory === cat 
                  ? "bg-[#244F61] text-white border-[#244F61] shadow-md" 
                  : "bg-white border-[#D9EAF3] text-gray-500 hover:border-[#6297A1]"
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">{cat}</span>
            </button>
          ))}
        </div>
        <h2 className="text-2xl font-black text-[#1B3B48]">Choose Items</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-10 no-scrollbar">
        {/* Render filtered items */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-white border border-[#6297A1]/10 rounded-[32px] p-5 hover:shadow-xl transition-all flex flex-col items-center text-center">
              <div className="relative w-28 h-28 mb-3">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-contain group-hover:scale-110 transition-transform" 
                />
              </div>
              <h3 className="font-bold text-base text-[#1B3B48] mb-1 truncate w-full">{item.name}</h3>
              <p className="text-[10px] text-gray-400 mb-4 leading-tight line-clamp-2">
                Freshly prepared with premium local ingredients.
              </p>
              <div className="w-full flex justify-between items-center mt-auto">
                <span className="text-lg font-black text-[#1B3B48]">₦{item.price.toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-[#1B3B48] text-white p-2 rounded-xl hover:bg-[#6297A1] shadow-lg active:scale-90 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}