import { http } from "@/services/http";

export const createQuotation = (data: { items: { product: string; quantity: number }[]; notes?: string }) => {
  return http.post("/quotations", data);
};

export const updateQuotation = (id: string, data: { items: { product: string; quantity: number }[]; notes?: string }) => {
  return http.put(`/quotations/${id}`, data);
};

export const getMyQuotations = (params?: any) => {
  return http.get("/quotations/my-quotations", { params });
};

export const getAllQuotationsForAdmin = (params?: any) => {
  return http.get("/quotations/admin/all", { params });
};

export const getQuotationById = (id: string) => {
  return http.get(`/quotations/${id}`);
};
