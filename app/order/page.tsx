"use client";
import { useEffect, useState } from "react";
import { Calendar, Package, Receipt } from "lucide-react";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Pull the orders we saved in the POS handlePlaceOrder function
    const savedOrders = JSON.parse(localStorage.getItem("olamide_orders") || "[]");
    setOrders(savedOrders);
  }, []);

  return (
    <div className="p-4 md:p-8 bg-[#F8FBFE] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1B3B48] mb-8 flex items-center gap-3">
          <Receipt className="text-[#6297A1]" /> Order History
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl border border-[#D9EAF3] text-center text-gray-400">
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            <p>No orders found. Go to Home to make a sale!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.orderId} className="bg-white p-6 rounded-2xl border border-[#D9EAF3] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#6297A1] bg-[#6297A1]/10 px-2 py-1 rounded-md uppercase">
                      {order.orderId}
                    </span>
                    <h3 className="font-bold text-[#1B3B48] mt-2">
                      {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'} purchased
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <Calendar size={14} />
                      {new Date(order.timestamp).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="text-xl font-black text-[#1B3B48]">₦{order.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-gray-100 flex flex-wrap gap-2">
                  {order.items.map((item: any, idx: number) => (
                    <span key={idx} className="text-[11px] bg-gray-50 px-3 py-1 rounded-full text-gray-600 border border-gray-100">
                      {item.qty}x {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}