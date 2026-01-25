  "use client";

  import React from 'react';
  import { Button } from '@/components/ui/button';
  import { ShoppingCart, Trash2 } from 'lucide-react';
  import { useTranslations } from 'next-intl';

  interface CartSummaryProps {
    totalAmount: number;
    itemCount: number;
    onCheckout: () => void;
    onClearCart: () => void;
  }

  export const CartSummary: React.FC<CartSummaryProps> = ({ 
    totalAmount, 
    itemCount,
    onCheckout,
    onClearCart
  }) => {
    const t = useTranslations('cart');

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
            <span className="text-sm md:text-md lg:text-lg font-black dark:text-foreground">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-muted-foreground font-bold">
              {t('summary.shipping')}   
            </span>
            <span className="text-sm md:text-md lg:text-lg font-bold text-green-600">
              {t('summary.free')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-muted-foreground font-bold">
              {t('summary.tax')}
            </span>
            <span className="text-sm md:text-md lg:text-lg font-black dark:text-foreground">${(totalAmount * 0.08).toFixed(2)}</span> 
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-border pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-md lg:text-lg font-black uppercase">
              {t('summary.total')}  
            </span>
            <span className="text-sm md:text-md lg:text-lg font-black text-red-600 dark:text-primary tracking-tighter">
              ${totalAmount.toFixed(2)}
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
