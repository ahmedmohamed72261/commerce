"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, Box, Users } from 'lucide-react';
import { StatCard, WhiteCard } from '@/components/admin/ui/cards';
import { getOrders } from '@/services/orders.service';

export default function AdminDashboard() {
  const [latestOrders, setLatestOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const response = await getOrders();
        // Take first 5 orders
        if (response.data && Array.isArray(response.data)) {
           setLatestOrders(response.data.slice(0, 5));
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchLatest();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Sales" value="$12,345" icon={DollarSign} color="bg-blue-600" />
        <StatCard label="Total Orders" value={latestOrders.length > 0 ? "156" : "0"} icon={ShoppingCart} color="bg-green-600" />
        <StatCard label="Total Products" value="89" icon={Box} color="bg-orange-500" />
        <StatCard label="Total Customers" value="2,340" icon={Users} color="bg-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WhiteCard title="Sales Report" className="h-96 flex items-center justify-center bg-gray-50">
            <div className="text-gray-400 text-sm">Chart Placeholder</div>
          </WhiteCard>
          
          <WhiteCard title="Latest Orders" noPadding>
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-5 py-3">Order ID</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {latestOrders.length === 0 ? (
                    <tr><td colSpan={4} className="px-5 py-4 text-center text-gray-400">No orders yet</td></tr>
                ) : (
                    latestOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3 font-medium">#{order.orderId?.substring(0, 8) || order._id?.substring(0, 8)}</td>
                        <td className="px-5 py-3">{order.customer?.name}</td>
                        <td className="px-5 py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 uppercase">{order.status}</span></td>
                        <td className="px-5 py-3 text-right font-medium">${order.totalAmount}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </WhiteCard>
        </div>

        <div className="space-y-8">
          <WhiteCard title="Latest Search Terms" noPadding>
             <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-5 py-3">Keyword</th>
                  <th className="px-5 py-3 text-right">Hits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                    {k: 'iPhone 15', c: 45}, 
                    {k: 'Samsung S24', c: 32},
                    {k: 'Headphones', c: 28},
                    {k: 'Laptop', c: 19}
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3">{item.k}</td>
                    <td className="px-5 py-3 text-right font-medium">{item.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </WhiteCard>
        </div>
      </div>
    </>
  );
}
