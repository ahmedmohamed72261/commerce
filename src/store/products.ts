"use client";

import { create } from "zustand";
import { http } from "@/config/http";

export type Product = {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  rating?: number;
  category?: string;
};

type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type ProductsState = {
  items: Product[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  currentCategory: string | null;
  fetch: (input?: { category?: string; page?: number; pageSize?: number }) => Promise<void>;
  setPage: (page: number) => Promise<void>;
};

function normalizeProductsResponse(raw: unknown): { items: Product[]; total?: number } {
  if (Array.isArray(raw)) return { items: raw as Product[] };
  if (raw && typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    const data = o["data"];
    if (Array.isArray(data)) {
      const total = (o["total"] as number | undefined) ?? (o["meta"] as { total?: number } | undefined)?.total ?? (o["pagination"] as { total?: number } | undefined)?.total;
      return { items: data as Product[], total };
    }
    const results = o["results"];
    if (Array.isArray(results)) {
      const total = (o["count"] as number | undefined) ?? (o["total"] as number | undefined);
      return { items: results as Product[], total };
    }
  }
  return { items: [] };
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  pagination: { page: 1, pageSize: 9, total: 0, totalPages: 0 },
  currentCategory: null,

  async fetch(input) {
    const prev = get().pagination;
    const page = input?.page ?? prev.page;
    const pageSize = input?.pageSize ?? prev.pageSize;
    const category = input?.category ?? get().currentCategory ?? undefined;
    set({ loading: true, error: null });
    try {
      const res = await http.get("/products", {
        params: { page, limit: pageSize, category },
      });
      const { items, total } = normalizeProductsResponse(res.data);
      const t = typeof total === "number" ? total : items.length;
      set({
        items,
        loading: false,
        pagination: { page, pageSize, total: t, totalPages: Math.max(1, Math.ceil(t / pageSize)) },
        currentCategory: category ?? null,
      });
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      const msg = err.response?.data?.message || err.message || "Failed to load products";
      set({ error: msg, loading: false });
    }
  },

  async setPage(page) {
    const { pageSize, total } = get().pagination;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const next = Math.min(Math.max(1, page), totalPages);
    await get().fetch({ page: next });
  },
}));
