import { http } from "./http";

export const getProfile = () => {
  return http.get("/users/profile");
};

export type AddressPayload = {
  city: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  additionalInfo?: string;
  isDefault?: boolean;
};

export type UpdatePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export const addAddress = (data: AddressPayload) => {
  return http.post("/users/addresses", data);
};

export const updateAddress = (id: string, data: AddressPayload) => {
  return http.put(`/users/addresses/${id}`, data);
};

export const updatePassword = (data: UpdatePasswordPayload) => {
  return http.put("/users/update-password", data);
};
