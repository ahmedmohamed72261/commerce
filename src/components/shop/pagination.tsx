"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export function Pagination({ page, totalPages, onPageChange, disabled }: Props) {
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

  return (
    <div className="flex items-center justify-center gap-3 mt-16">
      <button
        className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200 transition-all disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || page <= 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={cn(
            "h-10 w-10 rounded-full font-bold flex items-center justify-center transition-all",
            p === page
              ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-110"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200"
          )}
          onClick={() => onPageChange(p)}
          disabled={disabled}
        >
          {p}
        </button>
      ))}

      <button
        className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200 transition-all disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || page >= totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
