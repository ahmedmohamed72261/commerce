"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowUpRight, Loader2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useIsRTL } from '@/utils/rtl';
import { useContactsStore } from '@/store/contacts';
import { toast } from 'sonner';

export default function Contact() {
  const locale = useLocale() as "en" | "ar";
  const isRTL = useIsRTL();
  const { createContact, loading } = useContactsStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.purpose) {
      toast.error(isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields");
      return;
    }

    const success = await createContact(formData);
    if (success) {
      toast.success(isRTL ? "تم إرسال رسالتك بنجاح" : "Message sent successfully");
      setFormData({ name: '', email: '', phone: '', purpose: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen w-full bg-[#FBFBFA] dark:bg-background font-sans flex items-center justify-center p-4 md:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* THE CARD: Minimalist Canvas */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white dark:bg-card rounded-[40px] shadow-[0_40px_100px_-20px_rgba(220,38,38,0.1)] border border-red-100 dark:border-border overflow-hidden">
        
        {/* LEFT: Information Panel (Soft Red) */}
        <div className="lg:w-[40%] bg-[#FFF9F9] dark:bg-muted p-12 lg:p-16 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-red-50 dark:border-border">
          <div className="relative z-10">
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-foreground leading-[0.9] tracking-tighter mb-8">
              {isRTL ? "تواصل" : "Make it"} <br/>
              <span className="font-serif text-red-600 dark:text-primary">
                {isRTL ? "معنا." : "Legendary."}
              </span>
            </h1>

            <p className="text-slate-500 dark:text-muted-foreground text-lg font-medium leading-relaxed mb-12 max-w-xs">
              {isRTL ? "تواصل مباشر مع فريقنا للحصول على شراكات عالية التأثير." : "Direct access to our core team for high-impact partnerships."}
            </p>

            <div className="space-y-4">
              <ContactLink icon={<Phone size={18}/>} value="22623001" />
              <ContactLink icon={<Mail size={18}/>}  value="Worlddevelopment97@gmail.com" />
              {/* <ContactLink icon={<MapPin size={18}/>}  value={isRTL ? "محمد بور، دكا" : "Mohammadpur, Dhaka"} /> */}
            </div>
          </div>
        </div>

        {/* RIGHT: Editorial Form */}
        <div className="lg:w-[60%] p-10 lg:p-16 bg-white dark:bg-card">
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <EditorialInput 
                label={isRTL ? "الاسم" : "Your Identity"} 
                placeholder={isRTL ? "الاسم الكامل" : "Full Name"} 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <EditorialInput 
                label={isRTL ? "البريد الإلكتروني" : "Return Path"} 
                placeholder={isRTL ? "Email@example.com" : "Email@example.com"} 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <EditorialInput 
              label={isRTL ? "رقم الاتصال" : "Contact Number"} 
              placeholder="+1234567890" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <div className="group space-y-4">
              <label className="text-lg text-[18px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-1 group-focus-within:text-red-600 dark:group-focus-within:text-primary transition-colors">
                {isRTL ? "ملاحظاتك" : "Project Brief"}
              </label>
              <textarea 
                rows={4}
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder={isRTL ? "صف رؤيتك..." : "Describe your vision..."}
                className="w-full bg-slate-50 dark:bg-muted border-none p-6 text-slate-800 dark:text-foreground text-lg outline-none focus:ring-2 focus:ring-red-600/5 dark:focus:ring-primary/5 transition-all resize-none rounded-3xl placeholder:text-slate-300 dark:placeholder:text-muted-foreground"
                required
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="group relative w-full md:w-auto px-10 py-5 bg-red-600 dark:bg-primary text-white rounded-full font-black uppercase tracking-widest text-sm sm:text-base md:text-lg shadow-[0_20px_40px_-10px_rgba(220,38,38,0.3)] transition-all hover:bg-red-700 dark:hover:bg-red-700 hover:scale-105 active:scale-95 flex items-center justify-center gap-4 disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {isRTL ? "جاري الإرسال..." : "Sending..."}
                  </>
                ) : (
                  <>
                    {isRTL ? "إرسال الطلب" : "Launch Request"}
                    <ArrowUpRight size={18} className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- ATOMS ---

function ContactLink({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-3xl hover:bg-white dark:hover:bg-card transition-all group cursor-pointer border border-transparent hover:border-red-100 dark:hover:border-primary/20">
      <div className="w-12 h-12 bg-red-600 dark:bg-primary text-white rounded-2xl flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(220,38,38,0.3)] group-hover:rotate-6 transition-transform shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-800 dark:text-foreground">{value}</p>
      </div>
    </div>
  );
}

function EditorialInput({ label, ...props }: any) {
  return (
    <div className="group space-y-2">
      <label className="text-lg text-[18px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-1 group-focus-within:text-red-600 dark:group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <input 
        {...props}
        className="w-full bg-transparent border-2 border-slate-600 rounded-3xl dark:border-border p-4 text-slate-800 dark:text-foreground text-lg outline-none focus:border-red-600 dark:focus:border-primary transition-all placeholder:text-slate-200 dark:placeholder:text-muted-foreground font-medium"
      />
    </div>
  );
}
