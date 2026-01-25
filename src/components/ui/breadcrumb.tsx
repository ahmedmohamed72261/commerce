"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/utils/utils";
import { useLocale } from "next-intl";

export interface Crumb {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
}

export function Breadcrumb({
  items,
  className,
  showHome = true,
}: {
  items: Crumb[];
  className?: string;
  showHome?: boolean;
}) {
  const locale = useLocale();

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "w-full py-3 sm:py-4",
        "bg-white/95 dark:bg-card/95",
        "border-b border-slate-200/80 dark:border-border/80",
        "backdrop-blur-lg",
        "shadow-sm",
        "transition-all duration-300",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-12">
        <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm">
          {/* Home Icon - Always First */}
          {showHome && (
            <li className="flex items-center">
              <Link
                href={`/${locale}`}
                className="group flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-muted transition-all"
                aria-label="Home"
              >
                <Home className="w-4 h-4 text-slate-400 dark:text-muted-foreground group-hover:text-red-600 dark:group-hover:text-primary transition-colors" />
              </Link>
              <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-300 dark:text-slate-600" />
            </li>
          )}

          {/* Breadcrumb Items */}
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const Icon = item.icon;
            
            return (
              <li key={`${item.label}-${idx}`} className="flex items-center">
                {isLast ? (
                  <span className="flex items-center gap-1.5 px-2 py-1 font-bold text-slate-900 dark:text-foreground bg-slate-100 dark:bg-muted rounded-lg">
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span className="line-clamp-1">{item.label}</span>
                  </span>
                ) : item.href ? (
                  <>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-600 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-muted/50 transition-all font-medium"
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      <span>{item.label}</span>
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-300 dark:text-slate-600" />
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5 px-2 py-1 text-slate-600 dark:text-muted-foreground font-medium">
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      <span>{item.label}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-300 dark:text-slate-600" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
