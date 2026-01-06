"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const categories = [
  { key: "laptops", name: "Laptops", image: "/images/banners/laptop.jpg", count: 120 },
  { key: "desktops", name: "Desktops", image: "/images/banners/computer.jpg", count: 85 },
  { key: "printers", name: "Printers", image: "/images/banners/printers.jpg", count: 40 },
  { key: "cameras", name: "Cameras", image: "/images/banners3/camera.jpg", count: 32 },
  { key: "accessories", name: "Accessories", image: "/images/banners/joyroom.jpg", count: 210 },
  { key: "phones", name: "Phones", image: "/images/banners2/a.jpg", count: 150 },
  { key: "tablets", name: "Tablets", image: "/images/banners2/b.jpg", count: 90 },
];

export default function CategoriesIndexPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <div className="min-h-screen bg-background">
      <Breadcrumb items={[{ label: "Home", href: `/${locale}` }, { label: "Categories" }]} />
      <div className="container mx-auto px-4 sm:px-8 md:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/${locale}/categories/${encodeURIComponent(cat.key)}/products`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition">
                <img src={cat.image} alt={cat.name} className="h-[220px] w-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-red-600 shadow-sm">
                    {cat.count} Products
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                    <span className="text-sm font-bold text-slate-900">{cat.name}</span>
                    <span className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

