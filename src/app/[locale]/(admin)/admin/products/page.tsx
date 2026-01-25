"use client";
import React, { useEffect, useState } from 'react';
import { WhiteCard } from '@/components/admin/ui/cards';
import { getProducts, getAdminProducts, deleteProduct, updateProduct, setTrendingProduct, getProduct, getAdminProduct } from '@/services/products.service';
import { getCategories, getAdminCategories } from '@/services/categories.service';
import { getBrands } from '@/services/brands.service';
import { Plus, Search, Filter, Box, Pencil, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UpdateDialog } from '@/components/admin/ui/UpdateDialog';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [brands, setBrands] = useState<any[]>([]);
  const tForm = useTranslations("AdminForm");
  const tProd = useTranslations("AdminProducts");
  const locale = useLocale();
  const tTable = useTranslations("AdminTable");

  useEffect(() => {
    async function fetchData() {
      try {
        const [prods, cats, brs] = await Promise.all([getAdminProducts(), getAdminCategories(), getBrands()]);
        const productsList = Array.isArray(prods) ? prods : (prods.data || []);
        const categoriesList = Array.isArray(cats) ? cats : (cats.data || []);
        const brandsList = Array.isArray(brs) ? brs : (brs.data || []);
        
        setProducts(productsList);
        setCategories(categoriesList);
        setBrands(brandsList);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const [prods, cats, brs] = await Promise.all([getAdminProducts(), getAdminCategories(), getBrands()]);
      const productsList = Array.isArray(prods) ? prods : (prods.data || []);
      const categoriesList = Array.isArray(cats) ? cats : (cats.data || []);
      const brandsList = Array.isArray(brs) ? brs : (brs.data || []);
      setProducts(productsList);
      setCategories(categoriesList);
      setBrands(brandsList);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = async (product: any) => {
    try {
      const id = String(product._id || product.id);
      const detailed = await getAdminProduct(id);
      const data = (detailed as any)?.data ?? detailed;
      setEditing(data);
      setEditOpen(true);
    } catch {
      setEditing(product);
      setEditOpen(true);
    }
  };


  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      await refresh();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{tProd("title")}</h1>
        <Link href={`/${locale}/admin/products/create`} className="bg-[#e30613] text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-bold">
           <Plus size={16} /> {tProd("addNew")}
        </Link>
       </div>

       <WhiteCard noPadding headerAction={
         <div className="flex gap-2">
           <div className="relative">
            <input type="text" placeholder={tProd("searchPlaceholder")} className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-muted/50 border border-gray-200 dark:border-border focus:bg-white dark:focus:bg-card focus:border-red-500 dark:focus:border-primary focus:ring-2 focus:ring-red-100 dark:focus:ring-primary/20 rounded-full transition-all w-64 outline-none text-gray-800 dark:text-foreground placeholder:text-gray-400 dark:placeholder:text-muted-foreground" />
             <Search size={16} className="absolute left-3 top-2 text-gray-400 dark:text-muted-foreground" />
           </div>
           <button className="p-2 border-transparent rounded-full text-gray-500 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted"><Filter size={16} /></button>
         </div>
       }>
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-gray-600 dark:text-muted-foreground">
             <thead className="bg-gray-50 dark:bg-muted/50 text-gray-500 dark:text-muted-foreground font-semibold uppercase text-xs">
               <tr>
                 <th className="px-5 py-3 w-10"><input type="checkbox" className="rounded border-gray-300 dark:border-border bg-white dark:bg-card text-red-600 focus:ring-red-500" /></th>
                <th className="px-5 py-3">{tTable("image")}</th>
                <th className="px-5 py-3">{tTable("name")}</th>
                <th className="px-5 py-3">{tTable("category")}</th>
                <th className="px-5 py-3">{tTable("price")}</th>
                <th className="px-5 py-3 text-right">{tTable("actions")}</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
               {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center">{tProd("loading")}</td></tr>
               ) : products.length === 0 ? (
                 <tr>
                   <td colSpan={6} className="text-center py-20">
                     <div className="flex flex-col items-center justify-center gap-4">
                       <div className="p-5 rounded-full bg-gray-50 dark:bg-muted border border-gray-100 dark:border-border">
                         <Box size={48} className="text-gray-300 dark:text-muted-foreground" />
                       </div>
                       <div className="space-y-1 text-center">
                        <h3 className="font-bold text-lg text-gray-700 dark:text-foreground">{tProd("empty")}</h3>
                        <p className="text-sm text-gray-500 dark:text-muted-foreground"></p>
                       </div>
                     </div>
                   </td>
                 </tr>
               ) : (
                 products.map((product: any) => (
                  <tr key={product._id || product.id} className="hover:bg-gray-50/50 dark:hover:bg-muted/50 transition-colors group">
                    <td className="px-5 py-3"><input type="checkbox" className="rounded border-gray-300 dark:border-border bg-white dark:bg-card text-red-600 focus:ring-red-500" /></td>
                    <td className="px-5 py-3">
                       <div className="w-10 h-10 bg-gray-100 dark:bg-muted rounded border border-gray-200 dark:border-border flex items-center justify-center overflow-hidden">
                         {product.images && product.images[0] ? (
                           <img src={product.images[0]} alt={product.name?.en || product.name} className="w-full h-full object-cover" />
                         ) : (
                           <Box size={16} className="text-gray-300 dark:text-muted-foreground" />
                         )}
                       </div>
                     </td>
                     <td className="px-5 py-3 font-medium text-gray-800 dark:text-foreground">{product.name?.en || product.name}</td>
                     <td className="px-5 py-3 text-xs">
                        {product.category?.name?.en || '—'}
                      </td>

                     <td className="px-5 py-3 font-bold text-gray-800 dark:text-foreground">${product.price}</td>
                     <td className="px-5 py-3 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button
                           className={`p-1.5 rounded ${product.trending ? 'text-yellow-500' : 'text-gray-400 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted'}`}
                           aria-label={product.trending ? 'Remove from trending' : 'Make trending'}
                           onClick={async () => {
                             try {
                               await setTrendingProduct(String(product._id || product.id), !product.trending);
                               toast.success(product.trending ? 'Removed from trending' : 'Marked as trending');
                               await refresh();
                             } catch (error) {
                               toast.error('Failed to update trending status');
                             }
                           }}
                         >
                           <Star size={16} fill={product.trending ? 'currentColor' : 'none'} />
                         </button>
                         <button
                           className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-muted text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground"
                           aria-label="Edit"
                           onClick={() => openEdit(product)}
                         >
                           <Pencil size={16} />
                         </button>
                         <button
                           className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                           aria-label="Delete"
                           onClick={() => handleDelete(String(product._id || product.id))}
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

      {editing && (
        <UpdateDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          title={tForm("editProduct")}
          initial={editing}
          initialForm={{
            nameEn: editing?.name?.en || editing?.name || "",
            nameAr: editing?.name?.ar || "",
            descEn: editing?.description?.en || editing?.description || "",
            descAr: editing?.description?.ar || "",
            price: editing?.price ?? "",
            stock: editing?.stock ?? "",
            condition: editing?.condition ?? "new",
            category: editing?.category?._id ?? editing?.category ?? "",
            brand: editing?.brand?._id ?? editing?.brand ?? "",
          }}
          existingImages={Array.isArray(editing?.images) ? editing.images : []}
          multipleNew={true}
          gridCols={3}
          renderFields={(form, setForm) => (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("nameEn")}</label>
                  <Input
                    name="nameEn"
                    value={(form.nameEn as string) ?? ""}
                    onChange={(e) => setForm({ nameEn: e.target.value })}
                    locale="en"
                    showIcon={false}
                    appearance="white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("nameAr")}</label>
                  <Input
                    name="nameAr"
                    value={(form.nameAr as string) ?? ""}
                    onChange={(e) => setForm({ nameAr: e.target.value })}
                    locale="ar"
                    showIcon={false}
                    appearance="white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("descriptionEn")}</label>
                  <Textarea
                    name="descEn"
                    value={(form.descEn as string) ?? ""}
                    onChange={(e) => setForm({ descEn: e.target.value })}
                    rows={3}
                    locale="en"
                    appearance="white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("descriptionAr")}</label>
                  <Textarea
                    name="descAr"
                    value={(form.descAr as string) ?? ""}
                    onChange={(e) => setForm({ descAr: e.target.value })}
                    rows={3}
                    locale="ar"
                    appearance="white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("price")}</label>
                  <Input
                    type="number"
                    name="price"
                    value={String(form.price ?? "")}
                    onChange={(e) => setForm({ price: e.target.value })}
                    showIcon={false}
                    appearance="white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("stockQuantity")}</label>
                  <Input
                    type="number"
                    name="stock"
                    value={String(form.stock ?? "")}
                    onChange={(e) => setForm({ stock: e.target.value })}
                    showIcon={false}
                    appearance="white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("condition")}</label>
                  <Select
                    name="condition"
                    value={String(form.condition ?? "new")}
                    onChange={(e) => setForm({ condition: e.target.value })}
                    appearance="white"
                    options={[
                      { value: "new", label: tForm("conditionNew") },
                      { value: "used", label: tForm("conditionUsed") },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("category")}</label>
                  <Select
                    name="category"
                    value={String(form.category ?? "")}
                    onChange={(e) => setForm({ category: e.target.value })}
                    appearance="white"
                  >
                    <option value="">{tForm("selectCategory")}</option>
                    {categories.map((c: any) => (
                      <option key={c._id || c.id} value={c._id || c.id}>{c.name?.en || c.name}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{tForm("brand")}</label>
                  <Select
                    name="brand"
                    value={String(form.brand ?? "")}
                    onChange={(e) => setForm({ brand: e.target.value })}
                    appearance="white"
                  >
                    <option value="">{tForm("selectBrand")}</option>
                    {brands.map((b: any) => (
                      <option key={b._id || b.id} value={b._id || b.id}>{b.name?.en || b.name}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </>
          )}
          onSave={async ({ id, form, newFiles, removedExisting }) => {
            const hasFiles = newFiles.length > 0;
            if (hasFiles) {
              const fd = new FormData();
              if (form.nameEn || form.nameAr) {
                fd.append("name", JSON.stringify({ en: String(form.nameEn ?? ""), ar: String(form.nameAr ?? "") }));
              }
              if (form.descEn || form.descAr) {
                fd.append("description", JSON.stringify({ en: String(form.descEn ?? ""), ar: String(form.descAr ?? "") }));
              }
              if (form.price) fd.append("price", String(form.price as string));
              if (form.stock) fd.append("stock", String(form.stock as string));
              if (form.condition) fd.append("condition", String(form.condition as string));
              if (form.category) fd.append("category", String(form.category as string));
              if (form.brand) fd.append("brand", String(form.brand as string));
              if (removedExisting.length > 0) fd.append("images", JSON.stringify(removedExisting));
              newFiles.forEach((f) => fd.append("images", f));
              await updateProduct(String(id), fd);
            } else {
              const payload: Record<string, unknown> = {};
              if (form.nameEn || form.nameAr) payload.name = { en: String(form.nameEn ?? ""), ar: String(form.nameAr ?? "") };
              if (form.descEn || form.descAr) payload.description = { en: String(form.descEn ?? ""), ar: String(form.descAr ?? "") };
              if (form.price) payload.price = Number(form.price as string);
              if (form.stock) payload.stock = Number(form.stock as string);
              if (form.condition) payload.condition = String(form.condition as string);
              if (form.category) payload.category = String(form.category as string);
              if (form.brand) payload.brand = String(form.brand as string);
              if (removedExisting.length > 0) (payload as any).removedImages = removedExisting;
              await updateProduct(String(id), payload);
            }
            await refresh();
          }}
        />
      )}
    </div>
  );
}
