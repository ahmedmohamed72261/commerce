"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WhiteCard } from "@/components/admin/ui/cards";
import { createBrand } from "@/services/brands.service";
import { Upload, X, Save } from "lucide-react";
import { toast } from "sonner";

export default function CreateBrandPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name[en]", formData.nameEn);
      fd.append("name[ar]", formData.nameAr);
      images.forEach((file) => fd.append("image", file));

      const res = await createBrand(fd);
      if (res?.success || res?._id || res?.id) {
        toast.success("Brand created successfully");
        router.push("/admin/brands");
      } else {
        toast.error("Failed to create brand");
      }
    } catch (err) {
      toast.error("Failed to create brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Create Brand</h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#e30613] text-white rounded shadow hover:bg-red-700 flex items-center gap-2"
          >
            {loading ? "Saving..." : <>
              <Save size={18} /> Save Brand
            </>}
          </button>
        </div>
      </div>

      <WhiteCard title="Brand Information">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
            <input
              required
              name="nameEn"
              value={formData.nameEn}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (AR)</label>
            <input
              required
              name="nameAr"
              value={formData.nameAr}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#e30613]"
              dir="rtl"
            />
          </div>
        </div>
      </WhiteCard>

      <WhiteCard title="Brand Image">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="px-4 py-2 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 flex items-center gap-2">
              <Upload size={16} />
              <span>Select Images</span>
              <input type="file" multiple className="hidden" accept="image/*" onChange={handleSelectImages} />
            </label>
            {images.length > 0 && (
              <span className="text-sm text-gray-600">{images.length} file(s) selected</span>
            )}
          </div>
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative group">
                  <img src={src} alt={`Preview ${i}`} className="w-full h-32 object-cover rounded border border-gray-200" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 bg-white border border-gray-200 rounded-full p-1 text-gray-600 hover:text-red-600 shadow-sm"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </WhiteCard>
    </form>
  );
}

