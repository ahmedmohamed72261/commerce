"use client";

import { useEffect, useState } from "react";
import { getAllQuotationsForAdmin } from "@/services/quotations.service";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, FileText, User, Calendar, DollarSign, ChevronRight } from "lucide-react";
import { WhiteCard } from "@/components/admin/ui/cards";
import { formatCurrency } from "@/utils/utils";

export default function AdminQuotationsPage() {
    const t = useTranslations("Quotations");
    const locale = useLocale() as "en" | "ar";  
    const [quotations, setQuotations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllQuotationsForAdmin()
            .then((res) => {
                setQuotations(res.data.data || []);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-fade-up">
                <Loader2 className="animate-spin text-primary" size={40} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Syncing Database</span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-10 animate-fade-up">
            {/* Header Section using Glass styling logic */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">
                        {t("title")}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="h-1 w-10 bg-primary rounded-full" />
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">Administration Logs</p>
                    </div>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[10px] font-black text-muted-foreground uppercase">Active Records</p>
                    <p className="text-2xl font-black text-primary leading-none">{quotations.length}</p>
                </div>
            </div>

            <div className="grid gap-6">
                {quotations.map((q) => (
                    <WhiteCard 
                        key={q.id || q._id} 
                        className="group relative overflow-hidden p-0 border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl"
                        style={{ borderRadius: 'var(--radius)' }}
                    >
                        {/* Subtle Shimmer Effect on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-[linear-gradient(45deg,transparent_25%,rgba(218,41,42,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-linkedin-shimmer" />

                        <div className="flex flex-col md:flex-row items-stretch md:items-center">
                            {/* Visual ID Component */}
                            <div className="p-6 md:p-8 flex-1">
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <div className="px-3 py-1 bg-muted rounded-full flex items-center gap-2 border border-border">
                                        <span className="text-[10px] font-black text-primary">#</span>
                                        <span className="text-xs font-bold tracking-tight uppercase">
                                            {q.quotationCode || (q.id || q._id).slice(-6)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                        <Calendar size={14} className="text-primary" />
                                        <span className="text-[11px] font-bold uppercase">
                                            {q.date || q.createdAt ? new Date(q.date || q.createdAt).toLocaleDateString() : "N/A"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black leading-none text-foreground uppercase tracking-tight">
                                            {q.userSnapshot?.fullName || q.user?.name || "Guest"}
                                        </h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-widest">Authorized Client</p>
                                    </div>
                                </div>
                            </div>

                            {/* Data & Actions Section with Glass Panel Style */}
                            <div className="md:w-[350px] p-6 md:p-8 bg-muted/50 dark:bg-muted/20 border-t md:border-t-0 md:border-l border-border flex flex-col sm:flex-row md:flex-col justify-between gap-6">
                                <div className="flex justify-between items-center md:items-start">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{t("items")}</p>
                                        <p className="font-bold text-base sm:text-xl">{q.items?.length || q.itemCount} Units</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-widest">{t("total")}</p>
                                        <p className="font-black text-xl text-foreground">{formatCurrency(q.subtotal || 0, locale)}</p>
                                    </div>
                                </div>

                                <Link href={`/${locale}/quotations/${q.id || q._id}`} target="_blank" className="block w-full">
                                    <Button 
                                        className="w-full bg-primary hover:bg-accent text-primary-foreground font-black uppercase text-[10px] tracking-[0.2em] h-12 shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
                                        style={{ borderRadius: 'calc(var(--radius) * 0.5)' }}
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        {t("generate")} / {t("print")}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </WhiteCard>
                ))}

                {quotations.length === 0 && (
                    <div className="text-center py-24 border-2 border-dashed border-border rounded-[var(--radius)] glass-panel">
                        <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="text-muted-foreground" size={32} />
                        </div>
                        <h3 className="text-base sm:text-xl font-black uppercase tracking-[0.3em] text-muted-foreground">
                            {t("empty")}
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
}