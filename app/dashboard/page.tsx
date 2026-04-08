"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalRevenue: 0, orderCount: 0 });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("olamide_orders") || "[]");
    const total = orders.reduce((sum: number, order: any) => sum + order.total, 0);
    setStats({ totalRevenue: total, orderCount: orders.length });
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#1B3B48] text-white p-8 rounded-3xl shadow-xl">
        <p className="text-gray-300 text-sm">Total Revenue</p>
        <h2 className="text-4xl font-black mt-2">₦{stats.totalRevenue.toLocaleString()}</h2>
      </div>
      <div className="bg-white border border-[#D9EAF3] p-8 rounded-3xl shadow-lg">
        <p className="text-gray-500 text-sm">Total Orders Processed</p>
        <h2 className="text-4xl font-black text-[#6297A1] mt-2">{stats.orderCount}</h2>
      </div>
    </div>
  );
}