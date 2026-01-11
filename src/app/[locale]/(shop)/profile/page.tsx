"use client";

import React, { useState } from 'react';
import { 
  User, ShoppingBag, Heart, MapPin, 
  ChevronRight, Camera, ShieldCheck, 
  Plus, Pencil, Trash2, KeyRound, 
  Package, Calendar, ExternalLink, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// Note: Assuming standard Dialog components from a library like Shadcn/UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('My Profile');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // STATIC DATA MOCK
  const userData = {
    firstName: "Ahmed",
    lastName: "Mohamed",
    email: "albashengineerahmed@gmail.com",
    phone: "01009480722",
    addresses: [
      {
        id: "1",
        city: "Cairo",
        street: "Tahrir Street",
        building: "12B",
        floor: "3",
        apartment: "12",
        additionalInfo: "Call before delivery",
        isDefault: true
      }
    ],
    orders: [
      { id: "ORD-9921", date: "2026-01-05", status: "Delivered", total: 2450.00, items: 3 },
      { id: "ORD-8842", date: "2026-01-08", status: "In Transit", total: 120.00, items: 1 }
    ],
    wishlist: [
      { id: "w1", name: "Sennheiser Momentum 4", price: 255.00, img: "/p1.jpg" },
      { id: "w2", name: "Samsung Galaxy S24 Ultra", price: 799.00, img: "/p2.jpg" }
    ]
  };

  const sidebarItems = [
    { id: 'My Profile', icon: User, label: 'My Profile' },
    { id: 'My Orders', icon: ShoppingBag, label: 'My Orders' },
    { id: 'My Wishlist', icon: Heart, label: 'My Wishlist' },
    { id: 'My Addresses', icon: MapPin, label: 'My Addresses' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans antialiased">
      {/* HEADER BREADCRUMB */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center gap-2 text-[11px] font-medium text-slate-400">
          <span>Home</span> <ChevronRight size={12} />
          <span className="text-red-600 font-bold uppercase tracking-widest">{activeTab}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-10 flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR */}
        <aside className="w-full lg:w-[280px] shrink-0">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                  activeTab === item.id 
                  ? 'bg-red-50 text-red-600 shadow-sm border border-red-100' 
                  : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm min-h-[600px]">
            
            {/* 1. PROFILE TAB */}
            {activeTab === 'My Profile' && (
              <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-2">
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-red-600 rounded-full" />
                    <h3 className="text-lg font-black text-slate-900 uppercase italic">Basic_Info</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase">First Name</label>
                      <input type="text" defaultValue={userData.firstName} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold focus:border-red-600 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Last Name</label>
                      <input type="text" defaultValue={userData.lastName} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold focus:border-red-600 outline-none" />
                    </div>
                  </div>
                </section>

                <section className="pt-8 border-t border-slate-50 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-red-600 rounded-full" />
                    <h3 className="text-lg font-black text-slate-900 uppercase italic">Security_Access</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="password" placeholder="Current Password" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold focus:border-red-600 outline-none" />
                    <input type="password" placeholder="New Password" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold focus:border-red-600 outline-none" />
                  </div>
                </section>
                <Button className="bg-red-600 hover:bg-slate-900 text-white w-full md:w-auto px-12 h-14 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-50">Save_Deployment</Button>
              </div>
            )}

            {/* 2. ORDERS TAB (Static Data) */}
            {activeTab === 'My Orders' && (
              <div className="p-10 space-y-6 animate-in fade-in">
                {userData.orders.map((order) => (
                  <div key={order.id} className="border-2 border-slate-50 bg-slate-50/30 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{order.id}</p>
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><Calendar size={10}/> {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                       <div className="text-right">
                         <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Status</p>
                         <p className={`text-xs font-bold ${order.status === 'Delivered' ? 'text-green-500' : 'text-orange-500'}`}>{order.status}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Total</p>
                         <p className="text-sm font-black text-red-600">${order.total}</p>
                       </div>
                       <Button variant="ghost" className="rounded-xl hover:bg-white hover:text-red-600"><ExternalLink size={16}/></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. WISHLIST TAB (Static Data) */}
            {activeTab === 'My Wishlist' && (
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                {userData.wishlist.map((item) => (
                  <div key={item.id} className="border-2 border-slate-100 rounded-3xl p-4 flex items-center gap-4 hover:border-red-100 transition-all">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-slate-900 leading-tight">{item.name}</h4>
                      <p className="text-red-600 font-black text-sm mt-1">${item.price}</p>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-red-600 transition-colors"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
            )}

            {/* 4. ADDRESS TAB WITH DIALOG */}
            {activeTab === 'My Addresses' && (
              <div className="p-10 space-y-6 animate-in fade-in">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-black text-slate-900 uppercase italic">Locations</h3>
                  
                  {/* DIALOG FOR ADDING ADDRESS */}
                  <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#0F172A] hover:bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest px-6 h-11 transition-all">
                        <Plus size={14} className="mr-2" /> Add_New
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl rounded-[2.5rem] p-8 border-none shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-black italic uppercase">Manage_<span className="text-red-600">Address</span></DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-6">
                        <div className="space-y-1 col-span-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase">City</label>
                           <input placeholder="Cairo" className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                        </div>
                        <div className="space-y-1 col-span-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase">Street</label>
                           <input placeholder="Tahrir Street" className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-slate-400 uppercase">Bldg</label>
                           <input placeholder="12B" className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-slate-400 uppercase">Apt</label>
                           <input placeholder="402" className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                        </div>
                        <div className="space-y-1 col-span-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase">Delivery Info</label>
                           <textarea placeholder="Ring bell twice..." className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold focus:border-red-600 outline-none h-24" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className="w-full h-14 bg-red-600 hover:bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-100 transition-all">Save_Location_To_Registry</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* ADDRESS LIST */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.addresses.map((addr) => (
                    <div key={addr.id} className="border-2 border-slate-50 bg-slate-50/20 rounded-[2rem] p-6 relative group border-dashed hover:border-red-100 transition-all">
                      {addr.isDefault && <span className="absolute top-4 right-6 text-[8px] font-black bg-red-600 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Default</span>}
                      <p className="text-sm font-black text-slate-900">{addr.city}</p>
                      <p className="text-xs font-bold text-slate-400 mt-1">{addr.street}, Bldg {addr.building}, Floor {addr.floor}</p>
                      <p className="text-[10px] text-red-600 italic mt-3 font-medium">"{addr.additionalInfo}"</p>
                      <div className="mt-6 flex gap-3">
                         <button className="text-xs font-black uppercase text-slate-300 hover:text-red-600 flex items-center gap-1"><Pencil size={12}/> Edit</button>
                         <button className="text-xs font-black uppercase text-slate-300 hover:text-slate-900 flex items-center gap-1"><Trash2 size={12}/> Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage; 