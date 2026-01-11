"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WhiteCard } from '@/components/admin/ui/cards';
import { createCategory } from '@/services/categories.service';
import { Upload, X, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', JSON.stringify({ en: formData.nameEn, ar: formData.nameAr }));
      
      // Handle multiple images if supported by backend, or just the first one
      images.forEach(image => {
        data.append('image', image); // Backend expects 'image' or 'images'? code.txt says "image file and multible"
      });

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
        <h1 className="text-2xl font-bold text-gray-800">Create Category</h1>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-[#e30613] text-white rounded shadow hover:bg-red-700 flex items-center gap-2">
            {loading ? 'Saving...' : <><Save size={18} /> Save Category</>}
          </button>
        </div>
      </div>

      <WhiteCard title="Category Information">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
            <input required name="nameEn" value={formData.nameEn} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (AR)</label>
            <input required name="nameAr" value={formData.nameAr} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" dir="rtl" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-500">Click to upload image</p>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative group aspect-square border rounded overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WhiteCard>
    </form>
  );
}
