"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WhiteCard } from '@/components/admin/ui/cards';
import { createCategory } from '@/services/categories.service';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from '@/components/admin/ui/ImageUploader';
import { useLocale, useTranslations } from 'next-intl';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const locale = useLocale() as "en" | "ar";
  const tForm = useTranslations('AdminForm');
  const tCats = useTranslations('AdminCategories');
  
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
  });

  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', JSON.stringify({ en: formData.nameEn, ar: formData.nameAr }));
      
      if (images[0]) {
        data.append('image', images[0]);
      }

      await createCategory(data);
      toast.success('Category created successfully');
      router.push('/admin/categories');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{tCats('addNew')}</h1>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 dark:border-border rounded text-gray-600 dark:text-muted-foreground hover:bg-gray-50 dark:hover:bg-muted transition-colors">{tForm('cancel')}</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-[#e30613] text-white rounded shadow hover:bg-red-700 flex items-center gap-2 transition-colors">
            {loading ? tForm('saving') : <><Save size={18} /> {tForm('save')}</>}
          </button>
        </div>
      </div>

      <WhiteCard title={tForm('categoryInfo')}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('nameEn')}</label>
            <input required name="nameEn" value={formData.nameEn} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-1">{tForm('nameAr')}</label>
            <input required name="nameAr" value={formData.nameAr} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 dark:border-border bg-white dark:bg-background rounded focus:outline-none focus:border-[#e30613] text-gray-900 dark:text-foreground transition-colors" dir="rtl" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground mb-2">{tForm('categoryImage')}</label>
            <ImageUploader files={images} onChange={setImages} multiple={false} gridCols={4} />
          </div>
        </div>
      </WhiteCard>
    </form>
  );
}
