import * as React from "react";
import { cn } from "@/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  locale?: "en" | "ar";
  appearance?: "glass" | "white";
  options?: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, containerClassName, locale = "en", appearance = "white", options = [], children, ...props }, ref) => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    return (
      <div className={cn("relative", containerClassName)}>
        {label && (
          <label className={cn("block text-xs font-bold mb-1", "text-gray-500 dark:text-gray-400", locale === "ar" ? "text-right" : "text-left")}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          dir={dir}
          className={cn(
            "w-full h-11 rounded-2xl px-4 text-sm outline-none transition",
            appearance === "white"
              ? "bg-white dark:bg-card border border-slate-200 dark:border-border"
              : "bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/5",
            "focus:ring-2 focus:ring-red-500/30",
            className,
            locale === "ar" ? "text-right" : "text-left"
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option key={`${opt.value}`} value={opt.value} className="rounded-md px-2 py-1">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && (
          <span className="mt-1 block text-[10px] text-red-500 font-bold uppercase tracking-wider">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
