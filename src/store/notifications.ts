"use client";

import { showToast } from "nextjs-toast-notify";

export type ToastVariant = "success" | "error" | "info";

export function addToast(input: { message: string; variant?: ToastVariant }) {
  const variant = input.variant ?? "info";
  const options: Record<string, unknown> = {
    duration: 4000,
    position: "top-right",
    transition: "bounceIn",
    progress: true,
    sound: false,
    icon:
      variant === "success"
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>'
        : variant === "error"
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="M6 6 18 18"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  };

  if (variant === "success") {
    showToast.success(input.message, options);
  } else if (variant === "error") {
    showToast.error(input.message, options);
  } else {
    showToast.info(input.message, options);
  }
}
