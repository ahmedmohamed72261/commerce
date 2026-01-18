"use client";

import React from "react";
import { User, ShoppingBag, Heart, MapPin } from "lucide-react";
import { useLocale } from "next-intl";

type ProfileTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const sidebarItems = [
  { id: "My Profile", icon: User, label: "My Profile" },
  { id: "My Orders", icon: ShoppingBag, label: "My Orders" },
  { id: "My Wishlist", icon: Heart, label: "My Wishlist" },
  { id: "My Addresses", icon: MapPin, label: "My Addresses" },
];

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const locale = useLocale() as "en" | "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="flex flex-col lg:flex-row gap-6" dir={dir}>
      {/* Sidebar for desktop */}
      <aside className="hidden lg:block lg:w-[260px] shrink-0">
        <div className="space-y-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-200 font-semibold text-sm justify-start shadow-sm hover:shadow-md ${
                activeTab === item.id
                  ? "bg-red-50 text-red-600 shadow-md border border-red-100"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <item.icon
                size={20}
                className={`${
                  activeTab === item.id ? "text-red-600" : "text-slate-400"
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Content + Mobile Tabs */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Mobile horizontal tabs */}
        <div className="lg:hidden">
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide snap-start transition-all duration-200 shadow-sm hover:shadow-md ${
                  activeTab === item.id
                    ? "bg-red-600 text-white border-red-600 shadow-lg"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-red-50"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
