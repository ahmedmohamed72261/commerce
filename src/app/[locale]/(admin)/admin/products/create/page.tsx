"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WhiteCard } from '@/components/admin/ui/cards';
import { createProduct } from '@/services/products.service';
import { getCategories } from '@/services/categories.service';
import { getBrands } from '@/services/brands.service';
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from '@/components/admin/ui/ImageUploader';
import { useLocale, useTranslations } from 'next-intl';

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    descEn: '',
    descAr: '',
    price: '',
    brand: '',
    category: '',
    stock: '',
    condition: 'new',
  });

  const [attributes, setAttributes] = useState<{key: string, value: string}[]>([{ key: '', value: '' }]);
  const [images, setImages] = useState<File[]>([]);
  const locale = useLocale() as "en" | "ar";
  const tForm = useTranslations('AdminForm');
  const tSidebar = useTranslations('AdminSidebar');
  

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [cats, brnds] = await Promise.all([getCategories(), getBrands()]);
        setCategories(Array.isArray(cats) ? cats : (cats.data || []));
        setBrands(Array.isArray(brnds) ? brnds : (brnds.data || []));
      } catch (error) {
        console.error("Failed to fetch options", error);
      }
    }
    fetchOptions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAttributeChange = (index: number, field: 'key' | 'value', value: string) => {
    const newAttrs = [...attributes];
    newAttrs[index][field] = value;
    setAttributes(newAttrs);
  };

  const addAttribute = () => setAttributes([...attributes, { key: '', value: '' }]);
  const removeAttribute = (index: number) => setAttributes(attributes.filter((_, i) => i !== index));

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', JSON.stringify({ en: formData.nameEn, ar: formData.nameAr }));
      data.append('description', JSON.stringify({ en: formData.descEn, ar: formData.descAr }));
      data.append('price', formData.price);
      data.append('brand', formData.brand);
      data.append('category', formData.category);
      data.append('stock', formData.stock);
      data.append('condition', formData.condition);

      const attrObj = attributes.reduce((acc, curr) => {
        if (curr.key && curr.value) acc[curr.key] = curr.value;
        return acc;
      }, {} as any);
      data.append('attributes', JSON.stringify(attrObj));

      images.forEach(image => {
        data.append('images', image);
      });

      await createProduct(data);
      toast.success('Product created successfully');
      router.push('/admin/products');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{tSidebar('createProduct')}</h1>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 dark:border-border rounded text-gray-600 dark:text-muted-foreground hover:bg-gray-50 dark:hover:bg-muted transition-colors">{tForm('cancel')}</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-[#e30613] text-white rounded shadow hover:bg-red-700 flex items-center gap-2 transition-colors">
            {loading ? tForm('saving') : <><Save size={18} /> {tForm('save')}</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <WhiteCard title={tForm('basicInfo')}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('nameEn')}</label>
                  <input required name="nameEn" value={formData.nameEn} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('nameAr')}</label>
                  <input required name="nameAr" value={formData.nameAr} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground" dir="rtl" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('descriptionEn')}</label>
                  <textarea required name="descEn" value={formData.descEn} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('descriptionAr')}</label>
                  <textarea required name="descAr" value={formData.descAr} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground" dir="rtl" />
                </div>
              </div>
            </div>
          </WhiteCard>

          <WhiteCard title={tForm('pricingInventory')}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('price')}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('stockQuantity')}</label>
                <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('condition')}</label>
                <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground">
                  <option value="new">{tForm('conditionNew')}</option>
                  <option value="used">{tForm('conditionUsed')}</option>
                </select>
              </div>
            </div>
          </WhiteCard>

          <WhiteCard title={tForm('attributes')}>
            <div className="space-y-3">
              {attributes.map((attr, index) => (
                <div key={index} className="flex gap-3">
                  <input placeholder={tForm('attributeKey')} value={attr.key} onChange={(e) => handleAttributeChange(index, 'key', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground" />
                  <input placeholder={tForm('attributeValue')} value={attr.value} onChange={(e) => handleAttributeChange(index, 'value', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground" />
                  <button type="button" onClick={() => removeAttribute(index)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"><X size={18} /></button>
                </div>
              ))}
              <button type="button" onClick={addAttribute} className="text-sm text-[#e30613] font-medium hover:underline">{tForm('addAttribute')}</button>
            </div>
          </WhiteCard>
        </div>

        <div className="space-y-6">
          <WhiteCard title={tForm('organization')}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('category')}</label>
                <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground">
                  <option value="">{tForm('selectCategory')}</option>
                  {categories.map((cat: any) => (
                    <option key={cat._id || cat.id} value={cat._id || cat.id}>{cat.name?.en || cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('brand')}</label>
                <select required name="brand" value={formData.brand} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground">
                  <option value="">{tForm('selectBrand')}</option>
                  {brands.map((brand: any) => (
                    <option key={brand._id || brand.id} value={brand._id || brand.id}>{brand.name?.en || brand.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </WhiteCard>

          <WhiteCard title={tForm('media')}>
            <ImageUploader files={images} onChange={setImages} multiple gridCols={3} />
          </WhiteCard>
        </div>
      </div>
    </form>
  );
}
