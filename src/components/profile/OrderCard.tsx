"use client";

import React from "react";
import Image from "next/image";
import { Order } from "@/store/orders";

type OrderItemLite = {
  productId?: string;
  product?: string;
  name?: string;
  image?: string;
  quantity: number;
  price: number;
};

type OrderLite = {
  _id: string;
  orderId?: string;
  date?: string;
  createdAt?: string;
  status?: string;
  totalAmount: number;
  paymentMethod?: string;
  shipping?: { city?: string; street?: string };
  shippingAddress?: { city?: string; street?: string };
  items: OrderItemLite[];
};

// Type guard to check if order is OrderLite
function isOrderLite(order: OrderLite | Order): order is OrderLite {
  return "orderId" in order;
}

export function OrderCard({ order }: { order: OrderLite | Order }) {
  const id = isOrderLite(order) ? order.orderId || order._id : order._id;
  const createdAt = isOrderLite(order)
    ? order.date || order.createdAt
    : order.createdAt;

  // Normalize items to OrderItemLite[]
  const items: OrderItemLite[] = Array.isArray(order.items)
    ? order.items.map((it) => ({
        productId: (it as any).productId || (it as any)._id || undefined,
        product: (it as any).product || undefined,
        name: (it as any).name || "Product",
        image: (it as any).image || undefined,
        quantity: (it as any).quantity ?? 1,
        price: (it as any).price ?? 0,
      }))
    : [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50">
        <div>
          <p className="text-xs text-slate-400 font-bold">
            Order #{String(id).slice(-6)}
          </p>
          {createdAt && (
            <p className="text-[11px] text-slate-500">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="text-sm font-black">${order.totalAmount.toFixed(2)}</p>
          {order.status && (
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              {order.status}
            </span>
          )}
        </div>
      </div>

      {/* ITEMS */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 border border-slate-100 rounded-lg p-2"
          >
            <div className="w-14 h-14 bg-slate-100 rounded-lg overflow-hidden">
              {it.image && (
                <Image
                  src={it.image}
                  alt={it.name ?? "product"}
                  width={56}
                  height={56}
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{it.name}</p>
              <p className="text-[11px] text-slate-400">
                Qty {it.quantity} · ${it.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
