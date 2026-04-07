// "use client";

// import { useState } from "react";
// import { useAuth } from "@omowunmi/auth-sdk";
// import { MENU_ITEMS, CATEGORIES } from "./data";

// export default function POSPage() {
//   const { logout } = useAuth();
//   const [cart, setCart] = useState<any[]>([]);
//   const [filter, setFilter] = useState("All");

//   const addToCart = (item: any) => {
//     setCart((prev) => {
//       const exists = prev.find((i) => i.id === item.id);
//       if (exists) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prev) => prev.filter(i => i.id !== id));
//   };

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <div className="flex flex-col lg:flex-row h-screen bg-gray-100 text-black">
      
//       {/* LEFT: MENU SECTION */}
//       <div className="flex-1 flex flex-col p-4 lg:p-6 overflow-hidden">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl lg:text-2xl font-black uppercase tracking-tighter">POS Terminal</h1>
//           <button onClick={logout} className="text-xs bg-gray-200 px-3 py-1 rounded text-gray-600">Logout</button>
//         </div>

//         {/* Categories */}
//         <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
//           {CATEGORIES.map(cat => (
//             <button 
//               key={cat}
//               onClick={() => setFilter(cat)}
//               className={`whitespace-nowrap px-6 py-2 rounded-lg font-bold text-sm transition ${filter === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500'}`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Grid: 2 cols on mobile, 3 on tablet, 4 on large monitor */}
//         <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 overflow-y-auto pr-2 pb-20 lg:pb-0">
//           {MENU_ITEMS.filter(i => filter === "All" || i.category === filter).map(item => (
//             <button 
//               key={item.id}
//               onClick={() => addToCart(item)}
//               className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-md active:scale-95 transition-all flex flex-col items-center text-center"
//             >
//               <span className="text-sm lg:text-base font-bold leading-tight mb-2">{item.name}</span>
//               <span className="text-blue-600 font-mono font-bold">₦{item.price.toLocaleString()}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT: CART/RECEIPT SECTION */}
//       <div className="w-full lg:w-[380px] xl:w-[450px] bg-white border-l shadow-2xl flex flex-col h-[40vh] lg:h-full fixed lg:relative bottom-0 left-0 z-10 lg:z-0">
//         <div className="p-4 border-b flex justify-between items-center bg-gray-50">
//           <h2 className="font-black text-lg">CURRENT ORDER</h2>
//           <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{cart.length} ITEMS</span>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {cart.length === 0 ? (
//             <div className="h-full flex items-center justify-center text-gray-400 italic text-sm">Cart is empty</div>
//           ) : (
//             cart.map(item => (
//               <div key={item.id} className="flex justify-between items-start animate-in fade-in slide-in-from-right-4">
//                 <div className="flex-1">
//                   <p className="font-bold text-sm">{item.name}</p>
//                   <p className="text-xs text-gray-500">₦{item.price.toLocaleString()} x {item.qty}</p>
//                 </div>
//                 <div className="flex flex-col items-end gap-1">
//                   <p className="font-bold text-blue-600 text-sm">₦{(item.price * item.qty).toLocaleString()}</p>
//                   <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-400 hover:text-red-600 underline">Remove</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Total & Checkout */}
//         <div className="p-4 lg:p-6 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-gray-500 font-bold">TOTAL</span>
//             <span className="text-2xl lg:text-3xl font-black text-blue-800">₦{total.toLocaleString()}</span>
//           </div>
//           <button 
//             disabled={cart.length === 0}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg shadow-lg disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-[0.98]"
//           >
//             PLACE ORDER
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useAuth } from "@omowunmi/auth-sdk";
// import { MENU_ITEMS, CATEGORIES } from "./data";
// import MenuGrid from "./ui/MenuGrid"; 
// import BillSidebar from "./ui/BillSidebar";

// export default function POSPage() {
//   const [cart, setCart] = useState<any[]>([]);
//   const [activeCategory, setActiveCategory] = useState("All");

//   const addToCart = (item: any) => {
//     setCart((prev) => {
//       const exists = prev.find((i) => i.id === item.id);
//       if (exists) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   const updateQuantity = (id: number, delta: number) => {
//     setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
//   };

//   return (
//     // THIS STYLING CREATES THE OVERLAY LOOK
//     <div className="flex flex-1 bg-white rounded-3xl shadow-lg border border-[#D9EAF3] overflow-hidden">
      
//       {/* Center: Item Grid & Filtering (As seen in the image) */}
//       <MenuGrid 
//         activeCategory={activeCategory}
//         setActiveCategory={setActiveCategory}
//         addToCart={addToCart}
//       />

//       {/* Right: Bill Sidebar (As seen in the image) */}
//       <BillSidebar 
//         cart={cart}
//         updateQuantity={updateQuantity}
//       />
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useAuth } from "@omowunmi/auth-sdk";
// import { MENU_ITEMS, CATEGORIES } from "./data";
// import MenuGrid from "./ui/MenuGrid";
// import BillSidebar from "./ui/BillSidebar";

// export default function POSPage() {
//   const [cart, setCart] = useState<any[]>([]);
//   const [activeCategory, setActiveCategory] = useState("All");

//   const addToCart = (item: any) => {
//     setCart((prev) => {
//       const exists = prev.find((i) => i.id === item.id);
//       if (exists) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   const updateQuantity = (id: number, delta: number) => {
//     setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
//   };

//   return (
//     <div className="flex flex-1 bg-white rounded-3xl shadow-lg border border-[#D9EAF3] overflow-hidden m-4">
//       {/* Center: The Grid of Food Items */}
//       <MenuGrid 
//         activeCategory={activeCategory} 
//         setActiveCategory={setActiveCategory} 
//         addToCart={addToCart} 
//       />

//       {/* Right: The Billing Section */}
//       <BillSidebar cart={cart} updateQuantity={updateQuantity} />
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import MenuGrid from "./ui/MenuGrid";
import BillSidebar from "./ui/BillSidebar";
import { useAuth } from "../auth-sdk/auth-sdk-package";

interface POSPageProps {
  searchTerm?: string;
}

export default function POSPage({ searchTerm = "" }: POSPageProps) {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const addToCart = (item: any) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  return (
    <div className="flex flex-1 bg-white rounded-3xl shadow-lg border border-[#D9EAF3] overflow-hidden">
      {/* Center: The Grid of Food Items with search filtering */}
      <MenuGrid 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        addToCart={addToCart} 
        searchTerm={searchTerm}
      />

      {/* Right: The Billing Section */}
      <BillSidebar cart={cart} updateQuantity={updateQuantity} />
    </div>
  );
}