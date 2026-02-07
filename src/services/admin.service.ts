import { http } from "./http";

export type AdminDTO = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export const createAdminAccount = async (data: AdminDTO) => {
  const res = await http.post("/admin", data);
  return res.data;
};

export const getAllAdminAccounts = async () => {
  const res = await http.get("/admin/");
  return res.data;
};

export const updateAdminAccount = async (id: string, data: Partial<AdminDTO & { isActive?: boolean; role?: string }>) => {
  const res = await http.put(`/admin/${id}`, data);
  return res.data;
};

export const deactivateAdminAccount = async (id: string) => {
  // Prefer explicit deactivate endpoint if server supports it; fallback to update isActive
  try {
    const res = await http.put(`/admin/${id}/deactivate`);
    return res.data;
  } catch {
    const res = await http.put(`/admin/${id}`, { isActive: false });
    return res.data;
  }
};

export const getDashboardStatistics = async () => {
  const res = await http.get("/admin/dashboard/statistics");
  return res.data;
};
