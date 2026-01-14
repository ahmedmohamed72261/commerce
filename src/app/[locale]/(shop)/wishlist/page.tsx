"use client";
import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Trash2,
  ShoppingBag,
  Zap,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useWishlist } from "@/store/wishlist";

const WishlistPage = () => {
  const { items, loading, fetchWishlist, removeItem, totalItems } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const totalValuation = useMemo(
    () => items.reduce((sum, i) => sum + (i.salePrice ?? i.price ?? 0), 0),
    [items]
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans pb-20">
      {/* Breadcrumb */}
      <div className="w-full bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-red-600">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-900">Wishlist</span>
          </nav>
          <div className="flex items-center gap-2 text-red-600 font-bold text-[10px] uppercase italic">
            <ShoppingBag className="w-4 h-4" />
            <span>Deploy to cart</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
              FAV<span className="text-red-600">ORITES</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
              Strategic Asset Selection / 2026
            </p>
          </div>
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl min-w-[200px]">
            <p className="text-[10px] font-bold uppercase opacity-50 mb-1">
              Total Items
            </p>
            <p className="text-4xl font-black italic">0{totalItems()}</p>
          </div>
        </header>

        {/* Wishlist Grid */}
        <div className="grid gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[180px] bg-white border border-slate-200 rounded-2xl animate-pulse"
              />
            ))
          ) : items.length === 0 ? (
            <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-10 text-center">
              <p className="text-slate-600 font-bold">
                لا توجد عناصر في المفضلة حالياً
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row items-center">
                  {/* Image */}
                  <div className="w-full md:w-48 h-48 relative bg-slate-100 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Heart className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-red-600 uppercase tracking-widest">
                        Ref: #{item.id}
                      </p>
                      <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase">
                          <CheckCircle size={12} /> Saved
                        </span>
                        <span className="text-[10px] font-bold text-slate-300 uppercase">
                          Valuation: ${((item.salePrice ?? item.price) || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <Button className="flex-1 md:flex-none h-14 px-8 bg-slate-900 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase italic transition-all group/btn">
                        Add to Cart{" "}
                        <ShoppingBag className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="h-14 w-14 flex items-center justify-center bg-slate-50 hover:bg-red-50 text-slate-300 hover:text-red-600 rounded-xl transition-colors border border-slate-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm gap-8">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-red-600 transition-colors flex items-center gap-2"
            >
              <ArrowRight className="rotate-180" size={14} /> Back to Scouting
            </Link>
            <div className="h-8 w-[1px] bg-slate-100 hidden md:block"></div>
            <p className="text-xs font-bold text-slate-400 uppercase italic">
              يتم الاحتفاظ بالاختيارات لمدة <span className="text-slate-900">24 ساعة</span>
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">
                إجمالي القيمة
              </p>
              <p className="text-2xl font-black italic">${totalValuation.toFixed(2)}</p>
            </div>
            <Button className="w-full md:w-auto h-16 px-12 bg-red-600 hover:bg-slate-900 text-white rounded-2xl text-sm font-black uppercase italic transition-all shadow-lg shadow-red-200">
              Deploy All to Cart <Zap className="ml-3 w-4 h-4 fill-current" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
