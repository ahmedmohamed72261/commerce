"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { formatCurrency } from "@/utils/utils";
import {
  CheckCircle,
  Trash2,
  ShoppingCart,
  Zap,
  ChevronRight,
  Heart,
  ArrowRight
} from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useCart } from "@/store/cart";

export default function WishlistPage() {
  const { items, loading, fetchWishlist, removeItem, totalItems } = useWishlist();
  const t = useTranslations("Wishlist");
  const locale = useLocale() as "en" | "ar";
  const isRTL = locale === "ar";
  const { addToCart } = useCart();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const totalValue = useMemo(
    () => items.reduce((s, i) => s + (i.salePrice ?? i.price ?? 0), 0),
    [items]
  );

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f8f9fa] dark:bg-background p-6"
    >
      {/* Unified Breadcrumb */}
      <Breadcrumb
        items={[
          { label: t("title") }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 mt-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <h1 className="text-3xl md:text-4xl font-black italic dark:text-foreground">
            {t("title")}
          </h1>

          <div className="bg-slate-900 dark:bg-card dark:border dark:border-border text-white rounded-2xl px-6 py-4 text-center">
            <p className="text-xs uppercase opacity-60">
              {t("totalItems")}
            </p>
            <p className="text-3xl font-black">{totalItems()}</p>
          </div>
        </header>

        {/* Content */}
        {loading ? (
          <div className="grid gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-40 bg-white dark:bg-card rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white dark:bg-card rounded-2xl p-10 text-center font-bold text-slate-500 dark:text-muted-foreground">
            {t("empty")}
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
              key={item.id}
              className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 p-3 md:p-6">
                
                {/* Image */}
                <div className="relative w-20 h-20 md:w-40 md:h-40 bg-slate-100 dark:bg-muted rounded-lg overflow-hidden shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      <Heart size={20} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h2 className="text-sm md:text-xl font-black truncate dark:text-foreground">
                    { item.title}
                  </h2>

                  <div className="flex items-center gap-3 text-[11px] font-bold">
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle size={12} />
                      {t("saved")}
                    </span>
                    <span className="text-slate-400 dark:text-muted-foreground">
                      {formatCurrency((item.salePrice ?? item.price) || 0, locale)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-2">
                  <Button
                    size="sm"
                    className="h-9 px-2 md:px-6"
                    onClick={async () => {
                      const success = await addToCart(String(item.id), 1);
                      if (success) {
                        const msg = locale === "ar" ? "تمت الإضافة إلى السلة" : "Added to cart!";
                        (await import("sonner")).toast.success(msg);
                      } else {
                        const msg = locale === "ar" ? "فشل الإضافة إلى السلة" : "Failed to add to cart";
                        (await import("sonner")).toast.error(msg);
                      }
                    }}
                  >
                    <ShoppingCart size={16} />
                    <span className="hidden md:inline ms-2">
                      {t("addToCart")}
                    </span>
                  </Button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="h-9 w-9 flex items-center justify-center rounded-lg border dark:border-border text-slate-400 dark:text-muted-foreground hover:text-red-600 dark:hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 bg-white dark:bg-card rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link
            href="/"
            className="text-xs uppercase font-bold text-slate-400 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary flex items-center gap-2"
          >
            <ArrowRight className={isRTL ? "" : "rotate-180"} size={14} />
            {t("back")}
          </Link>

          <div className="flex items-center gap-6">
            <div className="text-end hidden md:block">
              <p className="text-xs text-slate-400 dark:text-muted-foreground">
                {t("totalValue")}
              </p>
              <p className="text-2xl font-black italic dark:text-foreground">
                {formatCurrency(totalValue, locale)}
              </p>
            </div>

            <Button
              className="h-14 px-10 bg-red-600 dark:bg-primary"
              onClick={async () => {
                let okCount = 0;
                for (const it of items) {
                  const success = await addToCart(String(it.id), 1);
                  if (success) okCount++;
                }
                const msg = locale === "ar"
                  ? `تم ترحيل ${okCount} عنصرًا إلى السلة`
                  : `Deployed ${okCount} items to cart`;
                (await import("sonner")).toast.success(msg);
              }}
            >
              {t("deployAll")}
              <Zap className="ms-2 w-4 h-4" />
            </Button>
          </div>
          </div>
        </div>
    </div>
  );
}
