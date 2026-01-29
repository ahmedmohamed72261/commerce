"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { WhiteCard } from "@/components/admin/ui/cards";
import { getBrands, updateBrand, deleteBrand, getAllBrandsForAdmin } from "@/services/brands.service";
import { Plus, Search, ImageIcon, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateDialog } from "@/components/admin/ui/UpdateDialog";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const tForm = useTranslations("AdminForm");
  const tList = useTranslations("AdminBrands");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const tTable = useTranslations("AdminTable");
  const isRTL = (locale as string) === "ar";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllBrandsForAdmin();
        const list = Array.isArray(response) ? response : response?.data || [];
        setBrands(list);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  const refresh = async () => {
    setLoading(true);
    try {
      const response = await getAllBrandsForAdmin();
      const list = Array.isArray(response) ? response : response?.data || [];
      setBrands(list);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (brand: any) => {
    setEditing(brand);
    setEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBrand(id);
      toast.success(isRTL ? "تم حذف العلامة التجارية" : "Brand deleted");
      await refresh();
    } catch {
      toast.error(isRTL ? "فشل حذف العلامة التجارية" : "Failed to delete brand");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{tList("title")}</h1>
        <Link
          href={`/${locale}/admin/brands/create`}
          className="bg-[#e30613] text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-bold"
        >
          <Plus size={16} /> {tList("addNew")}
        </Link>
      </div>

      <WhiteCard noPadding headerAction={
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tList("searchPlaceholder")}
              className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-muted/50 border border-gray-200 dark:border-border focus:bg-white dark:focus:bg-card focus:border-red-500 dark:focus:border-primary focus:ring-2 focus:ring-red-100 dark:focus:ring-primary/20 rounded-full transition-all w-64 outline-none text-gray-800 dark:text-foreground placeholder:text-gray-400 dark:placeholder:text-muted-foreground"
            />
            <Search size={16} className="absolute left-3 top-2 text-gray-400 dark:text-muted-foreground" />
          </div>
        </div>
      }>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-muted-foreground">
            <thead className="bg-gray-50 dark:bg-muted/50 text-gray-500 dark:text-muted-foreground font-semibold uppercase text-xs">
              <tr>
                <th className="px-5 py-3 w-10"><input type="checkbox" className="rounded border-gray-300 dark:border-border bg-white dark:bg-card text-red-600 focus:ring-red-500"/></th>
                <th className="px-5 py-3">{tTable("image")}</th>
                <th className="px-5 py-3">{tForm("nameEn")}</th>
                <th className="px-5 py-3">{tForm("nameAr")}</th>
                <th className="px-5 py-3 text-right">{tTable("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center">{tList("loading")}</td></tr>
              ) : (brands.filter((b) => {
                  const name = typeof b.name === "string" ? b.name : (locale === "ar" ? b.name?.ar : b.name?.en) || "";
                  return String(name).toLowerCase().includes(search.toLowerCase());
                })).length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center">{tList("empty")}</td></tr>
              ) : (
                brands.filter((b) => {
                  const name = typeof b.name === "string" ? b.name : (locale === "ar" ? b.name?.ar : b.name?.en) || "";
                  return String(name).toLowerCase().includes(search.toLowerCase());
                }).map((brand: any) => (
                  <tr key={brand._id || brand.id} className="hover:bg-gray-50/50 dark:hover:bg-muted/50 transition-colors group">
                    <td className="px-5 py-3"><input type="checkbox" className="rounded border-gray-300 dark:border-border bg-white dark:bg-card text-red-600 focus:ring-red-500" /></td>
                    <td className="px-5 py-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-muted rounded border border-gray-200 dark:border-border flex items-center justify-center overflow-hidden">
                        {brand.image ? (
                          <img src={brand.image} alt={brand.name?.en || brand.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={16} className="text-gray-300 dark:text-muted-foreground" />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-foreground">{brand.name?.en || brand.name}</td>
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-foreground">{brand.name?.ar || "-"}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-muted text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground" aria-label="Edit" onClick={() => openEdit(brand)}>
                          <Pencil size={16} />
                        </button>
                        <button className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400" aria-label="Delete" onClick={() => handleDelete(String(brand._id || brand.id))}>
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
      
      {editing && (
        <UpdateDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          title={tForm("editBrand")}
          initial={editing}
          initialForm={{
            nameEn: editing?.name?.en || editing?.name || "",
            nameAr: editing?.name?.ar || "",
          }}
          existingImages={editing?.image ? [editing.image] : []}
          multipleNew={false}
          gridCols={2}
          renderFields={(form, setForm) => (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("nameEn")}</label>
                <Input
                  name="nameEn"
                  value={(form.nameEn as string) ?? ""}
                  onChange={(e) => setForm({ nameEn: e.target.value })}
                  locale="en"
                  appearance="white"
                  showIcon={false}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("nameAr")}</label>
                <Input
                  name="nameAr"
                  value={(form.nameAr as string) ?? ""}
                  onChange={(e) => setForm({ nameAr: e.target.value })}
                  locale="ar"
                  appearance="white"
                  showIcon={false}
                />
              </div>
            </div>
          )}
          onSave={async ({ id, form, newFiles, removedExisting }) => {
            try {
              if (newFiles[0]) {
                const fd = new FormData();
                fd.append("name", JSON.stringify({ en: String(form.nameEn ?? ""), ar: String(form.nameAr ?? "") }));
                fd.append("image", newFiles[0]);
                await updateBrand(id, fd);
              } else {
                const payload: Record<string, unknown> = {
                  name: { en: String(form.nameEn ?? ""), ar: String(form.nameAr ?? "") },
                };
                if (removedExisting.length > 0) {
                  (payload as any).image = null;
                }
                await updateBrand(id, payload);
              }
              await refresh();
              toast.success(tForm("updated"));
            } catch {
              toast.error(tForm("updateFailed"));
            }
          }}
        />
      )}
    </div>
  );
}
