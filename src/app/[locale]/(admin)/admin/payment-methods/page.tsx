 "use client";
 
 import React, { useEffect, useState } from "react";
 import { WhiteCard } from "@/components/admin/ui/cards";
 import { useTranslations } from "next-intl";
 import { getAllPaymentMethods, createPaymentMethod, togglePaymentMethod } from "@/services/payment-methods.service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ui/ImageUploader";
 
 export default function PaymentMethodsPage() {
   const t = useTranslations("AdminDashboard");
   const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
   const [pmForm, setPmForm] = useState<{ nameEn: string; nameAr: string; instructionsEn: string; instructionsAr: string; icon?: File | null }>({
     nameEn: "",
     nameAr: "",
     instructionsEn: "",
     instructionsAr: "",
     icon: null,
   });
  const [iconFiles, setIconFiles] = useState<File[]>([]);
 
   useEffect(() => {
     async function fetchPM() {
       const pm = await getAllPaymentMethods();
       const data = Array.isArray(pm?.data) ? pm.data : Array.isArray(pm) ? pm : [];
       setPaymentMethods(data);
     }
     fetchPM();
   }, []);
 
   return (
     <div className="space-y-8">
       <div>
         <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{t('paymentMethodsTitle')}</h1>
         <p className="text-base sm:text-xl text-gray-500 dark:text-muted-foreground mt-1">{t('manageStorefront')}</p>
       </div>
 
      <WhiteCard title={t('paymentMethodsTitle')}>
         <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder={t('nameEn')}
              value={pmForm.nameEn}
              onChange={(e) => setPmForm((p) => ({ ...p, nameEn: e.target.value }))}
              appearance="white"
              showIcon={false}
            />
            <Input
              placeholder={t('nameAr')}
              value={pmForm.nameAr}
              onChange={(e) => setPmForm((p) => ({ ...p, nameAr: e.target.value }))}
              appearance="white"
              showIcon={false}
              locale="ar"
            />
            <Textarea
              placeholder={t('instructionsEn')}
              value={pmForm.instructionsEn}
              onChange={(e) => setPmForm((p) => ({ ...p, instructionsEn: e.target.value }))}
              appearance="white"
              className="md:col-span-2"
              rows={3}
            />
            <Textarea
              placeholder={t('instructionsAr')}
              value={pmForm.instructionsAr}
              onChange={(e) => setPmForm((p) => ({ ...p, instructionsAr: e.target.value }))}
              appearance="white"
              className="md:col-span-2"
              rows={3}
              locale="ar"
            />
            <div className="md:col-span-2">
              <ImageUploader files={iconFiles} onChange={setIconFiles} multiple={false} gridCols={2} />
            </div>
           </div>
           <button
            className="px-4 py-2 bg-[#e30613] hover:bg-red-700 dark:bg-primary dark:hover:bg-primary/90 text-white rounded-xl text-base sm:text-xl font-bold transition"
             onClick={async () => {
               const fd = new FormData();
               if (iconFiles[0]) fd.append("icon", iconFiles[0]);
               fd.append("name", JSON.stringify({ en: pmForm.nameEn, ar: pmForm.nameAr }));
               fd.append("instructions", JSON.stringify({ en: pmForm.instructionsEn, ar: pmForm.instructionsAr }));
               await createPaymentMethod(fd);
               const pm = await getAllPaymentMethods();
               const data = Array.isArray(pm?.data) ? pm.data : Array.isArray(pm) ? pm : [];
               setPaymentMethods(data);
               setPmForm({ nameEn: "", nameAr: "", instructionsEn: "", instructionsAr: "", icon: null });
               setIconFiles([]);
             }}
           >
             {t('createPaymentMethod')}
           </button>
           <div className="divide-y divide-gray-100 dark:divide-border">
             {paymentMethods.map((pm) => (
               <div key={pm._id} className="flex items-center justify-between py-2">
                 <div className="flex items-center gap-3">
                  {pm.icon && <img src={pm.icon} className="h-7 w-7 object-contain rounded" alt={pm.name} />}
                   <div>
                     <div className="font-semibold text-gray-800 dark:text-foreground">{pm.name}</div>
                     <div className="text-xs text-gray-500 dark:text-muted-foreground">{pm.instructions?.en}</div>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${pm.isActive ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900' : 'bg-muted text-muted-foreground'}`}>{pm.isActive ? t('statusActive') : t('statusDisabled')}</span>
                   <button
                    className="px-3 py-1.5 border border-gray-300 dark:border-border rounded-lg text-base sm:text-xl hover:bg-muted text-foreground transition"
                     onClick={async () => {
                       await togglePaymentMethod(pm._id, !pm.isActive);
                       const refreshed = await getAllPaymentMethods();
                       const data = Array.isArray(refreshed?.data) ? refreshed.data : Array.isArray(refreshed) ? refreshed : [];
                       setPaymentMethods(data);
                     }}
                   >
                     {pm.isActive ? 'Disable' : 'Enable'}
                   </button>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </WhiteCard>
     </div>
   );
 }
