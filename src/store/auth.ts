"use client";

import { create } from "zustand";
import { http } from "@/services/http";
import type { AxiosError } from "axios";
import type {
  User,
  RegisterArgs,
  LoginArgs,
  ForgotPasswordArgs,
  ResetPasswordArgs,
  RegisterResponse,
  LoginResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from "@/types/auth";
import type { ErrorPayload } from "@/types/common/api";
import { addToast } from "@/store/notifications";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  message: string | null;
  register: (payload: RegisterArgs) => Promise<RegisterResponse>;
  login: (payload: LoginArgs) => Promise<LoginResponse>;
  forgotPassword: (payload: ForgotPasswordArgs) => Promise<ForgotPasswordResponse>;
  resetPassword: (payload: ResetPasswordArgs) => Promise<ResetPasswordResponse>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  message: null,

  async register(payload: RegisterArgs) {
    set({ loading: true, message: null });
    try {
      const res = await http.post("/auth/register", payload);
      const data = res.data as RegisterResponse;
      if (data.success && data.data?.token) {
        localStorage.setItem("auth_token", data.data.token);
        try {
          localStorage.setItem("auth_user", JSON.stringify(data.data.user));
        } catch {}
        set({ user: data.data.user, token: data.data.token });
        addToast({ variant: "success", message: data.message || "Registered successfully" });
      } else {
        addToast({ variant: "error", message: data.message || "Registration failed" });
      }
      set({ loading: false, message: data.message || null });
      return data;
    } catch (e: unknown) {
      const err = e as AxiosError<ErrorPayload>;
      const msg = err.response?.data?.message || err.message || "Network error";
      set({ loading: false, message: msg });
      addToast({ variant: "error", message: msg });
      return { success: false, message: msg };
    }
  },

  async login(payload: LoginArgs) {
    set({ loading: true, message: null });
    try {
      const res = await http.post("/auth/login", payload);
      const data = res.data as LoginResponse;
      if (data.success && data.data?.token) {
        localStorage.setItem("auth_token", data.data.token);
        try {
          localStorage.setItem("auth_user", JSON.stringify(data.data.user));
        } catch {}
        set({ user: data.data.user, token: data.data.token });
        addToast({ variant: "success", message: data.message || "Login successful" });
      } else {
        addToast({ variant: "error", message: data.message || "Login failed" });
      }
      set({ loading: false, message: data.message || null });
      return data;
    } catch (e: unknown) {
      const err = e as AxiosError<ErrorPayload>;
      const msg = err.response?.data?.message || err.message || "Network error";
      set({ loading: false, message: msg });
      addToast({ variant: "error", message: msg });
      return { success: false, message: msg };
    }
  },

  async forgotPassword(payload: ForgotPasswordArgs) {
    set({ loading: true, message: null });
    try {
      const res = await http.post("/auth/forgot-password", payload);
      const data = res.data as ForgotPasswordResponse;
      set({ loading: false, message: data.message || null });
      addToast({ variant: data.success ? "success" : "error", message: data.message || (data.success ? "Code sent" : "Request failed") });
      return data;
    } catch (e: unknown) {
      const err = e as AxiosError<ErrorPayload>;
      const msg = err.response?.data?.message || err.message || "Network error";
      set({ loading: false, message: msg });
      addToast({ variant: "error", message: msg });
      return { success: false, message: msg };
    }
  },

  async resetPassword(payload: ResetPasswordArgs) {
    set({ loading: true, message: null });
    try {
      const res = await http.post("/auth/reset-password", payload);
      const data = res.data as ResetPasswordResponse;
      set({ loading: false, message: data.message || null });
      addToast({ variant: data.success ? "success" : "error", message: data.message || (data.success ? "Password updated" : "Reset failed") });
      return data;
    } catch (e: unknown) {
      const err = e as AxiosError<ErrorPayload>;
      const msg = err.response?.data?.message || err.message || "Network error";
      set({ loading: false, message: msg });
      addToast({ variant: "error", message: msg });
      return { success: false, message: msg };
    }
  },

  logout() {
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    } catch {}
    set({ user: null, token: null, message: null });
  },
}));

// Hydrate auth state on client mount
try {
  if (typeof window !== "undefined") {
    const existingToken = localStorage.getItem("auth_token");
    if (existingToken) {
      useAuthStore.setState({ token: existingToken });
      // Optimistically hydrate user from localStorage if available
      try {
        const storedUser = localStorage.getItem("auth_user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser) as User;
          useAuthStore.setState({ user: parsed });
        }
      } catch {}
      http
        .get("/auth/me")
        .then((res) => {
          const data = res.data as { success: boolean; data?: { user: User }; message?: string };
          if (data?.success && data?.data?.user) {
            useAuthStore.setState({ user: data.data.user });
            try {
              localStorage.setItem("auth_user", JSON.stringify(data.data.user));
            } catch {}
          }
        })
        .catch((err) => {
          // If token invalid, clear it
          const status = (err?.response?.status as number | undefined) ?? undefined;
          if (status === 401 || status === 403) {
            try {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("auth_user");
            } catch {}
            useAuthStore.setState({ token: null, user: null });
          }
        });
    }
  }
} catch {}
