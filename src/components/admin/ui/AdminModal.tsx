"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLocale } from "next-intl";
import { cn } from "@/utils/utils";

type AdminModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function AdminModal({
  open,
  onOpenChange,
  title,
  children,
  footer,
  className,
}: AdminModalProps) {
  const locale = useLocale() as "en" | "ar";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={cn(
          "sm:max-w-[820px] h-[80vh] bg-card dark:bg-card border border-gray-100 dark:border-border rounded-2xl shadow-2xl",
          "flex flex-col",
          className
        )}
      >
        <DialogHeader className="shrink-0 border-b border-gray-100 dark:border-border bg-white/95 dark:bg-card/95 backdrop-blur rounded-t-2xl px-6 py-4">
          <DialogTitle className="text-lg font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {footer && (
          <DialogFooter className="shrink-0 border-t border-gray-100 dark:border-border bg-white/95 dark:bg-card/95 backdrop-blur rounded-b-2xl px-6 py-4">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
