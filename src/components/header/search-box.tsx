"use client";

import { useState, useRef, useEffect } from "react";
import { X, Loader2, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const onEnterNavigate = () => {
    const target = activeIndex >= 0 ? suggestions[activeIndex] : suggestions?.[0];
    if (target?._id) handleSelectProduct(target._id);
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
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* SEARCH CONTAINER */}
      <div
        className={cn(
          "flex items-center rounded-2xl border bg-white/95 dark:bg-card/95 backdrop-blur-md transition-all",
          isFocused
            ? "border-[--color-primary] shadow-[0_0_0_4px_rgba(218,41,42,0.12)]"
            : "border-[--color-border]"
        )}
      >
        {/* INPUT */}
        <div className="relative flex-1 px-4">
          <SearchIcon className="absolute start-6 top-1/2 -translate-y-1/2 h-4 w-4 text-[--color-muted-foreground]" />
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
            className="
              w-full h-12 ps-8 text-sm outline-none
              text-[--color-foreground]
              placeholder:text-[--color-muted-foreground]
            "
            dir={locale === "ar" ? "rtl" : "ltr"}
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute end-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[--color-muted]"
            >
              <X className="h-4 w-4 opacity-60" />
            </button>
          )}
        </div>
      </div>

      {/* DROPDOWN */}
      {isFocused && query && (
        <div className="absolute mt-2 w-full rounded-2xl border border-[--color-border] bg-white/95 dark:bg-card/95 backdrop-blur-md shadow-2xl z-50 max-h-[60vh] overflow-auto">
          {loading ? (
            <div className="p-6 flex items-center justify-center gap-2 text-xs opacity-70">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{locale === "ar" ? "جاري البحث..." : "Searching..."}</span>
            </div>
          ) : suggestions.length ? (
            <>
              <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-[--color-muted-foreground] border-b border-[--color-border]">
                {locale === "ar" ? "عدد النتائج" : "Results"}: {suggestions.length}
              </div>
              {suggestions.map((p, i) => (
                <button
                  key={p._id}
                  onClick={() => handleSelectProduct(p._id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-3 hover:bg-[--color-muted] transition-colors",
                    i === activeIndex ? "bg-[--color-muted]" : ""
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-[--color-muted] overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={getName(p.name)} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <span className="text-sm font-medium">
                    {getName(p.name)}
                  </span>
                </button>
              ))}
            </>
          ) : (
            <div className="p-8 text-center text-sm opacity-60">
              {locale === "ar" ? "لا توجد نتائج" : "No results found"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
