"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TopBar } from "@/components/header/top-bar";
import { CarneshopNav } from "@/components/header/carneshop-nav";

export function Header() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Sticky Header */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled ? "bg-background/95 backdrop-blur shadow-md dark:bg-background/95" : "bg-transparent"}
        `}
      >
        {/* TopBar (hide on scroll) */}
        <div
          className={`
            overflow-hidden transition-all duration-300
            ${scrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"}
          `}
        >
          <TopBar />
        </div>

        {/* Combined Nav (always visible) */}
        <CarneshopNav locale={locale} />
      </header>

      {/* Spacer for content (dynamic) */}
      <div className="h-8" />
    </>
  );
}
