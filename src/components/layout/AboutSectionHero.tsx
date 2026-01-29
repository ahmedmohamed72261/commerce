"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";
import { cn } from "@/utils/utils";
import { useLocale, useTranslations } from "next-intl";
import { getTrendingProducts } from "@/services/products.service";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

interface CustomStyles {
  container?: string;
  imageSection?: string;
  textSection?: string;
  productImg?: string;
  mainButton?: string;
  priceText?: string;
}

interface AboutSectionHeroProps {
  version?: number;
  customStyles?: CustomStyles;
}

type Theme = {
  card: string;
  img: string;
  btn: string;
  badge: string;
  icon: string;
};

interface Product {
  _id: string;
  name: string | { en: string; ar: string };
  image?: string;
  images?: string[];
  price: number;
  salePrice?: number;
  stock?: number;
  averageRating?:number;
}

/* -------------------- THEMES LOGIC) -------------------- */
const themes: Record<number, Theme> = {
    1: { card: "rounded-3xl border-neutral-100 dark:border-border shadow-2xl bg-white dark:bg-card", img: "bg-neutral-50 dark:bg-muted", btn: "rounded-full bg-[#C40000] dark:bg-primary", badge: "bg-[#C40000] dark:bg-primary text-white rounded-full", icon: "text-[#C40000] dark:text-primary" },
    2: { card: "rounded-none border-4 border-black dark:border-foreground shadow-[15px_15px_0px_#C40000] dark:shadow-[15px_15px_0px_var(--primary)] bg-white dark:bg-card", img: "bg-white dark:bg-card border-r-4 border-black dark:border-foreground", btn: "rounded-none bg-black dark:bg-foreground uppercase tracking-tighter", badge: "bg-black dark:bg-foreground text-white italic", icon: "text-black dark:text-foreground" },
    3: { card: "rounded-[3rem] bg-zinc-950 dark:bg-black text-white border-none", img: "bg-zinc-900 dark:bg-zinc-950 rounded-[2.5rem] m-4", btn: "rounded-2xl bg-white dark:bg-foreground text-black dark:text-background", badge: "bg-white/10 backdrop-blur-md text-white", icon: "text-red-500 dark:text-primary" },
    4: { card: "rounded-none border-y border-neutral-200 dark:border-border shadow-none", img: "bg-transparent", btn: "rounded-none bg-transparent border-b-2 border-black dark:border-foreground text-black dark:text-foreground px-0", badge: "bg-transparent text-black dark:text-foreground border-l-4 border-[#C40000] dark:border-primary pl-2", icon: "text-[#C40000] dark:text-primary" },
    5: { card: "rounded-2xl bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-card border-red-100 dark:border-primary/20", img: "bg-white/50 dark:bg-muted/50", btn: "rounded-xl bg-[#C40000] dark:bg-primary shadow-lg shadow-red-200 dark:shadow-primary/20", badge: "bg-red-100 dark:bg-primary/20 text-[#C40000] dark:text-primary font-bold", icon: "text-[#C40000] dark:text-primary" },
    6: { card: "rounded-lg border-2 border-dashed border-neutral-300 dark:border-border", img: "bg-neutral-50 dark:bg-muted grayscale hover:grayscale-0", btn: "rounded-none bg-neutral-900 dark:bg-foreground", badge: "bg-neutral-900 dark:bg-foreground text-white", icon: "text-neutral-500 dark:text-muted-foreground" },
    7: { card: "rounded-[4rem] border border-neutral-200 pr-12 shadow-sm", img: "rounded-full aspect-square scale-90", btn: "rounded-full bg-[#C40000]", badge: "hidden", icon: "text-[#C40000]" },
    8: { card: "rounded-3xl shadow-none bg-blue-50/30 border border-blue-100", img: "bg-blue-600/5", btn: "rounded-2xl bg-blue-600", badge: "bg-blue-600 text-white", icon: "text-blue-600" },
    9: { card: "rounded-none border-l-8 border-[#C40000] bg-neutral-50", img: "bg-neutral-100", btn: "rounded-none bg-[#C40000] hover:skew-x-3", badge: "bg-[#C40000] text-white", icon: "text-[#C40000]" },
    10: { card: "rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.1)]", img: "bg-gradient-to-tr from-orange-50 to-rose-50", btn: "rounded-full bg-orange-600", badge: "bg-orange-600 text-white", icon: "text-orange-600" },
    11: { card: "rounded-none border-4 border-[#C40000] bg-white shadow-none", img: "bg-red-50", btn: "rounded-none bg-[#C40000] text-white font-bold", badge: "bg-black text-white", icon: "text-[#C40000]" },
    12: { card: "rounded-3xl border-2 border-zinc-800 bg-zinc-900 text-white", img: "bg-zinc-800", btn: "rounded-full bg-yellow-400 text-black", badge: "bg-yellow-400 text-black font-black", icon: "text-yellow-400" },
    13: { card: "rounded-xl shadow-xl border-t-8 border-indigo-600", img: "bg-indigo-50/50", btn: "rounded-lg bg-indigo-600", badge: "bg-indigo-600 text-white", icon: "text-indigo-600" },
    14: { card: "rounded-none skew-x-1 border-2 border-black bg-white", img: "bg-neutral-50 -skew-x-1", btn: "rounded-none bg-black", badge: "bg-[#C40000] text-white", icon: "text-[#C40000]" },
    15: { card: "rounded-3xl border-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] bg-neutral-50", img: "bg-white m-4 rounded-2xl", btn: "rounded-xl bg-neutral-900", badge: "bg-white shadow-sm border text-neutral-900", icon: "text-neutral-900" },
    16: { card: "rounded-none bg-white border border-neutral-100 shadow-sm", img: "bg-neutral-900 p-12", btn: "rounded-none border-2 border-black bg-transparent text-black", badge: "bg-[#C40000] text-white uppercase tracking-[0.3em]", icon: "text-[#C40000]" },
    17: { card: "rounded-[3rem] border-4 border-neutral-50 bg-white", img: "bg-rose-50/30", btn: "rounded-full bg-rose-500", badge: "bg-rose-500 text-white", icon: "text-rose-500" },
    18: { card: "rounded-2xl bg-zinc-900 border-none shadow-2xl", img: "bg-gradient-to-b from-zinc-800 to-zinc-900", btn: "rounded-xl bg-[#C40000] shadow-[0_10px_20px_rgba(196,0,0,0.3)]", badge: "bg-zinc-100 text-black font-bold", icon: "text-[#C40000]" },
    19: { card: "rounded-none border-x-2 border-black bg-neutral-50", img: "bg-white", btn: "rounded-none bg-black text-white px-16", badge: "bg-transparent border-2 border-black text-black", icon: "text-black" },
    20: { card: "rounded-[5rem] bg-white border border-neutral-100 shadow-inner", img: "bg-teal-50/50", btn: "rounded-full bg-teal-600", badge: "bg-teal-100 text-teal-700", icon: "text-teal-600" },
    21: { card: "rounded-none border-b-[20px] border-[#C40000] bg-white shadow-2xl", img: "bg-neutral-50", btn: "rounded-none bg-black", badge: "bg-black text-white italic", icon: "text-[#C40000]" },
    22: { card: "rounded-3xl border-2 border-dashed border-red-500/20", img: "bg-red-500/5", btn: "rounded-2xl bg-gradient-to-r from-red-600 to-black", badge: "bg-red-600 text-white", icon: "text-red-600" },
    23: { card: "rounded-xl bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)]", img: "bg-neutral-50 border-r border-neutral-100", btn: "rounded-none bg-neutral-900 uppercase", badge: "bg-neutral-100 text-neutral-500", icon: "text-neutral-900" },
    24: { card: "rounded-[2rem] bg-white border border-neutral-100 shadow-xl pr-6", img: "m-6 rounded-[1.5rem] bg-neutral-100", btn: "rounded-full bg-black shadow-lg", badge: "bg-[#C40000] text-white", icon: "text-[#C40000]" },
    25: { card: "rounded-none bg-black text-white", img: "bg-zinc-900 opacity-80", btn: "rounded-none border border-white text-white hover:bg-white hover:text-black", badge: "bg-white text-black", icon: "text-red-500" },
    26: { card: "rounded-3xl bg-neutral-50 border-none", img: "bg-white rounded-[2.5rem] shadow-xl m-4", btn: "rounded-2xl bg-[#C40000]", badge: "bg-black text-white", icon: "text-[#C40000]" },
    27: { card: "rounded-none border-t-4 border-black bg-white shadow-none", img: "bg-neutral-50", btn: "rounded-none bg-black tracking-widest", badge: "bg-red-600 text-white", icon: "text-red-600" },
    28: { card: "rounded-[3rem] bg-white border-2 border-neutral-50 shadow-2xl", img: "bg-gradient-to-br from-gray-50 to-gray-200", btn: "rounded-full bg-[#C40000]", badge: "bg-neutral-900 text-white rounded-full", icon: "text-[#C40000]" },
    29: { card: "rounded-none bg-white border-4 border-double border-neutral-200", img: "bg-neutral-50 p-10", btn: "rounded-none bg-neutral-900", badge: "bg-neutral-900 text-white", icon: "text-neutral-900" },
    30: { card: "rounded-[4rem] bg-neutral-900 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]", img: "bg-zinc-800 rounded-[3.5rem] m-6", btn: "rounded-full bg-white text-black font-black", badge: "bg-[#C40000] text-white", icon: "text-[#C40000]" },
  };
  const getTheme = (v: number) => themes[v] || themes[1];
