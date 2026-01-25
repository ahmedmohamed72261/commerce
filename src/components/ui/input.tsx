"use client";

import * as React from "react";
import { cn } from "@/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  locale?: "en" | "ar";
  appearance?: "glass" | "white";
  showIcon?: boolean;
  icon?: React.ElementType;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      containerClassName,
      locale = "en",
      appearance = "glass",
      showIcon = true,
      icon,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(!!props.value);
    const [showPassword, setShowPassword] = React.useState(false);

    const inputType =
      type === "password" && showPassword ? "text" : type;

    const float = focused || hasValue;

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <div
          className={cn(
            "relative w-full rounded-xl border transition-colors duration-200",
            appearance === "glass"
              ? "bg-[--glass-bg] backdrop-blur-md"
              : "bg-[--color-card]",
            error
              ? "border-red-500"
              : focused
              ? "border-[--color-primary]"
              : "border-[--color-border]",
            "hover:border-[--color-primary]/40"
          )}
        >
          <div className="relative">
            <input
              ref={ref}
              type={inputType}
              dir={locale === "ar" ? "rtl" : "ltr"}
              placeholder=" "
              className={cn(
                "peer w-full h-12 bg-transparent text-sm outline-none",
                "text-[--color-foreground]",
                locale === "ar" ? "text-right" : "text-left",
                icon ? (locale === "ar" ? "pr-9 pl-4" : "pl-9 pr-4") : "px-4",
                className
              )}
              onFocus={(e) => {
                setFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                setHasValue(!!e.target.value);
                props.onBlur?.(e);
              }}
              onChange={(e) => {
                setHasValue(!!e.target.value);
                props.onChange?.(e);
              }}
              {...props}
            />

            {/* Floating Label */}
            {label && (
              <label
                className={cn(
                  "absolute pointer-events-none transition-all duration-200",
                  locale === "ar" ? "right-4" : "left-4",
                  float
                    ? "-top-1 text-[11px] font-semibold text-[--color-primary]"
                    : "top-1/2 -translate-y-1/2 text-sm text-[--color-muted-foreground]"
                )}
              >
                {label}
              </label>
            )}

            {/* Leading Icon */}
            {icon && (
              <span
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-[--color-muted-foreground]",
                  locale === "ar" ? "right-3" : "left-3"
                )}
              >
                {React.createElement(icon as React.ElementType, { size: 16 })}
              </span>
            )}

            {/* Password Toggle */}
            {type === "password" && showIcon && (
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-[--color-muted-foreground] hover:text-[--color-primary]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}

            {/* Underline */}
            <motion.span
              className="absolute bottom-0 left-0 h-[2px] bg-[--color-primary]"
              animate={{ width: focused ? "100%" : "0%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1 text-[11px] font-semibold text-red-500"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";
