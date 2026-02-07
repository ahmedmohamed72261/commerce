"use client";

import { useState, useRef, useEffect } from "react";
import { X, Loader2, Search as SearchIcon, ArrowRight, ArrowLeft, Command } from "lucide-react";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/utils";
import { useTranslations } from "next-intl";

export function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  const { query, setQuery, suggestions, loading, locale } = useProductSearch();
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tNav = useTranslations("Nav");
  const isRTL = locale === "ar";

  const onEnterNavigate = () => {
    const target = activeIndex >= 0 ? suggestions[activeIndex] : suggestions?.[0];
    if (target) handleSelectProduct(target.slug || target._id);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, [autoFocus]);

  const handleSelectProduct = (id: string) => {
    router.push(`/${locale}/products/${id}`);
    setQuery("");
    setIsFocused(false);
  };

  const getName = (name: any) =>
    typeof name === "string" ? name : locale === "ar" ? name.ar : name.en;

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto z-[100]">
      {/* SEARCH CONTAINER - SOLID BACKGROUND */}
      <div
        className={cn(
          "group relative flex items-center rounded-xl border transition-all duration-200 overflow-hidden",
          "bg-[--color-card] shadow-sm", // Changed from transparent to solid card background
          isFocused
            ? "border-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-primary"
            : "border-[--color-border] hover:border-[--color-muted-foreground]"
        )}
      >
        <div className="flex items-center flex-1 px-4 h-12">
          <SearchIcon 
            className={cn(
              "h-4 w-4 transition-colors duration-200",
              isFocused ? "text-primary" : "text-[--color-muted-foreground]"
            )} 
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsFocused(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onEnterNavigate();
              if (e.key === "Escape") setIsFocused(false);
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((prev) => Math.max(prev - 1, 0));
              }
            }}
            placeholder={tNav("search")}
            className="w-full h-full px-3 text-sm font-bold bg-transparent outline-none text-[--color-foreground] placeholder:text-[--color-muted-foreground]"
            dir={isRTL ? "rtl" : "ltr"}
          />
        </div>

        {/* ACTIONS & HOTKEY HINT */}
        <div className="flex items-center px-3 gap-2 border-s border-[--color-border] bg-[--color-muted]/20 h-full">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : query ? (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="p-1 rounded-md hover:bg-[--color-muted] transition-colors"
            >
              <X className="h-4 w-4 text-[--color-muted-foreground]" />
            </button>
          ) : null}
        </div>
      </div>

      {/* DROPDOWN - HIGH CONTRAST SOLID */}
      {isFocused && query && (
        <div
          className={cn(
            "absolute mt-3 w-full rounded-2xl border bg-white dark:bg-muted  shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-50 overflow-hidden",
            "border-[--color-border] ring-1 ring-black/5"
          )}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {loading && !suggestions.length ? (
            <div className="p-14 flex flex-col items-center justify-center gap-4">
               <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
               <span className="text-[11px] font-black text-[--color-muted-foreground] uppercase tracking-[0.3em] animate-pulse">
                 {isRTL ? "جاري البحث..." : "Scanning Database..."}
               </span>
            </div>
          ) : suggestions.length ? (
            <div className="max-h-[450px] overflow-y-auto bg-white dark:bg-muted border-b border-[--color-border]">
              {/* RESULTS HEADER */}
              <div className="sticky top-0 z-10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-[--color-muted-foreground] bg-[--color-card] border-b border-[--color-border]">
                {isRTL ? "نتائج البحث" : "Search Results"} — {suggestions.length}
              </div>
              
              <div className="p-2 space-y-1">
                {suggestions.map((p, i) => (
                  <button
                    key={p._id}
                    onClick={() => handleSelectProduct(p.slug || p._id)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group",
                      i === activeIndex 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "hover:bg-[--color-muted] border-transparent"
                    )}
                  >
                    {/* PRODUCT IMAGE - HIGH CONTRAST */}
                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-black/5 shadow-sm">
                      {p.image ? (
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-300">
                           <SearchIcon size={18} />
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="flex-1 text-start">
                      <div className={cn(
                        "text-[13px] font-black uppercase tracking-tight leading-none mb-1",
                        i === activeIndex ? "text-white" : "text-[--color-foreground]"
                      )}>
                        {getName(p.name)}
                      </div>
                      {p.description && (
                        <div className={cn(
                          "text-[11px] line-clamp-1 font-bold  opacity-70",
                          i === activeIndex ? "text-white/80" : "text-[--color-muted-foreground]"
                        )}>
                          {p.description}
                        </div>
                      )}
                    </div>

                    {/* INTERACTIVE INDICATOR */}
                    <div className={cn(
                      "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                      i === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    )}>
                      {isRTL ? "انتقال" : "Visit"}
                      {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-16 text-center space-y-4">
              <div className="bg-[--color-muted] w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <SearchIcon className="text-[--color-muted-foreground] opacity-40" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-[--color-foreground] uppercase tracking-widest">
                  {isRTL ? "لا توجد نتائج" : "No matches found"}
                </p>
                <p className="text-[11px] text-[--color-muted-foreground] font-bold">
                  {isRTL ? "جرب استخدام كلمات بحث مختلفة" : "Try adjusting your search criteria"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}