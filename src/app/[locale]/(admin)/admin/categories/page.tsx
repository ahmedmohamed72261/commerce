"use client";
import React, { useEffect, useState } from 'react';
import { WhiteCard } from '@/components/admin/ui/cards';
import { getCategories } from '@/services/categories.service';
import { Plus, Search, Filter, ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCategories();
        setCategories(Array.isArray(response) ? response : (response.data || []));
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <Link href="/admin/categories/create" className="bg-[#e30613] text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-bold">
           <Plus size={16} /> ADD NEW
        </Link>
       </div>

       <WhiteCard noPadding headerAction={
         <div className="flex gap-2">
           <div className="relative">
             <input type="text" placeholder="Search categories..." className="pl-8 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 w-64" />
             <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
           </div>
         </div>
       }>
         <table className="w-full text-left text-sm text-gray-600">
           <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
             <tr>
               <th className="px-5 py-3 w-10"><input type="checkbox" /></th>
               <th className="px-5 py-3">Image</th>
               <th className="px-5 py-3">Name (EN)</th>
               <th className="px-5 py-3">Name (AR)</th>
               <th className="px-5 py-3 text-right">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
             {loading ? (
               <tr><td colSpan={5} className="px-5 py-10 text-center">Loading categories...</td></tr>
             ) : categories.length === 0 ? (
               <tr><td colSpan={5} className="px-5 py-10 text-center">No categories found.</td></tr>
             ) : (
               categories.map((cat: any) => (
                 <tr key={cat._id || cat.id} className="hover:bg-gray-50/50 transition-colors">
                   <td className="px-5 py-3"><input type="checkbox" /></td>
                   <td className="px-5 py-3">
                     <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                       {cat.image ? (
                         <img src={cat.image} alt={cat.name?.en} className="w-full h-full object-cover" />
                       ) : (
                         <ImageIcon size={16} className="text-gray-300" />
                       )}
                     </div>
                   </td>
                   <td className="px-5 py-3 font-medium text-gray-800">{cat.name?.en || cat.name}</td>
                   <td className="px-5 py-3 font-medium text-gray-800 text-right" dir="rtl">{cat.name?.ar}</td>
                   <td className="px-5 py-3 text-right">
                     <button className="text-blue-600 hover:underline text-xs font-bold uppercase">Edit</button>
                   </td>
                 </tr>
               ))
             )}
           </tbody>
         </table>
       </WhiteCard>
    </div>
  );
}
