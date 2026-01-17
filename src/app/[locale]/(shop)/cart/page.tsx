"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '@/store/cart';
import { useOrdersStore, OrderItem } from '@/store/orders';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { CheckoutForm } from '@/components/cart/CheckoutForm';
import { Loader2, ShoppingBag } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getAllPaymentMethods } from '@/services/payment-methods.service';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useLocale } from 'next-intl';

export default function CartPage() {
  const { locale } = useParams() as { locale: string };
  return <CartPageClient locale={locale} />;
}

const CartPageClient = ({ locale }: { locale: string }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const localeIntl = useLocale() as "en" | "ar";
  const isAr = localeIntl === "ar";
  const [paymentMethods, setPaymentMethods] = useState<Array<{ _id: string; name: string; icon?: string; instructions?: Record<string,string>; isActive?: boolean }>>([]);
  const router = useRouter();
  
  const { 
    cart, 
    loading, 
    getCart, 
    updateCartItem, 
    removeFromCart, 
    clearCart,
    totalItems,
    totalPrice
  } = useCart();

  const { createOrder, loading: orderLoading } = useOrdersStore();

  useEffect(() => {
    getCart(locale as "en" | "ar");
    (async () => {
      try {
        const res = await getAllPaymentMethods();
        const data = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setPaymentMethods(data);
      } catch {
        setPaymentMethods([]);
      }
    })();
  }, [locale, getCart]);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    const success = await updateCartItem(itemId, quantity);
    if (success) {
      toast.success('Cart updated!');
    }
  };

  const handleRemove = async (itemId: string) => {
    const success = await removeFromCart(itemId);
    if (success) {
      toast.success('Item removed from cart');
    }
  };

  const handleClearCart = async () => {
    setConfirmOpen(true);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = async (
    shippingAddress: any,
    paymentMethod: string,
    notes?: string
  ) => {
    if (!cart || !cart.items.length) return;

    const orderItems: OrderItem[] = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      attributesSelected: item.attributes || {}
    }));

    const order = await createOrder(
      orderItems,
      paymentMethod as "cash" | "card" | "online",
      shippingAddress,
      notes
    );
    
    if (order) {
      await clearCart();
      toast.success('Order placed successfully! 🎉');
      router.push(`/${locale}/products`);
    } else {
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (loading && !cart) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-[#F4F5F7] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4">{isAr ? "سلتك فارغة" : "Your Cart is Empty"}</h2>
          <p className="text-slate-600 dark:text-slate-300 font-bold mb-8">{isAr ? "أضف بعض المنتجات للبدء!" : "Add some products to get started!"}</p>
          <a 
            href={`/${locale}/products`}
            className="inline-block bg-red-600 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
          >
            {isAr ? "متابعة التسوق" : "Continue Shopping"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-[#F4F5F7]  p-6 md:py-10">
      <div className="mx-auto w-full max-w-[1600px]">
        <Breadcrumb
          items={[
            { label: isAr ? "الرئيسية" : "Home", href: `/${locale}` },
            { label: isAr ? "السلة" : "Cart" },
          ]}
        />
        <header className="my-6 md:my-10">
          <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-indigo-950 mb-2">
            {isAr ? (
              <>سلة <span className="text-red-600">التسوق</span></>
            ) : (
              <>Shopping <span className="text-red-600">Cart</span></>
            )}
          </h1>
          <p className="text-slate-400 dark:text-slate-300 font-bold">
            {isAr ? `${totalItems()} عنصر في السلة` : `${totalItems()} items in your cart`}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {!showCheckout ? (
              <>
                {cart.items.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    locale={locale}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                  />
                ))}
              </>
            ) : (
              <CheckoutForm 
                onSubmit={handlePlaceOrder}
                loading={orderLoading}
                paymentMethods={paymentMethods}
              />
            )}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              totalAmount={totalPrice()}
              itemCount={totalItems()}
              onCheckout={handleCheckout}
              onClearCart={handleClearCart}
            />
          </div>
        </div>
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title={isAr ? "مسح السلة؟" : "Clear Cart?"}
          description={isAr ? "سيؤدي هذا إلى إزالة جميع العناصر من السلة." : "This will remove all items from your cart."}
          confirmText={isAr ? "مسح" : "Clear"}
          cancelText={isAr ? "إلغاء" : "Cancel"}
          onConfirm={async () => {
            const success = await clearCart();
            if (success) {
              toast.success(isAr ? "تم مسح السلة" : "Cart cleared");
            }
          }}
        />
      </div>
    </div>
  );
};
