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
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sticky top-6">
        <h2 className="text-md md:text-lg lg:text-xl font-black uppercase tracking-tighter mb-6 border-b border-slate-100 pb-4">
          {t('summary.title')}
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 font-bold">
              {t('summary.subtotal', { count: itemCount })}  
            </span>
            <span className="text-sm md:text-md lg:text-lg font-black">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 font-bold">
              {t('summary.shipping')}   
            </span>
            <span className="text-sm md:text-md lg:text-lg font-bold text-green-600">
              {t('summary.free')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 font-bold">
              {t('summary.tax')}
            </span>
            <span className="text-sm md:text-md lg:text-lg font-black">${(totalAmount * 0.08).toFixed(2)}</span> 
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-md lg:text-lg font-black uppercase">
              {t('summary.total')}  
            </span>
            <span className="text-sm md:text-md lg:text-lg font-black text-red-600 tracking-tighter">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <Button 
          onClick={onCheckout}
          className="w-full h-14 flex justify-center items-center gap-2 rtl:flex-row-reverse bg-red-600 hover:bg-black text-white rounded-xl text-sm md:text-md lg:text-lg font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 mb-3"
        >
          <ShoppingCart className="mr-2" size={18} />
          {t('summary.checkout')}
        </Button>

        <Button 
          onClick={onClearCart}
          variant="outline"
          className="w-full h-12 flex justify-center items-center gap-2 rtl:flex-row-reverse border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl text-sm md:text-md lg:text-lg font-black uppercase tracking-widest transition-all"
        >
          <Trash2 className="mr-2" size={16} />
          {t('summary.clearCart')}
        </Button>
      </div>
    );
  };
