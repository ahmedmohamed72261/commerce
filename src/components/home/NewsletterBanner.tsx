import { useTranslations, useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Send } from "lucide-react";
import { cn } from "@/utils/utils";

export function NewsletterBanner() {
  const t = useTranslations("Newsletter");
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  return (
    <section className="relative rounded-[--radius] bg-card border border-border overflow-hidden group">
      {/* Background: Pure Ink with a sharp Primary strike */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none transition-transform group-hover:translate-x-1/3 duration-700" />
      
      <div className="relative px-8 py-4 md:px-10 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl animate-fade-up">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[2px] w-12 bg-primary" />
            <span className="text-primary text-[11px] font-black uppercase tracking-[0.5em]">
              {isAr ? "انضم للمخبة" : "Join the Elite"}
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.8] uppercase ">
            {t("title")}
          </h3>
          <p className="mt-8 text-muted-foreground text-xl font-medium max-w-md leading-tight">
            {t("subtitle")}
          </p>
        </div>

        <form
          className="relative w-full lg:w-auto"
          onSubmit={(e) => e.preventDefault()}
          dir={isAr ? "rtl" : "ltr"}
        >
          {/* Glass Input Container */}
          <div className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-3 backdrop-blur-md">
            <Input
              placeholder={t("placeholder")}
              className="bg-transparent border-none text-foreground placeholder:text-muted-foreground/40 h-14 px-6 focus-visible:ring-0 w-full lg:w-[320px] text-lg font-bold"
            />
            <Button 
              type="submit" 
              className="relative overflow-hidden w-full sm:w-auto h-14 px-10 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-[12px] transition-all hover:brightness-110 active:scale-95 rounded-xl group/btn"
            >
              <span className="relative z-10 flex items-center gap-3">
                 {t("cta")} <Send size={18} className={isAr ? "rotate-180" : ""} />
              </span>
              {/* Shimmer from your Global Theme */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}