import { http } from "./http";

export type Coupon = {
  _id: string;
  code: string;
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCouponDTO = {
  code: string;
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  expiresAt: string;
};

export type UpdateCouponDTO = Partial<CreateCouponDTO> & { isActive?: boolean };

export const getAllCoupons = async () => {
  const response = await http.get("/coupons/");
  return response.data;
};

export const createCoupon = async (data: CreateCouponDTO) => {
  const response = await http.post("/coupons/", data);
  return response.data;
};

export const updateCoupon = async (id: string, data: UpdateCouponDTO) => {
  const response = await http.put(`/coupons/${id}`, data);
  return response.data;
};

export const deleteCoupon = async (id: string) => {
  const response = await http.delete(`/coupons/${id}`);
  return response.data;
};
