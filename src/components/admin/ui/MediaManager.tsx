"use client";
import React, { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X, RotateCcw, Plus, Image as ImageIcon } from "lucide-react";
import { cn } from "@/utils/utils";

type DisplayImage = {
  src: string;
  file?: File;
  original?: string;
};

type MediaManagerProps = {
  images: DisplayImage[];
  onRemove: (index: number) => void;
  onReplace: (index: number, file: File) => void;
  multipleNew?: boolean;
  onAddNew: (files: File[]) => void;
  gridCols?: 2 | 3 | 4;
};

export function MediaManager({
  images,
  onRemove,
  onReplace,
  multipleNew = true,
  onAddNew,
  gridCols = 3,
}: MediaManagerProps) {
  const t = useTranslations("AdminForm");
  const locale = useLocale() as "en" | "ar";
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});

  const triggerReplace = (index: number) => {
    fileInputs.current[index]?.click();
  };

  const gridClass = cn(
    "grid gap-4",
    gridCols === 2 ? "grid-cols-2" : gridCols === 4 ? "grid-cols-4" : "grid-cols-3"
  );

  return (
    <div className={gridClass} dir={locale === "ar" ? "rtl" : "ltr"}>
      {images.map((img, i) => (
        <div 
          key={i} 
          className="relative group aspect-square rounded-[24px] overflow-hidden bg-slate-100 dark:bg-muted/50 shadow-sm border border-slate-200/60 dark:border-border"
        >
          {/* Image Layer */}
          <img 
            src={img.src} 
            alt="" 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
          />

          {/* Premium Action Overlay */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/30 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => triggerReplace(i)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-card text-slate-900 dark:text-foreground shadow-xl hover:bg-white dark:hover:bg-card hover:scale-110 transition-all"
              title="Replace"
            >
              <RotateCcw size={16} strokeWidth={2.5} />
            </button>
            
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-500 text-white shadow-xl hover:bg-rose-600 hover:scale-110 transition-all"
              title="Remove"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Hidden Input for Replacement */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={(el) => {
              fileInputs.current[i] = el;
            }}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) onReplace(i, file);
            }}
          />

          {/* Badge for "New" files not yet saved */}
          {img.file && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-indigo-600/90 backdrop-blur-md text-[9px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">
              Unsaved
            </div>
          )}
        </div>
      ))}

      {/* Modern ADD Trigger */}
      {multipleNew && (
        <div className="relative aspect-square group">
          <input
            type="file"
            multiple
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
            onChange={e => {
              const selected = e.target.files ? Array.from(e.target.files) : [];
              onAddNew(selected);
            }}
          />
          <div className="w-full h-full border-2 border-dashed border-slate-200 dark:border-border rounded-[24px] bg-slate-50/50 dark:bg-muted/10 flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:border-indigo-400 dark:group-hover:border-primary group-hover:bg-indigo-50/30 dark:group-hover:bg-muted/20">
            <div className="p-3 rounded-2xl bg-white dark:bg-card shadow-sm border border-slate-100 dark:border-border group-hover:scale-110 transition-transform">
              <Plus size={20} className="text-indigo-500 dark:text-primary" strokeWidth={3} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-widest group-hover:text-indigo-500 dark:group-hover:text-primary transition-colors">
              Add More
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
