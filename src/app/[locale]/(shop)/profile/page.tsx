"use client";

import React, { useEffect, useMemo, useState } from 'react';
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
import { getProfile, updatePassword, addAddress, updateAddress, type AddressPayload } from "@/services/user.service";
import { toast } from "sonner";
import { useWishlist } from "@/store/wishlist";
import { useOrdersStore } from "@/store/orders";

type Address = {
  _id?: string;
  city?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
  additionalInfo?: string;
  isDefault?: boolean;
};

type UserProfile = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  addresses?: Address[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const pickString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('My Profile');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { items: wishlistItems, fetchWishlist, removeItem: removeWishlistItem } = useWishlist();
  const { orders, loading: ordersLoading, getOrders } = useOrdersStore();

  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressPayload>({
    city: "",
    street: "",
    building: "",
    floor: "",
    apartment: "",
    additionalInfo: "",
    isDefault: false,
  });

  useEffect(() => {
    const run = async () => {
      try {
        setProfileLoading(true);
        const res = await getProfile();
        const payload = (res as unknown as { data?: unknown })?.data;
        const data =
          isRecord(payload) && "data" in payload
            ? (payload as { data?: unknown }).data
            : payload;

        if (isRecord(data)) {
          setProfile({
            _id: pickString(data["_id"]),
            firstName: pickString(data["firstName"]),
            lastName: pickString(data["lastName"]),
            email: pickString(data["email"]),
            phone: pickString(data["phone"]),
            role: pickString(data["role"]),
            addresses: Array.isArray(data["addresses"])
              ? (data["addresses"] as unknown[])
                  .map((a) => (isRecord(a) ? (a as Address) : null))
                  .filter((x): x is Address => x !== null)
              : [],
          });
        } else {
          setProfile(null);
        }
      } catch {
        setProfile(null);
      } finally {
        setProfileLoading(false);
      }
    };
    run();
    fetchWishlist();
    getOrders();
  }, [fetchWishlist, getOrders]);

  const addresses = useMemo(() => profile?.addresses ?? [], [profile]);

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
                  {profileLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="h-12 rounded-2xl border border-transparent bg-slate-100 animate-pulse" />
                      <div className="h-12 rounded-2xl border border-transparent bg-slate-100 animate-pulse" />
                      <div className="h-12 rounded-2xl border border-transparent bg-slate-100 animate-pulse" />
                      <div className="h-12 rounded-2xl border border-transparent bg-slate-100 animate-pulse" />
                    </div>
                  ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase">First Name</label>
                      <input
                        type="text"
                        value={profile?.firstName ?? ""}
                        readOnly
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Last Name</label>
                      <input
                        type="text"
                        value={profile?.lastName ?? ""}
                        readOnly
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold outline-none"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Email</label>
                      <input
                        type="email"
                        value={profile?.email ?? ""}
                        readOnly
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold outline-none"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Phone</label>
                      <input
                        type="tel"
                        value={profile?.phone ?? ""}
                        readOnly
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold outline-none"
                      />
                    </div>
                  </div>
                  )}
                </section>

                <section className="pt-8 border-t border-slate-50 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-red-600 rounded-full" />
                    <h3 className="text-lg font-black text-slate-900 uppercase italic">Security_Access</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold focus:border-red-600 outline-none"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 h-12 text-sm font-bold focus:border-red-600 outline-none"
                    />
                  </div>
                </section>
                <Button
                  disabled={passwordSaving || !currentPassword || !newPassword}
                  onClick={async () => {
                    try {
                      setPasswordSaving(true);
                      await updatePassword({ currentPassword, newPassword });
                      setCurrentPassword("");
                      setNewPassword("");
                      toast.success("Password updated");
                    } catch {
                      toast.error("Failed to update password");
                    } finally {
                      setPasswordSaving(false);
                    }
                  }}
                  className="bg-red-600 hover:bg-slate-900 text-white w-full md:w-auto px-12 h-14 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-50 disabled:opacity-50"
                >
                  Save_Deployment
                </Button>
              </div>
            )}

            {/* 2. ORDERS TAB (Static Data) */}
            {activeTab === 'My Orders' && (
              <div className="p-10 space-y-6 animate-in fade-in">
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <span className="text-slate-400 font-bold text-sm">Loading orders...</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
                    <p className="text-slate-600 font-bold text-lg">No orders found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="p-4 border rounded-2xl flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-black text-slate-900">#{order._id.slice(-6)}</p>
                          <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">${order.totalAmount}</p>
                          <p className="text-[10px] font-bold uppercase text-slate-400">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. WISHLIST TAB (Static Data) */}
            {activeTab === 'My Wishlist' && (
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                {wishlistItems.map((item) => (
                  <div key={String(item.id)} className="border-2 border-slate-100 rounded-3xl p-4 flex items-center gap-4 hover:border-red-100 transition-all">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-slate-900 leading-tight">{item.title}</h4>
                      <p className="text-red-600 font-black text-sm mt-1">${item.salePrice ?? item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeWishlistItem(String(item.id))}
                      className="p-2 text-slate-300 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18}/>
                    </button>
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
                           <input value={addressForm.city} onChange={(e) => setAddressForm((p) => ({ ...p, city: e.target.value }))} placeholder="Cairo" className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                        </div>
                        <div className="space-y-1 col-span-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase">Street</label>
                           <input value={addressForm.street} onChange={(e) => setAddressForm((p) => ({ ...p, street: e.target.value }))} placeholder="Tahrir Street" className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-slate-400 uppercase">Bldg</label>
                           <input value={addressForm.building} onChange={(e) => setAddressForm((p) => ({ ...p, building: e.target.value }))} placeholder="12B" className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-slate-400 uppercase">Apt</label>
                           <input value={addressForm.apartment} onChange={(e) => setAddressForm((p) => ({ ...p, apartment: e.target.value }))} placeholder="402" className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                        </div>
                        <div className="space-y-1 col-span-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase">Delivery Info</label>
                           <textarea value={addressForm.additionalInfo} onChange={(e) => setAddressForm((p) => ({ ...p, additionalInfo: e.target.value }))} placeholder="Ring bell twice..." className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold focus:border-red-600 outline-none h-24" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          onClick={async () => {
                            try {
                              await addAddress(addressForm);
                              const res = await getProfile();
                              const payload = (res as unknown as { data?: unknown })?.data;
                              const data =
                                isRecord(payload) && "data" in payload
                                  ? (payload as { data?: unknown }).data
                                  : payload;
                              if (isRecord(data)) {
                                setProfile((prev) => ({
                                  ...(prev ?? {}),
                                  addresses: Array.isArray(data["addresses"])
                                    ? (data["addresses"] as unknown[])
                                        .map((a) => (isRecord(a) ? (a as Address) : null))
                                        .filter((x): x is Address => x !== null)
                                    : [],
                                }));
                              }
                              setIsAddressModalOpen(false);
                              setAddressForm({
                                city: "",
                                street: "",
                                building: "",
                                floor: "",
                                apartment: "",
                                additionalInfo: "",
                                isDefault: false,
                              });
                              toast.success("Address saved");
                            } catch {
                              toast.error("Failed to save address");
                            }
                          }}
                          className="w-full h-14 bg-red-600 hover:bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-100 transition-all"
                        >
                          Save_Location_To_Registry
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* ADDRESS LIST */}
                <Dialog open={isEditAddressModalOpen} onOpenChange={setIsEditAddressModalOpen}>
                  <DialogContent className="max-w-xl rounded-[2.5rem] p-8 border-none shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-black italic uppercase">Update_<span className="text-red-600">Address</span></DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-6">
                      <div className="space-y-1 col-span-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase">City</label>
                         <input value={addressForm.city} onChange={(e) => setAddressForm((p) => ({ ...p, city: e.target.value }))} className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                      </div>
                      <div className="space-y-1 col-span-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase">Street</label>
                         <input value={addressForm.street} onChange={(e) => setAddressForm((p) => ({ ...p, street: e.target.value }))} className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-black text-slate-400 uppercase">Bldg</label>
                         <input value={addressForm.building} onChange={(e) => setAddressForm((p) => ({ ...p, building: e.target.value }))} className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-black text-slate-400 uppercase">Apt</label>
                         <input value={addressForm.apartment} onChange={(e) => setAddressForm((p) => ({ ...p, apartment: e.target.value }))} className="w-full bg-slate-50 border border-slate-100 h-12 rounded-xl px-4 text-sm font-bold focus:border-red-600 outline-none" />
                      </div>
                      <div className="space-y-1 col-span-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase">Delivery Info</label>
                         <textarea value={addressForm.additionalInfo} onChange={(e) => setAddressForm((p) => ({ ...p, additionalInfo: e.target.value }))} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold focus:border-red-600 outline-none h-24" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={async () => {
                          try {
                            if (!editingAddress?._id) return;
                            await updateAddress(editingAddress._id, addressForm);
                            const res = await getProfile();
                            const payload = (res as unknown as { data?: unknown })?.data;
                            const data =
                              isRecord(payload) && "data" in payload
                                ? (payload as { data?: unknown }).data
                                : payload;
                            if (isRecord(data)) {
                              setProfile((prev) => ({
                                ...(prev ?? {}),
                                addresses: Array.isArray(data["addresses"])
                                  ? (data["addresses"] as unknown[])
                                      .map((a) => (isRecord(a) ? (a as Address) : null))
                                      .filter((x): x is Address => x !== null)
                                  : [],
                              }));
                            }
                            setIsEditAddressModalOpen(false);
                            setEditingAddress(null);
                            toast.success("Address updated");
                          } catch {
                            toast.error("Failed to update address");
                          }
                        }}
                        className="w-full h-14 bg-red-600 hover:bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-100 transition-all"
                      >
                        Update_Location
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr, idx) => (
                    <div key={addr._id ?? String(idx)} className="border-2 border-slate-50 bg-slate-50/20 rounded-[2rem] p-6 relative group border-dashed hover:border-red-100 transition-all">
                      {addr.isDefault && <span className="absolute top-4 right-6 text-[8px] font-black bg-red-600 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Default</span>}
                      <p className="text-sm font-black text-slate-900">{addr.city}</p>
                      <p className="text-xs font-bold text-slate-400 mt-1">{addr.street}, Bldg {addr.building}, Floor {addr.floor}</p>
                      {addr.additionalInfo && (
                        <p className="text-[10px] text-red-600 italic mt-3 font-medium">"{addr.additionalInfo}"</p>
                      )}
                      <div className="mt-6 flex gap-3">
                         <button 
                           onClick={() => {
                             setEditingAddress(addr);
                             setAddressForm({
                               city: addr.city ?? "",
                               street: addr.street ?? "",
                               building: addr.building ?? "",
                               floor: addr.floor ?? "",
                               apartment: addr.apartment ?? "",
                               additionalInfo: addr.additionalInfo ?? "",
                               isDefault: Boolean(addr.isDefault),
                             });
                             setIsEditAddressModalOpen(true);
                           }}
                           className="text-xs font-black uppercase text-slate-300 hover:text-red-600 flex items-center gap-1"
                         ><Pencil size={12}/> Edit</button>
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
