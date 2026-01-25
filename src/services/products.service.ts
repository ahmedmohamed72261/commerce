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
  const response = await http.post('/products/admin/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (id: string, data: FormData | Record<string, unknown>) => {
  const isForm = typeof FormData !== 'undefined' && data instanceof FormData;
  const response = await http.put(`/products/admin/${id}`, data, {
    headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await http.delete(`/products/admin/${id}`);
  return response.data;
};

export const getAdminProducts = async () => {
  const response = await http.get('/products/admin');
  return response.data;
};

export const getAdminProduct = async (id: string) => {
  const response = await http.get(`/products/admin/${id}`);
  return response.data;
};

export const getFilters = (categoryId?: string) => {
  const url = categoryId ? `/products/filters?category=${categoryId}` : '/products/filters';
  return http.get(url);
};

export const getFilteredProducts = (params: Record<string, string | number | boolean | undefined>) => {
  return http.get('/products', { params });
};

export const suggestProducts = async (query: string) => {
  const response = await http.get(`/products/suggest?q=${encodeURIComponent(query)}`);
  return response.data;
};

export const getTrendingProducts = async () => {
  const response = await http.get('/products/trending');
  return response.data;
};

export const rateProduct = async (productId: string, ratingvalue: number) => {
  const response = await http.post(`/products/${productId}/rating`, { ratingvalue });
  return response.data;
};

export const setTrendingProduct = async (productId: string, trending: boolean) => {
  const response = await http.post(`/products/admin/${productId}/trending`, { trending });
  return response.data;
};
