"use client";
import { useEffect, useState } from "react";
import { CreditCard, Banknote, Landmark, CheckCircle2 } from "lucide-react";

export default function PaymentPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("olamide_orders") || "[]");
    setOrders(savedOrders);
  }, []);

  return (
    <div className="p-4 md:p-8 bg-[#F8FBFE] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1B3B48] mb-8">Payment Transactions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#D9EAF3] flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-xl text-green-600"><Banknote /></div>
            <div><p className="text-xs text-gray-500">Cash</p><p className="font-bold">Managed</p></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#D9EAF3] flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><CreditCard /></div>
            <div><p className="text-xs text-gray-500">Card</p><p className="font-bold">Active</p></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#D9EAF3] flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600"><Landmark /></div>
            <div><p className="text-xs text-gray-500">Transfer</p><p className="font-bold">Verified</p></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#D9EAF3] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-[#D9EAF3]">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500">ORDER ID</th>
                <th className="p-4 text-xs font-bold text-gray-500">AMOUNT</th>
                <th className="p-4 text-xs font-bold text-gray-500">METHOD</th>
                <th className="p-4 text-xs font-bold text-gray-500">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.orderId} className="border-b border-[#D9EAF3] last:border-0">
                  <td className="p-4 text-sm font-medium">{order.orderId}</td>
                  <td className="p-4 text-sm font-black text-[#1B3B48]">₦{order.total.toLocaleString()}</td>
                  <td className="p-4 text-xs text-gray-500">Transfer Simulation</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-green-500 text-xs font-bold">
                      <CheckCircle2 size={14} /> Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}