import { http } from "@/services/http";
import { Contact, CreateContactDto, ContactResponse } from "@/types/contact";

export const contactService = {
  // Public
  createContact: async (data: CreateContactDto) => {
    return await http.post("/contacts", data);
  },

  // Admin
  getAllContacts: async (page = 1, limit = 10) => {
    return await http.get(`/contacts/admin/all?page=${page}&limit=${limit}`);
  },

  getContactById: async (id: string) => {
    return await http.get(`/contacts/admin/${id}`);
  },

  deleteContact: async (id: string) => {
    return await http.delete(`/contacts/admin/${id}`);
  },
};
