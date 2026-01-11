export interface Product {
  _id: string;
  id?: string;
  name: { en: string; ar?: string } | string;
  description: { en: string; ar?: string } | string;
  price: number;
  salePrice?: number;
  brand: string | any;
  category: string | any;
  stock: number;
  condition: 'new' | 'used' | 'refurbished';
  images: string[];
  isFeatured: boolean;
  attributes?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDTO {
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  salePrice?: number;
  brand: string;
  category: string;
  stock: number;
  condition: string;
  isFeatured: boolean;
  attributes?: Record<string, any>;
  images: File[];
}
