"use client";
import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { AdminModal } from "./AdminModal";
import { MediaManager } from "./MediaManager";
import { Button } from "@/components/ui/button";

type DisplayImage = {
  src: string;
  file?: File;
  original?: string;
};

type UpdateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  initial: any;
  initialForm?: Record<string, unknown>;
  existingImages?: string[];
  multipleNew?: boolean;
  gridCols?: 2 | 3 | 4;
  renderFields: (
    form: Record<string, unknown>,
    setForm: (patch: Record<string, unknown>) => void
  ) => React.ReactNode;
  onSave: (args: {
    id: string;
    form: Record<string, unknown>;
    newFiles: File[];
    removedExisting: string[];
  }) => Promise<void>;
  onSaved?: () => void;
};

export function UpdateDialog({
  open,
  onOpenChange,
  title,
  initial,
  initialForm = {},
  existingImages = [],
  multipleNew = true,
  gridCols = 3,
  renderFields,
  onSave,
  onSaved,
}: UpdateDialogProps) {
  const t = useTranslations("AdminForm");
  const locale = useLocale() as "en" | "ar";

  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<DisplayImage[]>([]);
  const [removedExisting, setRemovedExisting] = useState<string[]>([]);

  useEffect(() => {
    setForm(initialForm || {});
    setRemovedExisting([]);
    setImages(existingImages.map(src => ({ src, original: src })));
  }, [existingImages, initialForm, open]);

  const handleRemove = (index: number) => {
    const img = images[index];
    const orig = img.original;
    if (orig) setRemovedExisting(prev => [...prev, orig]);
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleReplace = (index: number, file: File) => {
    const previewUrl = URL.createObjectURL(file);
    const old = images[index];
    const orig = old.original;
    if (orig) setRemovedExisting(prev => (prev.includes(orig) ? prev : [...prev, orig]));

    setImages(prev => prev.map((img, i) => (i === index ? { src: previewUrl, file } : img)));
  };

  const handleAddNew = (files: File[]) => {
    const newImages = files.map(f => ({ src: URL.createObjectURL(f), file: f }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const id = String(initial?._id || initial?.id || "");
      if (!id) return;
      const newFiles = images.filter(img => img.file).map(img => img.file!);
      await onSave({ id, form, newFiles, removedExisting });
      onOpenChange(false);
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      className="sm:max-w-[860px]"
      footer={
        <div className={locale === "ar" ? "flex justify-start gap-2 w-full" : "flex justify-end gap-2 w-full"}>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving} className="border-gray-200 dark:border-border">
            {t("cancel")}
          </Button>
          <Button onClick={handleSave} className="bg-[#e30613] hover:bg-red-700 dark:bg-primary dark:hover:bg-primary/90" disabled={saving}>
            {saving ? t("saving") : t("save")}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {renderFields(form, patch => setForm(prev => ({ ...prev, ...patch })))}
        </div>

        <MediaManager
          images={images}
          onRemove={handleRemove}
          onReplace={handleReplace}
          onAddNew={handleAddNew}
          multipleNew={multipleNew}
          gridCols={gridCols}
        />
      </div>
    </AdminModal>
  );
}
