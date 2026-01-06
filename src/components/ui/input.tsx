"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, User, Mail, Smartphone } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ElementType;
  error?: string;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon: Icon, error, containerClassName, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;
    
    // Auto-detect icon based on type/label if not provided
    const DetectedIcon = Icon || (type === "password" ? Lock : type === "email" ? Mail : type === "tel" ? Smartphone : User);

    return (
      <div className={cn("relative group", containerClassName)}>
        <motion.div
          animate={focused ? "focused" : "idle"}
          variants={{
            idle: { scale: 1 },
            focused: { scale: 1.02 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "relative flex items-center w-full rounded-2xl border transition-all duration-300 overflow-hidden",
            "bg-white/5 backdrop-blur-md shadow-lg", // Glassmorphic base
            "border-white/10 dark:border-white/5", // Subtle border
            focused ? "ring-2 ring-red-500/50 border-red-500/50 shadow-red-500/10" : "hover:border-white/30",
            error ? "border-red-500 ring-1 ring-red-500" : ""
          )}
        >
          {/* Icon Section */}
          <div className="pl-4 text-red-800 group-hover:text-red-800/70 transition-colors">
            <DetectedIcon size={20} />
          </div>

          {/* Input Field */}
          <div className="relative flex-1">
            <input
              ref={ref}
              type={inputType}
              className={cn(
                "w-full h-14 bg-transparent px-4 text-base text-foreground placeholder-transparent outline-none",
                "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                className
              )}
              placeholder={label} // Placeholder needed for floating label trick
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
                  "absolute left-4 pointer-events-none transition-all duration-200 ease-out origin-left rtl:origin-right",
                  (focused || hasValue || props.value) 
                    ? "-top-2.5 text-[10px] text-red-500 font-bold uppercase tracking-wider translate-y-2" 
                    : "top-1/2 -translate-y-1/2 text-muted-foreground/50"
                )}
              >
                {label}
              </label>
            )}
          </div>

          {/* Password Toggle */}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="pr-4 text-white/40 hover:text-white transition-colors outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {/* Active Indicator Line */}
          <div className={cn(
            "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-600 to-transparent transition-all duration-500",
            focused ? "w-full opacity-100" : "w-0 opacity-0"
          )} />
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-bold uppercase tracking-wider"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Input.displayName = "Input";
