"use client";

import { create } from "zustand";
import { addToWishlist, removeFromWishlist, getWishlist } from "@/services/wishlist.service";
import { toast } from "sonner";

export type WishlistItem = {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  salePrice?: number;
};

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  fetchWishlist: () => Promise<void>;
  addItem: (item: WishlistItem) => Promise<void>;
  removeItem: (id: string | number) => Promise<void>;
  isInWishlist: (id: string | number) => boolean;
  totalItems: () => number;
}

export const useWishlist = create<WishlistState>((set, get) => ({
  items: [],
  loading: false,

  fetchWishlist: async () => {
    set({ loading: true });
    try {
      const res = await getWishlist();
      const payload = res.data as unknown;
      const data =
        typeof payload === "object" && payload !== null && "data" in payload
          ? (payload as { data?: unknown }).data
          : payload;

      const list = Array.isArray(data) ? data : [];

      const isRecord = (v: unknown): v is Record<string, unknown> =>
        typeof v === "object" && v !== null;

      const pickString = (v: unknown): string | undefined =>
        typeof v === "string" ? v : undefined;

      const mappedItems: WishlistItem[] = list
        .map((p): WishlistItem | null => {
          if (typeof p !== "object" || p === null) return null;
          const product = p as Record<string, unknown>;

          const name = product["name"];
          let title: string = "";
          if (typeof name === "string") {
            title = name;
          } else if (isRecord(name)) {
            title = pickString(name["en"]) ?? pickString(name["ar"]) ?? "";
          } else if (typeof product["title"] === "string") {
            title = product["title"] as string;
          }

          const images = product["images"];
          const image =
            typeof product["image"] === "string"
              ? (product["image"] as string)
              : Array.isArray(images) && typeof images[0] === "string"
                ? (images[0] as string)
                : undefined;

          const id = String(product["_id"] ?? product["id"] ?? "");
          if (!id) return null;

          return {
            id,
            title,
            price: typeof product["price"] === "number" ? (product["price"] as number) : 0,
            image,
            salePrice: typeof product["salePrice"] === "number" ? (product["salePrice"] as number) : undefined,
          };
        })
        .filter((x): x is WishlistItem => x !== null);

      set({ items: mappedItems, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  addItem: async (item) => {
    const { items } = get();
    if (items.some((i) => String(i.id) === String(item.id))) return;

    set({ items: [...items, item] });
    
    try {
      await addToWishlist(String(item.id));
      toast.success("Added to wishlist");
    } catch {
      set({ items });
      toast.error("Failed to add to wishlist");
    }
  },

  removeItem: async (id) => {
    const { items } = get();
    const originalItems = [...items];
    
    set({ items: items.filter((i) => String(i.id) !== String(id)) });

    try {
      await removeFromWishlist(String(id));
      toast.success("Removed from wishlist");
    } catch {
      set({ items: originalItems });
      toast.error("Failed to remove from wishlist");
    }
  },

  isInWishlist: (id) => {
    return get().items.some((i) => String(i.id) === String(id));
  },

  totalItems: () => {
    return get().items.length;
  },
}));
