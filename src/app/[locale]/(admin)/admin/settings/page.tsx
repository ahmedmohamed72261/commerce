 "use client";
import React, { useState } from "react";
import { WhiteCard } from "@/components/admin/ui/cards";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getProfile, updatePassword } from "@/services/user.service";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { cn } from "@/utils/utils";

export default function AdminSettingsPage() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("AdminSettings");
  const tForm = useTranslations("AdminForm");

  const { data: profileRes, isLoading } = useQuery({
    queryKey: ["admin-settings-profile"],
    queryFn: getProfile,
  });

  const profile = (profileRes as any)?.data?.data ?? (profileRes as any)?.data ?? profileRes;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const onChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error(tForm("updateFailed"));
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error(tForm("updateFailed"));
      return;
    }
    setSaving(true);
    try {
      await updatePassword({ currentPassword, newPassword });
      toast.success(tForm("updated"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      toast.error(tForm("updateFailed"));
    } finally {
      setSaving(false);
    }
  };

  const createdAt = profile?.createdAt ? new Date(profile.createdAt) : null;
  const updatedAt = profile?.updatedAt ? new Date(profile.updatedAt) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{t("title")}</h1>
      </div>

      <WhiteCard title={t("profile")}>
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", locale === "ar" ? "text-right" : "")}>
          <div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("name")}</div>
            <div className="text-base sm:text-xl font-semibold text-gray-800 dark:text-foreground">
              {profile?.firstName ? `${profile.firstName} ${profile.lastName ?? ""}`.trim() : profile?.name ?? "-"}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("email")}</div>
            <div className="text-base sm:text-xl text-gray-700 dark:text-foreground">{profile?.email ?? "—"}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("phone")}</div>
            <div className="text-base sm:text-xl text-gray-700 dark:text-foreground">{profile?.phone ?? "—"}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("role")}</div>
            <div className="text-base sm:text-xl text-gray-700 dark:text-foreground">{profile?.role ?? "—"}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("status")}</div>
            <div className="text-base sm:text-xl text-gray-700 dark:text-foreground">{profile?.isActive ? "Active" : "Inactive"}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("accountCreated")}</div>
            <div className="text-base sm:text-xl text-gray-700 dark:text-foreground">
              {createdAt ? createdAt.toLocaleDateString() : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("lastUpdated")}</div>
            <div className="text-base sm:text-xl text-gray-700 dark:text-foreground">
              {updatedAt ? updatedAt.toLocaleDateString() : "—"}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("addresses")}</div>
            <div className="text-base sm:text-xl text-gray-700 dark:text-foreground">
              {Array.isArray(profile?.addresses) && profile.addresses.length > 0
                ? `${profile.addresses.length} address(es)`
                : "—"}
            </div>
          </div>
        </div>
      </WhiteCard>

      <WhiteCard title={t("security")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("currentPassword")}</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              appearance="white"
              showIcon={false}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("newPassword")}</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              appearance="white"
              showIcon={false}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t("confirmNewPassword")}</label>
            <Input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              appearance="white"
              showIcon={false}
            />
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <button
            onClick={onChangePassword}
            disabled={saving}
            className="bg-[#e30613] text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors flex items-center gap-2 text-base sm:text-xl font-bold disabled:opacity-60"
          >
            <Save size={16} /> {saving ? tForm("saving") : t("changePassword")}
          </button>
        </div>
      </WhiteCard>
    </div>
  );
}
