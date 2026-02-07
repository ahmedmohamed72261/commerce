"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/store/products';
import { useWishlist } from '@/store/wishlist';
import { toast } from 'sonner';
import { useQuoteCart } from '@/store/quote-cart';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/utils/utils';
import { useTranslations as useT } from 'next-intl';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  locale?: string;
  onAddToCart?: (productId: string | number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  locale = 'en',
  onAddToCart
}) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const { addItem: addQuoteItem } = useQuoteCart();
  const tQuote = useTranslations("Quotations");
  const tCart = useTranslations("Common");
  const tTable = useT("AdminTable");
  const tForm = useT("AdminForm");
  const loc = (locale === "ar" ? "ar" : "en") as "en" | "ar";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product.id);
      toast.success('Added to cart!');
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeItem(product.id);
      toast.info('Removed from wishlist');
    } else {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        salePrice: product.salePrice
      });
      toast.success('Added to wishlist!');
    }
  };
  
  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addQuoteItem({
      _id: String(product.id),
      name: product.title,
      description: product.description,
      price: product.price,
      salePrice: product.salePrice,
      images: product.image ? [product.image] : [],
      stock: product.stock ?? 0,
      isActive: true
    } as any, 1);
    toast.success('Added to quote');
  };

  return (
    <Link
      href={`/${locale}/products/${product.slug || product.id}`}
      className={`
        group bg-white dark:bg-card border border-slate-700 rounded-xl sm:rounded-3xl overflow-hidden
        transition-all duration-500 hover:shadow-2xl dark:hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] hover:border-red-600/20 dark:hover:border-primary/20
        ${viewMode === 'list' ? 'flex flex-col sm:flex-row h-auto' : 'flex flex-col'}
      `}
    >
      {/* IMAGE AREA */}
      <div className={`
        relative bg-slate-50 dark:bg-muted overflow-hidden transition-all duration-500
        ${viewMode === 'list' ? 'w-full sm:w-56 h-40 sm:h-auto flex-shrink-0' : 'aspect-[1.4/1]'}
      `}>
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          />
        )}
        {/* {product.category && (
          <div className="absolute top-4 left-4 bg-slate-900/80 dark:bg-black/80 backdrop-blur-md text-white text-base font-black px-3 py-1 rounded-full uppercase tracking-widest">
            {product.category}
          </div>
        )} */}
        <div className="absolute top-2 right-2">
          <Button
              size="icon"
              variant="ghost"
              className={`h-10 w-10 rounded-xl hover:bg-red-50 dark:hover:bg-primary/20 hover:text-red-600 dark:hover:text-primary ${isWishlisted ? 'text-red-600 dark:text-primary bg-red-50 dark:bg-primary/20' : ''}`}
              onClick={handleWishlist}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
            </Button>
        </div>
        {product.stock !== undefined && product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 dark:bg-primary text-white text-xs font-black px-4 py-2 rounded-full uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="p-3 pt-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-black text-md md:text-lg  tracking-tighter uppercase text-foreground group-hover:text-red-600 dark:group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.round(product.averageRating ?? product.rating ?? 0) ? "fill-amber-400 text-amber-400" : "text-neutral-200 dark:text-neutral-700"}
              />
            ))}
            <span className="text-[10px] text-neutral-400 dark:text-muted-foreground">
              ({product.ratingsCount ?? 0})
            </span>
          </div>
        </div>

        {(product.brand || product.condition) && (
          <div className="flex flex-col gap-3 mb-4">
            {/* 1. PRICE SECTION - High Visibility */}
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black  tracking-tighter text-slate-950 dark:text-foreground leading-none">
                {formatCurrency(product.salePrice || product.price, loc)}
              </span>
              {/* Discount: Kept in code, but clean & subtle */}
              {product.salePrice && product.price > product.salePrice && (
                <span className="text-[10px] font-bold text-slate-300 dark:text-muted-foreground/50 line-through mt-1">
                  {formatCurrency(product.price, loc)}
                </span>
              )}
            </div>

            {/* 2. TAGS SECTION - Enhanced UI & Animations */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Brand Tag: Original colors, enhanced padding */}
              {/* {product.brand && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[14px] font-black uppercase tracking-widest bg-red-50 dark:bg-primary/15 text-red-700 dark:text-primary border border-red-100/50 dark:border-primary/20 transition-transform duration-300 group-hover:-translate-y-0.5">
                  {tTable("brand")}: {product.brand}
                </span>
              )} */}

              {/* Condition Tag: High-end "Live" Animation */}
              {product.condition && (
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[16px] font-black uppercase tracking-widest bg-red-50 dark:bg-primary/15 text-neutral-700 dark:text-muted-foreground border border-neutral-200/50 dark:border-white/5 transition-all duration-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  {{
                    new: tForm("conditionNew"),
                    used: tForm("conditionUsed"),
                  }[String(product.condition).toLowerCase()] || product.condition}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-col sm:flex-row sm:items-center items-start justify-between gap-2">
          <div className="flex w-full flex-col sm:flex-row gap-2 justify-between items-center"> 
            <Button
              className="h-12 w-full px-6 flex-1 rounded-xl bg-slate-950 text-white border border-border font-black text-[10px] tracking-widest uppercase hover:bg-red-50 dark:hover:bg-primary/20 hover:text-red-600 dark:hover:text-primary transition-all gap-2"
              onClick={handleAddToQuote}
            >
              <FileText size={16} /> {tQuote("addToQuote")}
            </Button>
            <Button
              className="h-12 w-full px-6 flex-1 rounded-xl bg-slate-950 dark:bg-primary text-white font-black text-[10px] tracking-widest uppercase hover:bg-red-600 dark:hover:bg-red-700 transition-all gap-2"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={16} /> {tCart("cart")}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
