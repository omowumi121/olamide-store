"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// 1. Defined the interface for your chart data
interface SalesData {
  name: string;
  revenue: number;
}

export default function ReportPage() {
  // 2. Updated the useState line to include the SalesData interface
  const [chartData, setChartData] = useState<SalesData[]>([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("olamide_orders") || "[]");
    
    // Group orders by date for the graph
    const grouped = orders.reduce((acc: any, order: any) => {
      const date = new Date(order.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + order.total;
      return acc;
    }, {});

    const formattedData: SalesData[] = Object.keys(grouped).map(date => ({
      name: date,
      revenue: grouped[date]
    })).reverse();

    setChartData(formattedData);
  }, []);

  return (
    <div className="p-4 md:p-8 bg-[#F8FBFE] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1B3B48] mb-8">Sales Reports</h1>
        
        <div className="bg-white p-6 rounded-3xl border border-[#D9EAF3] shadow-sm mb-8">
          <h2 className="font-bold text-[#1B3B48] mb-6 text-sm uppercase tracking-wider">Revenue Over Time</h2>
          <div className="h-[300px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{fill: '#F0F5F9'}}
                  />
                  <Bar dataKey="revenue" fill="#6297A1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 italic">
                No data available for reporting yet.
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1B3B48] p-8 rounded-3xl text-white">
            <p className="text-gray-400 text-xs font-bold uppercase">Average Order Value</p>
            <h3 className="text-3xl font-black mt-2">
                ₦{chartData.length > 0 ? (chartData.reduce((a, b) => a + b.revenue, 0) / chartData.length).toLocaleString() : 0}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}