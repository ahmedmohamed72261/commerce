  "use client";

import React, { useState } from 'react';
  import { Button } from '@/components/ui/button';
  import { ShoppingCart, Trash2, Tag, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { formatCurrency } from '@/utils/utils';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

  interface CartSummaryProps {
    totalAmount: number;
    itemCount: number;
    onCheckout: () => void;
    onClearCart: () => void;
    coupon: {
      code: string;
      discountAmount: number;
      discountPercentage: number;
      totalAfterDiscount: number;
    } | null;
    onApplyCoupon: (code: string) => Promise<boolean>;
    onRemoveCoupon: () => void;
  }

  export const CartSummary: React.FC<CartSummaryProps> = ({ 
    totalAmount, 
    itemCount,
    onCheckout,
    onClearCart,
    coupon,
    onApplyCoupon,
    onRemoveCoupon
  }) => {
    const t = useTranslations('cart');
    const locale = useLocale() as "en" | "ar";
    const [couponCode, setCouponCode] = useState("");
    const [applying, setApplying] = useState(false);

    const handleApplyCoupon = async () => {
      if (!couponCode.trim()) return;
      setApplying(true);
      const success = await onApplyCoupon(couponCode);
      if (success) {
        toast.success(locale === 'ar' ? 'تم تطبيق الكوبون بنجاح' : 'Coupon applied successfully');
        setCouponCode("");
      } else {
        toast.error(locale === 'ar' ? 'كوبون غير صالح' : 'Invalid coupon');
      }
      setApplying(false);
    };

    return (
      <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-8 sticky top-6">
        <h2 className="text-md md:text-lg lg:text-xl font-black uppercase tracking-tighter mb-6 border-b border-slate-100 dark:border-border pb-4">
          {t('summary.title')}
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-muted-foreground font-bold">
              {t('summary.subtotal', { count: itemCount })}  
            </span>
            <span className="text-sm md:text-md lg:text-lg font-black dark:text-foreground">{formatCurrency(totalAmount, locale)}</span>
          </div>
          {/* <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-muted-foreground font-bold">
              {t('summary.shipping')}   
            </span>
            <span className="text-sm md:text-md lg:text-lg font-bold text-green-600">
              {t('summary.free')}
            </span>
          </div> */}
          {/* <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-muted-foreground font-bold">
              {t('summary.tax')}
            </span>
            <span className="text-sm md:text-md lg:text-lg font-black dark:text-foreground">{formatCurrency(totalAmount * 0.08, locale)}</span> 
          </div> */}

          {coupon && (
            <div className="flex justify-between items-center text-green-600">
              <span className="font-bold flex items-center gap-1">
                <Tag size={14} />
                {locale === 'ar' ? 'خصم' : 'Discount'} ({coupon.code})
              </span>
              <span className="text-sm md:text-md lg:text-lg font-bold">
                -{formatCurrency(coupon.discountAmount, locale)}
              </span> 
            </div>
          )}
        </div>

        {/* Coupon Input */}
        <div className="mb-6">
           {!coupon ? (
             <div className="flex gap-2">
               <Input 
                 placeholder={locale === 'ar' ? 'رمز الكوبون' : 'Coupon Code'}
                 value={couponCode}
                 onChange={(e) => setCouponCode(e.target.value)}
                 className="h-10 bg-slate-50 dark:bg-muted"
               />
               <Button 
                 onClick={handleApplyCoupon}
                 disabled={applying || !couponCode}
                 size="sm"
                 className="h-10 px-4 bg-slate-900 dark:bg-primary text-white"
               >
                 {applying ? (locale === 'ar' ? 'جاري التطبيق...' : 'Applying...') : (locale === 'ar' ? 'تطبيق' : 'Apply')}
               </Button>
             </div>
           ) : (
             <div className="bg-green-100 dark:bg-card border border-green-200 rounded-xl p-3 flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <Tag size={16} className="text-green-600" />
                 <span className="font-bold text-sm text-green-700 dark:text-green-400">{coupon.code} applied</span>
               </div>
               <Button 
                 onClick={onRemoveCoupon}
                 variant="ghost" 
                 size="sm" 
                 className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
               >
                 <X size={14} />
               </Button>
             </div>
           )}
        </div>

        <div className="border-t border-slate-200 dark:border-border pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-md lg:text-lg font-black uppercase">
              {t('summary.total')}  
            </span>
            <span className="text-sm md:text-md lg:text-lg font-black text-red-600 dark:text-primary tracking-tighter">
              {formatCurrency(coupon ? coupon.totalAfterDiscount : totalAmount, locale)}
            </span>
          </div>
        </div>

        <Button 
          onClick={onCheckout}
          className="w-full h-14 flex justify-center items-center gap-2 rtl:flex-row-reverse bg-red-600 dark:bg-primary hover:bg-black dark:hover:bg-red-700 text-white rounded-xl text-sm md:text-md lg:text-lg font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 dark:shadow-primary/20 mb-3"
        >
          <ShoppingCart className="mr-2" size={18} />
          {t('summary.checkout')}
        </Button>

        <Button 
          onClick={onClearCart}
          variant="outline"
          className="w-full h-12 flex justify-center items-center gap-2 rtl:flex-row-reverse border-slate-200 dark:border-border hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-500 hover:border-red-200 dark:hover:border-red-800 rounded-xl text-sm md:text-md lg:text-lg font-black uppercase tracking-widest transition-all"
        >
          <Trash2 className="mr-2" size={16} />
          {t('summary.clearCart')}
        </Button>
      </div>
    );
  };
