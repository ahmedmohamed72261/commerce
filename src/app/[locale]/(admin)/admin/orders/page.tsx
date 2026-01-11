"use client";
import React, { useEffect, useState } from 'react';
import { WhiteCard } from '@/components/admin/ui/cards';
import { getOrders } from '@/services/orders.service';
import { Search, Filter, Eye } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getOrders();
        // API response structure based on code.txt: { success: true, count: 5, data: [...] }
        setOrders(response.data || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
       </div>

       <WhiteCard noPadding headerAction={
         <div className="flex gap-2">
           <div className="relative">
             <input type="text" placeholder="Search orders..." className="pl-8 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 w-64" />
             <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
           </div>
           <button className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50"><Filter size={16} /></button>
         </div>
       }>
         <table className="w-full text-left text-sm text-gray-600">
           <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
             <tr>
               <th className="px-5 py-3 w-10"><input type="checkbox" /></th>
               <th className="px-5 py-3">Order ID</th>
               <th className="px-5 py-3">Date</th>
               <th className="px-5 py-3">Customer</th>
               <th className="px-5 py-3">Payment Status</th>
               <th className="px-5 py-3">Total</th>
               <th className="px-5 py-3 text-right">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
             {loading ? (
               <tr><td colSpan={7} className="px-5 py-10 text-center">Loading orders...</td></tr>
             ) : orders.length === 0 ? (
               <tr><td colSpan={7} className="px-5 py-10 text-center">No orders found.</td></tr>
             ) : (
               orders.map((order: any) => (
                 <tr key={order.orderId || order._id} className="hover:bg-gray-50/50 transition-colors">
                   <td className="px-5 py-3"><input type="checkbox" /></td>
                   <td className="px-5 py-3 font-medium text-gray-800">#{order.orderId?.substring(0, 8) || order._id?.substring(0, 8)}</td>
                   <td className="px-5 py-3 text-xs text-gray-500">
                     {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                   </td>
                   <td className="px-5 py-3">
                     <div className="font-medium text-gray-800">{order.customer?.name}</div>
                     <div className="text-[10px] text-gray-400">{order.customer?.email}</div>
                   </td>
                   <td className="px-5 py-3">
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                       order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                       order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                       'bg-gray-100 text-gray-700'
                     }`}>
                       {order.status}
                     </span>
                   </td>
                   <td className="px-5 py-3 font-bold text-gray-800">${order.totalAmount}</td>
                   <td className="px-5 py-3 text-right">
                     <button className="text-gray-400 hover:text-blue-600 transition-colors"><Eye size={18} /></button>
                   </td>
                 </tr>
               ))
             )}
           </tbody>
         </table>
       </WhiteCard>
    </div>
  );
}
