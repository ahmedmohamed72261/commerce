"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WhiteCard } from "@/components/admin/ui/cards";
import { createGovernorate } from "@/services/governorates.service";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";

export default function CreateGovernoratePage() {
  const router = useRouter();
  const locale = useLocale() as "en" | "ar";
  const tForm = useTranslations('AdminForm');
  const tGov = useTranslations('AdminGovernorates');
  const [form, setForm] = useState<{ nameEn: string; nameAr: string; phone?: string; address?: string }>({
    nameEn: "",
    nameAr: "",
  });
  const [saving, setSaving] = useState(false);

  const onSubmit = async () => {
    if (!form.nameEn || !form.nameAr) {
      toast.error(tForm('updateFailed'))
      return;
    }
    setSaving(true);
    try {
      await createGovernorate(form);
      toast.success(tForm('updated'))
      router.push(`/${locale}/admin/governorates`);
    } catch (e) {
      toast.error(tForm('updateFailed'))
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{tGov('addNew')}</h1>
      </div>

      <WhiteCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              value={form.nameEn}
              onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
              label={tForm('nameEn')}
              locale="en"
            />
          </div>
          <div>
            <Input
              value={form.nameAr}
              onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
              label={tForm('nameAr')}
              locale="ar"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => router.push(`/${locale}/admin/governorates`)}
            className="px-4 py-2 rounded border border-gray-200 dark:border-border bg-white dark:bg-card text-gray-700 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted transition"
          >
            {tForm('cancel')}
          </button>
          <button
            onClick={onSubmit}
            disabled={saving}
            className="bg-[#e30613] text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-bold disabled:opacity-60"
          >
            <Save size={16} /> {saving ? tForm('saving') : tForm('save')}
          </button>
        </div>
      </WhiteCard>
    </div>
  );
}
