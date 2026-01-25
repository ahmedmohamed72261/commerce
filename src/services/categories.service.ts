import {http} from './http';

export const getCategories = async () => {
  const response = await http.get('/categories/');
  return response.data;
};

export const getAdminCategories = async () => {
  const response = await http.get('/categories/admin');
  return response.data;
};

export const getCategoryProducts = async (id: string) => {
  const response = await http.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (formData: FormData) => {
  const response = await http.post('/categories/admin/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateCategory = async (id: string, data: FormData | Record<string, unknown>) => {
  const isForm = typeof FormData !== 'undefined' && data instanceof FormData;
  const response = await http.put(`/categories/admin/${id}`, data, {
    headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await http.delete(`/categories/admin/${id}`);
  return response.data;
};
