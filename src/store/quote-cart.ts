"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { Product } from "@/types/product";

export type QuoteItem = {
    product: Product;
    quantity: number;
};

interface QuoteCartState {
    items: QuoteItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
}

export const useQuoteCart = create<QuoteCartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1) => {
                const items = get().items;
                const existing = items.find((i) => i.product._id === product._id);
                if (existing) {
                    set({
                        items: items.map((i) =>
                            i.product._id === product._id
                                ? { ...i, quantity: i.quantity + quantity }
                                : i
                        ),
                    });
                    toast.success("Updated quantity in quote cart");
                } else {
                    set({ items: [...items, { product, quantity }] });
                    toast.success("Added to quote cart");
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((i) => i.product._id !== productId) });
                toast.success("Removed from quote cart");
            },
            updateQuantity: (productId, quantity) => {
                set({
                    items: get().items.map((i) =>
                        i.product._id === productId ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
        }),
        {
            name: "quote-cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
