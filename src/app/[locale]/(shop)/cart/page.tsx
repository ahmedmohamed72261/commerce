"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '@/store/cart';
import { useOrdersStore, OrderItem } from '@/store/orders';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { CheckoutForm } from '@/components/cart/CheckoutForm';
import { Loader2, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

const CartPage = async ({ params }: CartPageProps) => {
  const { locale } = await params;
  return <CartPageClient locale={locale} />;
};

const CartPageClient = ({ locale }: { locale: string }) => {
  const [showCheckout, setShowCheckout] = useState(false);
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
    if (confirm('Are you sure you want to clear your cart?')) {
      const success = await clearCart();
      if (success) {
        toast.success('Cart cleared');
      }
    }
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = async (
    shippingAddress: any,
    paymentMethod: 'cash' | 'card' | 'online',
    notes?: string
  ) => {
    if (!cart || !cart.items.length) return;

    const orderItems: OrderItem[] = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      attributesSelected: item.attributes || {}
    }));

    const order = await createOrder(orderItems, paymentMethod, shippingAddress, notes);
    
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
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-slate-300 mx-auto mb-6" />
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Your Cart is Empty</h2>
          <p className="text-slate-600 font-bold mb-8">Add some products to get started!</p>
          <a 
            href={`/${locale}/products`}
            className="inline-block bg-red-600 hover:bg-black text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] py-10">
      <div className="max-w-[1600px] mx-auto px-6">
        <header className="mb-10">
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-slate-950 mb-2">
            Shopping <span className="text-red-600">Cart</span>
          </h1>
          <p className="text-slate-400 font-bold">
            {totalItems()} items in your cart
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
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
      </div>
    </div>
  );
};

export default CartPage;