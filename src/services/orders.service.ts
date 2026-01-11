import {http} from './http';

export const getOrders = async () => {
  const response = await http.get('/orders/admin/all');
  return response.data;
};

export const createOrder = async (orderData: any) => {
  const response = await http.post('/orders/', orderData);
  return response.data;
};
