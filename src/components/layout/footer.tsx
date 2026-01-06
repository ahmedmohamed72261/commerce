"use client";

import Link from "next/link";
import { Mail, Facebook, Twitter, Youtube, Instagram, ChevronUp, User, Car } from "lucide-react";
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
             <div className="relative h-20 w-40 p-1 rounded">
               <img src="/images/logo-dark.png" alt="Carne Shop" className="h-full w-full object-cover" />
             </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="p-2 border border-white/30 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">365482</div>
                <div className="text-xs opacity-80 uppercase">Satisfied Clients</div>
              </div>
            </div>
            <div className="flex items-center gap-4 border-l border-white/30 pl-12">
              <div className="p-2 border border-white/30 rounded-full">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">8563214</div>
                <div className="text-xs opacity-80 uppercase">Complete Project</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dark Section */}
      <div className="bg-[#0b0d17] text-gray-400 py-16">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">{t("aboutTitle")}</h3>
            <p className="mb-6 text-sm leading-relaxed">
              {t("aboutText")}
            </p>
            <div className="flex items-center gap-3 text-white">
              <Mail className="w-5 h-5 text-red-600" />
              <span>support@gmail.com</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">{t("quickLinks")}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-red-600 transition">{t("links.help")}</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">{t("links.returns")}</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">{t("links.onlineStores")}</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">{t("links.payment")}</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">{t("links.terms")}</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">{t("services")}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-red-600 transition">{t("serviceList.meat")}</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">{t("serviceList.organic")}</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">{t("serviceList.butcher")}</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">{t("serviceList.cuts")}</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">{t("serviceList.catering")}</Link></li>
            </ul>
          </div>

          {/* Column 4: Recent News & Payment */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">{t("recentNews")}</h3>
            <div className="space-y-6 mb-8">
              {/* News Item 1 */}
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-700 flex-shrink-0 relative overflow-hidden rounded">
                   <img src="/images/h.jpg" alt="News" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight mb-2 hover:text-red-600 cursor-pointer">
                    {t("news.title1")}
                  </h4>
                  <div className="text-xs text-red-600">05 NOVEMBER 2020</div>
                </div>
              </div>
            </div>

            {/* Payment Icons */}
            <div className="flex items-center gap-2 mt-4">
               <img src="/images/game-cards.svg" alt="Visa" className="h-8 bg-white rounded p-1" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#05060a] py-6 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
             <p className="text-sm text-gray-500">
               {t("copyright")}
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
