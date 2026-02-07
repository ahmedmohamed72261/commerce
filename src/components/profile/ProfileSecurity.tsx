"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/services/user.service";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
export const ProfileSecurity = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Profile");
  return (
    <section className="pt-8 border-t border-slate-50 dark:border-border space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-1.5 h-6 bg-red-600 dark:bg-primary rounded-full" />
        <h3 className={`text-base md:text-lg font-black text-slate-900 dark:text-foreground uppercase  ${locale === "ar" ? "text-right" : "text-left"}`}>{t("securityAccess.title")}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="password"
          placeholder={t("securityAccess.currentPassword")}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full bg-slate-50 dark:bg-muted border-2 border-slate-100 dark:border-border rounded-2xl px-5 h-12 text-sm font-bold focus:border-red-600 dark:focus:border-primary outline-none dark:text-foreground"
        />
        <input
          type="password"
          placeholder={t("securityAccess.newPassword")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full bg-slate-50 dark:bg-muted border-2 border-slate-100 dark:border-border rounded-2xl px-5 h-12 text-sm font-bold focus:border-red-600 dark:focus:border-primary outline-none dark:text-foreground"
        />
      </div>
      <Button
        disabled={saving || !currentPassword || !newPassword}
        onClick={async () => {
          try {
            setSaving(true);
            await updatePassword({ currentPassword, newPassword });
            setCurrentPassword("");
            setNewPassword("");
            toast.success("Password updated");
          } catch {
            toast.error("Failed to update password");
          } finally {
            setSaving(false);
          }
        }}
        className="bg-red-600 dark:bg-primary hover:bg-slate-900 dark:hover:bg-red-700 text-white w-full md:w-auto px-10 md:px-12 h-12 md:h-14 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-50 dark:shadow-primary/20 disabled:opacity-50 mt-4"
      >
        {t("saveChanges")}
      </Button>
    </section>
  );
};
