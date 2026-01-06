"use client";
import { ShoppingCart, Heart, Eye, ArrowUpRight, Star, Plus, Zap, Shield, Layers,Maximize2, Hash, MoveUpRight, Globe, Share2, Info, Compass, Box, Cpu, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type CardVariant = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7" | "v8" | "v9" | "v10" | "v11" | "v12" | "v13" | "v14" | "v15" | "v16" | "v17" | "v18" | "v19" | "v20" | "v21" | "v22" | "v23" | "v24" | "v25" | "v26" | "v27" | "v28" | "v29" | "v30" | "v31" | "v32" | "v33" | "v34" | "v35" | "v36" | "v37" | "v38" | "v39" | "v40";

interface ProductCardProps {
  variant?: CardVariant;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number;
}

export function ProductCard({ variant = "v1", title, price, oldPrice = price * 1.2, image, rating = 4 }: ProductCardProps) {
  const t = useTranslations("Shop");
  // GLOBAL TRANSITION: 1000ms
  const common = "relative w-full sm:w-[300px] md:w-[340px] h-[400px] sm:h-[500px] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group select-none flex flex-col text-foreground rtl:text-right";

  switch (variant) {
    // 01. DEFAULT: GLASSMORPHIC RED (High-End Retail)
    case "v1":
      return (
        <div className={cn(common, "rounded-[3rem] bg-[--card] backdrop-blur-xl border border-[--border] hover:shadow-2xl hover:border-red-600/50")}>
          <div className="h-2/3 p-6 overflow-hidden relative">
             <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 1 }} src={image} className="w-full h-full object-cover rounded-[2.5rem]"/>
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="p-4 bg-white rounded-full"><Eye size={20}/></button>
                <button className="p-4 bg-red-600 text-white rounded-full"><ShoppingCart size={20}/></button>
             </div>
          </div>
          <div className="p-8 flex flex-col justify-between flex-grow">
            <h3 className="text-2xl font-black tracking-tighter uppercase line-clamp-2">{title}</h3>
            <div className="flex justify-between items-end"><span className="text-4xl font-black text-red-600">${price}</span><ArrowUpRight className="group-hover:rotate-45 transition-transform duration-1000"/></div>
          </div>
        </div>
      );
      // 2. TECH-NOIR (Dark Mode Specialized, Cyber Neon)
    case "v2":
      return (
        <div className={cn(common, "bg-neutral-950 border-2 border-cyan-500/20 rounded-none")}>
          <div className="h-1/2 p-2 relative">
            <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 p-2 bg-cyan-500 text-black font-black text-[10px]">#LIVE_SCAN</div>
            <img src={image} className="w-full h-full object-cover contrast-125 brightness-75 group-hover:brightness-100 transition-all"/>
          </div>
          <div className="p-6 space-y-4">
             <div className="h-0.5 w-full bg-cyan-500/30 overflow-hidden"><motion.div animate={{ x: [-350, 350] }} transition={{ repeat: Infinity, duration: 2 }} className="h-full w-20 bg-cyan-400"/></div>
             <h3 className="text-cyan-400 font-mono text-2xl font-bold italic">{title}</h3>
             <div className="flex justify-between items-center text-cyan-100/50 text-[10px] font-mono"><span>LATENCY: 0.2ms</span><span>AUTH: SECURED</span></div>
             <div className="flex justify-between items-center pt-4 border-t border-cyan-500/20">
                <span className="text-3xl font-mono font-black text-white">${price}</span>
                <button className="px-6 py-2 bg-cyan-500 text-black font-black uppercase tracking-tighter hover:bg-white transition-colors">Buy</button>
             </div>
          </div>
        </div>
      );

    // 3. MINIMAL SCANDI (Warm tones, rounded, soft)
    case "v3":
      return (
        <div className={cn(common, "bg-[#fdfcf8] dark:bg-neutral-900 border-none shadow-sm hover:shadow-2xl rounded-[4rem] p-10 items-center text-center")}>
          <div className="relative w-full">
            <img src={image} className="h-56 w-full object-contain mb-8 group-hover:-translate-y-4 transition-transform duration-500"/>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex text-amber-400 gap-1">
               {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < rating ? "currentColor" : "none"}/>)}
            </div>
          </div>
          <h3 className="text-xl font-medium text-stone-700 dark:text-stone-300 mt-8 leading-tight">{title}</h3>
          <p className="text-2xl font-bold text-stone-900 dark:text-white mt-4">${price}</p>
          <button className="mt-auto w-full py-4 rounded-full bg-stone-900 text-white dark:bg-stone-200 dark:text-black font-bold hover:scale-105 transition-transform">View Details</button>
        </div>
      );

    // 04. NEW BENTO V2 (Asymmetric Grid)
    case "v4":
      return (
        <div className={cn(common, "bg-neutral-100 dark:bg-neutral-900 gap-2 p-2 rounded-[2rem]")}>
          <div className="h-3/4 flex gap-2">
            <div className="w-3/4 bg-white dark:bg-neutral-800 rounded-[1.5rem] overflow-hidden"><img src={image} className="w-full h-full object-cover"/></div>
            <div className="w-1/4 flex flex-col gap-2">
              <div className="h-1/2 bg-red-600 rounded-[1rem] flex items-center justify-center text-white"><Heart size={20}/></div>
              <div className="h-1/2 bg-white dark:bg-neutral-800 rounded-[1rem] flex items-center justify-center"><Share2 size={20}/></div>
            </div>
          </div>
          <div className="h-1/4 bg-white dark:bg-neutral-800 rounded-[1.5rem] p-6 flex justify-between items-center">
            <div className="flex flex-col"><h3 className="font-bold truncate w-32">{title}</h3><span className="text-2xl font-black">${price}</span></div>
            <button className="bg-black text-white px-6 py-2 rounded-xl text-xs font-bold uppercase">Add</button>
          </div>
        </div>
      );

    // 05. NEW VERTICAL SPLIT (Luxury Boutique)
    case "v5":
      return (
        <div className={cn(common, "bg-white border-none rounded-none flex-row")}>
          <div className="w-1/4 bg-black flex flex-col items-center justify-between py-10 text-white group-hover:w-full transition-all duration-1000 z-20">
            <span className="rotate-[-90deg] font-black text-xs tracking-[0.5em] uppercase">Premium</span>
            <Plus className="group-hover:rotate-180 transition-transform duration-1000"/>
            <span className="font-black text-lg">${price}</span>
          </div>
          <div className="flex-1 relative flex flex-col p-10">
            <img src={image} className="h-1/2 object-contain group-hover:scale-125 transition-transform duration-1000"/>
            <h3 className="mt-auto text-4xl font-black italic tracking-tighter group-hover:opacity-0 transition-opacity">{title}</h3>
          </div>
        </div>
      );
    
          // 6. PHOTO-MAGAZINE (Full Image background, white text)
    case "v6":
      return (
        <div className={cn(common, "bg-black group-hover:shadow-[0_0_50px_rgba(0,0,0,0.5)]")}>
          <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
            <h3 className="text-white text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-6">{title}</h3>
            <div className="flex justify-between items-center">
               <div className="px-6 py-2 bg-white text-black font-black italic text-2xl">${price}</div>
               <button className="h-14 w-14 rounded-full border-2 border-white flex items-center justify-center text-white"><ArrowUpRight/></button>
            </div>
          </div>
        </div>
      );
    
    // 07. NEW RADIAL HUB (Futuristic Circular)
    case "v7":
      return (
        <div className={cn(common, "bg-black p-4 items-center justify-center rounded-[3rem]")}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"/>
          <div className="relative w-64 h-64 rounded-full border border-red-600/30 flex items-center justify-center p-8 group-hover:border-red-600 transition-colors duration-1000">
            <img src={image} className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]"/>
          </div>
          <div className="mt-8 text-center space-y-4">
            <h3 className="text-white font-bold text-xl uppercase tracking-widest">{title}</h3>
            <div className="text-red-600 font-black text-4xl italic">${price}</div>
            <button className="bg-red-600 text-white px-10 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest">Connect</button>
          </div>
        </div>
      );
    
        // 8. LUXURY VELVET (Purple/Gold, Serif fonts)
    case "v8":
      return (
        <div className={cn(common, "bg-indigo-950 rounded-[4rem] p-10 border border-indigo-400/20 text-indigo-50 items-center text-center")}>
           <div className="w-full h-56 relative group-hover:-rotate-6 transition-transform">
              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"/>
              <img src={image} className="w-full h-full object-contain relative z-10"/>
           </div>
           <h3 className="mt-10 font-serif text-3xl italic tracking-tight">{title}</h3>
           <div className="w-12 h-0.5 bg-indigo-400 my-4"/>
           <span className="text-3xl font-light tracking-[0.2em] text-indigo-300">${price}</span>
           <button className="mt-auto px-10 py-3 rounded-full border border-indigo-300 text-indigo-300 hover:bg-indigo-300 hover:text-indigo-950 transition-colors">Select</button>
        </div>
      );
    
    // 09. NEW MINIMAL OVERLAY (Apple Style)
    case "v9":
      return (
        <div className={cn(common, "bg-[#f5f5f7] dark:bg-neutral-900 rounded-[2.5rem] p-12 text-center")}>
          <div className="flex-grow flex items-center justify-center">
            <motion.img whileHover={{ y: -20 }} transition={{ duration: 1 }} src={image} className="w-full h-64 object-contain"/>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
            <p className="text-neutral-500 font-medium">${price}</p>
            <div className="pt-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-1000">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-xs font-bold">Buy</button>
              <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full text-xs font-bold">Learn more</button>
            </div>
          </div>
        </div>
      );
    
    // 10. NEON GRADIENT (Animated border, RGB feel)
    case "v10":
      return (
        <div className={cn(common, "p-[2px] rounded-[2rem] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-xy")}>
          <div className="h-full w-full bg-black rounded-[2rem] p-8 flex flex-col">
             <div className="flex justify-between text-white/40 text-[10px] uppercase font-black"><span>Premium Edition</span><Zap size={14}/></div>
             <img src={image} className="h-48 object-contain my-8 group-hover:scale-125 transition-transform"/>
             <h3 className="text-white text-2xl font-black uppercase tracking-tighter italic">{title}</h3>
             <div className="mt-auto flex justify-between items-end border-t border-white/10 pt-4">
                <span className="text-4xl font-black text-white italic tracking-tighter">${price}</span>
                <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center"><ShoppingCart size={20}/></div>
             </div>
          </div>
        </div>
      );

    // 11. SCROLL-REVEAL (Content appears only on hover)
    case "v11":
      return (
        <div className={cn(common, "bg-white dark:bg-neutral-900 rounded-[3rem] border border-neutral-100 shadow-xl overflow-hidden")}>
           <div className="h-full relative">
              <img src={image} className="w-full h-full object-cover group-hover:h-1/2 transition-all duration-700"/>
              <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-1/2 bg-[--color-primary] transition-all duration-700 p-8 flex flex-col justify-center text-white">
                 <h3 className="text-2xl font-black leading-none mb-4">{title}</h3>
                 <span className="text-4xl font-bold italic">${price}</span>
                 <button className="mt-4 py-2 border border-white hover:bg-white hover:text-[--color-primary] font-bold transition-all">Buy Now</button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center group-hover:opacity-0 transition-opacity">
                 <h3 className="text-4xl font-black uppercase tracking-widest">{title}</h3>
              </div>
           </div>
        </div>
      );

    // 12. THE OBSIDIAN GLASS (Deep Dark Transparency)
    case "v12":
      return (
        <div className={cn(common, "rounded-[3rem] bg-neutral-900 border border-white/5 shadow-2xl")}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="h-[60%] p-8 overflow-hidden">
            <img src={image} className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-1000" />
          </div>
          <div className="p-10 flex-grow bg-white/5 backdrop-blur-2xl border-t border-white/10 flex flex-col justify-between">
            <h3 className="text-white text-2xl font-light tracking-widest uppercase">{title}</h3>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-black text-red-500 italic">${price}</span>
              <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"><Plus/></button>
            </div>
          </div>
        </div>
      );

        // 13. KINETIC MARQUEE (Moving text footer)
    case "v13":
      return (
        <div className={cn(common, "bg-black rounded-[3rem] border border-white/20")}>
          <div className="h-2/3 p-10"><img src={image} className="w-full h-full object-cover rounded-3xl"/></div>
          <div className="p-6 flex-grow flex flex-col justify-between">
             <h3 className="text-white text-3xl font-black uppercase italic tracking-tighter">{title}</h3>
             <div className="w-full bg-red-600 -mx-6 py-2 overflow-hidden whitespace-nowrap">
                <motion.div animate={{ x: [-200, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="flex gap-10 text-white font-bold uppercase text-[10px]">
                   <span>Sale Active • {title} • Sale Active • {title} • Sale Active • {title}</span>
                </motion.div>
             </div>
             <div className="flex justify-between items-center text-white mt-4">
                <span className="text-2xl font-black">${price}</span>
                <Plus/>
             </div>
          </div>
        </div>
      );

    // 14. POLAROID (White frame, handwritten feel)
    case "v14":
      return (
        <div className={cn(common, "bg-white p-6 shadow-xl rounded-sm hover:-rotate-3 transition-transform")}>
           <div className="bg-neutral-100 h-3/4 flex items-center justify-center shadow-inner overflow-hidden">
              <img src={image} className="h-full object-cover sepia-[0.3] hover:sepia-0 transition-all"/>
           </div>
           <div className="p-6 space-y-2">
              <h3 className="font-serif text-3xl text-neutral-800">{title}</h3>
              <div className="flex justify-between items-center text-neutral-400 italic">
                 <span>Collection No. 1</span>
                 <span className="text-2xl font-bold text-neutral-800">${price}</span>
              </div>
           </div>
        </div>
      );

    // 15. GLASS-LIST (Transparent with prominent specs)
    case "v15":
      return (
        <div className={cn(common, "bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-8")}>
           <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/20 rounded-2xl text-white"><Shield size={20}/></div>
              <h3 className="text-xl font-black text-white w-2/3 text-right">{title}</h3>
           </div>
           <img src={image} className="h-32 object-contain mb-8 group-hover:scale-125 transition-transform"/>
           <div className="space-y-3 mt-auto">
              {[ "Performance: Ultra", "Warranty: 2 Year", "Shipping: Express" ].map(s => (
                <div key={s} className="flex justify-between text-[10px] text-white/60 font-bold uppercase border-b border-white/10 pb-1"><span>{s.split(':')[0]}</span><span>{s.split(':')[1]}</span></div>
              ))}
              <div className="pt-4 flex justify-between items-center">
                 <span className="text-3xl font-black text-white">${price}</span>
                 <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-black"><ShoppingCart/></div>
              </div>
           </div>
        </div>
      );

    // 16. THE OVERSIZE ICON (Graphic focus)
    case "v16":
      return (
        <div className={cn(common, "bg-[--card] border border-[--border] rounded-[3.5rem] p-12 hover:bg-black group-hover:text-white transition-colors")}>
           <div className="absolute -right-20 rtl:right-auto rtl:-left-20 -top-20 opacity-10 group-hover:rotate-45 transition-transform"><Layers size={300}/></div>
           <img src={image} className="w-full h-48 object-contain mb-10 z-10 relative"/>
           <h3 className="text-5xl font-black tracking-tighter leading-none z-10 relative">{title}</h3>
           <div className="mt-auto flex justify-between items-center z-10 relative">
              <span className="text-2xl font-bold opacity-60">${price}</span>
              <button className="h-16 w-16 bg-[--color-primary] rounded-full text-white flex items-center justify-center hover:scale-110 transition-transform"><MoveUpRight/></button>
           </div>
        </div>
      );

    // 17. SCANDI-DARK (Deep forest green, copper accents)
    case "v17":
      return (
        <div className={cn(common, "bg-[#1a2e26] rounded-[3rem] p-10 text-[#d4a373] border border-[#d4a373]/20")}>
           <div className="h-64 rounded-full border border-[#d4a373]/40 p-10 mb-8"><img src={image} className="w-full h-full object-contain brightness-125"/></div>
           <h3 className="text-center font-black text-2xl uppercase tracking-widest text-white">{title}</h3>
           <div className="mt-auto flex justify-between items-center pt-8 border-t border-[#d4a373]/20">
              <span className="text-3xl font-light tracking-tighter">${price}</span>
              <button className="p-3 bg-[#d4a373] text-[#1a2e26] rounded-full"><Plus/></button>
           </div>
        </div>
      );

    // 18. NEW NEOMORPHIC CLAY (Soft UI)
    case "v18":
      return (
        <div className={cn(common, "bg-[#e0e5ec] dark:bg-[#1a1d23] rounded-[3.5rem] p-10 shadow-[20px_20px_60px_#bec3c9,-20px_-20px_60px_#ffffff] dark:shadow-none border-none")}>
           <div className="h-56 bg-white/30 rounded-[2.5rem] p-4 shadow-inner flex items-center justify-center">
              <img src={image} className="h-full object-contain filter drop-shadow-lg"/>
           </div>
           <h3 className="mt-8 text-xl font-bold text-slate-700 dark:text-slate-300 text-center uppercase tracking-[0.2em]">{title}</h3>
           <div className="mt-auto h-16 bg-[#e0e5ec] dark:bg-neutral-800 rounded-2xl shadow-[inset_6px_6px_12px_#bec3c9,inset_-6px_-6px_12px_#ffffff] flex items-center justify-between px-6">
              <span className="text-2xl font-black text-red-600">${price}</span>
              <button className="h-10 w-10 bg-red-600 rounded-full text-white flex items-center justify-center"><Plus/></button>
           </div>
        </div>
      );

    case "v19":
      return (
        <div className={cn(common, "bg-neutral-950 rounded-[3.5rem]")}>
          <div className="absolute inset-0 z-0">
            <img src={image} className="w-full h-full object-cover opacity-50 scale-125 group-hover:scale-100 transition-transform duration-1000" />
          </div>
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
          
          <div className="relative z-20 h-full p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <div className="h-12 w-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white"><Maximize2 size={18}/></div>
               <span className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase">Cinema_Series_26</span>
            </div>
            
            <div className="space-y-6">
               <motion.div initial={{ width: "20%" }} whileHover={{ width: "100%" }} transition={{ duration: 1 }} className="h-px bg-red-600" />
               <h3 className="text-white text-5xl font-black tracking-tighter uppercase leading-[0.8]">{title}</h3>
               <div className="flex justify-between items-end overflow-hidden">
                  <div className="flex flex-col">
                    <span className="text-red-500 font-bold text-xs uppercase tracking-widest">MSRP</span>
                    <span className="text-white text-4xl font-light italic">${price}</span>
                  </div>
                  <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-[10px] hover:bg-red-600 hover:text-white transition-colors">Pre-Order</button>
               </div>
            </div>
          </div>
        </div>
      );

      // 20. THE SCIFI-POD (Glass capsule look)
    case "v20":
      return (
        <div className={cn(common, "bg-gradient-to-b from-cyan-900/40 to-black border-2 border-cyan-400/30 rounded-t-full p-10 items-center")}>
           <div className="h-64 w-64 rounded-full bg-cyan-400/5 flex items-center justify-center border-b-4 border-cyan-400/40 shadow-[0_0_50px_rgba(34,211,238,0.1)] relative">
              <div className="absolute top-4 bg-cyan-400 text-black font-black text-[8px] px-3 py-1 rounded-full uppercase">Authentic</div>
              <img src={image} className="h-40 object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"/>
           </div>
           <h3 className="mt-10 text-cyan-400 font-mono text-xl text-center font-bold tracking-[0.3em] uppercase">{title}</h3>
           <div className="mt-auto flex gap-4 w-full">
              <button className="flex-1 py-3 border border-cyan-400/50 text-cyan-400 font-mono text-[10px] hover:bg-cyan-400/10 uppercase">Data</button>
              <button className="flex-1 py-3 bg-cyan-400 text-black font-mono font-black text-[10px] uppercase">Acquire</button>
           </div>
        </div>
      );
    
    // 21. THE GHOST OUTLINE
    case "v21":
      return (
        <div className={cn(common, "bg-transparent border-2 border-dashed border-neutral-300 rounded-[3rem] p-8 items-center justify-center text-center hover:border-solid hover:border-red-600")}>
           <img src={image} className="h-48 object-contain opacity-30 group-hover:opacity-100 transition-opacity duration-1000"/>
           <h3 className="mt-10 text-3xl font-thin tracking-[0.3em] uppercase">{title}</h3>
           <p className="mt-4 text-2xl font-black">${price}</p>
        </div>
      );

    // 22. THE LIQUID AURORA (Moving Gradient Background)
    case "v22":
      return (
        <div className={cn(common, "rounded-[4rem] bg-neutral-950 p-1")}>
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600 via-orange-500 to-indigo-600 opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-1000" />
          <div className="relative h-full w-full bg-neutral-900/80 backdrop-blur-xl rounded-[3.8rem] p-10 flex flex-col">
            <img src={image} className="h-1/2 object-contain group-hover:rotate-12 transition-transform duration-1000" />
            <div className="mt-10 space-y-4">
               <div className="flex text-amber-500"><Star size={14} fill="currentColor" /> <span className="text-white/40 text-xs ml-2">4.9 Product Rating</span></div>
               <h3 className="text-white text-3xl font-black tracking-tighter">{title}</h3>
               <div className="flex justify-between items-center mt-auto">
                  <span className="text-4xl font-black text-white">${price}</span>
                  <div className="px-8 py-3 bg-red-600 text-white rounded-2xl font-black shadow-[0_0_30px_rgba(220,38,38,0.4)]">Acquire</div>
               </div>
            </div>
          </div>
        </div>
      );

    // 23. THE SIDE-BAR LABEL
    case "v23":
      return (
        <div className={cn(common, "bg-slate-50 dark:bg-neutral-900 border border-[--border] rounded-[2.5rem] flex-row-reverse")}>
           <div className="w-16 bg-[--color-primary] flex items-center justify-center [writing-mode:vertical-lr] text-white font-black uppercase text-xs tracking-widest">Flash Sale - 20% Off</div>
           <div className="flex-1 p-8 flex flex-col">
              <img src={image} className="h-48 object-contain mb-8"/>
              <h3 className="text-2xl font-black">{title}</h3>
              <div className="mt-auto flex justify-between items-center"><span className="text-3xl font-black">${price}</span><div className="p-3 bg-black text-white rounded-full"><ShoppingCart size={18}/></div></div>
           </div>
        </div>
      );

    // 24. THE LIQUID SCAPE (Animated Blobs)
    case "v24":
      return (
        <div className={cn(common, "bg-white dark:bg-black rounded-[4rem] border border-[--border]")}>
           <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 rounded-b-[50%] -translate-y-1/2 group-hover:translate-y-0 transition-transform duration-1000 z-0"/>
           <div className="relative z-10 p-10 h-full flex flex-col items-center">
              <img src={image} className="h-48 object-contain drop-shadow-2xl"/>
              <h3 className="mt-10 text-2xl font-black text-center group-hover:text-white transition-colors duration-1000">{title}</h3>
              <p className="mt-4 text-xl opacity-60 group-hover:text-white transition-colors duration-1000 font-bold">${price}</p>
              <button className="mt-auto px-8 py-3 bg-black text-white rounded-full font-black uppercase text-xs">Explore</button>
           </div>
        </div>
      );

    // 25. THE SWISS DESIGN (Structured, Clean Grid)
    case "v25":
      return (
        <div className={cn(common, "bg-white border-2 border-black rounded-none p-0")}>
          <div className="grid grid-cols-4 grid-rows-4 h-full divide-x-2 divide-y-2 divide-black">
            <div className="col-span-3 row-span-3 p-10 flex items-center justify-center">
              <img src={image} className="w-full h-full object-contain" />
            </div>
            <div className="col-span-1 row-span-1 flex items-center justify-center bg-red-600 text-white"><Heart /></div>
            <div className="col-span-1 row-span-1 flex items-center justify-center"><Share2 /></div>
            <div className="col-span-1 row-span-1 flex items-center justify-center"><ShoppingCart /></div>
            <div className="col-span-4 row-span-1 p-6 flex justify-between items-center bg-black text-white">
               <h3 className="font-black text-xl uppercase tracking-tighter">{title}</h3>
               <span className="text-2xl font-black text-red-500">${price}</span>
            </div>
          </div>
        </div>
      );
  
    /// 26. THE FLOATING MULTIPLANAR (Z-Axis Depth)
    // Concept: Product, Price, and Title sit on 3 different "depth" layers.
    case "v26":
      return (
        <div className={cn(common, "bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-[4rem] perspective-1000")}>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.1),transparent)]" />
           <div className="p-10 h-full flex flex-col">
              {/* Layer 1: The Product (Pops out) */}
              <div className="relative h-2/3 group-hover:z-30 transition-all">
                 <img src={image} className="w-full h-full object-contain drop-shadow-[0_50px_30px_rgba(0,0,0,0.15)] group-hover:-translate-y-8 group-hover:scale-110 transition-transform duration-1000" />
              </div>
              
              {/* Layer 2: The Metadata (Floats middle) */}
              <div className="relative z-20 mt-auto bg-white/80 dark:bg-black/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white dark:border-white/10 shadow-2xl translate-y-4 group-hover:-translate-y-2 transition-transform duration-1000">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-black tracking-tight">{title}</h3>
                    <Heart size={18} className="text-red-600" />
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-3xl font-black">${price}</span>
                    <div className="h-10 w-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center"><Plus/></div>
                 </div>
              </div>
           </div>
        </div>
      );

    // 27. THE GALLERY PLINTH (Museum Minimalist)
    // Concept: The product sits on a "plinth" that grows when you hover.
    case "v27":
      return (
        <div className={cn(common, "bg-neutral-50 dark:bg-black items-center pt-16")}>
           <div className="relative w-full px-12 z-10">
              <img src={image} className="w-full h-64 object-contain group-hover:-translate-y-12 transition-transform duration-1000" />
           </div>
           
           <div className="absolute bottom-0 w-full bg-white dark:bg-neutral-900 h-1/3 group-hover:h-2/3 transition-all duration-1000 border-t border-neutral-200 dark:border-neutral-800 p-12 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-3xl font-thin tracking-tighter text-neutral-800 dark:text-white uppercase w-2/3 leading-none">{title}</h3>
                 <span className="text-xs font-mono opacity-40">ITEM_NO_{price}</span>
              </div>
              <div className="mt-auto flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                 <div className="flex flex-col">
                    <span className="text-4xl font-black">${price}</span>
                    <span className="text-[10px] uppercase font-bold text-red-600">Free Worldwide Shipping</span>
                 </div>
                 <button className="h-16 w-16 bg-red-600 text-white rounded-full flex items-center justify-center hover:rotate-90 transition-transform duration-500"><Plus size={28}/></button>
              </div>
           </div>
        </div>
      );

    // 28. THE STICKER (Pop Art)
    case "v28":
      return (
        <div className={cn(common, "bg-purple-600 p-8 rounded-[4rem] hover:rotate-3 transition-transform duration-1000")}>
           <div className="bg-white h-3/4 rounded-[3rem] p-10 rotate-[-5deg] group-hover:rotate-0 transition-transform duration-1000 relative">
              <span className="absolute -top-4 -left-4 bg-yellow-400 text-black px-4 py-2 font-black rounded-full rotate-[-12deg] shadow-lg">NEW!</span>
              <img src={image} className="w-full h-full object-contain"/>
           </div>
           <div className="mt-auto flex justify-between items-center text-white"><h3 className="font-black text-2xl truncate w-32">{title}</h3><span className="text-3xl font-black italic">${price}</span></div>
        </div>
      );

    // 29. THE RADIAL NEON (Edge Glow Only)
    case "v29":
      return (
        <div className={cn(common, "bg-black rounded-3xl p-8 border-none")}>
           <div className="absolute inset-0 rounded-3xl border-2 border-red-600 opacity-0 group-hover:opacity-100 shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all duration-1000" />
           <div className="relative h-1/2 flex items-center justify-center">
              <img src={image} className="h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-1000" />
           </div>
           <div className="mt-12 space-y-2">
              <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter">{title}</h3>
              <div className="h-1 w-20 bg-red-600 group-hover:w-full transition-all duration-1000" />
              <div className="flex justify-between items-center pt-6">
                 <span className="text-white text-4xl font-black">${price}</span>
                 <button className="h-14 w-14 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"><ShoppingCart/></button>
              </div>
           </div>
        </div>
      );

    // 30. THE SAND DUNE (Organic Textured)
    case "v30":
      return (
        <div className={cn(common, "bg-[#f4eee4] rounded-[4rem] p-12 items-center text-center border-none")}>
           <div className="w-full h-64 bg-[#e9e1d4] rounded-full flex items-center justify-center p-10 inner-shadow group-hover:rounded-[3rem] transition-all duration-1000">
              <img src={image} className="h-full object-contain mix-blend-multiply" />
           </div>
           <h3 className="mt-10 text-stone-800 text-2xl font-serif">{title}</h3>
           <p className="mt-2 text-stone-500 font-bold uppercase tracking-[0.3em] text-[10px]">Limited Collection</p>
           <div className="mt-auto text-4xl font-black text-stone-900">${price}</div>
        </div>
      );

    // 31. THE KINETIC FRAME (NEW REDESIGN)
    // Concept: A floating mask that crops the product dynamically on hover, 
    // using offset typography for a luxury fashion magazine feel.
    case "v31":
      return (
        <div className={cn(common, "bg-[#0d0d0d] rounded-none border border-white/10")}>
          {/* Background Text Layer */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
            <h2 className="text-[14rem] font-black uppercase text-white leading-none rotate-90">{title.charAt(0)}</h2>
          </div>

          <div className="relative flex-grow p-6 flex flex-col items-center justify-center">
            {/* The Floating Frame */}
            <div className="relative w-full h-64 border border-white/20 group-hover:border-red-600 group-hover:scale-105 transition-all duration-1000 z-10">
              <img src={image} className="absolute inset-0 w-full h-full object-cover p-2 scale-90 group-hover:scale-110 transition-transform duration-1000" />
              
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </div>

          <div className="p-10 bg-white text-black translate-y-2 group-hover:translate-y-0 transition-transform duration-1000">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Premium Artifact</span>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{title}</h3>
              </div>
              <span className="text-xl font-light italic">${price}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex-grow bg-black text-white py-4 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-colors duration-500">
                Purchase Detail
              </button>
              <div className="h-12 w-12 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </div>
      );

    // 32. THE BOLD TAPE (Yellow Tape Accents)
    case "v32":
      return (
        <div className={cn(common, "bg-white dark:bg-neutral-950 p-6 rounded-none border-4 border-black")}>
           <div className="h-3/4 relative overflow-hidden bg-neutral-100">
              <div className="absolute top-0 left-0 w-full bg-yellow-400 text-black font-black py-1 text-center rotate-[30deg] translate-x-1/4 -translate-y-1/2">CHECK THIS OUT</div>
              <img src={image} className="w-full h-full object-cover"/>
           </div>
           <div className="mt-4 flex flex-col justify-between flex-grow"><h3 className="text-xl font-black uppercase leading-none">{title}</h3><div className="flex justify-between items-end"><span className="text-5xl font-black tracking-tighter italic">${price}</span><button className="bg-black text-white p-3"><Plus/></button></div></div>
        </div>
      );

    // 33. THE SAND (Desert Minimal)
    case "v33":
      return (
        <div className={cn(common, "bg-[#ede7de] dark:bg-[#1c1b19] rounded-[4rem] p-10 border-none items-center text-center")}>
           <div className="h-1/2 flex items-center justify-center bg-[#e4dcd1] dark:bg-neutral-800 rounded-[3rem] w-full mb-10 shadow-inner">
              <img src={image} className="h-40 object-contain sepia-[0.2]"/>
           </div>
           <h3 className="text-2xl font-serif text-[#4a463f] dark:text-neutral-400 italic leading-none">{title}</h3>
           <p className="mt-6 text-4xl font-black text-[#1c1b19] dark:text-white tracking-tighter leading-none">${price}</p>
           <button className="mt-auto px-10 py-3 rounded-full border border-black dark:border-white font-bold text-xs uppercase tracking-widest">Select</button>
        </div>
      );

    // 34. THE GALAXY (Nebula Glow)
    case "v34":
      return (
        <div className={cn(common, "bg-black p-10 rounded-[3rem] overflow-hidden")}>
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black opacity-40"/>
           <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full"/>
           <img src={image} className="relative z-10 w-full h-1/2 object-contain group-hover:scale-110 transition-transform duration-1000"/>
           <div className="relative z-10 mt-10 space-y-4"><h3 className="text-white text-2xl font-black tracking-tighter">{title}</h3><span className="text-4xl font-black text-blue-400 italic">${price}</span><button className="w-full py-4 bg-white text-black font-black rounded-2xl">Acquire</button></div>
        </div>
      );

    // 35. THE RADAR (Targeting HUD)
    case "v35":
      return (
        <div className={cn(common, "bg-neutral-950 p-8 border-2 border-red-600/20 rounded-2xl items-center")}>
           <div className="relative w-full aspect-square border-2 border-red-600/30 rounded-full flex items-center justify-center p-10 group-hover:border-red-600 transition-colors duration-1000">
              <div className="absolute inset-0 border-r-2 border-red-600 animate-spin-slow opacity-20"/>
              <img src={image} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000"/>
           </div>
           <h3 className="mt-10 text-red-600 font-black text-2xl uppercase tracking-[0.2em]">{title}</h3>
           <div className="mt-auto flex items-center gap-10"><span className="text-white text-4xl font-black">${price}</span><div className="h-12 w-12 bg-red-600 text-white rounded-full flex items-center justify-center"><Zap/></div></div>
        </div>
      );

    // 36. THE OVERLAP (Floating Layers)
    case "v36":
      return (
        <div className={cn(common, "bg-white dark:bg-neutral-900 p-8 rounded-[3rem] shadow-xl group-hover:shadow-2xl")}>
           <div className="relative h-2/3"><div className="absolute -left-10 top-0 bg-red-600 w-full h-4/5 rounded-3xl -rotate-6 transition-transform group-hover:rotate-0 duration-1000"/><img src={image} className="relative z-10 w-full h-full object-cover rounded-3xl"/></div>
           <div className="mt-6 flex flex-col justify-between flex-grow"><h3 className="text-2xl font-black tracking-tighter italic">{title}</h3><div className="flex justify-between items-center"><span className="text-3xl font-black text-red-600">${price}</span><Plus className="group-hover:rotate-90 transition-transform duration-1000"/></div></div>
        </div>
      );

    // 37. THE OVERSIZED NUMBER (Price focus)
    case "v37":
      return (
        <div className={cn(common, "bg-neutral-50 dark:bg-black rounded-[3rem] p-10")}>
           <div className="absolute -top-10 -right-10 text-[200px] font-black text-black/5 dark:text-white/5 italic">0{price % 10}</div>
           <div className="h-1/2 relative"><img src={image} className="w-full h-full object-contain group-hover:scale-125 transition-transform duration-1000" /></div>
           <div className="mt-auto space-y-6 relative">
              <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">{title}</h3>
              <div className="flex items-center gap-6">
                 <span className="text-5xl font-black text-red-600 tracking-tighter italic">${price}</span>
                 <button className="h-16 w-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center"><Plus/></button>
              </div>
           </div>
        </div>
      );

    // 38. THE SATIN REVEAL (Dark Gradient Overlay)
    case "v38":
      return (
        <div className={cn(common, "bg-black rounded-[3rem] p-0")}>
           <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
              <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-1000">
                <p className="text-red-500 font-black text-xs uppercase tracking-[0.4em] mb-2">Signature Series</p>
                <h3 className="text-white text-4xl font-black leading-none uppercase mb-6">{title}</h3>
                <div className="flex justify-between items-center overflow-hidden">
                   <span className="text-3xl text-white font-light">${price}</span>
                   <button className="px-8 py-3 bg-white text-black font-black uppercase text-xs hover:bg-red-600 hover:text-white transition-colors duration-500">Acquire Now</button>
                </div>
              </div>
           </div>
        </div>
      );
    
    // 39. THE SATIN (Smooth & Dark)
    case "v39":
      return (
        <div className={cn(common, "bg-[#0a0a0a] rounded-[3.5rem] p-12 border-none shadow-2xl items-center text-center")}>
           <div className="h-56 w-full relative group-hover:-translate-y-4 transition-transform duration-1000"><div className="absolute inset-0 bg-red-600/10 blur-[60px] rounded-full"/><img src={image} className="w-full h-full object-contain relative z-10"/></div>
           <h3 className="mt-10 text-white font-black text-2xl uppercase tracking-widest opacity-80">{title}</h3>
           <div className="mt-4 text-red-600 font-black text-5xl tracking-tighter italic leading-none">${price}</div>
           <button className="mt-auto w-full py-4 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white transition-all duration-1000 text-xs font-bold uppercase tracking-[0.3em]">Examine</button>
        </div>
      );

    // 40. THE ORGANIC (Rounded Capsule)
    case "v40":
      return (
        <div className={cn(common, "bg-neutral-100 dark:bg-neutral-900 rounded-[8rem] p-10 border border-neutral-200 dark:border-neutral-800 items-center justify-between")}>
           <div className="h-64 w-64 rounded-full bg-white dark:bg-black shadow-xl flex items-center justify-center p-8"><img src={image} className="w-full h-full object-contain"/></div>
           <div className="text-center space-y-2"><h3 className="text-xl font-bold">{title}</h3><p className="text-3xl font-black text-red-600 italic tracking-tighter">${price}</p></div>
           <button className="h-16 w-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center"><Plus/></button>
        </div>
      );

    default: return <div className={common}>Variant {variant} not found.</div>;
  }
}
