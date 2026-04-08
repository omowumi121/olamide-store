"use client";
import { useEffect, useState } from "react";

export default function InventoryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("olamide_inventory") || "[]");
    setItems(data);
  }, []);

  return (
    <div className="p-8 bg-white rounded-3xl shadow-lg border border-[#D9EAF3]">
      <h1 className="text-2xl font-bold text-[#1B3B48] mb-6">Store Inventory</h1>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#D9EAF3] text-gray-500">
            <th className="py-4">Product Name</th>
            <th className="py-4">Stock Level</th>
            <th className="py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id} className="border-b border-[#D9EAF3]">
              <td className="py-4 font-bold text-[#1B3B48]">{item.name}</td>
              <td className="py-4 text-[#6297A1] font-black">{item.stock}</td>
              <td className="py-4">
                <span className={`px-3 py-1 rounded-full text-xs ${item.stock > 10 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {item.stock > 10 ? "In Stock" : "Low Stock"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}