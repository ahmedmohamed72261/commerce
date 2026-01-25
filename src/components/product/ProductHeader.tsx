"use client";
import React from "react";
import { Package, Star } from "lucide-react";
import type { Product } from "@/store/products";

type Props = { product: Product };

export const ProductHeader: React.FC<Props> = ({ product }) => {
  return (
    <div className="space-y-2 mb-4">
      {product.brand && (
        <div className="flex items-center gap-2 text-red-600 dark:text-primary font-bold text-xs uppercase tracking-wide mb-1">
          <Package size={14} /> {product.brand}
        </div>
      )}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic leading-tight text-foreground">
        {product.title}
      </h1>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < Math.round(product.averageRating ?? product.rating ?? 0)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              }
            />
          ))}
        </div>
        <span className="text-[11px] sm:text-xs font-bold text-muted-foreground">
          ({product.ratingsCount ?? 0})
        </span>
      </div>
    </div>
  );
};
