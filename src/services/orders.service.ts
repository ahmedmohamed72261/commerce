import {http} from './http';

export const getOrders = async () => {
  const response = await http.get('/orders/admin/all');
  return response.data;
};

export const createOrder = async (orderData: unknown) => {
  const response = await http.post('/orders/', orderData);
  return response.data;
};

export const getOrderDetails = async (orderId: string) => {
  const response = await http.get(`/orders/${orderId}`);
  return response.data;
};

export const cancelOrder = async (orderId: string) => {
  const response = await http.put(`/orders/${orderId}/cancel`, {});
  return response.data;
};


