"use client";
import React, { useEffect, useState } from "react";
import { WhiteCard } from "@/components/admin/ui/cards";
import { getAllGovernorates, deleteGovernorate } from "@/services/governorates.service";
import { Plus, Search, Filter, MapPin, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";

export default function GovernoratesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("AdminGovernorates");
  const locale = useLocale();
  const tForm = useTranslations("AdminForm");
  const tTable = useTranslations("AdminTable");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await getAllGovernorates();
      const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      setItems(list);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGovernorate(id);
      toast.success("Governorate deleted");
      await refresh();
    } catch (e) {
      toast.error("Failed to delete governorate");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{t("title")}</h1>
        <Link
          href={`/${locale}/admin/governorates/create`}
          className="bg-[#e30613] text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-bold"
        >
          <Plus size={16} /> {t("addNew")}
        </Link>
      </div>

      <WhiteCard
        noPadding
        headerAction={
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-muted/50 border border-gray-200 dark:border-border focus:bg-white dark:focus:bg-card focus:border-red-500 dark:focus:border-primary focus:ring-2 focus:ring-red-100 dark:focus:ring-primary/20 rounded-full transition-all w-64 outline-none text-gray-800 dark:text-foreground placeholder:text-gray-400 dark:placeholder:text-muted-foreground"
              />
              <Search size={16} className="absolute left-3 top-2 text-gray-400 dark:text-muted-foreground" />
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-muted-foreground">
            <thead className="bg-gray-50 dark:bg-muted/50 text-gray-500 dark:text-muted-foreground font-semibold uppercase text-xs">
              <tr>
                <th className="px-5 py-3 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-border bg-white dark:bg-card text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-5 py-3">{tForm("nameEn")}</th>
                <th className="px-5 py-3">{tForm("nameAr")}</th>
                <th className="px-5 py-3 text-right">{tTable("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    {t("loading")}
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    {t("empty")}
                  </td>
                </tr>
              ) : (
                items.map((g: any) => (
                  <tr key={g._id || g.id} className="hover:bg-gray-50/50 dark:hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-border bg-white dark:bg-card text-red-600 focus:ring-red-500"
                      />
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-foreground">
                      {typeof g.name === "string" ? g.name : g.name?.en}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-foreground text-right" dir="rtl">
                      {typeof g.name === "string" ? g.name : g.name?.ar}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                          aria-label="Delete"
                          onClick={() => handleDelete(String(g._id || g.id))}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </WhiteCard>
    </div>
  );
}
