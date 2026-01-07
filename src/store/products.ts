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
  salePrice?: number;
  stock?: number;
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
  preferred: Product | null;
  preferredLoading?: boolean;
  fetchPreferred: (locale?: "en" | "ar") => Promise<Product | null>;
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

function mapRawProduct(p: unknown, locale: "en" | "ar"): Product {
  const obj = p as Record<string, unknown>;
  const rawId = obj["_id"] ?? obj["id"];
  const id = String(typeof rawId === "string" || typeof rawId === "number" ? rawId : "");
  const title = pickLocaleString(obj?.name, locale) || String(obj?.title ?? "");
  const salePrice = typeof obj?.salePrice === "number" ? (obj.salePrice as number) : undefined;
  const basePrice = typeof obj?.price === "number" ? (obj.price as number) : undefined;
  const price = (salePrice ?? basePrice ?? 0);
  const image = Array.isArray(obj?.images) ? cleanImage((obj.images as unknown[])[0]) : cleanImage(obj?.image);
  const catObj = (obj?.category as { name?: unknown } | undefined);
  const category = pickLocaleString(catObj?.name, locale);
  const rating = typeof obj?.rating === "number" ? (obj.rating as number) : undefined;
  const stock = typeof obj?.stock === "number" ? (obj.stock as number) : undefined;
  return { id, title, price, image, rating, category, salePrice, stock };
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
  preferred: null,
  preferredLoading: false,

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

  async fetchPreferred(locale = "en") {
    try {
      set({ preferredLoading: true });
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      const res = await http.get("/products/preferred", {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Accept-Language": locale,
        },
      });
      const raw = res.data as unknown;
      const list: unknown[] =
        Array.isArray((raw as any)?.data) ? ((raw as any).data as unknown[]) :
        Array.isArray(raw) ? (raw as unknown[]) : [];
      const first = list[0];
      const mapped = first ? mapRawProduct(first, locale) : null;
      set({ preferred: mapped, preferredLoading: false });
      return mapped;
    } catch (e) {
      set({ preferredLoading: false });
      return null;
    }
  },
}));
