"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/store/cart";
import { useIsRTL } from "@/utils/rtl";
import { cn } from "@/utils/utils";

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
  const total = (item.price * item.quantity).toFixed(2);

  return (
    <div
      className={cn(
        "relative bg-white border border-slate-200 rounded-2xl",
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
          "bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
        )}
      >
        <X size={16} />
      </button>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[96px_1fr_auto] gap-3 sm:gap-5 items-center">
        {/* IMAGE */}
        <div className="relative w-18 h-18 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100">
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
          <h3 className="font-black text-sm sm:text-base uppercase truncate">
            {name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 font-bold mt-1">
            ${item.price.toFixed(2)}
          </p>

          {/* MOBILE TOTAL */}
          <p className="sm:hidden mt-2 text-base font-black text-red-600">
            ${total}
          </p>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden sm:flex items-center gap-4">
          {/* QTY */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-1">
            <button
              onClick={() =>
                onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))
              }
              className="h-8 w-8 flex items-center justify-center hover:bg-white rounded-lg"
            >
              <Minus size={14} />
            </button>

            <span className="px-3 font-black text-sm">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                onUpdateQuantity(item._id, item.quantity + 1)
              }
              className="h-8 w-8 flex items-center justify-center hover:bg-white rounded-lg"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* PRICE */}
          <div className="min-w-[80px] text-right font-black text-lg">
            ${total}
          </div>
        </div>
      </div>

      {/* MOBILE QTY BAR */}
      <div className="sm:hidden mt-4">
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
          <button
            onClick={() =>
              onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))
            }
            className="h-9 w-9 rounded-lg bg-white flex items-center justify-center"
          >
            <Minus size={16} />
          </button>

          <span className="font-black text-base">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              onUpdateQuantity(item._id, item.quantity + 1)
            }
            className="h-9 w-9 rounded-lg bg-white flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
