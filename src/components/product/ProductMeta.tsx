"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Box, Tag, Layers } from "lucide-react";

type Props = { stock?: number; condition?: string; brand?: string };

export const ProductMeta: React.FC<Props> = ({ stock, condition, brand }) => {
  const t = useTranslations("Product");
  const tTable = useTranslations("AdminTable");
  const tForm = useTranslations("AdminForm");

  const inStock = !!stock && stock > 0;

  const conditionText = (() => {
    const v = String(condition || "").toLowerCase();
    if (!v) return "";
    if (v === "new") return tForm("conditionNew");
    if (v === "used") return tForm("conditionUsed");
    return condition || "";
  })();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 animate-fade-up">
      
      {/* STOCK SECTION */}
      <div className="glass-panel p-6 rounded-[--radius] group transition-all duration-300">
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <Box size={16} strokeWidth={2.5} />
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">{t("stockStatus")}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-2xl font-black italic uppercase tracking-tighter ${
            inStock ? "text-emerald-500" : "text-primary"
          }`}>
            {inStock ? t("inStock") : t("outOfStock")}
          </span>
          {inStock && (
            <div className="bg-foreground text-background px-3 py-1 rounded-lg font-black text-xs animate-bounce shadow-lg">
              {stock}
            </div>
          )}
        </div>
      </div>

      {/* BRAND SECTION */}
      {/* {brand && (
        <div className="glass-panel p-6 rounded-[--radius] bg-muted/20 border-primary/10">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Tag size={16} strokeWidth={2.5} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">{tTable("brand")}</p>
          </div>
          <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter truncate">
            {brand}<span className="text-primary animate-pulse">_</span>
          </h3>
        </div>
      )} */}

      {/* CONDITION SECTION - THE ANIMATED PILL */}
      {conditionText && (
        <div className="glass-panel p-2 rounded-[--radius] flex flex-col justify-between overflow-hidden relative border-primary/20">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Layers size={16} strokeWidth={2.5} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">{t("condition")}</p>
          </div>
          
          <div className="relative">
            {/* The Main Span with Shimmer Animation */}
            <span className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-foreground text-background text-[11px] font-black uppercase tracking-[0.25em] shadow-[0_8px_16px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.05)] overflow-hidden">
              
              {/* LIVE INDICATOR DOT */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              
              {/* TEXT SPAN WITH INTERNAL SHIMMER */}
              <span className="relative text-base z-10">
                {conditionText}
                {/* Horizontal Shimmer Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};