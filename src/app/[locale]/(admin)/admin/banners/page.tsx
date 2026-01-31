"use client";
import React, { useEffect, useState } from "react";
import { WhiteCard } from "@/components/admin/ui/cards";
import { getBannersByType, createBanner, updateBanner, addImageToBanner, deleteImageFromBanner, deleteBanner, BannerType } from "@/services/banners.service";
import { Plus, Search, ImageIcon, Trash2, Save, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import { ImageUploader } from "@/components/admin/ui/ImageUploader";
import { toast } from "sonner";
import { cn } from "@/utils/utils";

export default function BannersPage() {
  const [main, setMain] = useState<any[]>([]);
  const [secondary, setSecondary] = useState<any[]>([]);
  const [third, setThird] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<{ title: string; bannerType: BannerType; images: File[] }>({
    title: "main",
    bannerType: "main",
    images: [],
  });
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations('AdminBanners');

  const refresh = async () => {
    setLoading(true);
    try {
      const [m, s, t] = await Promise.all([
        getBannersByType("main"),
        getBannersByType("secondary"),
        getBannersByType("third")
      ]);
      setMain(m);
      setSecondary(s);
      setThird(t);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("bannerType", form.bannerType);
      form.images.forEach((img) => fd.append("images", img));
      await createBanner(fd);
      toast.success("Banner created");
      setForm({ title: "main", bannerType: "main", images: [] });
      await refresh();
    } catch {
      toast.error("Failed to create banner");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateType = async (id: string, currentType: BannerType) => {
    try {
      const nextType: BannerType = currentType === "main" ? "secondary" : currentType === "secondary" ? "third" : "main";
      const fd = new FormData();
      fd.append("bannerType", nextType);
      await updateBanner(id, fd);
      toast.success("Banner updated");
      await refresh();
    } catch {
      toast.error("Failed to update banner");
    }
  };

  const handleAddImage = async (id: string, file: File) => {
    try {
      await addImageToBanner(id, file);
      toast.success("Image added");
      await refresh();
    } catch {
      toast.error("Failed to add image");
    }
  };

  const handleDeleteImage = async (bannerId: string, imageId: string) => {
    try {
      await deleteImageFromBanner(bannerId, imageId);
      toast.success("Image deleted");
      await refresh();
    } catch {
      toast.error("Failed to delete image");
    }
  };

  const handleDeleteBanner = async (id: string) => {
    try {
      await deleteBanner(id);
      toast.success("Banner deleted");
      await refresh();
    } catch {
      toast.error("Failed to delete banner");
    }
  };

  const renderList = (title: string, list: any[]) => (
    <WhiteCard title={title} noPadding>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 dark:text-muted-foreground">
          <thead className="bg-gray-50 dark:bg-muted/50 text-gray-500 dark:text-muted-foreground font-semibold uppercase text-xs">
            <tr>
              <th className="px-5 py-3">{t('fieldTitle')}</th>
              <th className="px-5 py-3">{t('type')}</th>
              <th className="px-5 py-3">{t('images')}</th>
              <th className="px-5 py-3 text-right">{t('action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center">{t('loading')}</td></tr>
            ) : list.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center">{t('empty')}</td></tr>
            ) : (
              list.map((b: any) => (
                <tr key={b._id || b.id} className="hover:bg-gray-50/50 dark:hover:bg-muted/50 transition-colors">
                  <td className={cn("px-5 py-3 font-medium text-gray-800 dark:text-foreground", locale === "ar" ? "text-right" : "")} dir={locale === "ar" ? "rtl" : undefined}>
                    {b.title || "-"}
                  </td>
                  <td className="px-5 py-3">{b.bannerType}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2 flex-wrap">
                      {(b.images || []).map((img: any) => {
                        const id = typeof img === "object" ? img._id || img.id : undefined;
                        const url = typeof img === "string" ? img : img?.imageUrl;
                        return (
                          <div key={id || url} className="relative w-16 h-16 rounded border overflow-hidden">
                            {url ? <img src={url} alt="banner" className="w-full h-full object-cover" /> : <ImageIcon size={16} />}
                            {id && (
                              <button
                                className="absolute top-1 right-1 p-1 rounded bg-red-600 text-white"
                                onClick={() => handleDeleteImage(String(b._id || b.id), String(id))}
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                      <label className="w-16 h-16 rounded border flex items-center justify-center cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Upload size={16} />
                        <input type="file" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAddImage(String(b._id || b.id), file);
                        }} />
                      </label>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="px-3 py-1.5 rounded bg-gray-100 dark:bg-muted text-gray-700 dark:text-foreground hover:bg-gray-200 dark:hover:bg-muted/80"
                        onClick={() => handleUpdateType(String(b._id || b.id), b.bannerType)}
                      >
                            {t('toggleType')}
                      </button>
                      <button
                        className="px-3 py-1.5 rounded bg-red-50 dark:bg-red-900/20 text-red-600"
                        onClick={() => handleDeleteBanner(String(b._id || b.id))}
                      >
                            {t('delete')}
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
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{t('title')}</h1>
      </div>

      <WhiteCard title={t('create')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              label={t('fieldTitle')}
              locale={locale}
            />
            <div className="mt-4">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">{t('images')}</label>
              <ImageUploader files={form.images} onChange={(f) => setForm({ ...form, images: f })} multiple gridCols={4} />
            </div>
          </div>
          <div className="flex flex-col md:items-start">
            <div className="w-full">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{t('type')}</label>
              <select
                value={form.bannerType}
                onChange={(e) => setForm({ ...form, bannerType: e.target.value as BannerType })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-border rounded bg-white dark:bg-card dark:text-foreground"
              >
                <option value="main">{t('typeMain')}</option>
                <option value="secondary">{t('typeSecondary')}</option>
                <option value="third">{t('typeThird')}</option>
              </select>
            </div>
            <div className="mt-4">
              <button
                onClick={handleCreate}
                disabled={creating}
                className="bg-[#e30613] text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-bold disabled:opacity-60"
              >
                <Save size={16} /> {creating ? t('saving') : t('save')}
              </button>
            </div>
          </div>
        </div>
      </WhiteCard>

      {renderList(t('mainList'), main)}
      {renderList(t('secondaryList'), secondary)}
      {renderList(t('thirdList'), third)}
    </div>
  );
}
