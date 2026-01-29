"use client";

import React from "react";
import { User, ShoppingBag, Heart, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type ProfileTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const SidebarConfig = [
  { id: "My Profile", icon: User, tKey: "myProfile" },
  { id: "My Orders", icon: ShoppingBag, tKey: "myOrders" },
  { id: "My Wishlist", icon: Heart, tKey: "myWishlist" },
  { id: "My Addresses", icon: MapPin, tKey: "myAddresses" },
];

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const locale = useLocale() as "en" | "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = useTranslations("Profile");

  return (
    <div className="flex flex-col lg:flex-row gap-6" dir={dir}>
      {/* Sidebar for desktop */}
      <aside className="hidden lg:block lg:w-[260px] shrink-0">
        <div className="space-y-3">
          {SidebarConfig.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-200 font-semibold text-sm justify-start shadow-sm hover:shadow-md ${
                activeTab === item.id
                  ? "bg-red-50 dark:bg-primary/20 text-red-600 dark:text-primary shadow-md border border-red-100 dark:border-primary/30"
                  : "text-slate-600 dark:text-foreground hover:bg-slate-50 dark:hover:bg-muted"
              }`}
            >
              <item.icon
                size={20}
                className={`${
                  activeTab === item.id ? "text-red-600 dark:text-primary" : "text-slate-400 dark:text-muted-foreground"
                }`}
              />
              <span className="truncate">{t(item.tKey)}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Content + Mobile Tabs */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Mobile horizontal tabs */}
        <div className="lg:hidden">
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
            {SidebarConfig.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide snap-start transition-all duration-200 shadow-sm hover:shadow-md ${
                  activeTab === item.id
                    ? "bg-red-600 dark:bg-primary text-white border-red-600 dark:border-primary shadow-lg"
                    : "bg-white dark:bg-card text-slate-600 dark:text-foreground border border-slate-200 dark:border-border hover:bg-red-50 dark:hover:bg-primary/20"
                }`}
              >
                <item.icon size={16} />
                {t(item.tKey)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
