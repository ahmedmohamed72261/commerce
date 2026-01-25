"use client";
import React from "react";
import { useTranslations } from "next-intl";

type Props = { price: number; salePrice?: number };

export const ProductPrice: React.FC<Props> = ({ price, salePrice }) => {
  const finalPrice = salePrice ?? price;
  const showCompare = salePrice && price > salePrice;
  const t = useTranslations("Shop");

  return (
    <div className="mb-4">
      <p className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-1">
        {t("price")}
      </p>
      <div className="flex items-center gap-3">
        <span className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-500 tracking-tight">
          ${finalPrice.toFixed(2)}
        </span>
        {showCompare && (
          <span className="text-lg md:text-xl text-muted-foreground/50 line-through font-bold">
            ${price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};
