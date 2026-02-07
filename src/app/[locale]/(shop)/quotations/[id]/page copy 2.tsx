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
    <div className="min-h-screen bg-zinc-200 py-10 print:p-0 print:m-0 print:bg-white">
      
      {/* Action Bar */}
      <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center px-4 print:hidden">
        <button onClick={() => window.history.back()} className="text-[11px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <ArrowLeft size={16} strokeWidth={3} /> {t("quotationDetails")}
        </button>
        <Button onClick={() => window.print()} className="bg-red-600 text-white font-black px-10 h-12 rounded-none">
          <Printer className="mr-2 h-5 w-5" /> {t("print").toUpperCase()}
        </Button>
      </div>

      {/* Main Sheet */}
      <div 
        id="bill-sheet"
        dir={dir}
        className="mx-auto w-[210mm] bg-white flex flex-col shadow-2xl print:shadow-none print:w-full print:min-h-screen"
      >
        {/* TOP RED BAR - This will now touch the paper edge */}
        <div className="h-[15px] bg-red-600 w-full print:h-[20px]" />

        {/* HEADER */}
        <div className="p-10 pb-8 flex justify-between items-start border-b border-zinc-100">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase leading-none">
              .DEVWORLD
            </h2>
          </div>

          <div className="text-right rtl:text-left space-y-4">
            <div className="bg-black text-white px-6 py-4 inline-block min-w-[200px]">
              <p className="text-[14px] font-black font-bold uppercase tracking-widest opacity-60 mb-1">رقم العرض</p>
              <p className="text-xl font-bold tabular-nums">{quotation?.quotationCode || "DWQ0011"}</p>
            </div>
            <p className="text-[11px] font-black text-zinc-900 uppercase tracking-widest block">
               2026/1/28
            </p>
          </div>
        </div>

        {/* CLIENT INFO */}
        <div className="px-10 py-8 bg-zinc-50/50 border-b border-zinc-100">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 text-right rtl:text-left">العميل</p>
          <h3 className="text-3xl font-black text-zinc-900 uppercase tracking-tight leading-none text-right rtl:text-left">
            MAGED3 MAGED3
          </h3>
        </div>

        {/* TABLE - Expands naturally */}
        <div className="px-10 py-10 flex-grow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white text-[11px] font-black uppercase tracking-widest">
                <th className="p-5 text-left rtl:text-right">{t("items")}</th>
                <th className="p-5 text-center w-28">{t("quantity")}</th>
                <th className="p-5 text-right rtl:text-left w-40">{t("total")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {quotation?.items?.map((item: any, i: number) => (
                <tr key={i} className="align-top print:break-inside-avoid">
                  <td className="py-6 pr-8">
                    <p className="font-black text-zinc-900 text-[16px] uppercase tracking-tight mb-2 text-left rtl:text-right">
                      {item.productName || "Technical Product"}
                    </p>
                  </td>
                  <td className="py-6 text-center font-black text-zinc-900 text-base tabular-nums">{item.quantity}</td>
                  <td className="py-6 text-right rtl:text-left font-black text-zinc-900 text-lg tabular-nums">
                    ${item.totalItemPrice?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="p-10 bg-white border-t-4 border-zinc-900 print:break-inside-avoid">
          <div className="flex justify-between items-end gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-zinc-900 uppercase tracking-widest border-b-2 border-red-600 inline-block">ملاحظات</p>
                <p className="text-[11px] font-bold text-zinc-400  max-w-sm">جيد هذا العرض</p>
              </div>
              <div className="flex gap-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                <span className="flex items-center gap-2"><Globe size={16} className="text-red-600" /> DEVWORLD.COM</span>
                <span className="flex items-center gap-1.5"><Mail size={16} className="text-red-600" /> BILLING@DEVWORLD.COM</span>
              </div>
            </div>

            <div className="w-80 space-y-4">
              <div className="flex justify-between items-center text-xs font-black uppercase text-zinc-400 px-1 tracking-widest">
              </div>
              <div className="bg-black text-white p-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-3 opacity-60 text-center leading-none">الإجمالي</p>
                <p className="text-5xl font-black text-center tabular-nums leading-none  tracking-tighter">${quotation?.subtotal?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* 1. Force Browser to 0 margin */
        @page { 
          size: A4; 
          margin: 0 !important; 
        }

        @media print {
          /* 2. Remove default browser headers/footers */
          @page { margin: 0; }
          
          body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* 3. Pull content to absolute top */
          #bill-sheet {
            margin-top: 0 !important;
            padding-top: 0 !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
          }

          /* 4. Fix blank page: hide any potential overflow */
          html, body {
            overflow: visible !important;
            height: auto !important;
          }

          /* 5. Prevent slicing of critical elements */
          tr, .print\:break-inside-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          .print\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}