"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, ShoppingBag, Zap, Crown, 
  Sparkles, MoveRight, ChevronRight, Plus,
  ArrowUpRight, Globe, Fingerprint, Star, ShieldCheck,Activity,ArrowDownRight
} from "lucide-react";

type CategoryCardProps = {
  variant: number;
  image?: string;
  title: string;
  count: string;
  href?: string;
  className?: string;
};

const DEFAULT_IMG = "/images/f.jpg";

export function BannerCard({
  variant = 15,
  image = DEFAULT_IMG,
  title,
  count,
  href = "#",
  className = "",
}: CategoryCardProps) {
  
  const Wrapper = href ? Link : "div";
  const common = cn("group relative overflow-hidden block w-full aspect-[4/5] transition-all duration-700 rtl:text-right", className);

  // --- CASE 1: THE SILK LUXURY ---
  if (variant === 1) return (
    <Wrapper href={href as string} className={cn(common, "rounded-[2.5rem] bg-neutral-900 shadow-2xl")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white"><Crown size={20} /></div>
          <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">{count} Items</span>
        </div>
        <div className="space-y-4">
          <h3 className="text-white text-4xl font-light tracking-tighter leading-tight uppercase">{title.split(' ').join('\n')}</h3>
          <div className="w-0 group-hover:w-full h-0.5 bg-red-600 transition-all duration-500" />
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 2: THE MODERN ARCHITECT ---
  if (variant === 2) return (
    <Wrapper href={href as string} className={cn(common, "rounded-none bg-white border border-neutral-100 p-4")}>
      <div className="relative h-full w-full overflow-hidden">
        <img src={image} className="absolute inset-0 w-full h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={title} />
        <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 w-full bg-white/90 backdrop-blur-xl p-8 translate-y-4 group-hover:translate-y-0 transition-transform">
          <h3 className="text-black text-2xl font-black uppercase tracking-widest mb-2">{title}</h3>
          <div className="flex items-center justify-between text-red-600 font-bold text-[10px] uppercase">
            <span>Explore Collection</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 3: THE VOGUE EDITORIAL ---
  if (variant === 3) return (
    <Wrapper href={href as string} className={cn(common, "rounded-full aspect-square border-4 border-neutral-100")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover" alt={title} />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-red-600/60 transition-colors duration-500 flex items-center justify-center text-center p-12">
        <div>
          <h3 className="text-white text-3xl font-black uppercase leading-none mb-2">{title}</h3>
          <p className="text-white/80 text-xs font-serif italic">{count} Exclusives</p>
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 4: THE NEON HUD ---
  if (variant === 4) return (
    <Wrapper href={href as string} className={cn(common, "bg-black rounded-xl border border-white/10")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt={title} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
      <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6 flex items-center gap-4">
        <div className="h-0.5 w-12 bg-red-600" />
        <span className="text-red-600 text-[10px] font-mono font-bold uppercase tracking-widest">{count} Units</span>
      </div>
      <div className="absolute bottom-8 left-8 rtl:left-auto rtl:right-8">
        <h3 className="text-white text-5xl font-black uppercase italic tracking-tighter leading-none">{title}</h3>
        <Zap className="text-white mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Wrapper>
  );

  // --- CASE 5: THE MINIMAL SLATE ---
  if (variant === 5) return (
    <Wrapper href={href as string} className={cn(common, "rounded-3xl bg-neutral-50 p-6")}>
      <div className="h-full w-full bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <img src={image} className="w-full h-3/5 object-cover" alt={title} />
        <div className="p-6 flex-1 flex flex-col justify-between">
          <h3 className="text-xl font-bold text-black">{title}</h3>
          <div className="flex items-center justify-between text-neutral-400 group-hover:text-red-600 transition-colors">
            <span className="text-xs uppercase font-black">{count} Products</span>
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 6: THE RED SIGNATURE ---
  if (variant === 6) return (
    <Wrapper href={href as string} className={cn(common, "rounded-none bg-[#C40000]")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover mix-blend-multiply opacity-70 group-hover:scale-105 transition-transform" alt={title} />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center border-[1px] border-white/20 m-4">
        <Sparkles className="text-white mb-4" />
        <h3 className="text-white text-4xl font-black uppercase tracking-tighter">{title}</h3>
        <p className="text-white/60 mt-2 text-xs uppercase tracking-widest">{count} Selected Items</p>
      </div>
    </Wrapper>
  );

  // --- CASE 7: THE GALLERY BOX ---
  if (variant === 7) return (
    <Wrapper href={href as string} className={cn(common, "rounded-2xl shadow-xl")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-tr from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 p-8">
        <div className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
          <Plus size={24} />
        </div>
      </div>
      <div className="absolute bottom-8 left-8">
        <h3 className="text-black text-3xl font-black bg-white px-4 py-2 w-fit">{title}</h3>
      </div>
    </Wrapper>
  );

  // --- CASE 8: THE CRYSTAL TECH (REDESIGNED) ---
  if (variant === 8) return (
    <Wrapper href={href as string} className={cn(common, "rounded-3xl bg-zinc-900 border border-white/10 group-hover:border-red-600/50 shadow-2xl transition-all")}>
      <div className="absolute top-0 left-0 w-full h-[450px] p-2">
        <div className="relative h-full w-full rounded-[1.4rem] overflow-hidden">
          <img src={image} className="absolute inset-0 w-full h-[450px] object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" alt={title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-red-600" />
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest">Innovation</span>
            </div>
            <h3 className="text-white text-3xl font-black italic uppercase leading-none">{title}</h3>
            <p className="text-white/40 text-[9px] mt-4 font-mono uppercase">Inventory Status: {count} Units Locked</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 9: THE MINIMALIST CURVE (REDESIGNED) ---
  if (variant === 9) return (
    <Wrapper href={href as string} className={cn(common, "rounded-none bg-[#f8f8f8]")}>
      <div className="absolute inset-0 p-6">
        <div className="relative h-full w-full bg-white rounded-tr-[120px] shadow-sm overflow-hidden group-hover:rounded-tr-3xl transition-all duration-700">
          <img src={image} className="absolute inset-0 w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700" alt={title} />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors" />
          <div className="absolute top-8 left-8">
            <h3 className="text-white text-3xl font-black uppercase tracking-tight leading-tight">{title}</h3>
            <span className="block mt-1 text-white/70 text-xs font-medium uppercase tracking-widest">— {count} Items</span>
          </div>
          <div className="absolute bottom-8 right-8">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors">
              <MoveRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 10: THE BRUTALIST STRIPE ---
  if (variant === 10) return (
    <Wrapper href={href as string} className={cn(common, "bg-white border-4 border-black")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover" alt={title} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-24 bg-red-600 -rotate-12 flex items-center justify-center border-y-4 border-black group-hover:-rotate-0 transition-transform duration-500">
        <h3 className="text-white text-3xl font-black uppercase tracking-tighter italic">{title}</h3>
      </div>
      <div className="absolute bottom-4 right-4 bg-black text-white p-2">
        <ArrowUpRight size={20} />
      </div>
    </Wrapper>
  );

  // --- CASE 11: THE ZENITH LUXE (REDESIGNED) ---
  if (variant === 11) return (
    <Wrapper href={href as string} className={cn(common, "bg-neutral-950")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover opacity-50 transition-opacity group-hover:opacity-30" alt={title} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
        <div className="mb-6 p-4 border border-white/10 rounded-full backdrop-blur-sm">
           <Star className="text-yellow-500 fill-yellow-500" size={18} />
        </div>
        <h3 className="text-white text-4xl font-light uppercase tracking-[0.2em] mb-4">{title}</h3>
        <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">{count} Handcrafted pieces</p>
        <button className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors">View All</button>
      </div>
    </Wrapper>
  );

  // --- CASE 12: THE INFINITY SCAN ---
  if (variant === 12) return (
    <Wrapper href={href as string} className={cn(common, "rounded-xl border border-neutral-100")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover grayscale" alt={title} />
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 shadow-[0_0_20px_#C40000] animate-[scan_3s_infinite]" />
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="bg-black/90 p-8 border border-white/20">
            <h3 className="text-white text-2xl font-black tracking-[0.2em] uppercase">{title}</h3>
         </div>
      </div>
    </Wrapper>
  );

  // --- CASE 13: THE SPLIT BOLD ---
  if (variant === 13) return (
    <Wrapper href={href as string} className={cn(common, "rounded-none flex flex-col")}>
      <div className="h-1/2 w-full overflow-hidden">
        <img src={image} className="w-full h-[450px] object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
      </div>
      <div className="h-1/2 w-full bg-black p-8 flex flex-col justify-between">
        <h3 className="text-white text-4xl font-black leading-[0.85]">{title.split(' ').join('\n')}</h3>
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
           <span className="text-red-600 text-xs font-bold">{count} ITEMS</span>
           <MoveRight className="text-white group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 14: THE ELEVATED CANVAS (REDESIGNED) ---
  if (variant === 14) return (
    <Wrapper href={href as string} className={cn(common, "rounded-3xl p-6 bg-white border border-neutral-100 shadow-sm")}>
      <div className="h-full w-full relative rounded-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
        <img src={image} className="absolute inset-0 w-full h-[450px] object-cover" alt={title} />
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white/80 to-transparent">
          <p className="text-[10px] font-black uppercase text-red-600 mb-1 tracking-widest">{count} Choices</p>
          <h3 className="text-black text-2xl font-bold tracking-tight">{title}</h3>
        </div>
        <div className="absolute top-4 right-4 bg-black text-white p-3 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500">
          <ShoppingBag size={18} />
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 15: THE KINETIC SPLIT (REDESIGNED) ---
  if (variant === 15) return (
    <Wrapper href={href as string} className={cn(common, "bg-zinc-100 rounded-[2rem] border border-neutral-200")}>
      <div className="absolute inset-0 flex flex-col">
        {/* Top Section: Dynamic Image with "Slide-in" Mask */}
        <div className="relative h-[65%] w-full overflow-hidden m-3 rounded-[1.5rem]">
          <img 
            src={image} 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            alt={title} 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
            <Activity size={12} className="text-red-600" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-black">Live Stock</span>
          </div>
        </div>
        
        {/* Bottom Section: Clean Info with Offset Action */}
        <div className="flex-1 px-6 pb-6 flex items-end justify-between rtl:flex-row-reverse">
          <div className="space-y-1 rtl:text-right">
            <h3 className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-black leading-none tracking-tighter uppercase">
              {title}
            </h3>
            <p className="text-neutral-400 text-xs font-medium uppercase tracking-widest">
              Catalog — {count}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-red-600/20">
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </div>
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 16: THE GOLDEN HEIRLOOM (REDESIGNED) ---
  if (variant === 16) return (
    <Wrapper href={href as string} className={cn(common, "rounded-none p-4 bg-[#111]")}>
      <div className="relative h-full w-full border border-yellow-500/20 p-2 overflow-hidden">
        <img src={image} className="absolute inset-0 w-full h-[450px] object-cover scale-125 opacity-40 group-hover:scale-100 transition-transform duration-1000" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-900/40" />
        <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-6">
          <div className="w-10 h-[1px] bg-yellow-500 mb-6" />
          <h3 className="text-yellow-500 text-3xl font-serif italic mb-2">{title}</h3>
          <span className="text-yellow-500/40 text-[9px] uppercase tracking-[0.4em] font-bold">The {count} Selection</span>
          <div className="w-10 h-[1px] bg-yellow-500 mt-6" />
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 17: THE BOLD STACK (REDESIGNED) ---
  if (variant === 17) return (
    <Wrapper href={href as string} className={cn(common, "rounded-none bg-black border-y-8 border-red-600")}>
      <img 
        src={image} 
        className="absolute inset-0 w-full h-[450px] object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000" 
        alt={title} 
      />
      {/* Heavy Brutalist Typography Overlays */}
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="flex justify-between items-start">
           <div className="bg-white text-black font-black text-[10px] px-3 py-1 uppercase tracking-tighter">
             Premium Quality
           </div>
           <div className="text-white flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-mono leading-none">QTY.LMT</span>
              <span className="text-xl font-black italic leading-none">{count}</span>
           </div>
        </div>

        <div className="relative">
          {/* Shadow Text Effect */}
          <h3 className="absolute -top-8 left-0 text-white/10 text-7xl font-black uppercase italic leading-none select-none group-hover:-top-10 transition-all">
            {title.split(' ')[0]}
          </h3>
          <h3 className="relative text-white text-5xl font-black uppercase italic leading-none tracking-tighter z-10">
            {title}
          </h3>
          <div className="mt-6 flex items-center gap-4">
             <div className="h-1 flex-1 bg-red-600" />
             <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-[0.2em]">
               <span>Shop Now</span>
               <ArrowDownRight size={16} className="group-hover:translate-y-1 group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 18: THE GLOBAL REACH ---
  if (variant === 18) return (
    <Wrapper href={href as string} className={cn(common, "rounded-[4rem] border-2 border-neutral-100")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover scale-110 opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-100 transition-all duration-1000" alt={title} />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
        <Globe className="text-neutral-300 mb-4" />
        <h3 className="text-black text-3xl font-black tracking-tighter text-center uppercase leading-none">{title}</h3>
        <div className="mt-6 flex items-center gap-2 text-red-600 font-bold text-xs">
          <span>WORLDWIDE SHIPPING</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 19: THE SIGNATURE FOCUS (REDESIGNED) ---
  if (variant === 19) return (
    <Wrapper href={href as string} className={cn(common, "rounded-3xl bg-neutral-50")}>
      <div className="absolute inset-0 p-8 flex flex-col">
        <div className="flex-1 rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:-rotate-2 transition-transform duration-500">
           <img src={image} className="w-full h-[450px] object-cover" alt={title} />
        </div>
        <div className="flex items-end justify-between">
          <div>
             <h3 className="text-black text-2xl font-black uppercase tracking-tighter">{title}</h3>
             <p className="text-neutral-400 text-xs font-medium uppercase mt-1 italic">Exclusive Series — {count}</p>
          </div>
          <div className="bg-red-600 p-3 rounded-xl text-white group-hover:translate-x-2 transition-transform">
             <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </Wrapper>
  );

  // --- CASE 20: THE DARK MATTER ---
  if (variant === 20) return (
    <Wrapper href={href as string} className={cn(common, "bg-black rounded-none")}>
      <img src={image} className="absolute inset-0 w-full h-[450px] object-cover opacity-20 group-hover:opacity-40 transition-opacity" alt={title} />
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className="relative">
          <Fingerprint size={100} className="text-white/5 absolute -top-12 -left-12 rotate-45" />
          <h3 className="text-white text-6xl font-black uppercase tracking-tighter leading-none relative z-10">{title}</h3>
          <p className="text-red-600 font-mono text-xs mt-4 tracking-widest text-right">SECURE ACCESS // {count}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
    </Wrapper>
  );

  return null;
}
