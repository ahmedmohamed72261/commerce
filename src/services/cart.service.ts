import {http} from './http';

export const addToCart = async (data: { product: string; quantity: number; attributes?: any }) => {
  const response = await http.post('/cart/', data);
  return response.data;
};

export const getCart = async () => {
  const response = await http.get('/cart/');
  return response.data;
};

export const removeFromCart = async (id: string) => {
  const response = await http.delete(`/cart/${id}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await http.delete('/cart/');
  return response.data;
};

export const updateCartItem = async (id: string, quantity: number) => {
  const response = await http.put(`/cart/${id}`, { quantity });
  return response.data;
};
