"use client";
import React from 'react';
import { Mail, Phone, MapPin, Send, Globe, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useIsRTL } from '@/utils/rtl';

export default function Contact() {
  const locale = useLocale() as "en" | "ar";
  const isRTL = useIsRTL();
  return (
    <div className="relative min-h-screen w-full bg-[#FBFBFA] dark:bg-background font-sans overflow-hidden flex items-center justify-center p-4 md:p-8">
      
      {/* BACKGROUND: High-Contrast Light Map */}
      <div className="absolute inset-0 z-0 grayscale contrast-150 brightness-110">
        <iframe 
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13963.903389421175!2d30.907303449999997!3d28.958440850000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1768135953002!5m2!1sen!2seg" 
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
        ></iframe>
      </div>

      {/* THE CARD: Minimalist Canvas */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row bg-white dark:bg-card rounded-[40px] shadow-[0_40px_100px_-20px_rgba(220,38,38,0.1)] border border-red-100 dark:border-border overflow-hidden">
        
        {/* LEFT: Information Panel (Soft Red) */}
        <div className="lg:w-[40%] bg-[#FFF9F9] dark:bg-muted p-12 lg:p-16 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-red-50 dark:border-border">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="h-1 w-12 bg-red-600 rounded-full"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600/60 dark:text-primary/60">Contact Hub</span>
            </div>

            <h1 className="text-6xl font-black text-slate-900 dark:text-foreground leading-[0.9] tracking-tighter mb-8">
              Make it <br/>
              <span className="italic font-serif text-red-600 dark:text-primary">Legendary.</span>
            </h1>

            <p className="text-slate-500 dark:text-muted-foreground text-lg font-medium leading-relaxed mb-12 max-w-xs">
              Direct access to our core team for high-impact partnerships.
            </p>

            <div className="space-y-2">
              <ContactLink icon={<Phone size={15}/>} label="Direct Line" value="+990 123 456 789" />
              <ContactLink icon={<Mail size={15}/>} label="Inquiries" value="hello@fleetcart.com" />
              <ContactLink icon={<MapPin size={15}/>} label="Headquarters" value="Mohammadpur, Dhaka" />
            </div>
          </div>

        </div>

        {/* RIGHT: Editorial Form */}
        <div className="lg:w-[60%] p-10 lg:p-10 bg-white dark:bg-card">
          <form className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <EditorialInput label="Your Identity" placeholder="Full Name" />
              <EditorialInput label="Return Path" placeholder="Email@example.com" type="email" />
            </div>

            <EditorialInput label="Project Scope" placeholder="What are we building?" />

            <div className="group space-y-4">
              <label className="text-[10px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-1 group-focus-within:text-red-600 dark:group-focus-within:text-primary transition-colors">Project Brief</label>
              <textarea 
                rows={4}
                placeholder="Describe your vision..."
                className="w-full bg-slate-50 dark:bg-muted border-none p-6 text-slate-800 dark:text-foreground text-lg outline-none focus:ring-2 focus:ring-red-600/5 dark:focus:ring-primary/5 transition-all resize-none rounded-3xl placeholder:text-slate-300 dark:placeholder:text-muted-foreground"
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-2">
              <button className="group relative w-full md:w-auto px-10 py-5 bg-red-600 dark:bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs shadow-[0_20px_40px_-10px_rgba(220,38,38,0.3)] transition-all hover:bg-red-700 dark:hover:bg-red-700 hover:scale-105 active:scale-95 flex items-center justify-center gap-4">
                Launch Request
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
    <div className="flex items-center gap-4 p-2 rounded-3xl hover:bg-white dark:hover:bg-card transition-all group cursor-pointer border border-transparent hover:border-red-100 dark:hover:border-primary/20">
      <div className="w-12 h-12 bg-red-600 dark:bg-primary text-white rounded-2xl flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(220,38,38,0.3)] group-hover:rotate-6 transition-transform">
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
      <label className="text-[10px] font-black text-slate-400 dark:text-muted-foreground uppercase tracking-[0.2em] ml-1 group-focus-within:text-red-600 dark:group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <input 
        {...props}
        className="w-full bg-transparent border-b-2 border-slate-100 dark:border-border py-4 text-slate-800 dark:text-foreground text-lg outline-none focus:border-red-600 dark:focus:border-primary transition-all placeholder:text-slate-200 dark:placeholder:text-muted-foreground font-medium"
      />
    </div>
  );
}
