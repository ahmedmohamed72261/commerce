import { http } from "./http";

export const updateOrderStatus = async (orderId: string, status: string) => {
  const res = await http.patch(`/orders/${orderId}`, { status });
  return res.data?.data ?? res.data;
};

export const bulkUpdateOrdersStatus = async (status: string) => {
  const res = await http.patch(`/orders/admin/all`, { status });
  return res.data?.data ?? res.data;
};
