"use client";
import React from "react";
import { Package, Star } from "lucide-react";
import type { Product } from "@/store/products";

type Props = { product: Product };

export const ProductHeader: React.FC<Props> = ({ product }) => {
  return (
    <div className="mb-4">
      {product.brand && (
        <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wide mb-1">
          <Package size={14} /> {product.brand}
        </div>
      )}
      <h1 className="text-2xl md:text-3xl font-black uppercase italic leading-tight text-slate-900 mb-2">
        {product.title}
      </h1>
      {product.rating && (
        <div className="flex items-center gap-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating ?? 0) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating ?? 0) ? "" : "text-slate-300"}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            ({product.rating} rating)
          </span>
        </div>
      )}
    </div>
  );
};
