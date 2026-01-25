"use client";
import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { useCart } from "@/store/cart";
import type { Product } from "@/store/products";
import { useTranslations } from "next-intl";

type Props = { products: Product[]; locale: string; categoryId?: string };

export const RelatedProducts: React.FC<Props> = ({ products, locale, categoryId }) => {
  const { addToCart } = useCart();
  if (!products.length) return null;
  const t = useTranslations("Product");

  return (
    <section className="container mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-3">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground">
          {t("relatedProducts")}
        </h2>
        {categoryId && (
          <Link
            href={`/${locale}/categories/${categoryId}`}
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-red-600 dark:hover:text-red-500 transition"
          >
            {t("seeAll")}
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
