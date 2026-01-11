import {http} from './http';

export const getProducts = async () => {
  const response = await http.get('/products/');
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await http.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (formData: FormData) => {
  const response = await http.post('/products/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
