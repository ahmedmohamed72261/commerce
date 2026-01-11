"use client";

import { create } from "zustand";
import { http } from "@/services/http";

export type OrderItem = {
  product: string;
  quantity: number;
  attributesSelected?: Record<string, any>;
};

export type ShippingAddress = {
  city: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  additionalInfo?: string;
};

export type Order = {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "cash" | "card" | "online";
  shippingAddress: ShippingAddress;
  notes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  createOrder: (
    items: OrderItem[],
    paymentMethod: "cash" | "card" | "online",
    shippingAddress: ShippingAddress,
    notes?: string
  ) => Promise<Order | null>;
  getOrders: () => Promise<Order[]>;
  getOrderById: (orderId: string) => Promise<Order | null>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  async createOrder(items, paymentMethod, shippingAddress, notes) {
    set({ loading: true, error: null });
    try {
      const res = await http.post("/orders", {
        items,
        paymentMethod,
        shippingAddress,
        notes,
      });
      const data = res.data?.data || res.data;
      set({ currentOrder: data, loading: false });
      return data;
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to create order";
      set({ error: msg, loading: false });
      return null;
    }
  },

  async getOrders() {
    set({ loading: true, error: null });
    try {
      const res = await http.get("/orders");
      const raw = res.data;
      const data = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
      set({ orders: data, loading: false });
      return data;
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to load orders";
      set({ error: msg, loading: false });
      return [];
    }
  },

  async getOrderById(orderId: string) {
    set({ loading: true, error: null });
    try {
      const res = await http.get(`/orders/${orderId}`);
      const data = res.data?.data || res.data;
      set({ currentOrder: data, loading: false });
      return data;
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to load order";
      set({ error: msg, loading: false });
      return null;
    }
  },
}));
