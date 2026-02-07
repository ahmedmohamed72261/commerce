"use client";

import { useEffect, useState } from "react";
import { getQuotationById } from "@/services/quotations.service";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2, Printer, ArrowLeft, Globe, Mail, Phone, CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/utils";
import { siteConfig } from "@/config/site";

export default function QuotationDetailsPage() {
  const t = useTranslations("Quotations");
  const tProduct = useTranslations("Product");
  const { id } = useParams();
  const [quotation, setQuotation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState("");
  const locale = useLocale() as "en" | "ar";
  const isRTL = locale === "ar";

  useEffect(() => {
    if (id) {
      getQuotationById(id as string)
        .then((res) => {
          const data = res.data.data || res.data;
          setQuotation(data);
          setClientName(data.userSnapshot?.fullName || data.user?.name || "");
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-4 print:p-0 print:bg-white" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Control Bar */}
      <div className="max-w-[210mm] mx-auto mb-4 flex justify-between px-4 print:hidden">
        <Button variant="outline" size="sm" onClick={() => window.history.back()} className="rounded-md border-border">
          <ArrowLeft className="mr-2 h-4 w-4" /> {locale === "ar" ? "رجوع" : "Back"}
        </Button>
        <Button onClick={() => window.print()} className="bg-primary hover:opacity-90 text-white font-bold px-8 shadow-md">
          <Printer className="mr-2 h-4 w-4" /> {t("print")}
        </Button>
      </div>

      {/* The Master Sheet */}
      <div className="relative mx-auto md:w-[210mm] md:min-h-[297mm] w-full bg-white print:w-full print:min-h-screen print:absolute print:top-0 print:left-0 shadow-sm print:shadow-none md:p-[10mm] p-4 flex flex-col overflow-hidden border border-slate-200 print:border-none">
        
        {/* Header: Compact & Professional */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 pb-4 md:pb-6 border-b-4 border-foreground gap-3">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black tracking-tighter text-foreground ">{siteConfig.name}</h2>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              <span className="flex items-center gap-1"><Globe size={10} className="text-primary" /> {new URL(siteConfig.url).host}</span>
              <span className="flex items-center gap-1"><Mail size={10} className="text-primary" /> info@{new URL(siteConfig.url).host}</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{t("quotationDetails")}</p>
            <p className="text-base md:text-lg font-mono font-black text-foreground">{quotation.quotationCode || "DWQ-0009"}</p>
          </div>
        </div>

        {/* Compact Info Strip: Replaced the bulky card */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-slate-50 border-y border-slate-200 py-3 px-4 md:px-6 mb-4 md:mb-6 gap-3">
          <div className="flex gap-6 md:gap-10">
            <div>
              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">{t("customer")}</p>
              <p className="text-xs md:text-sm font-bold text-foreground uppercase tracking-tight leading-none">{clientName || "Maged3 Maged3"}</p>
            </div>
            <div className="md:border-l md:border-slate-300 md:pl-10">
              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">{t("generatedDate")}</p>
              <p className="text-xs font-bold text-foreground leading-none">
                {new Date().toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary opacity-80">
            <CheckCircle2 size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">{t("status")}</span>
          </div>
        </div>

        {/* The Table: Visible Borders & Shading */}
        <div className="flex-grow border border-slate-200 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-left border-collapse">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-2 md:p-3 text-[14px] md:text-[16px] text-center font-black uppercase tracking-widest text-foreground border-r border-slate-200">{tProduct("description")}</th>
                <th className="p-2 md:p-3 text-center text-[14px] md:text-[16px] font-black uppercase tracking-widest text-foreground w-16 border-r border-slate-200">{t("quantity")}</th>
                <th className="p-2 md:p-3 text-center text-[14px] md:text-[16px] font-black uppercase tracking-widest text-foreground w-32 border-r border-slate-200">{t("price")}</th>
                <th className="p-2 md:p-3 text-center text-[14px] md:text-[16px] font-black uppercase tracking-widest text-foreground w-32">{t("total")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotation.items.map((item: any, i: number) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="p-3 md:p-4 border-r border-slate-200">
                    <p className="font-bold text-center text-foreground text-[12px] md:text-[13px] uppercase tracking-tight">
                      {typeof (item.productName || item.product?.name) === "string"
                        ? (item.productName || item.product?.name)
                        : ((item.productName || item.product?.name)?.[locale === "ar" ? "ar" : "en"] ?? "")}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-center text-muted-foreground mt-0.5 leading-tight ">{item.productDescription || "Service implementation."}</p>
                  </td>
                  <td className="p-3 md:p-4 text-center font-mono text-xs md:text-sm border-r border-slate-200">{item.quantity}</td>
                  <td className="p-3 md:p-4 text-center font-mono text-xs md:text-sm text-muted-foreground border-r border-slate-200">{formatCurrency(item.unitPriceSnapshot || item.productPrice, locale)}</td>
                  <td className="p-3 md:p-4 text-center font-mono font-black text-foreground text-xs md:text-sm tracking-tighter">
                    {formatCurrency(item.totalItemPrice || ((item.unitPriceSnapshot || item.productPrice) * item.quantity), locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Financial Summary: Tightened */}
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4 break-inside-avoid">
          <div className="md:max-w-[340px] border-l-2 border-primary pl-4 py-1">
             <p className="text-[11px] font-black text-foreground uppercase tracking-widest mb-0.5">{t("notes")}</p>
             <p className="text-[10px] text-muted-foreground  leading-tight">
               {locale === "ar" 
                 ? "نشكركم على اختياركم لنا. لأي استفسار، يرجى التواصل مع الدعم."
                 : "Thank you for your business. For any inquiries, please contact support."}
             </p>
          </div>

          <div className="md:w-64 space-y-1">
            <div className="flex flex-col items-center justify-between pt-2 md:pt-4">
              <span className="text-lg md:text-xl font-black uppercase text-primary tracking-[0.3em]">{t("total")}</span>
              <span className="text-lg md:text-xl font-black text-foreground font-mono tracking-tighter tabular-nums leading-none underline decoration-primary/30 decoration-4 underline-offset-4">
                {formatCurrency(quotation.subtotal || 0, locale)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Single Line */}
        <div className="mt-6 md:mt-8 pt-4 border-t border-slate-200 flex justify-between text-[8px] font-bold text-muted-foreground uppercase tracking-[0.5em] opacity-40">
           <span>{locale === "ar" ? "توثيق رقمي DW-26" : "Digital Auth DW-26"}</span>
           <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        </div>
      </div>

      <style jsx global>{`
        @page { size: A4; margin: 0; }
        @media print {
          body { margin: 0 !important; padding: 0 !important; }
          .print\:absolute { position: absolute !important; top: 0 !important; left: 0 !important; }
          .container, button { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
}
