"use client";

import { ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function Sidebar() {
  const t = useTranslations("Shop");
  const [priceRange, setPriceRange] = useState(250);

  return (
    <div className="space-y-8">
      {/* Categories Widget */}
      <div className="glass-panel rounded-2xl p-6 dark:bg-slate-900/60 dark:border-white/10">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 relative inline-block">
          {t("categories")}
          <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-red-600 rounded-full"></span>
        </h3>
        <ul className="space-y-3">
          {["Flank steak", "Top round roast", "Chuck steak", "Rib steak", "Beef steak", "Life Basics Cacay Oil"].map((cat) => (
            <li key={cat}>
              <Link 
                href="#" 
                className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 group transition-all duration-300 font-medium p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-red-600 transition-colors" />
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Filter Widget */}
      <div className="glass-panel rounded-2xl p-6 dark:bg-slate-900/60 dark:border-white/10">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 relative inline-block">
          {t("filter")}
          <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-red-600 rounded-full"></span>
        </h3>
        <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
               <span className="text-sm font-medium text-slate-500 dark:text-slate-400">$50</span>
               <span className="text-sm font-bold text-red-600">${priceRange}</span>
            </div>
            <input 
                type="range" 
                min="50" 
                max="500" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500 transition-all"
            />
            <button className="mt-6 w-full py-2.5 bg-slate-900 dark:bg-red-600 text-white rounded-lg font-semibold hover:bg-red-600 dark:hover:bg-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
               <Filter className="w-4 h-4" /> {t("filterPrice")}
            </button>
        </div>
      </div>

      {/* Product Tags Widget */}
      <div className="glass-panel rounded-2xl p-6 dark:bg-slate-900/60 dark:border-white/10">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 relative inline-block">
          {t("productTags")}
          <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-red-600 rounded-full"></span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Beef", "Pork", "Chicken", "Sausage", "Lamb"].map((tag) => (
            <Link
              key={tag}
              href="#"
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 dark:hover:bg-red-600 dark:hover:border-red-600 transition-all shadow-sm hover:shadow-md"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
