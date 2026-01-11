"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Star, Minus, Plus, Heart, GitCompare, 
  Printer, Mail, ShoppingCart, ChevronRight,
  Package, Loader2
} from 'lucide-react';
import { useProductsStore } from '@/store/products';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductCard } from '@/components/products/ProductCard';
import { toast } from 'sonner';

interface ProductDetailsPageProps {
  params: Promise<{ locale: string; productId: string }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { locale, productId } = await params;
  return <ProductDetailsClient locale={locale} productId={productId} />;
};

const ProductDetailsClient = ({ locale, productId }: { locale: string; productId: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  
  const { getProductDetails, productDetails, productDetailsLoading, error, items, fetch } = useProductsStore();
  const { addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    getProductDetails(productId, locale as "en" | "ar");
  }, [productId, locale, getProductDetails]);

  // Fetch related products when product details load
  useEffect(() => {
    if (productDetails?.categoryId) {
      fetch({ category: productDetails.categoryId, pageSize: 4, locale: locale as "en" | "ar" });
    }
  }, [productDetails?.categoryId, locale, fetch]);

  const handleAddToCart = async () => {
    if (productDetails) {
      const success = await addToCart(String(productDetails.id), quantity);
      if (success) {
        toast.success(`Added ${quantity} ${productDetails.title} to cart!`);
      } else {
        toast.error('Failed to add to cart');
      }
    }
  };

  const handleToggleWishlist = () => {
    if (!productDetails) return;
    
    if (isInWishlist(productDetails.id)) {
      removeFromWishlist(productDetails.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist({
        id: productDetails.id,
        title: productDetails.title,
        price: productDetails.price,
        image: productDetails.image,
        salePrice: productDetails.salePrice
      });
      toast.success('Added to wishlist!');
    }
  };

  if (productDetailsLoading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (error || !productDetails) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md">
          <p className="text-red-600 font-bold text-lg">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  const images = productDetails.images && productDetails.images.length > 0 
    ? productDetails.images 
    : productDetails.image 
    ? [productDetails.image] 
    : [];

  const relatedProducts = items.filter(p => String(p.id) !== String(productDetails.id)).slice(0, 4);

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-900 font-sans pb-20">
      {/* BREADCRUMBS */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <ul className="flex items-center gap-2">
              <li className="hover:text-red-600 transition"><Link href={`/${locale}`}>Home</Link></li>
              <ChevronRight size={12} className="text-slate-200" />
              <li className="hover:text-red-600 transition"><Link href={`/${locale}/products`}>All Products</Link></li>
              <ChevronRight size={12} className="text-slate-200" />
              {productDetails.category && (
                <>
                  <li className="hover:text-red-600 transition">{productDetails.category}</li>
                  <ChevronRight size={12} className="text-slate-200" />
                </>
              )}
              <li className="text-slate-900 italic line-clamp-1">{productDetails.title}</li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 lg:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-12">
          
          {/* IMAGE GALLERY */}
          <div className="lg:col-span-5">
            <ProductGallery images={images} productName={productDetails.title} />
            {productDetails.salePrice && productDetails.price > productDetails.salePrice && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 font-black text-sm uppercase tracking-widest">
                  Save ${(productDetails.price - productDetails.salePrice).toFixed(2)} (
                  {Math.round(((productDetails.price - productDetails.salePrice) / productDetails.price) * 100)}% OFF)
                </p>
              </div>
            )}
          </div>

          {/* DETAILS & ACTIONS */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="mb-6">
              {productDetails.brand && (
                <div className="flex items-center gap-2 text-red-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                  <Package size={14} /> {productDetails.brand}
                </div>
              )}
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-4 italic">
                {productDetails.title}
              </h1>
              {productDetails.rating && (
                <div className="flex items-center gap-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < Math.floor(productDetails.rating!) ? "currentColor" : "none"} 
                        className={i < Math.floor(productDetails.rating!) ? "" : "text-slate-300"} 
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    ({productDetails.rating} rating)
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8 border-y border-slate-100 py-8 mb-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sale Price</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-red-600 tracking-tighter">
                    ${(productDetails.salePrice || productDetails.price).toFixed(2)}
                  </span>
                  {productDetails.salePrice && productDetails.price > productDetails.salePrice && (
                    <span className="text-lg text-slate-300 line-through font-bold">
                      ${productDetails.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <div className="flex flex-col gap-1">
                  <div className={`text-sm font-black uppercase italic ${
                    productDetails.stock && productDetails.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {productDetails.stock && productDetails.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                  {productDetails.stock !== undefined && (
                    <p className="text-[10px] text-slate-400 font-bold tracking-tight">
                      {productDetails.stock} units available
                    </p>
                  )}
                </div>
              </div>
            </div>

            {productDetails.description && (
              <p className="text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-slate-100 pl-6">
                {productDetails.description}
              </p>
            )}

            {/* QUANTITY SELECTOR */}
            <div className="space-y-8 mb-10">
              <div className="flex items-center gap-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Qty:</h3>
                  <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                      className="hover:text-red-600"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 text-lg font-black">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setQuantity(q => q + 1)} 
                      className="hover:text-red-600"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN BUTTONS */}
            <div className="flex gap-4 mb-6">
              <Button 
                onClick={handleAddToCart}
                disabled={!productDetails.stock || productDetails.stock === 0}
                className="flex-1 h-16 bg-red-600 hover:bg-black text-white rounded-xl text-lg font-black uppercase italic transition-all shadow-xl shadow-red-600/20 disabled:opacity-50"
              >
                <ShoppingCart className="mr-3" size={20} /> Add to Cart
              </Button>
              <Button 
                onClick={handleToggleWishlist}
                variant="outline" 
                className={`h-16 w-16 rounded-xl border-slate-200 hover:bg-slate-50 group transition-all ${
                  isInWishlist(productDetails.id) ? 'bg-red-50 border-red-200' : ''
                }`}
              >
                <Heart 
                  className={`transition-colors ${
                    isInWishlist(productDetails.id) ? 'text-red-600 fill-red-600' : 'group-hover:text-red-600'
                  }`} 
                />
              </Button>
              <Button variant="outline" className="h-16 w-16 rounded-xl border-slate-200 hover:bg-slate-50 transition-all">
                <GitCompare />
              </Button>
            </div>

            {/* UTILITY LINKS */}
            <div className="flex space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <a href="#" className="flex items-center hover:text-red-600 transition-colors">
                <Printer className="w-4 h-4 mr-2" /> Print Sheet
              </a>
              <a href="#" className="flex items-center hover:text-red-600 transition-colors">
                <Mail className="w-4 h-4 mr-2" /> Send to Friend
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="container mx-auto px-4 mt-20">
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="border-b border-slate-100 flex bg-slate-50/50">
            {['details', 'info'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                className={`py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] relative transition-all ${
                  activeTab === tab ? 'text-red-600 bg-white' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab === 'details' ? 'Product Details' : 'Information'}
                {activeTab === tab && <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />}
              </button>
            ))}
          </div>
          <div className="p-10 lg:p-16 text-slate-500 font-medium leading-relaxed text-lg">
            {activeTab === 'details' && (
              <div>
                <p>{productDetails.description || 'No detailed description available.'}</p>
                {productDetails.condition && (
                  <p className="mt-4"><strong>Condition:</strong> {productDetails.condition}</p>
                )}
                {productDetails.brand && (
                  <p className="mt-2"><strong>Brand:</strong> {productDetails.brand}</p>
                )}
              </div>
            )}
            {activeTab === 'info' && (
              <div>
                <p><strong>Product ID:</strong> {productDetails.id}</p>
                {productDetails.category && <p className="mt-2"><strong>Category:</strong> {productDetails.category}</p>}
                {productDetails.createdAt && (
                  <p className="mt-2"><strong>Listed:</strong> {new Date(productDetails.createdAt).toLocaleDateString()}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 mt-24">
          <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">
              Related <span className="text-red-600 italic">Products</span>
            </h2>
            {productDetails.categoryId && (
              <Link 
                href={`/${locale}/categories/${productDetails.categoryId}`}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition"
              >
                See All Items
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode="grid"
                locale={locale}
                onAddToCart={async (id) => {
                  const success = await addToCart(String(id), 1);
                  if (success) {
                    toast.success('Added to cart!');
                  }
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;