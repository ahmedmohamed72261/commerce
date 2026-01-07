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
  fetchCategories: (locale?: "en" | "ar") => Promise<void>;
};

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  async fetchCategories(locale = "en") {
    set({ loading: true, error: null });
    try {
      const res = await http.get("/categories");
      const raw = res.data;
      const arr: any[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : [];
      const data: Category[] = arr.map((c: any) => ({
        id: String(c?._id ?? c?.id ?? ""),
        key: c?.key ?? c?.slug ?? undefined,
        name: typeof c?.name === "object" ? (c.name[locale] ?? c.name["en"] ?? "") : String(c?.name ?? ""),
        image: typeof c?.image === "string" ? c.image.replace(/[`]/g, "").trim() : undefined,
        count: typeof c?.count === "number" ? c.count : undefined,
        tag: c?.tag ?? undefined,
      }));
      set({ categories: data, loading: false });
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to load categories";
      set({ error: msg, loading: false });
    }
  },
}));
