"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOrdersStore, ShippingAddress } from '@/store/orders';
import { getProfile } from '@/services/user.service';

interface CheckoutFormProps {
  onSubmit: (shippingAddress: ShippingAddress, paymentMethod: string, notes?: string) => void;
  loading?: boolean;
  paymentMethods?: Array<{ _id: string; name: string; icon?: string; instructions?: Record<string,string>; isActive?: boolean }>;
  summary?: { totalAmount: number; itemCount: number };
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, loading, paymentMethods, summary }) => {
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

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState<ShippingAddress>({
    city: '',
    street: '',
    building: '',
    floor: '',
    apartment: '',
    additionalInfo: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile();
        const payload = (res as unknown as { data?: unknown })?.data;
        const data = (payload && typeof payload === "object" && "data" in (payload as any)) ? (payload as any).data : payload;
        const arr = Array.isArray((data as any)?.addresses) ? (data as any).addresses : [];
        const list: Address[] = arr
          .map((a: any) => (a && typeof a === "object") ? a : null)
          .filter(Boolean);
        setAddresses(list);
        const def = list.find((a) => a?.isDefault);
        setSelectedAddressId((def?._id as string) ?? null);
      } catch {
        setAddresses([]);
        setSelectedAddressId(null);
      }
    })();
  }, []);

  useEffect(() => {
    const firstActive = paymentMethods?.find((pm) => pm.isActive);
    if (firstActive?.name) {
      setPaymentMethod(firstActive.name);
    }
  }, [paymentMethods]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = addresses.find((a) => String(a._id) === String(selectedAddressId));
    if (selected && !showNewForm) {
      const addr: ShippingAddress = {
        city: String(selected.city ?? ""),
        street: String(selected.street ?? ""),
        building: String(selected.building ?? ""),
        floor: String(selected.floor ?? ""),
        apartment: String(selected.apartment ?? ""),
        additionalInfo: selected.additionalInfo ? String(selected.additionalInfo) : ""
      };
      onSubmit(addr, paymentMethod, notes);
      return;
    }
    onSubmit(formData, paymentMethod, notes);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b border-slate-100 pb-4">
        Shipping Information
      </h2>
      {summary && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Items</p>
            <p className="text-lg font-black">{summary.itemCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total</p>
            <p className="text-lg font-black">${summary.totalAmount.toFixed(2)}</p>
          </div>
        </div>
      )
      }

      <div className="mb-6">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
          Select Address
        </label>
        {addresses.length > 0 ? (
          <div className="space-y-2">
            {addresses.map((addr) => {
              const id = String(addr._id ?? "");
              const label = [
                addr.city, addr.street, addr.building, addr.floor, addr.apartment
              ].filter(Boolean).join(", ");
              return (
                <label key={id} className={`flex items-center gap-3 h-12 rounded-xl px-4 border ${selectedAddressId === id ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'} cursor-pointer`}>
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressId === id}
                    onChange={() => { setSelectedAddressId(id); setShowNewForm(false); }}
                  />
                  <span className="text-xs font-bold text-slate-700 flex-1">
                    {label || 'Address'}
                    {addr.isDefault ? <span className="ml-2 text-[10px] text-green-600 font-black uppercase">Default</span> : null}
                  </span>
                </label>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No saved addresses found.</p>
        )}
        <div className="mt-3">
          <Button
            type="button"
            onClick={() => setShowNewForm((v) => !v)}
            variant={showNewForm ? "outline" : undefined}
            className={`h-10 rounded-xl text-xs font-black uppercase tracking-widest ${showNewForm ? 'border-slate-200' : 'bg-slate-900 text-white'}`}
          >
            {showNewForm ? 'Use Saved Address' : 'Add New Address'}
          </Button>
        </div>
      </div>

      {showNewForm && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Street *
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Building *
          </label>
          <input
            type="text"
            name="building"
            value={formData.building}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Floor *
          </label>
          <input
            type="text"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Apartment *
          </label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Additional Info
          </label>
          <input
            type="text"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>
      )}

      <div className="mb-6">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
          Payment Method *
        </label>
        {paymentMethods && paymentMethods.length > 0 ? (
          <div className="flex flex-col gap-2">
            {paymentMethods.filter((pm) => pm.isActive !== false).map((pm) => (
              <button
                key={pm._id}
                type="button"
                onClick={() => setPaymentMethod(pm.name)}
                className={`flex items-center gap-3 h-12 rounded-xl font-black text-xs uppercase tracking-widest transition-all px-4 ${
                  paymentMethod === pm.name
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {pm.icon && <img src={pm.icon} alt={pm.name} className="h-6 w-6 object-contain" />}
                <span className="flex-1 text-left">{pm.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-4">
            {(['cash', 'card', 'online'] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 h-12 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  paymentMethod === method
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
          Order Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Any special instructions for delivery..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-red-600 hover:bg-black text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  );
};
