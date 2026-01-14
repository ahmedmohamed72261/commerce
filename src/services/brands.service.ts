"use client";
import { http } from "./http";

export const getBrands = async () => {
  const response = await http.get("/brands/");
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

