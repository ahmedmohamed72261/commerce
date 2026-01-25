"use client";

import React from "react";

const GeneralLoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* 1. THE LOGO: "The Focus Reveal" 
          Animation: Starts blurred and small, then comes into focus */}
      <div className="relative mb-14 animate-[focus-in_1.2s_ease-out_forwards]">
        <img 
          src="/images/logo-light.png" 
          alt="Logo" 
          className="w-12 h-12 object-contain brightness-110" 
        />
        {/* Ambient glow that breathes behind the logo */}
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full -z-10 animate-pulse" />
      </div>

      {/* 2. THE CONTENT: "The Staggered Lift" */}
      <div className="flex flex-col items-center">
        
        {/* Title: Slides up slightly from a hidden mask */}
        <div className="overflow-hidden mb-12">
          <h1 className="text-[11px] font-bold tracking-[0.8em] uppercase text-white/60 translate-x-[0.4em] animate-[slide-up_1s_ease-out_0.2s_both]">
            Commerce
          </h1>
        </div>

        {/* The Loader: "The Fluid Thread"
            Animation: Expands and contracts while moving */}
        <div className="w-40 h-[1px] bg-white/[0.05] relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/40 animate-[fluid-stretch_2s_infinite_ease-in-out]" />
        </div>

        {/* Subtext: Fades in last */}
        <div className="mt-8 animate-[fade-in_1.5s_ease-out_0.5s_both]">
          <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.4em]">
            Initializing_Core
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeneralLoadingScreen;