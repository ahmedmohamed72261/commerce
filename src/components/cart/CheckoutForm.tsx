"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOrdersStore, ShippingAddress } from '@/store/orders';
import { getProfile } from '@/services/user.service';
import { cn } from '@/utils/utils';

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
    <form onSubmit={handleSubmit} className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-8">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b border-slate-100 dark:border-border pb-4 text-gray-800 dark:text-foreground">
        Shipping Information
      </h2>
      {summary && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-muted border border-slate-200 dark:border-border">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground">Items</p>
            <p className="text-lg font-black text-gray-800 dark:text-foreground">{summary.itemCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-muted border border-slate-200 dark:border-border">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground">Total</p>
            <p className="text-lg font-black text-gray-800 dark:text-foreground">${summary.totalAmount.toFixed(2)}</p>
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
                <label
                  key={id}
                  className={cn(
                    "flex items-center gap-3 h-12 px-4 rounded-xl border cursor-pointer transition-all",
                    selectedAddressId === id
                      ? "border-primary bg-muted"
                      : "border-border bg-card hover:bg-muted"
                  )}
                >
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressId === id}
                    onChange={() => {
                      setSelectedAddressId(id);
                      setShowNewForm(false);
                    }}
                  />

                  <span className="text-xs font-bold text-foreground flex-1">
                    {label || "Address"}

                    {addr.isDefault && (
                      <span className="ml-2 text-[10px] font-black uppercase text-green-600 dark:text-green-400">
                        Default
                      </span>
                    )}
                  </span>
                </label>

              );
            })}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-muted-foreground text-sm">No saved addresses found.</p>
        )}
        <div className="mt-3">
          <Button
            type="button"
            onClick={() => setShowNewForm((v) => !v)}
            className={cn(
              "h-10 rounded-xl px-4 text-xs font-black uppercase tracking-widest transition-all",
              showNewForm
                ? `
                  bg-card 
                  text-foreground 
                  border border-border
                  hover:bg-muted
                `
                : `
                  bg-primary 
                  text-primary-foreground
                  border border-primary
                  hover:opacity-90
                `
            )}
          >
            {showNewForm ? "Use Saved Address" : "Add New Address"}
          </Button>
        </div>
      </div>

      {showNewForm && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground mb-2 block">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 dark:border-border bg-white dark:bg-muted text-gray-800 dark:text-foreground rounded-xl focus:ring-2 focus:ring-red-600 dark:focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground mb-2 block">
            Street *
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 dark:border-border bg-white dark:bg-muted text-gray-800 dark:text-foreground rounded-xl focus:ring-2 focus:ring-red-600 dark:focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground mb-2 block">
            Building *
          </label>
          <input
            type="text"
            name="building"
            value={formData.building}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 dark:border-border bg-white dark:bg-muted text-gray-800 dark:text-foreground rounded-xl focus:ring-2 focus:ring-red-600 dark:focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground mb-2 block">
            Floor *
          </label>
          <input
            type="text"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 dark:border-border bg-white dark:bg-muted text-gray-800 dark:text-foreground rounded-xl focus:ring-2 focus:ring-red-600 dark:focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground mb-2 block">
            Apartment *
          </label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-slate-200 dark:border-border bg-white dark:bg-muted text-gray-800 dark:text-foreground rounded-xl focus:ring-2 focus:ring-red-600 dark:focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground mb-2 block">
            Additional Info
          </label>
          <input
            type="text"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="w-full h-12 px-4 border border-slate-200 dark:border-border bg-white dark:bg-muted text-gray-800 dark:text-foreground rounded-xl focus:ring-2 focus:ring-red-600 dark:focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>
      )}

      <div className="mb-6">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground mb-3 block">
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
                    ? 'bg-red-600 dark:bg-primary text-white shadow-lg'
                    : 'bg-slate-50 dark:bg-muted text-slate-600 dark:text-foreground hover:bg-slate-100 dark:hover:bg-muted/80'
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
                    ? 'bg-red-600 dark:bg-primary text-white shadow-lg'
                    : 'bg-slate-50 dark:bg-muted text-slate-600 dark:text-foreground hover:bg-slate-100 dark:hover:bg-muted/80'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-muted-foreground mb-2 block">
          Order Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-slate-200 dark:border-border bg-white dark:bg-muted text-gray-800 dark:text-foreground rounded-xl focus:ring-2 focus:ring-red-600 dark:focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          placeholder="Any special instructions for delivery..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-red-600 dark:bg-primary hover:bg-black dark:hover:bg-red-700 text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 dark:shadow-primary/20 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  );
};
