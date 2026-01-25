"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type AddressPayload } from "@/services/user.service";
import { useLocale } from "next-intl";
import { getAllGovernorates } from "@/services/governorates.service";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type AddressFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  submitLabel: string;
  initialData: AddressPayload;
  onSubmit: (data: AddressPayload) => Promise<void>;
};

export const AddressFormModal: React.FC<AddressFormModalProps> = ({
  open,
  onOpenChange,
  title,
  submitLabel,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<AddressPayload>(initialData);
  const [loading, setLoading] = React.useState(false);
  const locale = useLocale() as "en" | "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [governorates, setGovernorates] = React.useState<Array<{ id?: string | number; name: string | { en: string; ar: string } }>>([]);

  React.useEffect(() => {
    if (open) setFormData(initialData);
  }, [open, initialData]);

  React.useEffect(() => {
    if (!open) return;
    let mounted = true;
    getAllGovernorates()
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        if (mounted) setGovernorates(list);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [open]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit(formData);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] sm:max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-border shadow-xl bg-white dark:bg-card" dir={dir}>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold text-slate-900">
            {title}
          </DialogTitle>
          <p className="text-sm text-slate-500">
            Please enter accurate delivery details
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {/* City (Governorate) */}
          <div className="col-span-2">
            <Select
              label={locale === "ar" ? "المحافظة" : "Governorate"}
              value={formData.city}
              onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
              appearance="white"
              locale={locale}
            >
              <option value="">{locale === "ar" ? "اختر محافظة" : "Select governorate"}</option>
              {governorates.map((g, idx) => {
                const label = typeof g.name === "string" ? g.name : locale === "ar" ? (g.name as any).ar : (g.name as any).en;
                return (
                  <option key={String(g.id ?? idx)} value={label}>
                    {label}
                  </option>
                );
              })}
            </Select>
          </div>

          {/* Street */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Street
            </label>
            <input
              value={formData.street}
              onChange={(e) =>
                setFormData((p) => ({ ...p, street: e.target.value }))
              }
              placeholder="Tahrir Street"
              className="w-full h-11 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              dir={dir}
            />
          </div>

          {/* Building */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Building
            </label>
            <input
              value={formData.building}
              onChange={(e) =>
                setFormData((p) => ({ ...p, building: e.target.value }))
              }
              placeholder="12B"
              className="w-full h-11 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              dir={dir}
            />
          </div>

          {/* Apartment */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Apartment
            </label>
            <input
              value={formData.apartment}
              onChange={(e) =>
                setFormData((p) => ({ ...p, apartment: e.target.value }))
              }
              placeholder="402"
              className="w-full h-11 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              dir={dir}
            />
          </div>

          {/* Floor */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Floor
            </label>
            <input
              value={formData.floor}
              onChange={(e) =>
                setFormData((p) => ({ ...p, floor: e.target.value }))
              }
              placeholder="4"
              className="w-full h-11 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              dir={dir}
            />
          </div>

          {/* Notes */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Delivery Notes
            </label>
            <Textarea
              value={formData.additionalInfo}
              onChange={(e) => setFormData((p) => ({ ...p, additionalInfo: e.target.value }))}
              placeholder="Ring bell twice..."
              appearance="white"
              locale={locale}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
          >
            {loading ? "Saving..." : submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
