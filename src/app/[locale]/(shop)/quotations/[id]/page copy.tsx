"use client";

import { useEffect, useState } from "react";
import { getQuotationById } from "@/services/quotations.service";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2, Printer, ArrowLeft, ShieldCheck, Globe, Mail } from "lucide-react";
import { useParams } from "next/navigation";

export default function QuotationDetailsPage() {
  const t = useTranslations("Quotations");
  const locale = useLocale() as "en" | "ar";
  const { id } = useParams();
  const [quotation, setQuotation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getQuotationById(id as string)
        .then((res) => {
          const data = res.data.data || res.data;
          setQuotation(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <Loader2 className="animate-spin text-red-600" size={32} />
    </div>
  );

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen bg-zinc-100 py-4 print:p-0 print:bg-white font-sans antialiased">
      
      {/* Control Bar - Hidden on Print */}
      <div className="max-w-[210mm] mx-auto mb-4 flex justify-between items-center px-4 print:hidden">
        <button onClick={() => window.history.back()} className="text-[11px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <ArrowLeft size={14} strokeWidth={3} /> {t("quotationDetails")}
        </button>
        <Button onClick={() => window.print()} className="bg-red-600 text-white font-black px-10 rounded-none text-[11px] h-11 shadow-xl hover:bg-red-700 transition-colors">
          <Printer className="mr-2 h-4 w-4" /> {t("print").toUpperCase()}
        </Button>
      </div>

      {/* A4 Sheet: Strict Size Lockdown */}
      <div 
        id="bill-sheet"
        dir={dir}
        className="relative mx-auto w-[210mm] h-[290mm] bg-white print:w-[210mm] print:h-[290mm] flex flex-col overflow-hidden border-t-[12px] border-red-600 shadow-2xl print:shadow-none print:m-0 print:border-t-[15px]"
      >
        {/* TOP HEADER */}
        <div className="p-10 flex justify-between items-start border-b border-zinc-100">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">
              DevWorld<span className="text-red-600">.</span>
            </h2>
            <div className="flex items-center gap-3 border-2 border-red-600 text-red-600 px-4 py-1 font-black text-[10px] uppercase tracking-widest">
              <ShieldCheck size={14} strokeWidth={3} /> {t("status")}
            </div>
          </div>

          <div className="text-right rtl:text-left space-y-4">
            <div className="bg-zinc-900 text-white px-6 py-4 print:bg-black inline-block min-w-[180px]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">{t("quotationId")}</p>
              <p className="text-xl font-bold tabular-nums tracking-tight">#{quotation?.quotationCode || id?.toString().slice(-6).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">{t("date")}</p>
              <p className="text-sm font-black text-zinc-900">{new Date().toLocaleDateString(String(locale))}</p>
            </div>
          </div>
        </div>

        {/* CUSTOMER INFO */}
        <div className="px-10 py-8 flex justify-between items-center bg-zinc-50/50 border-b border-zinc-100">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{t("customer")}</p>
            <h3 className="text-2xl font-black text-zinc-900 tracking-tight uppercase leading-none">
              {quotation?.userSnapshot?.fullName || quotation?.user?.name || "—"}
            </h3>
          </div>
          <div className="text-right rtl:text-left">
             <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Transaction Ref</p>
             <p className="text-[11px] font-bold text-zinc-900 tabular-nums uppercase">{id?.toString().slice(0,16)}</p>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="flex-1 px-10 pt-8 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white print:bg-black">
                <th className="p-4 text-[11px] font-black uppercase text-left rtl:text-right">{t("items")}</th>
                <th className="p-4 text-center text-[11px] font-black uppercase w-24">{t("quantity")}</th>
                <th className="p-4 text-right rtl:text-left text-[11px] font-black uppercase w-40">{t("total")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {quotation?.items?.map((item: any, i: number) => (
                <tr key={i} className="align-top">
                  <td className="py-6 pr-6">
                    <p className="font-black text-zinc-900 text-[15px] uppercase tracking-tight mb-1 leading-none">
                      {item.productName || item.product?.name?.en || item.product?.name}
                    </p>
                    <p className="text-[11px] font-bold text-zinc-400 uppercase line-clamp-2 max-w-md leading-relaxed">
                      {item.productDescription || "Enterprise technical solution deliverable."}
                    </p>
                  </td>
                  <td className="py-6 text-center font-black text-zinc-900 text-sm tabular-nums">{item.quantity}</td>
                  <td className="py-6 text-right rtl:text-left font-black text-zinc-900 text-base tabular-nums">
                    ${(item.totalItemPrice || ((item.unitPriceSnapshot || 1) * item.quantity)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTTOM SECTION - PINNED TO BOTTOM */}
        <div className="mt-auto p-10 bg-white">
          <div className="flex justify-between items-end gap-12 border-t-4 border-zinc-900 pt-8">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] font-black text-zinc-900 uppercase tracking-widest border-b-2 border-red-600 inline-block">{t("notes")}</p>
                <p className="text-[12px] font-bold text-zinc-400 leading-relaxed max-w-xs">{quotation?.notes || "Certified digital record."}</p>
              </div>
              <div className="flex gap-6 text-[10px] font-black text-zinc-300 uppercase tracking-widest">
                <span className="flex items-center gap-2"><Globe size={14} className="text-red-600" /> devworld.com</span>
                <span className="flex items-center gap-2"><Mail size={14} className="text-red-600" /> billing@devworld.com</span>
              </div>
            </div>

            <div className="w-80 space-y-4">
              <div className="flex justify-between text-xs font-black uppercase text-zinc-400 px-2 tracking-widest">
                <span>{t("subtotal")}</span>
                <span className="text-zinc-900">${quotation?.subtotal?.toLocaleString()}</span>
              </div>
              <div className="bg-red-600 text-white p-8 shadow-2xl print:bg-black print:shadow-none">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-2 opacity-70 text-center">{t("total")}</p>
                <p className="text-4xl font-black text-center  leading-none tabular-nums">${quotation?.subtotal?.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-[10px] font-black text-zinc-200 uppercase tracking-[1em]">
            DEVWORLD — {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <style jsx global>{`
        @page { 
          size: A4; 
          margin: 0 !important; 
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: 100%;
            overflow: hidden !important;
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #bill-sheet {
            position: fixed !important; /* Forces layout to lock to the viewport */
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 290mm !important; /* Strict height prevents page break */
            width: 210mm !important;
            margin: 0 auto !important;
            border-bottom: none !important;
          }
          .print\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}