"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/store/notifications";

export function ToastRenderer() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);
  return (
    <div className="fixed top-6 right-6 z-[10000] flex flex-col gap-3 rtl:left-6 rtl:right-auto">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className={`glass-panel rounded-xl px-4 py-3 shadow-2xl border hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-all ${
              t.variant === "success"
                ? "border-green-400/30 bg-green-50/80 dark:bg-green-900/30 text-green-700 dark:text-green-200"
                : t.variant === "error"
                ? "border-red-400/30 bg-red-50/80 dark:bg-red-900/30 text-red-700 dark:text-red-200"
                : "border-white/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">{t.message}</span>
              <button
                onClick={() => remove(t.id)}
                className="ml-auto text-xs opacity-70 hover:opacity-100"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
