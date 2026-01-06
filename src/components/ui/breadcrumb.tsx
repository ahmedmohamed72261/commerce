"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

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
        "w-full mt-16 py-6 bg-muted/40 text-muted-foreground border-b border-border backdrop-blur",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-12">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const content = isLast ? (
              <span className="font-semibold text-red-600">{item.label}</span>
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
                {!isLast && <span className="mx-2 text-muted-foreground">/</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
