"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag, Star, Zap, Shield, ArrowRight,
  Heart, Share2, Eye, Flame, Crown, Sparkles,
  Truck, Box, ZapOff, Smartphone, Headphones
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface CustomStyles {
  container?: string;
  imageSection?: string;
  textSection?: string;
  productImg?: string;
  mainButton?: string;
  priceText?: string;
  badge?: string;
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

export function AboutSectionHero({
  version = 1,
  customStyles = {}
}: AboutSectionHeroProps) {
  // --- THE FULL 30 DESIGN CASES ---
  const getStyle = (v: number) => {
    const themes: Record<number, Theme> = {
      1: { card: "rounded-3xl border-neutral-100 shadow-2xl bg-white", img: "bg-neutral-50", btn: "rounded-full bg-[#C40000]", badge: "bg-[#C40000] text-white rounded-full", icon: "text-[#C40000]" },
      2: { card: "rounded-none border-4 border-black shadow-[15px_15px_0px_#C40000] bg-white", img: "bg-white border-r-4 border-black", btn: "rounded-none bg-black uppercase tracking-tighter", badge: "bg-black text-white italic", icon: "text-black" },
      3: { card: "rounded-[3rem] bg-zinc-950 text-white border-none", img: "bg-zinc-900 rounded-[2.5rem] m-4", btn: "rounded-2xl bg-white text-black", badge: "bg-white/10 backdrop-blur-md text-white", icon: "text-red-500" },
      4: { card: "rounded-none border-y border-neutral-200 shadow-none", img: "bg-transparent", btn: "rounded-none bg-transparent border-b-2 border-black text-black px-0", badge: "bg-transparent text-black border-l-4 border-[#C40000] pl-2", icon: "text-[#C40000]" },
      5: { card: "rounded-2xl bg-gradient-to-br from-red-50 to-white border-red-100", img: "bg-white/50", btn: "rounded-xl bg-[#C40000] shadow-lg shadow-red-200", badge: "bg-red-100 text-[#C40000] font-bold", icon: "text-[#C40000]" },
      6: { card: "rounded-lg border-2 border-dashed border-neutral-300", img: "bg-neutral-50 grayscale hover:grayscale-0", btn: "rounded-none bg-neutral-900", badge: "bg-neutral-900 text-white", icon: "text-neutral-500" },
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

    return themes[v] || themes[1];
  };

  const s = getStyle(version);
  const locale = useLocale() as "en" | "ar";

  // Static data (replace values as needed)
  const title = "Limited Edition Wireless Headphones";
  const image = "/images/f.jpg";
  const price = 199;
  const salePrice = 149; // set to undefined to hide sale
  const stock = 27; // set to undefined to hide stock badge

  return (
    <div className="max-w-6xl mx-auto px-2 relative z-30 -mt-10 md:-mt-30 group">
      <div
        className={cn(
          "flex flex-col lg:flex-row transition-all duration-700 overflow-hidden rtl:md:flex-row-reverse rtl:flex-col",
          s.card,
          "dark:bg-card dark:border-border",
          customStyles.container,
          version % 2 === 0 && "lg:flex-row-reverse" // Alternating layout
        )}
      >
        <div
          className={cn(
            "lg:w-[45%] w-full relative min-h-[230px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center transition-colors duration-500",
            s.img,
            customStyles.imageSection
          )}
        >
          <img
            src={image}
            alt={title}
            className={cn(
              "w-4/5 h-4/5 object-contain transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6",
              customStyles.productImg
            )}
          />
        </div>

        <div className={cn("lg:w-[55%] p-4 sm:p-10 lg:p-20 flex flex-col justify-center text-foreground rtl:text-right", customStyles.textSection)}>
          <h1 className="text-xl sm:text-xl lg:text-5xl font-black tracking-tighter uppercase mb-6 sm:mb-8 leading-[0.95] sm:leading-[0.85] text-balance rtl:text-right">
            {title}
          </h1>

          <div className="flex items-baseline gap-4 sm:gap-5 mb-8 sm:mb-10">
            {typeof salePrice !== "undefined" && salePrice !== null ? (
              <>
                <span className={cn("text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter", s.icon, customStyles.priceText)}>
                  ${salePrice}
                </span>
                <span className="text-lg sm:text-2xl line-through opacity-40 font-bold">
                  ${price}
                </span>
              </>
            ) : (
              <span className={cn("text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter", s.icon, customStyles.priceText)}>
                ${price}
              </span>
            )}

            {typeof stock === "number" && (
              <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                {locale === "ar" ? "المتوفر" : "In Stock"}: {stock}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <Button
              className={cn(
                "px-10 sm:px-14 py-6 sm:py-9 text-base font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 group/btn",
                s.btn,
                customStyles.mainButton
              )}
            >
              {locale === "ar" ? "اشتري الآن" : "Buy Now"}{" "}
              <ShoppingBag className="ml-3 rtl:ml-0 rtl:mr-3 transition-transform group-hover/btn:translate-y-[-2px]" size={22} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}