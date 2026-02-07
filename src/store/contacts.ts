import { create } from "zustand";
import { contactService } from "@/services/contacts.service";
import { Contact, CreateContactDto } from "@/types/contact";

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pages: number;
    total: number;
  };

  createContact: (data: CreateContactDto) => Promise<boolean>;
  fetchContacts: (page?: number, limit?: number) => Promise<void>;
  deleteContact: (id: string) => Promise<boolean>;
}

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
  },

  createContact: async (data) => {
    set({ loading: true, error: null });
    try {
      await contactService.createContact(data);
      set({ loading: false });
      return true;
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to submit contact form" 
      });
      return false;
    }
  },

  fetchContacts: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const res = await contactService.getAllContacts(page, limit);
      const data = res.data;
      set({
        contacts: data.data,
        pagination: {
          page: data.page,
          pages: data.pages,
          total: data.total,
        },
        loading: false,
      });
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to fetch contacts" 
      });
    }
  },

  deleteContact: async (id) => {
    set({ loading: true, error: null });
    try {
      await contactService.deleteContact(id);
      // Refresh list
      const { page } = get().pagination;
      await get().fetchContacts(page);
      set({ loading: false });
      return true;
    } catch (error: any) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to delete contact" 
      });
      return false;
    }
  },
}));
