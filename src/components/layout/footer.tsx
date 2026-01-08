"use client";

import Link from "next/link";
import { Mail, Facebook, Twitter, Youtube, Instagram, ChevronUp, User, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20">
      {/* Top Red Section */}
      <div className="bg-red-700 text-white py-8">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Area */}
          <div className="flex items-center gap-3">
             <div className="relative md:h-20 md:w-40 h-10 w-25 p-1 rounded">
               <img src="/images/logo-dark.png" alt="Carne Shop" className="h-full w-full object-cover" />
             </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-12 rtl:gap-12">
            <div className="flex items-center gap-4 rtl:gap-4">
              <div className="p-2 border border-white/30 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="md:text-2xl text-sm font-bold">365k+</div>
                <div className="text-xs opacity-80 uppercase">Happy Customers</div>
              </div>
            </div>
            <div className="flex items-center gap-4 border-l border-white/30 pl-12 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-12">
              <div className="p-2 border border-white/30 rounded-full">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <div className="md:text-2xl text-sm font-bold">850k+</div>
                <div className="text-xs opacity-80 uppercase">Products Sold</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dark Section */}
      <div className="bg-[#0b0d17] text-gray-400 py-16">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Column 1: About */}
          <div>
             {/* Logo Area */}
            <div className="flex items-center gap-3 mb-2">
              <div className="relative md:h-20 md:w-40 h-10 w-25 p-1 rounded">
                <img src="/images/logo-dark.png" alt="Carne Shop" className="h-full w-full object-cover" />
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed">
              {t("aboutText")}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-3">{t("quickLinks")}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-red-600 transition">{t("links.home")}</Link></li>
              <li><Link href="/shop" className="hover:text-red-600 transition">{t("links.shop")}</Link></li>
              <li><Link href="/about" className="hover:text-red-600 transition">{t("links.about")}</Link></li>
              <li><Link href="/contact" className="hover:text-red-600 transition">{t("links.contact")}</Link></li>
              <li><Link href="/faq" className="hover:text-red-600 transition">{t("links.faq")}</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">{t("categories")}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/categories/laptops" className="hover:text-red-600 transition">{t("categoryList.laptops")}</Link></li>
              <li><Link href="/categories/smartphones" className="hover:text-red-600 transition">{t("categoryList.smartphones")}</Link></li>
              <li><Link href="/categories/gaming" className="hover:text-red-600 transition">{t("categoryList.gaming")}</Link></li>
              <li><Link href="/categories/accessories" className="hover:text-red-600 transition">{t("categoryList.accessories")}</Link></li>
              <li><Link href="/categories/cameras" className="hover:text-red-600 transition">{t("categoryList.cameras")}</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">{t("newsletter")}</h3>
            <p className="mb-4 text-sm">{t("newsletterDesc")}</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:border-red-600 outline-none transition" />
              <button className="bg-red-600 text-white px-4 rounded hover:bg-red-700 transition">Go</button>
            </div>
            
            {/* Payment Icons */}
            {/* <div className="flex items-center gap-2 mt-8">
               <img src="/images/game-cards.svg" alt="Payment Methods" className="h-8 bg-white rounded p-1" />
            </div> */}
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#05060a] py-6 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
             <p className="text-sm text-gray-500">
               {t("copyright", { year: new Date().getFullYear() })}
             </p>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-4">
               <Link href="#" className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition"><Facebook className="w-4 h-4" /></Link>
               <Link href="#" className="bg-sky-500 p-2 rounded-full text-white hover:bg-sky-600 transition"><Twitter className="w-4 h-4" /></Link>
               <Link href="#" className="bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition"><Youtube className="w-4 h-4" /></Link>
               <Link href="#" className="bg-pink-600 p-2 rounded-full text-white hover:bg-pink-700 transition"><Instagram className="w-4 h-4" /></Link>
             </div>
             
             <button 
               onClick={scrollToTop}
               className="bg-red-600 h-10 w-10 flex items-center justify-center rounded text-white hover:bg-red-700 transition ml-4"
             >
               <ChevronUp className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
