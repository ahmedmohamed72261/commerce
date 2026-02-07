"use client";
import React from "react";
import { Package, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Product } from "@/store/products";

type Props = { product: Product };

export const ProductHeader: React.FC<Props> = ({ product }) => {
  const tTable = useTranslations("AdminTable");
  return (
    <div className="space-y-2 mb-2">
      {product.brand && (
        <div className="flex items-center gap-2 text-red-600 dark:text-primary font-bold text-sm sm:text-xl uppercase tracking-wide mb-1">
          {/* <Package size={14} /> {tTable("brand")}: */}
          <span className="px-2 py-0.5 rounded-full bg-red-50 dark:bg-primary/15 text-red-700 dark:text-primary font-black tracking-widest">
            {product.brand}
          </span>
        </div>
      )}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase leading-tight text-foreground">
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
