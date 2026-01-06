
 "use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/layout/hero.section";
import { CategoriesSlider } from "@/components/home/categories-slider";
import { ProductCard } from "@/components/shop/product-card";
import { Pagination } from "@/components/shop/pagination";
import { useProductsStore } from "@/store/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function HomePage() {
  const { items, pagination, fetch, setPage, loading } = useProductsStore();
  const fallback = [
    { id: 1, title: "Gaming Laptop Pro X", price: 1250.0, image: "/images/a.jpg", rating: 5 },
    { id: 2, title: "Ultrabook Air 14", price: 999.0, image: "/images/b.jpg", rating: 4 },
    { id: 3, title: "Creator Studio 16", price: 1499.0, image: "/images/c.jpg", rating: 5 },
    { id: 4, title: "Wireless Earbuds", price: 120.0, image: "/images/j.jpg", rating: 4 },
    { id: 5, title: "Gaming Mouse", price: 80.0, image: "/images/k.jpg", rating: 5 },
    { id: 6, title: "Mechanical Keyboard", price: 150.0, image: "/images/l.jpg", rating: 5 },
  ];

  useEffect(() => {
    fetch({ page: 1 });
  }, [fetch]);

  return (
    <>
      <HeroSection />
      <CategoriesSlider />

      <div className="container mx-auto sm:px-8 md:px-12 py-12 space-y-12">
        <section>
          <h3 className="text-xl font-bold text-foreground mb-4">Featured Products</h3>
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            speed={600}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {(items.length ? items : fallback).map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard title={p.title} price={p.price} image={p.image ?? "/images/a.jpg"} rating={p.rating ?? 4} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(p) => setPage(p)}
            disabled={loading}
          />
        </section>
      </div>
    </>
  );
}
