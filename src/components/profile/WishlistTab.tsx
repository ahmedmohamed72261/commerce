"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useWishlist } from "@/store/wishlist";
import { Trash2 } from "lucide-react";

export const WishlistTab = () => {
  const { items: wishlistItems, fetchWishlist, removeItem } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
      {wishlistItems.length === 0 && (
          <div className="col-span-full bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
            <p className="text-slate-600 font-bold text-lg">Your wishlist is empty</p>
          </div>
      )}
      {wishlistItems.map((item) => (
        <div key={String(item.id)} className="border-2 border-slate-100 rounded-3xl p-4 flex items-center gap-4 hover:border-red-100 transition-all">
          <div className="w-20 h-20 bg-slate-100 rounded-2xl shrink-0 overflow-hidden relative">
             {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-slate-900 leading-tight line-clamp-2">{item.title}</h4>
            <p className="text-red-600 font-black text-sm mt-1">${item.salePrice ?? item.price}</p>
          </div>
          <button 
            onClick={() => removeItem(String(item.id))}
            className="p-2 text-slate-300 hover:text-red-600 transition-colors"
          >
            <Trash2 size={18}/>
          </button>
        </div>
      ))}
    </div>
  );
};
