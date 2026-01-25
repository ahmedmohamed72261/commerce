"use client";
import { http } from "./http";

export const getBrands = async () => {
  const response = await http.get("/brands/");
  return response.data;
};

export const getAllBrandsForAdmin = async () => {
  const response = await http.get("/brands/admin");
  return response.data;
};

export const createBrand = async (formData: FormData) => {
  const response = await http.post("/brands/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateBrand = async (id: string, data: FormData | Record<string, unknown>) => {
  const isForm = typeof FormData !== 'undefined' && data instanceof FormData;
  const response = await http.put(`/brands/${id}`, data, {
    headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
  return response.data;
};

export const deleteBrand = async (id: string) => {
  const response = await http.delete(`/brands/${id}`);
  return response.data;
};
