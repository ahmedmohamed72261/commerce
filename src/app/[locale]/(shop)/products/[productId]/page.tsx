"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
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

export default function ProductDetailsPage() {
  const { locale, productId } = useParams() as { locale: string; productId: string };
  return <ProductDetailsClient locale={locale} productId={productId} />;
}

const ProductDetailsClient = ({ locale, productId }: { locale: string; productId: string }) => {
  const isRTL = useIsRTL();
  const { getProductDetails, productDetails, productDetailsLoading, error, items, fetch } =
    useProductsStore();

  useEffect(() => {
    getProductDetails(productId, locale as "en" | "ar");
  }, [productId, locale, getProductDetails]);

  useEffect(() => {
    if (productDetails?.categoryId) {
      fetch({ category: productDetails.categoryId, pageSize: 4, locale: locale as "en" | "ar" });
    }
  }, [productDetails?.categoryId, locale, fetch]);

  if (productDetailsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (error || !productDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md">
          <p className="text-red-600 font-bold text-lg">{error || "Product not found"}</p>
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
    <div className="bg-gray-50 min-h-screen text-slate-900 font-sans pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Link
              href={`/${locale}`}
              className="hover:text-red-600 transition-colors"
            >
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight size={12} className="text-slate-200" />
            <Link
              href={`/${locale}/products`}
              className="hover:text-red-600 transition-colors"
            >
              {isRTL ? "المنتجات" : "Products"}
            </Link>
            <ChevronRight size={12} className="text-slate-200" />
            <span className="text-slate-900 italic line-clamp-1">{productDetails.title}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl shadow-md border border-gray-100 p-6 lg:p-12">
          {/* Product Gallery */}
          <div className="lg:col-span-5">
            <ProductGallery images={images} productName={productDetails.title} />
            {productDetails.salePrice && productDetails.price > productDetails.salePrice && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 font-black text-sm uppercase tracking-widest">
                  Save ${(productDetails.price - productDetails.salePrice).toFixed(2)} (
                  {Math.round(
                    ((productDetails.price - productDetails.salePrice) / productDetails.price) * 100
                  )}
                  % OFF)
                </p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <ProductHeader product={productDetails} />

            <div className="grid grid-cols-2 gap-6">
              <ProductPrice price={productDetails.price} salePrice={productDetails.salePrice} />
              <ProductMeta stock={productDetails.stock} condition={productDetails.condition} />
            </div>

            <ProductDescription description={productDetails.description} />

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

      {/* Additional Info */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 md:p-10">
          <h3 className="font-black text-lg mb-3 uppercase tracking-widest text-slate-600">
            Product Details
          </h3>
          <ProductDescription description={productDetails.description} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-slate-700">
            {productDetails.condition && (
              <div>
                <strong>Condition:</strong> {productDetails.condition}
              </div>
            )}
            {productDetails.brand && (
              <div>
                <strong>Brand:</strong> {productDetails.brand}
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
