"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";

type ProfileBasicInfoProps = {
  profile: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  } | null;
  loading: boolean;
};

export const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({ profile, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-12 rounded-2xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }
  
  const t = useTranslations("Profile");
  const locale = useLocale() as "en" | "ar";
  return (
    <section className="space-y-6">
       <div className="flex items-center gap-4">
        <div className="w-1.5 h-6 bg-red-600 rounded-full" />
        <h3 className={`text-base md:text-lg font-black text-slate-900 uppercase italic ${locale === "ar" ? "text-right" : "text-left"}`}>{t("basicInfo")}</h3>
      </div>
      <div className={locale === "ar" ? "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"}>
        <div className="space-y-2">
          <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase">{t("profileInfo.firstName")}</label>
          <input type="text" value={profile?.firstName ?? ""} readOnly className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 md:px-5 h-11 md:h-12 text-sm font-bold outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase">{t("profileInfo.lastName")}</label>
          <input type="text" value={profile?.lastName ?? ""} readOnly className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 md:px-5 h-11 md:h-12 text-sm font-bold outline-none" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase">{t("profileInfo.email")}</label>
          <input type="email" value={profile?.email ?? ""} readOnly className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 md:px-5 h-11 md:h-12 text-sm font-bold outline-none" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase">{t("profileInfo.phone")}</label>
          <input type="tel" value={profile?.phone ?? ""} readOnly className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 md:px-5 h-11 md:h-12 text-sm font-bold outline-none" />
        </div>
      </div>
    </section>
  );
};
