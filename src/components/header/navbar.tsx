"use client";

import Link from "next/link";
import { ChevronDown, Menu, User, ShoppingCart, List } from "lucide-react";
import { SectionsDropdown } from "./sections-dropdown";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { useState } from "react";

export function NavBar({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="sticky top-0 z-30 bg-background px-4 py-2 sm:px-8 md:px-12 shadow-sm dark:bg-background dark:border-b dark:border-border">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <SectionsDropdown />
        <nav className="hidden items-center lg:flex">
          <ul className="flex items-center gap-5 text-sm font-semibold text-foreground xl:gap-8 dark:text-foreground">
            <li><Link href={`/${locale}`} className="p-2 hover:text-red-600">Home <span className="text-red-600">+</span></Link></li>
            <li><Link href={`/${locale}/about`} className="p-2 hover:text-red-600">About <span className="text-red-600">+</span></Link></li>
            <li><Link href={`/${locale}/pages`} className="p-2 hover:text-red-600">Pages <span className="text-red-600">+</span></Link></li>
            <li><Link href={`/${locale}/elements`} className="p-2 hover:text-red-600">Elements <span className="text-red-600">+</span></Link></li>
            <li><Link href={`/${locale}/news`} className="p-2 hover:text-red-600">News <span className="text-red-600">+</span></Link></li>
            <li><Link href={`/${locale}/contact`} className="p-2 hover:text-red-600">Contact</Link></li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link href={`/${locale}/login`} className="text-muted-foreground hover:text-red-600 dark:text-muted-foreground">Login</Link>
        </div>
      </div>
    </div>
  );
}
