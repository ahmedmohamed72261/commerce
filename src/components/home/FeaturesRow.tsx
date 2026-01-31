import { useTranslations, useLocale } from "next-intl";
import { Smartphone, Gift, Wallet2, MessageSquare, Truck } from "lucide-react";
import { cn } from "@/utils/utils";

export function FeaturesRow() {
  const t = useTranslations("Features");
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  const items = [
    { icon: Smartphone, title: t("shopAllDay"), desc: t("shopAllDayDesc") },
    { icon: Gift, title: t("ongoingOffers"), desc: t("ongoingOffersDesc") },
    { icon: Wallet2, title: t("payLater"), desc: t("payLaterDesc") },
    { icon: MessageSquare, title: t("contactUs"), desc: t("contactUsDesc") },
    { icon: Truck, title: t("freeShipping"), desc: t("freeShippingDesc") },
  ];

  return (
    <section className="mt-3 mb-3 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 bg-gray-50 dark:bg-card border border-border rounded-[--radius] overflow-hidden">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div 
              key={i} 
              className="group relative bg-card p-6 flex flex-col items-center text-center gap-6 transition-all duration-300 hover:bg-muted"
              dir={isAr ? "rtl" : "ltr"}
            >
              {/* Status LED: Small Red Dot */}
              <div className="absolute top-6 right-6 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/40 group-hover:bg-primary transition-colors"></span>
              </div>

              {/* Icon: Sharp and Raw */}
              <div className="relative text-muted-foreground group-hover:text-foreground transition-all duration-500 group-hover:-translate-y-1">
                <Icon size={32} strokeWidth={1} />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-[0.3em] text-foreground leading-none">
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base md:text-lg font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                   {item.desc}
                </p>
              </div>

              {/* Your Global Progress Animation on the cell floor */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
                <div className="h-full bg-primary w-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}