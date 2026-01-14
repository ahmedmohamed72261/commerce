import { http } from "./http";

export const addToWishlist = (productId: string) => {
  return http.post(`/wishlist/${productId}`);
};

export const removeFromWishlist = (productId: string) => {
  return http.delete(`/wishlist/${productId}`);
};

export const getWishlist = () => {
  return http.get('/wishlist/');
};
