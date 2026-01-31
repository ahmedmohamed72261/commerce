"use client";

import { useEffect, useState } from "react";
import { getMyQuotations } from "@/services/quotations.service";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, FileText, ChevronRight, Hash, Calendar, Package } from "lucide-react";
import { formatCurrency, cn } from "@/utils/utils";

export default function MyQuotationsPage() {
    const t = useTranslations("Quotations");
    const locale = useLocale();
    const isAr = locale === "ar";
    const [quotations, setQuotations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyQuotations()
            .then((res) => {
                setQuotations(res.data.data || []);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <span className="text-xs font-black uppercase tracking-[0.3em] animate-pulse">
                    {isAr ? "جاري التحميل..." : "Retrieving Records..."}
                </span>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 md:py-16 px-4 max-w-5xl" dir={isAr ? "rtl" : "ltr"}>
            {/* Header: Brutalist Aesthetic */}
            <header className="mb-12 animate-fade-up">
                <div className="flex items-center gap-3 text-primary mb-2">
                    <Hash size={16} strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">
                        {isAr ? "سجل الطلبات" : "Order History"}
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-foreground leading-none">
                    {t("myQuotations")}
                </h1>
            </header>

            <div className="space-y-6">
                {quotations.map((q, i) => (
                    <div 
                        key={q.id || q._id} 
                        className="glass-panel group relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-[--radius] bg-card hover:border-primary/40 transition-all duration-500 animate-fade-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        {/* 1. Status & ID Section */}
                        <div className="flex flex-col items-center md:items-start gap-1 w-full md:w-48 shrink-0">
                            <span className="text-primary font-black text-xl tracking-tighter italic">
                                #{q.quotationCode || (q.id || q._id).slice(-6).toUpperCase()}
                            </span>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar size={12} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                    {q.date || q.createdAt ? new Date(q.date || q.createdAt).toLocaleDateString(String(locale), { year: "numeric", month: "short", day: "numeric" }) : "N/A"}
                                </span>
                            </div>
                        </div>

                        {/* 2. Divider for Desktop */}
                        <div className="hidden md:block h-12 w-px bg-border" />

                        {/* 3. Info Section */}
                        <div className="flex-1 text-center md:text-start space-y-2">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-1.5 text-foreground font-bold text-sm">
                                    <Package size={14} className="text-primary" />
                                    {q.items?.length || q.itemCount} {t("items")}
                                </div>
                                <div className="h-1 w-1 rounded-full bg-border" />
                                <div className="text-foreground font-black text-lg">
                                    {formatCurrency(Number(q.subtotal || 0), String(locale) === "ar" ? "ar" : "en")}
                                </div>
                            </div>
                            {q.notes && (
                                <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg italic border-l-2 border-primary/30 max-w-md mx-auto md:mx-0">
                                    "{q.notes}"
                                </p>
                            )}
                        </div>

                        {/* 4. Action Section */}
                        <div className="w-full md:w-auto">
                            <Link href={`/${locale}/quotations/${q.id || q._id}`} className="block w-full">
                                <Button 
                                    variant="outline" 
                                    className="w-full md:w-auto h-12 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] border-border hover:bg-primary hover:text-white hover:border-primary transition-all group/btn"
                                >
                                    {t("quotationDetails")}
                                    <ChevronRight className={cn("ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1", isAr && "rotate-180")} />
                                </Button>
                            </Link>
                        </div>

                        {/* Hover Accent Line */}
                        <div className="absolute left-0 top-0 h-full w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                    </div>
                ))}

                {/* Empty State */}
                {quotations.length === 0 && (
                    <div className="glass-panel p-20 flex flex-col items-center gap-6 rounded-[--radius] animate-fade-up">
                        <FileText size={64} className="text-muted-foreground/20" />
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-black uppercase tracking-tighter">{t("empty")}</h3>
                            <p className="text-muted-foreground text-sm tracking-widest uppercase italic">Start requesting items to see your history here.</p>
                        </div>
                        <Link href="/">
                            <Button className="bg-primary text-white px-10 rounded-xl font-black uppercase tracking-widest text-[10px]">
                                {isAr ? "تسوق الآن" : "Browse Products"}
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}