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

  React.useEffect(() => {
    if (open) setFormData(initialData);
  }, [open, initialData]);

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
      <DialogContent className="w-[92vw] sm:max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold text-slate-900">
            {title}
          </DialogTitle>
          <p className="text-sm text-slate-500">
            Please enter accurate delivery details
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {/* City */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              City
            </label>
            <input
              value={formData.city}
              onChange={(e) =>
                setFormData((p) => ({ ...p, city: e.target.value }))
              }
              placeholder="Cairo"
              className="w-full h-11 rounded-lg border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
            />
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
              className="w-full h-11 rounded-lg border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
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
              className="w-full h-11 rounded-lg border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
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
              className="w-full h-11 rounded-lg border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
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
              className="w-full h-11 rounded-lg border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Notes */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Delivery Notes
            </label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  additionalInfo: e.target.value,
                }))
              }
              placeholder="Ring bell twice..."
              className="w-full h-24 rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-red-500 outline-none"
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
