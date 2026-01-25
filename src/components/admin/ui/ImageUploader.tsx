"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Plus } from "lucide-react";
import { cn } from "@/utils/utils";
import { useTranslations, useLocale } from "next-intl";
import { useIsRTL } from "@/utils/rtl";

export type ImageUploaderProps = {
  files: File[];
  onChange: (files: File[]) => void;
  multiple?: boolean;
  className?: string;
  gridCols?: 1 | 2 | 3 | 4 | 5 | 6;
  label?: string;
};

export function ImageUploader({
  files,
  onChange,
  multiple = true,
  className,
  gridCols = 4,
  label,
}: ImageUploaderProps) {
  const t = useTranslations("Uploader");
  const locale = useLocale() as "en" | "ar";
  const isRTL = useIsRTL();
  const [previews, setPreviews] = useState<string[]>([]);
  const prevUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    prevUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    prevUrlsRef.current = urls;
    return () => {
      prevUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      prevUrlsRef.current = [];
    };
  }, [files]);

  const gridClass = useMemo(() => {
    const colsMap = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };
    return cn("grid gap-4 mt-6", colsMap[gridCols as keyof typeof colsMap] || "grid-cols-4");
  }, [gridCols]);

  const removeAt = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    onChange(next);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    const next = multiple ? [...files, ...selected] : selected.slice(0, 1);
    onChange(next);
  };

  return (
    <div className={cn("w-full", className)} dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* THE DROPZONE: SQUIRCLE GLASS STYLE */}
      <div 
        className={cn(
          "relative group overflow-hidden transition-all duration-500 ease-out",
          "border-2 border-dashed border-slate-200 dark:border-border hover:border-indigo-400 dark:hover:border-primary",
          "bg-slate-50/50 dark:bg-muted/20 hover:bg-white dark:hover:bg-muted/40 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]",
          "rounded-[32px] p-10 text-center cursor-pointer"
        )}
      >
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleSelect}
          className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
        />
        
        {/* Decorative Background Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 dark:bg-primary/5 blur-[50px] rounded-full group-hover:bg-indigo-500/10 dark:group-hover:bg-primary/10 transition-colors" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 p-4 rounded-[22px] bg-white dark:bg-card shadow-sm border border-slate-100 dark:border-border group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
            <Upload className="text-indigo-500 dark:text-primary" size={28} strokeWidth={2.5} />
          </div>
          
          <h4 className="text-sm font-bold text-slate-700 dark:text-foreground tracking-tight">
            {label ?? (multiple ? t("clickToUploadImages") : t("clickToUploadImage"))}
          </h4>
          <p className="mt-1 text-[11px] font-medium text-slate-400 dark:text-muted-foreground uppercase tracking-widest">
            PNG, JPG up to 10MB
          </p>
        </div>
      </div>

      {/* THE PREVIEW GRID */}
      {previews.length > 0 && (
        <div className={gridClass}>
          {previews.map((src, i) => (
            <div 
              key={i} 
              className="group relative aspect-square rounded-[24px] overflow-hidden bg-slate-100 dark:bg-muted/50 border border-slate-200 dark:border-border shadow-sm"
            >
              <img 
                src={src} 
                alt="Preview" 
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
              />
              
              {/* Glassmorphic Overlay on Hover */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className={cn(
                    "bg-white/90 hover:bg-rose-500 hover:text-white text-slate-900",
                    "shadow-xl backdrop-blur-md rounded-full p-2.5 transition-all duration-300 transform scale-75 group-hover:scale-100"
                  )}
                  aria-label="Remove image"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              </div>

              {/* Index Badge */}
              <div className={cn(
                "absolute bottom-3 text-[10px] font-black bg-white/80 dark:bg-black/60 dark:text-white backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm",
                isRTL ? "left-3" : "right-3"
              )}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}

          {/* ADD MORE MINI-TRIGGER (Only if multiple) */}
          {multiple && (
            <div className="relative aspect-square rounded-[24px] border-2 border-dashed border-slate-200 dark:border-border hover:border-indigo-300 dark:hover:border-primary bg-slate-50/30 dark:bg-muted/10 flex items-center justify-center group transition-colors">
                 <input
                    type="file"
                    multiple={multiple}
                    accept="image/*"
                    onChange={handleSelect}
                    className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                />
                <Plus className="text-slate-300 dark:text-muted-foreground group-hover:text-indigo-400 dark:group-hover:text-primary transition-colors" size={24} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}