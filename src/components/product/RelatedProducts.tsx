"use client";
import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { useCart } from "@/store/cart";
import type { Product } from "@/store/products";

type Props = { products: Product[]; locale: string; categoryId?: string };

export const RelatedProducts: React.FC<Props> = ({ products, locale, categoryId }) => {
  const { addToCart } = useCart();
  if (!products.length) return null;

  return (
    <section className="container mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
          Related <span className="text-red-600 italic">Products</span>
        </h2>
        {categoryId && (
          <Link
            href={`/${locale}/categories/${categoryId}`}
            className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-red-600 transition"
          >
            See All
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode="grid"
            locale={locale}
            onAddToCart={async (id) => await addToCart(String(id), 1)}
          />
        ))}
      </div>
    </section>
  );
};
