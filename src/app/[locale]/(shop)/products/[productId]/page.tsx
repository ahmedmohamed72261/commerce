"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useProductsStore } from "@/store/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductMeta } from "@/components/product/ProductMeta";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { useParams } from "next/navigation";
import { useIsRTL } from "@/utils/rtl";
import { ProductDetailsSkeleton } from "@/components/product/ProductDetailsSkeleton";
import { rateProduct } from "@/services/products.service";

export default function ProductDetailsPage() {
  const { locale, productId } = useParams() as { locale: string; productId: string };
  return <ProductDetailsClient locale={locale} productId={productId} />;
}

const ProductDetailsClient = ({ locale, productId }: { locale: string; productId: string }) => {
  const isRTL = useIsRTL();
  const { getProductDetails, productDetails, productDetailsLoading, error, items, fetch } =
    useProductsStore();

  // State for rating
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    getProductDetails(productId, locale as "en" | "ar");
  }, [productId, locale, getProductDetails]);

  useEffect(() => {
    if (productDetails?.categoryId) {
      fetch({ category: productDetails.categoryId, pageSize: 4, locale: locale as "en" | "ar" });
    }
  }, [productDetails?.categoryId, locale, fetch]);

  if (productDetailsLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !productDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 text-center max-w-md">
          <p className="text-destructive font-bold text-lg">{error || "Product not found"}</p>
        </div>
      </div>
    );
  }

  const images =
  Array.isArray(productDetails.images) && productDetails.images.length > 0
    ? productDetails.images
    : productDetails.image
    ? [productDetails.image]
    : [];


  const relatedProducts = items
    .filter((p) => String(p.id) !== String(productDetails.id))
    .slice(0, 4);

  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans pb-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Breadcrumbs */}
      <div className="bg-card/80 border-b border-border backdrop-blur-sm sticky top-0 z-10">
        <Breadcrumb
          items={[
            { label: isRTL ? "المنتجات" : "Products", href: `/${locale}/products` },
            { label: productDetails.title },
          ]}
          showHome={true}
        />
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Gallery (Sticky on Desktop) */}
          <div className="lg:col-span-6 xl:col-span-7">
             <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-card rounded-3xl shadow-sm border border-border p-4 md:p-6">
                  <ProductGallery images={images} productName={productDetails.title} />
                </div>
                
                {productDetails.salePrice && productDetails.price > productDetails.salePrice && (
                  <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-xl p-4 text-center">
                    <p className="text-red-600 dark:text-red-400 font-black text-sm uppercase tracking-widest">
                      Save ${(productDetails.price - productDetails.salePrice).toFixed(2)} (
                      {Math.round(
                        ((productDetails.price - productDetails.salePrice) / productDetails.price) * 100
                      )}
                      % OFF)
                    </p>
                  </div>
                )}
             </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6">
            <div className="bg-card rounded-3xl shadow-sm border border-border p-6 md:p-8 flex flex-col gap-6">
              <ProductHeader product={productDetails} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductPrice price={productDetails.price} salePrice={productDetails.salePrice} />
                <ProductMeta stock={productDetails.stock} condition={productDetails.condition} />
              </div>

              {/* Rating Section */}
              <div className="border-t border-border pt-6">
              <h3 className="font-bold text-lg mb-3">Rate this product</h3>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={async () => {
                      if (!productId) return;
                      try {
                        await rateProduct(productId, star);
                        setRating(star);
                        alert(`Thank you for rating this product ${star} star${star !== 1 ? 's' : ''}!`);
                      } catch (error) {
                        console.error('Failed to rate product:', error);
                        alert('Failed to submit rating');
                      }
                    }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="focus:outline-none"
                  >
                    <Star 
                      size={24} 
                      className={`cursor-pointer ${star <= (hover || rating) ? 'text-yellow-500' : 'text-muted-foreground/30'}`} 
                      fill={star <= (hover || rating) ? 'currentColor' : 'none'} 
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">Click to rate</span>
              </div>
            </div>

            <ProductActions
              productId={productDetails.id}
              title={productDetails.title}
              stock={productDetails.stock}
              price={productDetails.price}
              salePrice={productDetails.salePrice}
            />
          </div>
        </div>
      </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="bg-card rounded-3xl border border-border shadow-md p-6 md:p-10">
          <h3 className="font-black text-lg mb-3 uppercase tracking-widest text-muted-foreground">
            Product Details
          </h3>
          <ProductDescription description={productDetails.description} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-foreground">
            {productDetails.condition && (
              <div>
                <strong className="text-muted-foreground">Condition:</strong> {productDetails.condition}
              </div>
            )}
            {productDetails.brand && (
              <div>
                <strong className="text-muted-foreground">Brand:</strong> {productDetails.brand}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        products={relatedProducts}
        locale={locale}
        categoryId={productDetails.categoryId}
      />
    </div>
  );
};
