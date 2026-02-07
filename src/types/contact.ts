export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  purpose: string;
  status: string;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactDto {
  name: string;
  email: string;
  phone: string;
  purpose: string;
}

export interface ContactResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: Contact[];
}
