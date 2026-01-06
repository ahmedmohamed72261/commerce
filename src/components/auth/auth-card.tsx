"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AuthCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-16 bg-gradient-to-b from-background via-muted/30 to-background", className)}>
      <div className="container mx-auto px-4 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          whileHover={{ scale: 1.01 }}
          className="glass-panel mx-auto max-w-xl rounded-3xl border border-[var(--glass-border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-2xl ring-1 ring-black/5"
        >
          <div className="p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
            {description && (
              <p className="mt-3 text-sm md:text-base text-muted-foreground">{description}</p>
            )}
            <div className="mt-8">{children}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
