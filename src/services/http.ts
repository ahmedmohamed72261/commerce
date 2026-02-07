"use client";

import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://dev-world-ecommerce.vercel.app/api/v1";

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
    const guestId =
      typeof window !== "undefined" ? window.sessionStorage?.getItem("guest_id") : null;
    if (guestId) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>)["X-Guest-Id"] = guestId;
    }
    const lang =
      (typeof document !== "undefined" && document.documentElement.lang) ||
      (typeof window !== "undefined" && (window.location.pathname.split("/")[1] || "")) ||
      "en";
    config.headers = config.headers || {};
    (config.headers as Record<string, string>)["Accept-Language"] = lang === "ar" ? "ar" : "en";
  } catch {}
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

try {
  if (typeof window !== "undefined" && !(window as any).__guestCleanupInstalled) {
    (window as any).__guestCleanupInstalled = true;
    window.addEventListener("beforeunload", () => {
      try {
        window.sessionStorage?.removeItem("guest_id");
      } catch {}
    });
  }
} catch {}
