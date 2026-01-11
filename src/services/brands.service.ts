import {http} from './http';

export const getBrands = async () => {
  const response = await http.get('/brands/');
  return response.data;
};
