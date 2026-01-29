"use client";

import React, { useEffect, useState } from "react";
import { WhiteCard } from "@/components/admin/ui/cards";
import { useTranslations, useLocale } from "next-intl";
import { useAuthStore } from "@/store/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createAdminAccount, getAllAdminAccounts, updateAdminAccount } from "@/services/admin.service";
import { Loader2, Pencil, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

type AdminItem = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminControlPage() {
  const t = useTranslations("AdminControl");
  const tTable = useTranslations("AdminTable");
  const tForm = useTranslations("AdminForm");
  const locale = useLocale() as "en" | "ar";
  const { user } = useAuthStore();
  const [admins, setAdmins] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);

  const isAuthorized = !!user && (
    (user as any).role === "admin" ||
    (user as any).role === "superAdmin" ||
    (user as any).role === "super_admin" ||
    (user as any).isAdmin === true
  );

  useEffect(() => {
    if (!isAuthorized) return;
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await getAllAdminAccounts();
      const data = (res?.data?.data ?? res?.data ?? res) as { data?: AdminItem[] } | AdminItem[];
      const list = Array.isArray(data) ? data : Array.isArray((data as any)?.data) ? (data as any).data : [];
      setAdmins(list);
    } catch (e) {
      toast.error("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  const onCreate = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password) {
      toast.error(tForm("updateFailed"));
      return;
    }
    setSaving(true);
    try {
      await createAdminAccount(form);
      toast.success(tForm("updated"));
      setForm({ firstName: "", lastName: "", email: "", phone: "", password: "" });
      await refresh();
    } catch {
      toast.error(tForm("updateFailed"));
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await updateAdminAccount(id, { isActive: !current });
      await refresh();
    } catch {
      toast.error(tForm("updateFailed"));
    }
  };

  if (!isAuthorized) {
    return (
      <div className="p-10 text-center">
        <p className="text-lg font-bold text-muted-foreground">{t("notAuthorized")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
      </div>

      {/* Create Admin */}
      <WhiteCard title={t("createAdmin")}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 block">{t("firstName")}</label>
            <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} dir={locale === "ar" ? "rtl" : "ltr"} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 block">{t("lastName")}</label>
            <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} dir={locale === "ar" ? "rtl" : "ltr"} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 block">{t("email")}</label>
            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} dir={locale === "ar" ? "rtl" : "ltr"} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 block">{t("phone")}</label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} dir={locale === "ar" ? "rtl" : "ltr"} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 block">{t("password")}</label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} dir={locale === "ar" ? "rtl" : "ltr"} />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={onCreate} disabled={saving} className="bg-red-600 dark:bg-primary text-white">
            {saving ? tForm("saving") : tForm("save")}
          </Button>
        </div>
      </WhiteCard>

      {/* Admins List */}
      <WhiteCard title={t("admins")} noPadding>
        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left rtl:text-right p-3">{tTable("name")}</th>
                  <th className="text-left rtl:text-right p-3">{tTable("email")}</th>
                  <th className="text-left rtl:text-right p-3">{tTable("phone")}</th>
                  <th className="text-left rtl:text-right p-3">{tTable("role")}</th>
                  <th className="text-left rtl:text-right p-3">{t("active")}</th>
                  <th className="text-left rtl:text-right p-3">{tTable("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a._id} className="border-t">
                    <td className="p-3 font-bold">{a.firstName} {a.lastName}</td>
                    <td className="p-3">{a.email}</td>
                    <td className="p-3">{a.phone}</td>
                    <td className="p-3 uppercase font-bold">{a.role}</td>
                    <td className="p-3">
                      {a.isActive ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 size={16} /> {t("active")}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 font-bold"><XCircle size={16} /> {t("inactive")}</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => toggleActive(a._id, a.isActive)}>
                          {a.isActive ? t("deactivate") : t("activate")}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Pencil size={14} />
                          {t("edit")}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </WhiteCard>
    </div>
  );
}
