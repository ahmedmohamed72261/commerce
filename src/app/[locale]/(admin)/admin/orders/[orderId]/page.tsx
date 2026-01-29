"use client";

import { useOrderDetails } from "@/hooks/useOrderDetails";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Printer, ArrowLeft, Loader2, Package, Calendar, User, MapPin, CreditCard, Box } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { formatCurrency } from "@/utils/utils";

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { order, loading, error } = useOrderDetails(orderId);
  const router = useRouter();
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("AdminOrders");

  const handlePrint = () => {
    window.print();
  };

  const getProductName = (name: string | { en: string; ar: string }) => {
    if (!name) return "Unknown Product";
    if (typeof name === 'string') return name;
    return locale === 'ar' ? name.ar || name.en : name.en || name.ar;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const statusLabel = (s: string) => {
    switch (s) {
      case "completed":
        return t("status.completed");
      case "pending":
        return t("status.pending");
      case "cancelled":
        return t("status.cancelled");
      case "delivered":
        return t("status.delivered");
      default:
        return s;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[--color-primary]" />
        <p className="text-[--color-muted-foreground]">{t("loadingDetails")}</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <Package className="h-16 w-16 text-[--color-muted-foreground] opacity-50" />
        <h2 className="text-xl font-bold">{t("notFoundTitle")}</h2>
        <p className="text-[--color-muted-foreground]">{error || t("notFoundDesc")}</p>
        <Button onClick={() => router.back()} variant="outline">
          {t("goBack")}
        </Button>
      </div>
    );
  }

  // Extract data safely
  const items = order.items || [];
  const userData = (order.user ?? {}) as { firstName?: string; lastName?: string; email?: string; phone?: string };
  const shipping = order.shippingAddress || {};

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500" dir={isAr ? "rtl" : "ltr"}>
      <style jsx global>{`
        @media print {
          :root, .dark {
            --primary: #da292a !important; 
            --primary-foreground: #ffffff !important;
            --accent: #ff4757 !important;
            --accent-foreground: #ffffff !important;
            --background: #ffffff !important; 
            --foreground: #0f172a !important;
            --muted: #f1f5f9 !important;
            --muted-foreground: #64748b !important;
            --card: #ffffff !important;
            --card-foreground: #0f172a !important;
            --border: #e2e8f0 !important;
            --input: #e2e8f0 !important;
          }
          body {
            background-color: var(--background) !important;
            color: var(--foreground) !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
      {/* Actions Header - Hidden on Print */}
      <div className="flex items-center justify-between mb-8 print:hidden">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("backToOrders")}
        </Button>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            {t("printOrder")}
          </Button>
        </div>
      </div>

      {/* Print Header - Visible only on Print */}
      <div className="hidden print:flex flex-col items-center justify-center mb-8 border-b border-black pb-4">
        <div className="flex items-center gap-3">
          <img src="/images/logo-light.png" alt="Logo" className="h-10 w-auto object-contain" />
          <h1 className="text-2xl font-bold uppercase tracking-widest">DW4Computer</h1>
        </div>
        <p className="text-sm text-gray-500">{t("orderDetails")}</p>
      </div>

      {/* Order Content */}
      <div className="bg-card border border-border rounded-xl p-8 shadow-sm print:shadow-none print:border-none print:p-0">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-border pb-8 print:mb-2 print:pb-2 print:gap-2">
          <div>
            <h1 className="text-3xl font-bold text-foreground print:text-lg">{t("orderLabel")}_{order?.orderCode}</h1>
            {/* <h1 className="text-3xl font-bold text-foreground print:text-lg">Order #{String(order.orderId || order._id).slice(-8)}</h1> */}
            <p className="text-muted-foreground mt-2 flex items-center gap-2 print:text-[10px] print:mt-0">
              <Calendar className="h-4 w-4 print:hidden" />
              {t("placedOn")} {formatDate(order.createdAt || order.updatedAt)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 print:flex-row print:items-center print:gap-4">
              <span className={`
                px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide print:border print:px-2 print:py-0 print:text-[10px] print:h-fit
                ${order.status === 'delivered' ? 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' : 
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30' : 
                  order.status === 'cancelled' ? 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30' : 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}
              `}>
               {statusLabel(order.status)}
             </span>
             <p className="text-sm font-medium text-muted-foreground print:text-xs">
               {t("totalLabel")}: <span className="text-xl font-bold text-foreground print:text-sm">{formatCurrency(Number(order.totalAmount) || 0, locale as "en" | "ar")}</span>
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 print:grid-cols-2 print:gap-2 print:mb-4">
          {/* Customer Details */}
          <div className="space-y-4 print:space-y-1">
            <h3 className="text-lg font-bold flex items-center gap-2 text-foreground print:text-xs print:mb-1">
              <User className="h-5 w-5 text-primary print:hidden" />
              {t("customer")}
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 print:bg-transparent print:p-3 print:border print:border-gray-200 print:space-y-0 print:text-[10px]">
              <div className="grid grid-cols-[100px_1fr] gap-2 print:grid-cols-[60px_1fr]">
                <span className="text-sm text-muted-foreground print:text-[10px]">{t("name")}:</span>
                <span className="text-sm font-medium print:text-[10px]">{userData.firstName} {userData.lastName}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2 print:grid-cols-[60px_1fr]">
                <span className="text-sm text-muted-foreground print:text-[10px]">{t("email")}:</span>
                <span className="text-sm font-medium print:text-[10px]">{userData.email}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2 print:grid-cols-[60px_1fr]">
                <span className="text-sm text-muted-foreground print:text-[10px]">{t("phone")}:</span>
                <span className="text-sm font-medium print:text-[10px]">{userData.phone}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4 print:space-y-1">
            <h3 className="text-lg font-bold flex items-center gap-2 text-foreground print:text-xs print:mb-1">
              <MapPin className="h-5 w-5 text-primary print:hidden" />
              {t("shipping")}
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 print:bg-transparent print:p-3 print:border print:border-gray-200 print:space-y-0 print:text-[10px]">
              <div className="grid grid-cols-[100px_1fr] gap-2 print:grid-cols-[60px_1fr]">
                <span className="text-sm text-muted-foreground print:text-[10px]">{t("address")}:</span>
                <span className="text-sm font-medium print:text-[10px]">
                  {shipping.building ? `${t("buildingShort")} ${shipping.building}, ` : ''}
                  {shipping.street}
                </span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2 print:grid-cols-[60px_1fr]">
                <span className="text-sm text-muted-foreground print:text-[10px]">{t("city")}:</span>
                <span className="text-sm font-medium print:text-[10px]">{shipping.city}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2 print:grid-cols-[60px_1fr]">
                <span className="text-sm text-muted-foreground print:text-[10px]">{t("details")}:</span>
                <span className="text-sm font-medium print:text-[10px]">
                  {shipping.floor ? `${t("floor")} ${shipping.floor}, ` : ''}
                  {shipping.apartment ? `${t("apartmentShort")} ${shipping.apartment}` : ''}
                </span>
              </div>
              {shipping.additionalInfo && (
                <div className="grid grid-cols-[100px_1fr] gap-2 print:grid-cols-[60px_1fr]">
                  <span className="text-sm text-muted-foreground print:text-[10px]">{t("note")}:</span>
                  <span className="text-sm font-medium italic print:text-[10px]">{shipping.additionalInfo}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="space-y-4 print:space-y-1">
          <h3 className="text-lg font-bold flex items-center gap-2 text-foreground print:hidden">
            <Box className="h-5 w-5 text-primary" />
            {t("orderItems")}
          </h3>
          <div className="border border-border rounded-lg overflow-hidden overflow-x-auto print:border-gray-300">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-muted text-muted-foreground font-medium uppercase text-xs print:bg-gray-100 print:text-black">
                <tr>
                  <th className="px-6 py-4 print:px-2 print:py-1 print:text-[10px]">{t("product")}</th>
                  <th className="px-6 py-4 text-center print:px-2 print:py-1 print:text-[10px]">{t("qty")}</th>
                  <th className="px-6 py-4 text-right print:px-2 print:py-1 print:text-[10px]">{t("price")}</th>
                  <th className="px-6 py-4 text-right print:px-2 print:py-1 print:text-[10px]">{t("total")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border print:divide-gray-200">
                {items.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors print:hover:bg-transparent">
                    <td className="px-6 py-4 print:px-2 print:py-1">
                      <div className="flex items-center gap-4 print:gap-2">
                        {item.product?.images?.[0] && (
                          <div className="h-12 w-12 rounded bg-white border border-border overflow-hidden flex-shrink-0 print:hidden">
                            <img 
                              src={item.product.images[0]} 
                              alt={getProductName(item.product.name)}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground print:text-[10px] print:font-bold">{getProductName(item.product?.name || item.name)}</p>
                          <p className="text-xs text-muted-foreground print:text-[9px] print:hidden">SKU: {item.product?._id?.slice(-6) || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center print:px-2 print:py-1 print:text-[10px]">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-right print:px-2 print:py-1 print:text-[10px]">
                      {formatCurrency(Number(item.unitPrice) || 0, locale as "en" | "ar")}
                    </td>
                    <td className="px-6 py-4 text-right font-medium print:px-2 print:py-1 print:text-[10px]">
                      {formatCurrency((Number(item.unitPrice) || 0) * (Number(item.quantity) || 0), locale as "en" | "ar")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block mt-8 text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
          <p>{t("thanksFooter")}</p>
          <p>www.dw4computer.com</p>
        </div>
      </div>
    </div>
  );
}
