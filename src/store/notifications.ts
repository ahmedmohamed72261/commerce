"use client";

import { create } from "zustand";

export type ToastVariant = "success" | "error" | "info";

export type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastState = {
  toasts: ToastItem[];
  add: (t: Omit<ToastItem, "id">) => void;
  remove: (id: number) => void;
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  add(t) {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    set({ toasts: [...get().toasts, { id, ...t }] });
    setTimeout(() => {
      get().remove(id);
    }, 3500);
  },
  remove(id) {
    set({ toasts: get().toasts.filter((x) => x.id !== id) });
  },
}));

export function addToast(input: { message: string; variant?: ToastVariant }) {
  const { add } = useToastStore.getState();
  add({ message: input.message, variant: input.variant ?? "info" });
}
