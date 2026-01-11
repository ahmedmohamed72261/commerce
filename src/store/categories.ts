"use client";

import { create } from "zustand";
import { http } from "@/services/http";

export type Category = {
  id: string | number;
  key?: string;
  name: string;
  image?: string;
  count?: number;
  tag?: string;
};

type CategoryProduct = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image?: string;
};

type CategoryWithProducts = {
  category: {
    id: string;
    name: string;
    image: string;
  };
  products: CategoryProduct[];
  count: number;
};

type CategoriesState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  categoryProducts: CategoryWithProducts | null;
  categoryProductsLoading: boolean;
  fetchCategories: (locale?: "en" | "ar") => Promise<void>;
  getCategoryProducts: (
    categoryId: string,
    locale?: "en" | "ar"
  ) => Promise<CategoryWithProducts | null>;
};

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  categoryProducts: null,
  categoryProductsLoading: false,
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
        name:
          typeof c?.name === "object"
            ? c.name[locale] ?? c.name["en"] ?? ""
            : String(c?.name ?? ""),
        image:
          typeof c?.image === "string"
            ? c.image.replace(/[`]/g, "").trim()
            : undefined,
        count: typeof c?.count === "number" ? c.count : undefined,
        tag: c?.tag ?? undefined,
      }));
      set({ categories: data, loading: false });
    } catch (e: unknown) {
      const err = e as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load categories";
      set({ error: msg, loading: false });
    }
  },
  async getCategoryProducts(categoryId: string, locale = "en") {
    set({ categoryProductsLoading: true, error: null });
    try {
      const res = await http.get(`/categories/${categoryId}`);
      const raw = res.data;
      const data = raw?.data || raw;
      
      const categoryData = {
        id: data?.category?.id || data?.category?._id || "",
        name: typeof data?.category?.name === "object" 
          ? (data.category.name[locale] ?? data.category.name["en"] ?? "") 
          : String(data?.category?.name ?? ""),
        image: data?.category?.image || "",
      };

      const products: CategoryProduct[] = (data?.products || []).map((p: any) => ({
        id: String(p?.id ?? p?._id ?? ""),
        name: typeof p?.name === "object" ? (p.name[locale] ?? p.name["en"] ?? "") : String(p?.name ?? ""),
        price: p?.price ?? 0,
        salePrice: p?.salePrice,
        image: typeof p?.image === "string" ? p.image.replace(/[`]/g, "").trim() : undefined,
      }));

      const result: CategoryWithProducts = {
        category: categoryData,
        products,
        count: data?.count ?? products.length,
      };

      set({ categoryProducts: result, categoryProductsLoading: false });
      return result;
    } catch (e: unknown) {
      const err = e as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load category products";
      set({ error: msg, categoryProductsLoading: false });
      return null;
    }
  },
}));

