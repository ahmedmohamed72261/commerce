"use client";

import { create } from "zustand";
import { http } from "@/config/http";

export type Category = {
  id: string | number;
  key?: string;
  name: string;
  image?: string;
  count?: number;
  tag?: string;
};

type CategoriesState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
};

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  async fetchCategories() {
    set({ loading: true, error: null });
    try {
      const res = await http.get("/categories");
      const raw = res.data;
      const data: Category[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : [];
      set({ categories: data, loading: false });
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to load categories";
      set({ error: msg, loading: false });
    }
  },
}));
