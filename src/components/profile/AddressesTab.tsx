"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressFormModal } from "./AddressFormModal";
import {
  addAddress,
  updateAddress,
  type AddressPayload,
} from "@/services/user.service";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

export type Address = {
  _id?: string;
  city?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
  additionalInfo?: string;
  isDefault?: boolean;
};

type AddressesTabProps = {
  addresses: Address[];
  onRefresh: () => void;
};

export const AddressesTab: React.FC<AddressesTabProps> = ({
  addresses,
  onRefresh,
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const t = useTranslations("Profile");
  const locale = useLocale() as "en" | "ar";
  const defaultAddress = addresses.find((a) => a.isDefault);
  const otherAddresses = addresses.filter((a) => !a.isDefault);

  const initialForm: AddressPayload = {
    city: "",
    street: "",
    building: "",
    floor: "",
    apartment: "",
    additionalInfo: "",
    isDefault: false,
  };

  const handleCreate = async (data: AddressPayload) => {
    await addAddress(data);
    toast.success(t("addressAdded"));
    onRefresh();
  };

  const handleUpdate = async (data: AddressPayload) => {
    if (!editingAddress?._id) return;
    await updateAddress(editingAddress._id, data);
    toast.success(t("addressUpdated"));
    onRefresh();
  };
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <div className="max-w-3xl space-y-8 p-8"
      dir={dir}>
      {/* HEADER */}
      <div className="flex items-center justify-end">
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="h-10 px-4 rounded-lg text-sm font-medium bg-slate-900 hover:bg-red-600 text-white"
        >
          <Plus size={16} className="mr-2" />
          {t("addAddress")}
        </Button>
      </div>

      {/* DEFAULT ADDRESS */}
      {defaultAddress && (
        <section>
          <h4 className="text-xs font-medium text-slate-500 mb-3 uppercase">
            {t("defaultAddress")}
          </h4>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <div
              className={`flex items-start justify-between gap-4 ${dir === "rtl" ? "flex-row-reverse text-right" : "flex-row text-left"
                }`}
            >
              <div className="flex gap-3">
                <MapPin className={`text-red-600 mt-0.5 ${dir === "rtl" ? "ml-3" : "mr-3"
                  }`} size={18} />

                <div>
                  <p className="font-semibold text-slate-900">
                    {defaultAddress.city}
                  </p>
                  <p className="text-sm text-slate-600">
                    {defaultAddress.street}, Building{" "}
                    {defaultAddress.building}, Floor{" "}
                    {defaultAddress.floor}
                  </p>

                  {defaultAddress.additionalInfo && (
                    <p className="mt-2 text-xs italic text-slate-500">
                      “{defaultAddress.additionalInfo}”
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingAddress(defaultAddress);
                  setIsEditOpen(true);
                }}
                className="text-sm text-red-600 hover:underline"
              >
                {t("editAddress")}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* OTHER ADDRESSES */}
      <section>
        <h4 className="text-md font-bold mb-3 text-red-600 uppercase">
          {t("savedAddresses")}
        </h4>

        {otherAddresses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
            {locale === "ar" ? "لا توجد عناوين إضافية محفوظة." : "No additional addresses saved."}
          </div>
        ) : (
          <div className="space-y-3">
            {otherAddresses.map((addr) => (
              <div
                key={addr._id}
                className="rounded-xl border border-slate-200 bg-white p-4 flex items-start justify-between"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {addr.city}
                  </p>
                  <p className="text-sm text-slate-500">
                    {addr.street}, Building {addr.building}, Floor{" "}
                    {addr.floor}
                  </p>
                </div>

                <div className={`flex gap-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <button
                    onClick={() => {
                      setEditingAddress(addr);
                      setIsEditOpen(true);
                    }}
                    className="text-slate-500 hover:text-red-600"
                  >
                    <Pencil size={14} />
                  </button>

                  <button className="text-slate-500 hover:text-slate-900">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MODALS */}
      <AddressFormModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title={t("addAddressModalTitle")}
        submitLabel={t("saveAddress")}
        initialData={initialForm}
        onSubmit={handleCreate}
      />

      <AddressFormModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title={t("editAddressModalTitle")}
        submitLabel={t("updateAddress")}
        initialData={
          editingAddress
            ? {
              city: editingAddress.city ?? "",
              street: editingAddress.street ?? "",
              building: editingAddress.building ?? "",
              floor: editingAddress.floor ?? "",
              apartment: editingAddress.apartment ?? "",
              additionalInfo: editingAddress.additionalInfo ?? "",
              isDefault: Boolean(editingAddress.isDefault),
            }
            : initialForm
        }
        onSubmit={handleUpdate}
      />
    </div>
  );
};
