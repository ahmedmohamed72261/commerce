"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/store/cart";
import { useIsRTL } from "@/utils/rtl";
import { cn, formatCurrency } from "@/utils/utils";

interface CartItemProps {
  item: CartItemType;
  locale?: "en" | "ar";
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  locale = "en",
  onUpdateQuantity,
  onRemove,
}) => {
  const isRTL = useIsRTL();

  const name =
    typeof item.product.name === "object"
      ? item.product.name[locale] || item.product.name.en
      : item.product.name;

  const image = item.product.images?.[0];
  const [qty, setQty] = useState<number>(item.quantity);
  const total = item.price * qty;

  return (
    <div
      className={cn(
        "relative bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl",
        "p-3 sm:p-4",
        "hover:shadow-md transition-all"
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* REMOVE (TOP CORNER) */}
      <button
        onClick={() => onRemove(item._id)}
        className={cn(
          "absolute top-2 sm:top-3",
          isRTL ? "left-2 sm:left-3" : "right-2 sm:right-3",
          "h-8 w-8 rounded-full flex items-center justify-center",
          "bg-slate-50 dark:bg-muted hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 dark:text-muted-foreground hover:text-red-600 dark:hover:text-red-500 transition"
        )}
      >
        <Trash2 size={16} />
      </button>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[100px_2fr_120px_140px_100px] gap-3 sm:gap-6 items-center">
        {/* IMAGE */}
        <div className="relative w-18 h-18 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-muted">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* INFO */}
        <div className="min-w-0">
          <h3 className="font-black text-sm sm:text-base uppercase truncate dark:text-foreground" title={name}>
            {name}
          </h3>
          {/* Attributes could go here */}
          
          {/* MOBILE PRICE & TOTAL */}
          <div className="sm:hidden mt-1 space-y-1">
             <p className="text-xs text-slate-400 dark:text-muted-foreground font-bold">
              {formatCurrency(item.price, locale)}
            </p>
            <p className="text-base font-black text-red-600 dark:text-primary">
              {formatCurrency(total, locale)}
            </p>
          </div>
        </div>

        {/* DESKTOP PRICE */}
        <div className="hidden sm:block text-center">
          <p className="text-sm font-bold text-slate-500 dark:text-muted-foreground">
             {formatCurrency(item.price, locale)}
          </p>
        </div>

        {/* DESKTOP ACTIONS (QTY) */}
        <div className="hidden sm:flex justify-center">
          <div className="flex items-center bg-slate-50 dark:bg-muted border border-slate-200 dark:border-border rounded-xl px-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-8 w-8 flex items-center justify-center hover:bg-white dark:hover:bg-card rounded-lg transition-colors"
            >
              <Minus size={14} />
            </button>

            <span className="w-10 text-center font-black text-sm">
              {qty}
            </span>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-8 w-8 flex items-center justify-center hover:bg-white dark:hover:bg-card rounded-lg transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
           {/* Update Button if needed, or auto-update on effect */}
           {qty !== item.quantity && (
              <button 
                onClick={() => onUpdateQuantity(item._id, qty)}
                className="ml-2 text-xs font-bold text-blue-600 hover:underline"
              >
                Update
              </button>
           )}
        </div>

        {/* DESKTOP TOTAL */}
         <div className="hidden sm:block text-right">
            <p className="text-base font-black text-red-600 dark:text-primary">
              {formatCurrency(total, locale)}
            </p>
         </div>
      </div>
    </div>
  );
};
