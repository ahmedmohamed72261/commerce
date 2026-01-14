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

export const getFilters = (categoryId?: string) => {
  const url = categoryId ? `/products/filters?category=${categoryId}` : '/products/filters';
  return http.get(url);
};

export const getFilteredProducts = (params: Record<string, string | number | boolean | undefined>) => {
  return http.get('/products', { params });
};
