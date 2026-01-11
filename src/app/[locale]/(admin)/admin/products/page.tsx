"use client";
import React, { useEffect, useState } from 'react';
import { WhiteCard } from '@/components/admin/ui/cards';
import { getProducts } from '@/services/products.service';
import { getCategories } from '@/services/categories.service';
import { Plus, Search, Filter, Box } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
        // Handle if response is { success: true, data: [...] } or just [...]
        const productsList = Array.isArray(prods) ? prods : (prods.data || []);
        const categoriesList = Array.isArray(cats) ? cats : (cats.data || []);
        
        setProducts(productsList);
        setCategories(categoriesList);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button className="bg-[#e30613] text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-bold">
           <Plus size={16} /> ADD NEW
        </button>
       </div>

       <WhiteCard noPadding headerAction={
         <div className="flex gap-2">
           <div className="relative">
             <input type="text" placeholder="Search products..." className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-gray-100 rounded-full transition-all w-64 outline-none" />
             <Search size={16} className="absolute left-3 top-2 text-gray-400" />
           </div>
           <button className="p-2 border-transparent rounded-full text-gray-500 hover:bg-gray-100"><Filter size={16} /></button>
         </div>
       }>
         <table className="w-full text-left text-sm text-gray-600">
           <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
             <tr>
               <th className="px-5 py-3 w-10"><input type="checkbox" /></th>
               <th className="px-5 py-3">Image</th>
               <th className="px-5 py-3">Name</th>
               <th className="px-5 py-3">Category</th>
               <th className="px-5 py-3">Price</th>
               <th className="px-5 py-3 text-right">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
             {loading ? (
               <tr><td colSpan={6} className="px-5 py-10 text-center">Loading products...</td></tr>
             ) : products.length === 0 ? (
               <tr>
                 <td colSpan={6} className="text-center py-20">
                   <div className="flex flex-col items-center justify-center gap-4">
                     <div className="p-5 rounded-full bg-gray-50 border border-gray-100">
                       <Box size={48} className="text-gray-300" />
                     </div>
                     <div className="space-y-1 text-center">
                       <h3 className="font-bold text-lg text-gray-700">No products yet</h3>
                       <p className="text-sm text-gray-500">Add your first product to get started.</p>
                     </div>
                   </div>
                 </td>
               </tr>
             ) : (
               products.map((product: any) => (
                 <tr key={product._id || product.id} className="hover:bg-gray-50/50 transition-colors group">
                   <td className="px-5 py-3"><input type="checkbox" /></td>
                   <td className="px-5 py-3">
                     <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                       {product.images && product.images[0] ? (
                         <img src={product.images[0]} alt={product.name?.en || product.name} className="w-full h-full object-cover" />
                       ) : (
                         <Box size={16} className="text-gray-300" />
                       )}
                     </div>
                   </td>
                   <td className="px-5 py-3 font-medium text-gray-800">{product.name?.en || product.name}</td>
                   <td className="px-5 py-3 text-xs">
                     {categories.find(c => c._id === product.category)?.name?.en || 'Unknown'}
                   </td>
                   <td className="px-5 py-3 font-bold text-gray-800">${product.price}</td>
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
