import {http} from './http';

export const getCategories = async () => {
  const response = await http.get('/categories/');
  return response.data;
};

export const getCategoryProducts = async (id: string) => {
  const response = await http.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (formData: FormData) => {
  const response = await http.post('/categories/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
