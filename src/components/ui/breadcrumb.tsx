"use client";

import Link from "next/link";
import { cn } from "@/utils/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "w-full py-3 bg-white/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 backdrop-blur",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-12">
        <ol className="flex items-center gap-2 text-xs sm:text-sm">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const content = isLast ? (
              <span className="font-semibold text-red-600 dark:text-red-500">{item.label}</span>
            ) : item.href ? (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            );
            return (
              <li key={`${item.label}-${idx}`} className="flex items-center">
                {content}
                {!isLast && <span className="mx-2 text-slate-300 dark:text-slate-600">/</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
