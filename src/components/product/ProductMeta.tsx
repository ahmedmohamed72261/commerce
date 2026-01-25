"use client";
import React from "react";
import { useTranslations } from "next-intl";

type Props = { stock?: number; condition?: string };

export const ProductMeta: React.FC<Props> = ({ stock, condition }) => {
  const t = useTranslations("Product");
  const inStock = !!stock && stock > 0;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <p className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-1">
          {t("stockStatus")}
        </p>
        <span
          className={`text-sm font-bold uppercase ${
            inStock ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
          }`}
        >
          {inStock ? t("inStock") : t("outOfStock")}
        </span>
        {typeof stock === "number" && (
          <p className="text-xs text-muted-foreground font-semibold">
            {stock} {t("units")}
          </p>
        )}
      </div>
      {condition && (
        <div>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-1">
            {t("condition")}
          </p>
          <span className="text-sm font-semibold text-foreground">{condition}</span>
        </div>
      )}
    </div>
  );
};
