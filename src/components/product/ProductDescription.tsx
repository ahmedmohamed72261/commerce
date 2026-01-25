"use client";
import React from "react";
import { useTranslations } from "next-intl";

type Props = { description?: string };

export const ProductDescription: React.FC<Props> = ({ description }) => {
  if (!description) return null;
  const t = useTranslations("Product");
  return (
    <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h2 className="text-sm font-black uppercase text-muted-foreground mb-2 tracking-wide">
        {t("description")}
      </h2>
      <p className="text-sm text-foreground/80 leading-relaxed">{description}</p>
    </div>
  );
};
