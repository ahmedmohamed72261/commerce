"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  salePrice?: number;
};

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
  totalItems: () => number;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get();
        const exists = items.find((i) => String(i.id) === String(item.id));
        
        if (!exists) {
          set({ items: [...items, item] });
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((i) => String(i.id) !== String(id)) });
      },
      
      isInWishlist: (id) => {
        return get().items.some((i) => String(i.id) === String(id));
      },
      
      totalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
