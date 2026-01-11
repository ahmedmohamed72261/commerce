"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WhiteCard } from '@/components/admin/ui/cards';
import { createProduct } from '@/services/products.service';
import { getCategories } from '@/services/categories.service';
import { getBrands } from '@/services/brands.service';
import { Upload, X, Save } from 'lucide-react';
import { toast } from 'sonner';

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
    salePrice: '',
    brand: '',
    category: '',
    stock: '',
    condition: 'new',
    isFeatured: false,
  });

  const [attributes, setAttributes] = useState<{key: string, value: string}[]>([{ key: '', value: '' }]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
      data.append('description', JSON.stringify({ en: formData.descEn, ar: formData.descAr }));
      data.append('price', formData.price);
      if (formData.salePrice) data.append('salePrice', formData.salePrice);
      data.append('brand', formData.brand);
      data.append('category', formData.category);
      data.append('stock', formData.stock);
      data.append('condition', formData.condition);
      data.append('isFeatured', String(formData.isFeatured));

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
        <h1 className="text-2xl font-bold text-gray-800">Create Product</h1>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-[#e30613] text-white rounded shadow hover:bg-red-700 flex items-center gap-2">
            {loading ? 'Saving...' : <><Save size={18} /> Save Product</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <WhiteCard title="Basic Information">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
                  <input required name="nameEn" value={formData.nameEn} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (AR)</label>
                  <input required name="nameAr" value={formData.nameAr} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" dir="rtl" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                  <textarea required name="descEn" value={formData.descEn} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (AR)</label>
                  <textarea required name="descAr" value={formData.descAr} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" dir="rtl" />
                </div>
              </div>
            </div>
          </WhiteCard>

          <WhiteCard title="Pricing & Inventory">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input type="number" name="salePrice" value={formData.salePrice} onChange={handleInputChange} className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]">
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                </select>
              </div>
            </div>
          </WhiteCard>

          <WhiteCard title="Attributes">
            <div className="space-y-3">
              {attributes.map((attr, index) => (
                <div key={index} className="flex gap-3">
                  <input placeholder="Key (e.g. Color)" value={attr.key} onChange={(e) => handleAttributeChange(index, 'key', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" />
                  <input placeholder="Value (e.g. Red)" value={attr.value} onChange={(e) => handleAttributeChange(index, 'value', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]" />
                  <button type="button" onClick={() => removeAttribute(index)} className="p-2 text-red-500 hover:bg-red-50 rounded"><X size={18} /></button>
                </div>
              ))}
              <button type="button" onClick={addAttribute} className="text-sm text-[#e30613] font-medium hover:underline">+ Add Attribute</button>
            </div>
          </WhiteCard>
        </div>

        <div className="space-y-6">
          <WhiteCard title="Organization">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]">
                  <option value="">Select Category</option>
                  {categories.map((cat: any) => (
                    <option key={cat._id || cat.id} value={cat._id || cat.id}>{cat.name?.en || cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select required name="brand" value={formData.brand} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]">
                  <option value="">Select Brand</option>
                  {brands.map((brand: any) => (
                    <option key={brand._id || brand.id} value={brand._id || brand.id}>{brand.name?.en || brand.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="rounded text-[#e30613] focus:ring-[#e30613]" />
                <label htmlFor="isFeatured" className="text-sm text-gray-700">Featured Product</label>
              </div>
            </div>
          </WhiteCard>

          <WhiteCard title="Media">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-500">Click to upload images</p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative group aspect-square border rounded overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </WhiteCard>
        </div>
      </div>
    </form>
  );
}
