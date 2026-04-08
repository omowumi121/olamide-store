"use client";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import MenuGrid from "./ui/MenuGrid";
import BillSidebar from "./ui/BillSidebar";
import { MENU_ITEMS, Product } from "./data"; // Ensure Product interface is exported from data.ts

export default function POSPage({ searchTerm = "" }) {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 1. New State for Inventory
  const [inventory, setInventory] = useState<Product[]>([]);

  // 2. Initialize Inventory and persistent data on mount
  useEffect(() => {
    const savedInventory = localStorage.getItem("olamide_inventory");
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    } else {
      setInventory(MENU_ITEMS);
      localStorage.setItem("olamide_inventory", JSON.stringify(MENU_ITEMS));
    }
  }, []);

  const addToCart = (item: any) => {
    // Check if stock is available
    const productInInventory = inventory.find(p => p.id === item.id);
    if (!productInInventory || productInInventory.stock <= 0) {
      alert("Item is out of stock!");
      return;
    }

    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        // Prevent adding more than available stock
        if (exists.qty >= productInInventory.stock) {
          alert("Maximum stock reached!");
          return prev;
        }
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    const productInInventory = inventory.find(p => p.id === id);
    
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = i.qty + delta;
        
        // Stock check for increasing quantity
        if (delta > 0 && productInInventory && newQty > productInInventory.stock) {
          alert("Cannot exceed available stock!");
          return i;
        }

        return newQty > 0 ? { ...i, qty: newQty } : null;
      }
      return i;
    }).filter(Boolean) as any[]);
  };

  const clearCart = () => {
    if (cart.length > 0 && window.confirm("Are you sure you want to cancel this order?")) {
      setCart([]);
      setIsCartOpen(false);
    }
  };

  // 3. ADDED: Handle Payment and Order Completion
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    // Simulate Payment Confirmation
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = totalAmount * 0.10;
    const finalTotal = totalAmount + tax;

    if (window.confirm(`Confirm payment of ₦${finalTotal.toLocaleString()}?`)) {
      // Create Order Record
      const newOrder = {
        orderId: `ORD-${Date.now()}`,
        items: cart,
        total: finalTotal,
        timestamp: new Date().toISOString(),
      };

      // Update Order History in LocalStorage
      const existingOrders = JSON.parse(localStorage.getItem("olamide_orders") || "[]");
      localStorage.setItem("olamide_orders", JSON.stringify([newOrder, ...existingOrders]));

      // 4. Update Inventory Stock Levels
      const updatedInventory = inventory.map(product => {
        const soldItem = cart.find(c => c.id === product.id);
        if (soldItem) {
          return { ...product, stock: product.stock - soldItem.qty };
        }
        return product;
      });

      setInventory(updatedInventory);
      localStorage.setItem("olamide_inventory", JSON.stringify(updatedInventory));

      // Reset Cart and UI
      setCart([]);
      setIsCartOpen(false);
      alert("Order successfully placed and payment processed!");
    }
  };

  return (
    <div className="flex flex-1 bg-white rounded-3xl shadow-lg border border-[#D9EAF3] overflow-hidden relative">
      <MenuGrid 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        addToCart={addToCart} 
        searchTerm={searchTerm}
        // Pass the live inventory to the grid to show remaining stock
        inventory={inventory} 
      />

      <BillSidebar 
        cart={cart} 
        updateQuantity={updateQuantity} 
        clearCart={clearCart}
        handlePlaceOrder={handlePlaceOrder} // NEW PROP
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
      />

      {/* Mobile Floating Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 lg:hidden bg-[#1B3B48] text-white p-4 rounded-full shadow-2xl z-40"
      >
        <div className="relative">
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#6297A1] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.qty, 0)}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}