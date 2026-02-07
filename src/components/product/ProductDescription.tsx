"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useIsRTL } from "@/utils/rtl";

type Props = {
  description?: string;
  attributes?: Record<string, string | number>;
};

export const ProductDescription: React.FC<Props> = ({
  description,
  attributes,
}) => {
  const t = useTranslations("Product");
  const isRTL = useIsRTL();

  if (!description && (!attributes || Object.keys(attributes).length === 0))
    return null;

  return (
    <section className="space-y-4">
      {/* Description */}
      {description && (
        <div className="border-b border-neutral-200 dark:border-border pb-8">
          <h3 className="text-lg sm:text-2xl font-semibold text-neutral-900 dark:text-foreground mb-4">
            {t("description")}
          </h3>

          <p className="text-neutral-600 dark:text-muted-foreground leading-relaxed text-base sm:text-2xl max-w-4xl"> 
            {description}
          </p>
        </div>
      )}

      {/* Specifications Table */}
      {attributes && Object.keys(attributes).length > 0 && (
        <div>
          <h3 className="text-lg sm:text-2xl font-semibold text-neutral-900 dark:text-foreground mb-4">
            {isRTL ? "المواصفات" : "Specifications"}
          </h3>

          <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-border">
            {/* Rows */}
            <div className="divide-y divide-neutral-200 dark:divide-border">
              {Object.entries(attributes).map(([key, value], index) => (
                <div
                  key={key}
                  className={`
                    grid grid-cols-1 sm:grid-cols-12
                    px-5 py-4
                    transition-colors
                    ${
                      index % 2 === 0
                        ? "bg-white dark:bg-card"
                        : "bg-neutral-50 dark:bg-muted/30"
                    }
                    hover:bg-neutral-100 dark:hover:bg-muted/50
                  `}
                >
                  {/* Attribute */}
                  <div className="sm:col-span-4 text-base sm:text-xl font-medium text-black dark:text-foreground mb-1 sm:mb-0 truncate">
                    {key}
                  </div>

                  {/* Value */}
                  <div className="sm:col-span-8 text-base sm:text-xl font-semibold text-black dark:text-foreground truncate">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