export function AboutSectionHero({
   version = 1,
  customStyles = {},
}: AboutSectionHeroProps) {
  const locale = useLocale() as "en" | "ar";
  const tTable = useTranslations("AdminTable");
  const tForm = useTranslations("AdminForm");
  const s = getTheme(version);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingProduct = async () => {
      try {
        const response = await getTrendingProducts();
        if (response?.success && response?.data) {
           // Handle single object response (new format)
           setProduct(response.data);
        } else if (response && Array.isArray(response.data) && response.data.length > 0) {
          // Handle array response (legacy)
          setProduct(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching trending products:", error);
        // Fallback to static data
        setProduct({
          _id: "fallback",
          name: "Limited Edition Wireless Headphones",
          image: "/images/f.jpg",
          price: 199,
          salePrice: 149,
          stock: 27
        });
        setError("failed");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProduct();
  }, []);

  if (loading || !product) {
    return (
      <section className="max-w-6xl mx-auto px-4 relative z-30 -mt-15">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden transition-all duration-500",
          s.card,
          customStyles.container,
          version % 2 === 0 && "lg:[direction:rtl]"
        )}>
          <div className={cn(
            "flex items-center justify-center h-[250px] md:h-auto p-3 lg:p-9",
            s.img,
            customStyles.imageSection
          )}>
            <div className="w-full max-w-sm h-full rounded-2xl overflow-hidden">
              <div className="h-full w-full bg-gray-200 dark:bg-muted/40 animate-pulse" />
            </div>
          </div>
          <div className={cn(
            "p-4 lg:p-10 flex flex-col gap-3 rtl:text-right",
            customStyles.textSection
          )}>
            <div className="h-6 bg-gray-200 dark:bg-muted/40 rounded w-3/4 animate-pulse"></div>
            <div className="h-5 bg-gray-200 dark:bg-muted/40 rounded w-2/3 animate-pulse"></div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-28 bg-gray-200 dark:bg-muted/40 rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-100 dark:bg-muted/30 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-4 bg-gray-100 dark:bg-muted/30 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-100 dark:bg-muted/30 rounded animate-pulse"></div>
            </div>
            <div className="pt-2">
              <div className="h-10 bg-gray-200 dark:bg-muted/40 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const getName = (name: string | { en: string; ar: string }): string => {
    if (typeof name === "string") {
      return name;
    }
    return locale === "ar" ? name.ar || name.en || "" : name.en || name.ar || "";
  };

  const title = getName(product.name);
  const image = product.images?.[0] || product.image || "/images/f.jpg";
  const price = product.price;
  const salePrice = product.salePrice; // set to undefined to hide sale
  const stock = product.stock; // set to undefined to hide stock badge
  const desc =
    typeof (product as any).description === "object"
      ? ((product as any).description?.[locale] ?? (product as any).description?.en ?? "")
      : ((product as any).description ?? "");
  const brandName =
    typeof (product as any).brand?.name === "object"
      ? ((product as any).brand?.name?.[locale] ?? (product as any).brand?.name?.en ?? "")
      : ((product as any).brand?.name ?? "");
  const categoryName =
    typeof (product as any).category?.name === "object"
      ? ((product as any).category?.name?.[locale] ?? (product as any).category?.name?.en ?? "")
      : ((product as any).category?.name ?? "");
  const condition = (product as any).condition as string | undefined;
  const attrs = (product as any).attributes || {};
  const avgRating = Number((product as any).averageRating ?? 0);
  const conditionText = (() => {
    const v = String(condition || "").toLowerCase();
    if (!v) return "";
    if (v === "new") return tForm("conditionNew");
    if (v === "used") return tForm("conditionUsed");
    return condition || "";
  })();

  return (
    <section className="max-w-6xl mx-auto px-4 relative z-30 -mt-15" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden transition-all duration-500",
          s.card,
          customStyles.container,
          version % 2 === 0 && "lg:[direction:rtl]"
        )}
      >
        {/* IMAGE */}
        <div
          className={cn(
            "flex items-center justify-center h-[250px] md:h-auto p-3 lg:p-9",
            s.img,
            customStyles.imageSection
          )}
        >
          <img
            src={image}
            alt={title}
            className={cn(
              "w-full max-w-sm h-full object-cover transition-transform duration-700 hover:scale-105",
              customStyles.productImg
            )}
          />
        </div>

        {/* CONTENT */}
        <div
          className={cn(
            "p-4 lg:p-10 flex flex-col gap-2 rtl:text-right",
            customStyles.textSection
          )}
        >
          <h1 className="text-xl lg:text-2xl font-semibold leading-tight">
            {title}
          </h1>

          {/* PRICE */}
          <div className="flex items-end gap-2 flex-wrap">
            <span
              className={cn(
                "text-3xl lg:text-4xl font-bold",
                s.icon,
                customStyles.priceText
              )}
            >
              ${salePrice ?? price}
            </span>

            {salePrice && (
              <span className="text-lg text-neutral-400 line-through">
                ${price}
              </span>
            )}
          </div>

          {/* STOCK */}
          {typeof stock === "number" && (
            <span className="text-sm text-neutral-500">
              {locale === "ar" ? "المتوفر" : "In stock"}: {stock}
            </span>
          )}

          {desc && (
            <p className="text-sm text-neutral-600 dark:text-muted-foreground mt-2">
              {desc}
            </p>
          )}

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            {brandName && (
              <div className="text-neutral-600 dark:text-muted-foreground">
                {tTable("brand")}:{" "}
                <span className="px-2 py-0.5 rounded-full border border-border bg-white dark:bg-card font-black text-neutral-900 dark:text-foreground">{brandName}</span>
              </div>
            )}
            {categoryName && (
              <div className="text-neutral-600 dark:text-muted-foreground">
                {locale === "ar" ? "الفئة" : "Category"}:{" "}
                <span className="font-semibold text-neutral-900 dark:text-foreground">{categoryName}</span>
              </div>
            )}
           {conditionText && (
            <div className="text-neutral-600 dark:text-muted-foreground flex items-center gap-2">
              <span>{locale === "ar" ? "الحالة" : "Condition"}:</span>
              
              {/* ENHANCED ANIMATED SPAN */}
              <span className={cn(
                "relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-white dark:bg-card overflow-hidden group/cond shadow-sm transition-all duration-300 hover:border-primary/50",
                "font-black text-[14px] uppercase tracking-wider text-neutral-900 dark:text-foreground"
              )}>
                
                {/* 1. Live Indicator Dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>

                {/* 2. Text with Shimmer */}
                <span className="relative z-10">
                  {conditionText}
                  {/* Shimmer Light Sweep */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
                </span>
                
                {/* 3. Subtle background glow on hover */}
                <span className="absolute inset-0 bg-primary/5 opacity-0 group-hover/cond:opacity-100 transition-opacity" />
              </span>
            </div>
          )}
            <div className="text-neutral-600 dark:text-muted-foreground flex items-center gap-2">
              <span>{locale === "ar" ? "التقييم" : "Rating"}:</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={cn(
                        i < Math.round(avgRating) 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300 dark:text-gray-600"
                      )} 
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-500 font-medium">{avgRating}</span>
              </div>
            </div>
          </div>

          {attrs && Object.keys(attrs).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(attrs).slice(0, 4).map(([k, v]) => (
                <span key={String(k)} className="px-2 py-1 rounded-full text-[11px] border border-gray-200 dark:border-border bg-gray-50 dark:bg-muted/30 text-neutral-700 dark:text-muted-foreground">
                  {String(k)}: {String(v)}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="pt-2">
            <Button
              className={cn(
                "h-10 px-10 text-sm font-medium transition-transform active:scale-95",
                s.btn,
                customStyles.mainButton
              )}
              onClick={async () => {
                if (!product?._id) return;
                const ok = await addToCart(String(product._id), 1);
                if (ok) {
                  toast.success(locale === "ar" ? "تمت إضافة المنتج إلى السلة" : "Product added to cart");
                } else {
                  toast.error(locale === "ar" ? "فشل في إضافة المنتج إلى السلة" : "Failed to add product to cart");
                }
              }}
            >
              {locale === "ar" ? "اشتر الآن" : "Buy now"}
              <ShoppingBag className="ml-3 rtl:ml-0 rtl:mr-3" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
