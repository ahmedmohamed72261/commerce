"use client";

import { useEffect, useState } from "react";
import { getMyQuotations } from "@/services/quotations.service";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, FileText } from "lucide-react";
import { formatCurrency } from "@/utils/utils";

export default function MyQuotationsPage() {
    const t = useTranslations("Quotations");
    const locale = useLocale();
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
        return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">{t("myQuotations")}</h1>
            <div className="space-y-4">
                {quotations.map((q) => (
                    <div key={q.id || q._id} className="p-6 border rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 bg-card hover:shadow-md transition-shadow">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold">{q.quotationCode || "Q-" + (q.id || q._id).slice(-6)}</h3>
                                <span className="text-xs bg-neutral-100 dark:bg-muted px-2 py-1 rounded">
                                    {q.date || q.createdAt ? new Date(q.date || q.createdAt).toLocaleDateString(String(locale), { year: "numeric", month: "short", day: "numeric" }) : "N/A"}
                                </span>
                            </div>
                            <p className="text-muted-foreground">{q.items?.length || q.itemCount} {t("items")} | {t("total")}: {formatCurrency(Number(q.subtotal || 0), String(locale) === "ar" ? "ar" : "en")}</p>
                            {q.notes && <p className="text-sm text-muted-foreground mt-2 italic">"{q.notes}"</p>}
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/${locale}/quotations/${q.id || q._id}`}>
                                <Button variant="outline">
                                    <FileText className="mr-2 h-4 w-4" />
                                    {t("quotationDetails")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
                {quotations.length === 0 && (
                    <div className="text-center p-10 text-muted-foreground">
                        {t("empty")}
                    </div>
                )}
            </div>
        </div>
    );
}
