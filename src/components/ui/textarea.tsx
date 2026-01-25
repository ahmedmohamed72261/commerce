import * as React from "react";
import { cn } from "@/utils/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  locale?: "en" | "ar";
  appearance?: "glass" | "white";
  rows?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, containerClassName, locale = "en", appearance = "white", rows = 3, ...props }, ref) => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    return (
      <div className={cn("relative", containerClassName)}>
        {label && (
          <label className={cn("block text-xs font-bold mb-1", "text-gray-500 dark:text-gray-400", locale === "ar" ? "text-right" : "text-left")}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          dir={dir}
          rows={rows}
          className={cn(
            "w-full rounded-2xl px-4 py-3 text-sm outline-none resize-y transition",
            appearance === "white"
              ? "bg-white dark:bg-card border border-slate-200 dark:border-border"
              : "bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/5",
            "focus:ring-2 focus:ring-red-500/30",
            className,
            locale === "ar" ? "text-right" : "text-left"
          )}
          {...props}
        />
        {error && (
          <span className="mt-1 block text-[10px] text-red-500 font-bold uppercase tracking-wider">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
