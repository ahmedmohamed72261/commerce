"use client";

import React from "react";

export  function FilterSkeleton() {
  return (
    <div className="space-y-6">
      {/* Categories Skeleton */}
      <div className="space-y-3">
        <div className="h-5 w-24 rounded animate-pulse bg-gray-200 dark:bg-muted/50" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-gray-300 dark:border-input bg-gray-100 dark:bg-muted/20 animate-pulse" />
              <div className="h-4 w-32 rounded animate-pulse bg-gray-200 dark:bg-muted/30" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-border/50" />

      {/* Brands Skeleton */}
      <div className="space-y-3">
        <div className="h-5 w-24 rounded animate-pulse bg-gray-200 dark:bg-muted/50" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-gray-300 dark:border-input bg-gray-100 dark:bg-muted/20 animate-pulse" />
              <div className="h-4 w-28 rounded animate-pulse bg-gray-200 dark:bg-muted/30" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-border/50" />

      {/* Price Skeleton */}
      <div className="space-y-3">
        <div className="h-5 w-24 rounded animate-pulse bg-gray-200 dark:bg-muted/50" />
        <div className="flex items-center gap-4">
          <div className="h-9 w-20 rounded animate-pulse bg-gray-200 dark:bg-muted/30" />
          <div className="h-px w-4 bg-gray-200 dark:bg-border" />
          <div className="h-9 w-20 rounded animate-pulse bg-gray-200 dark:bg-muted/30" />
        </div>
      </div>
    </div>
  );
}
