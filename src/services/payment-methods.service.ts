import { http } from "./http";

export const getAllPaymentMethods = async () => {
  const res = await http.get("/payment-methods");
  return res.data?.data ?? res.data;
};

export const createPaymentMethod = async (formData: FormData) => {
  const res = await http.post("/payment-methods/admin/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data?.data ?? res.data;
};

export const togglePaymentMethod = async (id: string, isActive: boolean) => {
  const res = await http.put(`/payment-methods/${id}`, { isActive });
  return res.data?.data ?? res.data;
};
