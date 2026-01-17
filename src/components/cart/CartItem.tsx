"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/store/cart";

interface CartItemProps {
  item: CartItemType;
  locale?: string;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  locale = "en",
  onUpdateQuantity,
  onRemove,
}) => {
  const productName =
    typeof item.product.name === "object"
      ? item.product.name[locale as "en" | "ar"] || item.product.name.en
      : item.product.name;

  const productImage = item.product.images?.[0] || "";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow">

      {/* Header (price + remove) */}
      <div className="flex items-center justify-between md:hidden mb-3">
        <p className="text-lg font-black text-slate-950">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item._id)}
          className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center px-2 gap-4 sm:gap-6">

        {/* Image */}
        <div className="relative w-full sm:w-24 h-40 sm:h-24 rounded-xl overflow-hidden bg-slate-50 shrink-0">
          {productImage && (
            <Image
              src={productImage}
              alt={productName}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="font-black text-base sm:text-lg tracking-tight uppercase mb-1">
            {productName}
          </h3>
          <p className="text-sm text-slate-400 font-bold">
            ${item.price.toFixed(2)} each
          </p>
        </div>

        {/* Desktop Quantity */}
        <div className="hidden sm:flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))
            }
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="px-3 font-black">{item.quantity}</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Desktop Price */}
        <p className="hidden sm:block text-2xl font-black text-slate-950 min-w-[90px] text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        {/* Desktop Remove */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item._id)}
          className="hidden sm:flex hover:bg-red-50 hover:text-red-600"
        >
          <X size={18} />
        </Button>
      </div>

      {/* Mobile Quantity (full width) */}
      <div className="mt-4 md:hidden">
        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-2 border border-slate-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))
            }
          >
            <Minus />
          </Button>

          <span className="text-lg font-black">{item.quantity}</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};
