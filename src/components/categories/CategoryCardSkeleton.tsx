"use client";

import React from "react";

export const CategoryCardSkeleton: React.FC<{ viewMode?: "grid" | "list" }> = ({
  viewMode = "grid",
}) => {
  return (
    <div
      className={`
        group bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl p-2
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${viewMode === "grid" ? "flex flex-col" : "flex items-center gap-10"}
      `}
    >
      <div
        className={`
          relative overflow-hidden bg-slate-100 dark:bg-muted rounded-2xl shrink-0
          ${viewMode === "grid" ? "md:h-60 h-40 w-full mb-2" : "h-15 w-15"}
        `}
      >
        <div className="absolute inset-3 rounded-2xl bg-gradient-to-r from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
      </div>

      <div className="flex-1 flex flex-col px-1 gap-3">
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded-full bg-gradient-to-r from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
          <div className="h-3 w-1/2 rounded-full bg-gradient-to-r from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
        </div>

        {viewMode === "list" && (
          <div className="mt-1 h-6 w-16 rounded-full bg-gradient-to-r from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer self-end" />
        )}

        <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100 dark:border-border">
          <div className="h-6 w-16 rounded-full bg-gradient-to-r from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-slate-200/70 via-slate-300/50 to-slate-200/70 dark:from-slate-700/70 dark:via-slate-800/50 dark:to-slate-700/70 bg-[length:200%_100%] animate-linkedin-shimmer" />
        </div>
      </div>
    </div>
  );
};
