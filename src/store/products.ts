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
  fetch: (input?: { category?: string; page?: number; pageSize?: number; locale?: "en" | "ar" }) => Promise<void>;
  setPage: (page: number) => Promise<void>;
};

function cleanImage(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  return url.replace(/[`]/g, "").trim() || undefined;
}

function pickLocaleString(input: unknown, locale: "en" | "ar"): string {
  if (typeof input === "string") return input;
  if (input && typeof input === "object") {
    const obj = input as Record<string, unknown>;
    const val = obj[locale];
    if (typeof val === "string" && val.trim()) return val;
    const fallback = obj["en"];
    if (typeof fallback === "string") return fallback;
  }
  return "";
}

function mapRawProduct(p: any, locale: "en" | "ar"): Product {
  const id = String(p?._id ?? p?.id ?? "");
  const title = pickLocaleString(p?.name, locale) || String(p?.title ?? "");
  const salePrice = typeof p?.salePrice === "number" ? p.salePrice : undefined;
  const basePrice = typeof p?.price === "number" ? p.price : undefined;
  const price = (salePrice ?? basePrice ?? 0);
  const image = Array.isArray(p?.images) ? cleanImage(p.images[0]) : cleanImage(p?.image);
  const category = pickLocaleString(p?.category?.name, locale);
  const rating = typeof p?.rating === "number" ? p.rating : undefined;
  return { id, title, price, image, rating, category };
}

function normalizeProductsResponse(raw: unknown, locale: "en" | "ar"): { items: Product[]; total?: number } {
  if (Array.isArray(raw)) return { items: (raw as any[]).map((p) => mapRawProduct(p, locale)) };
  if (raw && typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    const data = o["data"];
    if (Array.isArray(data)) {
      const total = (o["total"] as number | undefined) ?? (o["meta"] as { total?: number } | undefined)?.total ?? (o["pagination"] as { total?: number } | undefined)?.total;
      return { items: (data as any[]).map((p) => mapRawProduct(p, locale)), total };
    }
    const results = o["results"];
    if (Array.isArray(results)) {
      const total = (o["count"] as number | undefined) ?? (o["total"] as number | undefined);
      return { items: (results as any[]).map((p) => mapRawProduct(p, locale)), total };
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
    const locale = input?.locale ?? "en";
    set({ loading: true, error: null });
    try {
      const res = await http.get("/products", {
        params: { page, size: pageSize, category },
      });
      const { items, total } = normalizeProductsResponse(res.data, locale);
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
