import { http } from "./http";

export const getAllGovernorates = async () => {
  const res = await http.get("/governorates");
  return res.data?.data ?? res.data;
};

export const createGovernorate = async (payload: { nameEn: string; nameAr: string; address?: string; phone?: string }) => {
  const res = await http.post("/governorates/", {
    name: { en: payload.nameEn, ar: payload.nameAr },
    address: payload.address,
    phone: payload.phone,
  });
  return res.data?.data ?? res.data;
};

export const deleteGovernorate = async (id: string) => {
  const res = await http.delete(`/governorates/${id}`);
  return res.data?.data ?? res.data;
};
