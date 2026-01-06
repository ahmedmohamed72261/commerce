"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    ShoppingBag, Star, Zap, Shield, ArrowRight,
    Heart, Share2, Eye, Flame, Crown, Sparkles,
    Truck, Box, ZapOff, Smartphone, Headphones
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomStyles {
    container?: string;
    imageSection?: string;
    textSection?: string;
    productImg?: string;
    mainButton?: string;
    priceText?: string;
    badge?: string;
}

interface AboutSectionHero {
    version?: number;
    data?: {
        brand?: string;
        title?: string;
        price?: string;
        oldPrice?: string;
        image?: string;
        label?: string;
    };
    customStyles?: CustomStyles;
}

type Theme = {
    card: string;
    img: string;
    btn: string;
    badge: string;
    icon: string;
};

export function AboutSectionHero({
    version = 1,
    data = {
        brand: "JOYROOM",
        title: "Ultra-Low Latency Gaming Headset",
        price: "$189.00",
        oldPrice: "$249.00",
        image: "/images/f.jpg",
        label: "Limited Edition"
    },
    customStyles = {}
}: AboutSectionHero) {

    // --- THE FULL 30 DESIGN CASES ---
    const getStyle = (v: number) => {
        const themes: Record<number, Theme> = {
            1: { card: "rounded-3xl border-neutral-100 shadow-2xl bg-white", img: "bg-neutral-50", btn: "rounded-full bg-[#C40000]", badge: "bg-[#C40000] text-white rounded-full", icon: "text-[#C40000]" },
            2: { card: "rounded-none border-4 border-black shadow-[15px_15px_0px_#C40000] bg-white", img: "bg-white border-r-4 border-black", btn: "rounded-none bg-black uppercase tracking-tighter", badge: "bg-black text-white italic", icon: "text-black" },
            3: { card: "rounded-[3rem] bg-zinc-950 text-white border-none", img: "bg-zinc-900 rounded-[2.5rem] m-4", btn: "rounded-2xl bg-white text-black", badge: "bg-white/10 backdrop-blur-md text-white", icon: "text-red-500" },
            4: { card: "rounded-none border-y border-neutral-200 shadow-none", img: "bg-transparent", btn: "rounded-none bg-transparent border-b-2 border-black text-black px-0", badge: "bg-transparent text-black border-l-4 border-[#C40000] pl-2", icon: "text-[#C40000]" },
            5: { card: "rounded-2xl bg-gradient-to-br from-red-50 to-white border-red-100", img: "bg-white/50", btn: "rounded-xl bg-[#C40000] shadow-lg shadow-red-200", badge: "bg-red-100 text-[#C40000] font-bold", icon: "text-[#C40000]" },
            6: { card: "rounded-lg border-2 border-dashed border-neutral-300", img: "bg-neutral-50 grayscale hover:grayscale-0", btn: "rounded-none bg-neutral-900", badge: "bg-neutral-900 text-white", icon: "text-neutral-500" },
            7: { card: "rounded-[4rem] border border-neutral-200 pr-12 shadow-sm", img: "rounded-full aspect-square scale-90", btn: "rounded-full bg-[#C40000]", badge: "hidden", icon: "text-[#C40000]" },
            8: { card: "rounded-3xl shadow-none bg-blue-50/30 border border-blue-100", img: "bg-blue-600/5", btn: "rounded-2xl bg-blue-600", badge: "bg-blue-600 text-white", icon: "text-blue-600" },
            9: { card: "rounded-none border-l-8 border-[#C40000] bg-neutral-50", img: "bg-neutral-100", btn: "rounded-none bg-[#C40000] hover:skew-x-3", badge: "bg-[#C40000] text-white", icon: "text-[#C40000]" },
            10: { card: "rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.1)]", img: "bg-gradient-to-tr from-orange-50 to-rose-50", btn: "rounded-full bg-orange-600", badge: "bg-orange-600 text-white", icon: "text-orange-600" },
            11: { card: "rounded-none border-4 border-[#C40000] bg-white shadow-none", img: "bg-red-50", btn: "rounded-none bg-[#C40000] text-white font-bold", badge: "bg-black text-white", icon: "text-[#C40000]" },
            12: { card: "rounded-3xl border-2 border-zinc-800 bg-zinc-900 text-white", img: "bg-zinc-800", btn: "rounded-full bg-yellow-400 text-black", badge: "bg-yellow-400 text-black font-black", icon: "text-yellow-400" },
            13: { card: "rounded-xl shadow-xl border-t-8 border-indigo-600", img: "bg-indigo-50/50", btn: "rounded-lg bg-indigo-600", badge: "bg-indigo-600 text-white", icon: "text-indigo-600" },
            14: { card: "rounded-none skew-x-1 border-2 border-black bg-white", img: "bg-neutral-50 -skew-x-1", btn: "rounded-none bg-black", badge: "bg-[#C40000] text-white", icon: "text-[#C40000]" },
            15: { card: "rounded-3xl border-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] bg-neutral-50", img: "bg-white m-4 rounded-2xl", btn: "rounded-xl bg-neutral-900", badge: "bg-white shadow-sm border text-neutral-900", icon: "text-neutral-900" },
            16: { card: "rounded-none bg-white border border-neutral-100 shadow-sm", img: "bg-neutral-900 p-12", btn: "rounded-none border-2 border-black bg-transparent text-black", badge: "bg-[#C40000] text-white uppercase tracking-[0.3em]", icon: "text-[#C40000]" },
            17: { card: "rounded-[3rem] border-4 border-neutral-50 bg-white", img: "bg-rose-50/30", btn: "rounded-full bg-rose-500", badge: "bg-rose-500 text-white", icon: "text-rose-500" },
            18: { card: "rounded-2xl bg-zinc-900 border-none shadow-2xl", img: "bg-gradient-to-b from-zinc-800 to-zinc-900", btn: "rounded-xl bg-[#C40000] shadow-[0_10px_20px_rgba(196,0,0,0.3)]", badge: "bg-zinc-100 text-black font-bold", icon: "text-[#C40000]" },
            19: { card: "rounded-none border-x-2 border-black bg-neutral-50", img: "bg-white", btn: "rounded-none bg-black text-white px-16", badge: "bg-transparent border-2 border-black text-black", icon: "text-black" },
            20: { card: "rounded-[5rem] bg-white border border-neutral-100 shadow-inner", img: "bg-teal-50/50", btn: "rounded-full bg-teal-600", badge: "bg-teal-100 text-teal-700", icon: "text-teal-600" },
            21: { card: "rounded-none border-b-[20px] border-[#C40000] bg-white shadow-2xl", img: "bg-neutral-50", btn: "rounded-none bg-black", badge: "bg-black text-white italic", icon: "text-[#C40000]" },
            22: { card: "rounded-3xl border-2 border-dashed border-red-500/20", img: "bg-red-500/5", btn: "rounded-2xl bg-gradient-to-r from-red-600 to-black", badge: "bg-red-600 text-white", icon: "text-red-600" },
            23: { card: "rounded-xl bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)]", img: "bg-neutral-50 border-r border-neutral-100", btn: "rounded-none bg-neutral-900 uppercase", badge: "bg-neutral-100 text-neutral-500", icon: "text-neutral-900" },
            24: { card: "rounded-[2rem] bg-white border border-neutral-100 shadow-xl pr-6", img: "m-6 rounded-[1.5rem] bg-neutral-100", btn: "rounded-full bg-black shadow-lg", badge: "bg-[#C40000] text-white", icon: "text-[#C40000]" },
            25: { card: "rounded-none bg-black text-white", img: "bg-zinc-900 opacity-80", btn: "rounded-none border border-white text-white hover:bg-white hover:text-black", badge: "bg-white text-black", icon: "text-red-500" },
            26: { card: "rounded-3xl bg-neutral-50 border-none", img: "bg-white rounded-[2.5rem] shadow-xl m-4", btn: "rounded-2xl bg-[#C40000]", badge: "bg-black text-white", icon: "text-[#C40000]" },
            27: { card: "rounded-none border-t-4 border-black bg-white shadow-none", img: "bg-neutral-50", btn: "rounded-none bg-black tracking-widest", badge: "bg-red-600 text-white", icon: "text-red-600" },
            28: { card: "rounded-[3rem] bg-white border-2 border-neutral-50 shadow-2xl", img: "bg-gradient-to-br from-gray-50 to-gray-200", btn: "rounded-full bg-[#C40000]", badge: "bg-neutral-900 text-white rounded-full", icon: "text-[#C40000]" },
            29: { card: "rounded-none bg-white border-4 border-double border-neutral-200", img: "bg-neutral-50 p-10", btn: "rounded-none bg-neutral-900", badge: "bg-neutral-900 text-white", icon: "text-neutral-900" },
            30: { card: "rounded-[4rem] bg-neutral-900 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]", img: "bg-zinc-800 rounded-[3.5rem] m-6", btn: "rounded-full bg-white text-black font-black", badge: "bg-[#C40000] text-white", icon: "text-[#C40000]" },
        };

        return themes[v] || themes[1];
    };

    const s = getStyle(version);

    return (
        <div className="container mx-auto px-4 relative z-30 -mt-24 group">
            <div className={cn(
                "flex flex-col lg:flex-row transition-all duration-700 overflow-hidden rtl:md:flex-row-reverse rtl:flex-col",
                s.card,
                "dark:bg-card dark:border-border",
                customStyles.container,
                version % 2 === 0 && "lg:flex-row-reverse" // Alternating layout
            )}>

                {/* IMAGE SECTION */}
                <div className={cn(
                    "lg:w-[45%] relative min-h-[360px] sm:min-h-[420px] lg:min-h-[500px] flex items-center justify-center transition-colors duration-500",
                    s.img,
                    customStyles.imageSection
                )}>
                    {/* Label Badge */}
                    <div className={cn(
                        "absolute top-8 left-8 rtl:left-auto rtl:right-8 px-5 py-2 text-[10px] font-black uppercase tracking-widest z-20",
                        s.badge,
                        customStyles.badge
                    )}>
                        <div className="flex items-center gap-2">
                            <Flame size={12} /> {data.label}
                        </div>
                    </div>

                    <img
                        src={data.image}
                        alt={data.title}
                        className={cn(
                            "w-4/5 h-4/5 object-contain transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6",
                            customStyles.productImg
                        )}
                    />

                    {/* Hidden Action Bar */}
                    <div className="absolute right-8 rtl:right-auto rtl:left-8 top-1/2 -translate-y-1/2 sm:flex flex-col gap-4 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        {[Heart, Eye, Share2].map((Icon, idx) => (
                            <button key={idx} className="w-12 h-12 flex items-center justify-center bg-white shadow-2xl rounded-full text-black hover:bg-[#C40000] hover:text-white transition-all transform hover:scale-110">
                                <Icon size={20} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* CONTENT SECTION */}
                <div className={cn("lg:w-[55%] p-6 sm:p-10 lg:p-20 flex flex-col justify-center text-foreground rtl:text-right", customStyles.textSection)}>
                    <div className="flex items-center gap-3 mb-6">
                        <Crown className={s.icon} size={18} />
                        <span className="text-[11px] font-black tracking-[0.5em] uppercase opacity-40">{data.brand}</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 sm:mb-8 leading-[0.95] sm:leading-[0.85] text-balance rtl:text-right">
                        {data.title.split(' ').slice(0, -1).join(' ')} <br />
                        <span className={s.icon}>{data.title.split(' ').pop()}</span>
                    </h1>

                    <div className="flex items-baseline gap-4 sm:gap-5 mb-8 sm:mb-10">
                        <span className={cn("text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter", s.icon, customStyles.priceText)}>{data.price}</span>
                        <span className="text-lg sm:text-2xl line-through opacity-20 font-bold">{data.oldPrice}</span>
                        <div className="bg-green-500 text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-tighter self-center ml-2 rtl:ml-0 rtl:mr-2">
                            Save 25%
                        </div>
                    </div>

                    {/* Dynamic Specs Grid */}
                    <div className="grid grid-cols-2 gap-8 mb-12 border-y border-neutral-100 dark:border-white/5 py-10">
                        <div className="flex items-center gap-4">
                            <div className={cn("w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/5", s.icon)}>
                                <Truck size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-40">Shipment</p>
                                <p className="text-sm font-black italic">Free Global</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className={cn("w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/5", s.icon)}>
                                <Shield size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-40">Warranty</p>
                                <p className="text-sm font-black italic">Life-Time Pro</p>
                            </div>
                        </div>
                    </div>

                    {/* Final Actions */}
                    <div className="flex flex-wrap items-center gap-8">
                        <Button className={cn(
                            "px-10 sm:px-14 py-6 sm:py-9 text-base font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 group/btn",
                            s.btn,
                            customStyles.mainButton
                        )}>
                            Grab Now <ShoppingBag className="ml-3 rtl:ml-0 rtl:mr-3 transition-transform group-hover/btn:translate-y-[-2px]" size={22} />
                        </Button>

                        <div className="flex items-center gap-5 pl-8 rtl:pl-0 rtl:pr-8 border-l-2 rtl:border-l-0 rtl:border-r-2 border-neutral-100 dark:border-white/10">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-neutral-200 overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/100?u=${i + version}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <div className="leading-none">
                                <p className="text-[11px] font-black uppercase tracking-tighter mb-1">Top Rated</p>
                                <div className="flex text-yellow-500 gap-0.5">
                                    {Array(5).fill(0).map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
