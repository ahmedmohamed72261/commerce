"use client";

import { create } from "zustand";
import { http } from "@/config/http";

export type Brand = {
  _id: string;
  name: string;
  image?: string;
  isActive?: boolean;
};

type BrandsState = {
  brands: Brand[];
  loading: boolean;
  error: string | null;
  fetchBrands: () => Promise<void>;
};

function cleanImage(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  // Remove stray backticks and whitespace around the URL
  const sanitized = url.replace(/[`]/g, "").trim();
  return sanitized || undefined;
}

export const useBrandsStore = create<BrandsState>((set) => ({
  brands: [],
  loading: false,
  error: null,
  async fetchBrands() {
    set({ loading: true, error: null });
    try {
      const res = await http.get("/brands");
      const raw = res.data;
      const arr: unknown[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : [];
      const brands: Brand[] = arr.map((b: any) => ({
        _id: String(b?._id ?? b?.id ?? ""),
        name: String(b?.name ?? ""),
        image: cleanImage(b?.image),
        isActive: Boolean(b?.isActive),
      }));
      set({ brands, loading: false });
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to load brands";
      set({ error: msg, loading: false });
    }
  },
}));
