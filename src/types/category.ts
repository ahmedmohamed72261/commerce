export interface Category {
  _id: string;
  id?: string;
  name: { en: string; ar?: string } | string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryDTO {
  name: { en: string; ar: string };
  image?: File;
}
