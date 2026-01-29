"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { formatCurrency } from "@/utils/utils";

type Props = { price: number; salePrice?: number };

export const ProductPrice: React.FC<Props> = ({ price, salePrice }) => {
  const finalPrice = salePrice ?? price;
  const showCompare = salePrice && price > salePrice;
  const t = useTranslations("Shop");
  const locale = useLocale() as "en" | "ar";

  return (
    <div className="mb-4">
      <p className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-1">
        {t("price")}
      </p>
      <div className="flex items-center gap-3">
        <span className="text-xl md:text-2xl font-black text-red-600 dark:text-red-500 tracking-tight">
          {formatCurrency(finalPrice, locale)}
        </span>
        {showCompare && (
          <span className="text-lg md:text-xl text-muted-foreground/50 line-through font-bold">
            {formatCurrency(price, locale)}
          </span>
        )}
      </div>
    </div>
  );
};
