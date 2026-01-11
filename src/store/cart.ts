"use client";

import { create } from "zustand";
import { http } from "@/services/http";

export type CartItemProduct = {
  _id: string;
  name: string | { en: string; ar: string };
  description?: string | { en: string; ar: string };
  price: number;
  salePrice?: number;
  images?: string[];
  stock: number;
  isActive: boolean;
};

export type CartItem = {
  _id: string;
  product: CartItemProduct;
  quantity: number;
  price: number;
  attributes?: Record<string, any>;
};

export type Cart = {
  _id: string;
  user: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
};

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  getCart: (locale?: "en" | "ar") => Promise<Cart | null>;
  addToCart: (productId: string, quantity: number, attributes?: Record<string, any>) => Promise<boolean>;
  updateCartItem: (itemId: string, quantity: number) => Promise<boolean>;
  removeFromCart: (itemId: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  async getCart(locale = "en") {
    set({ loading: true, error: null });
    try {
      const res = await http.get("/cart", {
        headers: {
          "Accept-Language": locale,
        },
      });
      const data = res.data?.data || res.data;
      set({ cart: data, loading: false });
      return data;
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to load cart";
      set({ error: msg, loading: false, cart: null });
      return null;
    }
  },

  async addToCart(productId: string, quantity: number, attributes = {}) {
    set({ loading: true, error: null });
    try {
      await http.post("/cart", {
        product: productId,
        quantity,
        attributes,
      });
      // Refresh cart after adding
      await get().getCart();
      set({ loading: false });
      return true;
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to add to cart";
      set({ error: msg, loading: false });
      return false;
    }
  },

  async updateCartItem(itemId: string, quantity: number) {
    set({ loading: true, error: null });
    try {
      await http.put(`/cart/${itemId}`, {
        quantity,
      });
      // Refresh cart after updating
      await get().getCart();
      set({ loading: false });
      return true;
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to update cart item";
      set({ error: msg, loading: false });
      return false;
    }
  },

  async removeFromCart(itemId: string) {
    set({ loading: true, error: null });
    try {
      await http.delete(`/cart/${itemId}`);
      // Refresh cart after removing
      await get().getCart();
      set({ loading: false });
      return true;
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to remove from cart";
      set({ error: msg, loading: false });
      return false;
    }
  },

  async clearCart() {
    set({ loading: true, error: null });
    try {
      await http.delete("/cart");
      set({ cart: null, loading: false });
      return true;
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to clear cart";
      set({ error: msg, loading: false });
      return false;
    }
  },

  totalItems: () => {
    const cart = get().cart;
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },

  totalPrice: () => {
    const cart = get().cart;
    if (!cart) return 0;
    return cart.totalAmount;
  },
}));
