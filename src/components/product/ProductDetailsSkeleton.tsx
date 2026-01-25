"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-16">
      <div className="bg-card border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="h-3 w-24 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-card rounded-3xl shadow-md border border-border p-6 lg:p-10">
          <div className="lg:col-span-5 space-y-4">
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
            <div className="h-10 w-40 rounded-full bg-gradient-to-r from-red-100/70 via-red-200/50 to-red-100/70 dark:from-red-900/40 dark:via-red-800/50 dark:to-red-900/40 bg-[length:200%_100%] animate-linkedin-shimmer" />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="h-6 w-32 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
            <div className="h-10 w-64 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />

            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 rounded-2xl bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
              <div className="h-16 rounded-2xl bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
            </div>

            <div className="space-y-2 mt-2">
              <div className="h-3 w-full rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
              <div className="h-3 w-5/6 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
              <div className="h-3 w-2/3 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="h-11 w-40 rounded-full bg-gradient-to-r dark:from-slate-900/30 dark:via-slate-800/40 dark:to-slate-900/30 from-slate-100/70 via-slate-200/50 to-slate-100/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
              <div className="h-11 w-11 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
              <div className="h-11 w-11 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="bg-card rounded-3xl border border-border shadow-md p-6 md:p-10">
          <div className="h-4 w-40 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer mb-4" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
            <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
            <div className="h-3 w-3/5 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-linkedin-shimmer" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 inset-x-0 flex justify-center pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg shadow-red-500/20 border border-white/10">
          <Loader2 className="w-4 h-4 animate-spin text-red-400" />
          <span className="text-xs font-bold tracking-[0.25em] uppercase">
            Loading product layout
          </span>
        </div>
      </div>
    </div>
  );
};
