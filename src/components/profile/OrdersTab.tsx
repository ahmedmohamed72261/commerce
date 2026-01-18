"use client";
import React, { useEffect } from "react";
import { useOrdersStore } from "@/store/orders";
import { OrderCard } from "@/components/profile/OrderCard";

export const OrdersTab: React.FC = () => {
  const { orders, loading, getOrders } = useOrdersStore();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="p-6 md:p-10 space-y-6 animate-in fade-in">
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <span className="text-slate-400 font-bold text-sm">Loading orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-slate-600 font-bold text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};
