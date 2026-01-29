"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/auth';
import { 
  LayoutDashboard, ShoppingBag, BarChart3, Zap, Ticket, 
  FileText, Menu as MenuIcon, Edit3, ImageIcon, 
  Users, Globe, Palette, Settings, ChevronDown, LogOut ,BadgeCheck ,Image ,Tags 
} from 'lucide-react';

export function AdminSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('AdminSidebar');
  const [expandedMenus, setExpandedMenus] = useState(['Products', 'Appearance']);
  const { user } = useAuthStore();
  const isAdmin = !!user && (
    // ((user as any).role === 'admin') ||
    ((user as any).role === 'superAdmin') ||
    ((user as any).role === 'super_admin') ||
    ((user as any).isAdmin === true)
  );
  const tAdminControl = useTranslations('AdminControl');

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]);
  };

  const normalizedPathname = pathname.replace(/^\/[a-z]{2}/, "") || "/";
  const isActive = (path: string) => normalizedPathname === path;
  const isParentActive = (paths: string[]) => paths.some(p => normalizedPathname.startsWith(p));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 z-50 w-64 bg-white dark:bg-card text-slate-600 dark:text-foreground flex flex-col h-full border-r border-slate-200 dark:border-border transition-transform duration-300 ease-in-out
        ${isRTL ? 'right-0' : 'left-0'}
        ${isOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')}
        md:translate-x-0
      `}>
        {/* Header / Logo Section */}
        <div className="h-16 flex items-center px-6 bg-white dark:bg-card border-b border-slate-100 dark:border-border shrink-0">
          <div className="flex items-center gap-3">
            <img src="/images/logo-light.png" alt="Logo" className="h-8 w-auto object-contain hidden dark:block" />
            <img src="/images/logo-dark.png" alt="Logo" className="h-8 w-auto object-contain dark:hidden" />
            <span className="text-slate-900 dark:text-foreground font-extrabold text-xl tracking-tight">
              {t('shopName')}
            </span>
          </div>
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="md:hidden ml-auto text-slate-400 hover:text-red-600 dark:text-muted-foreground dark:hover:text-primary"
          >
             {isRTL ? <ChevronDown className="rotate-90" /> : <ChevronDown className="-rotate-90" />}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          <SidebarLink href={`/${locale}/admin`} icon={LayoutDashboard} label={t('dashboard')} active={isActive('/admin')} onClose={onClose} />
          
          <SidebarGroupTitle label={t('shopManagement')} />
          <SidebarDropdown 
            icon={ShoppingBag} 
            label={t('products')} 
            isOpen={expandedMenus.includes('Products')} 
            active={isParentActive(['/admin/products', '/admin/categories', '/admin/brands'])}
            onClick={() => toggleMenu('Products')}
          >
            <SidebarSubItem href={`/${locale}/admin/products/create`} label={t('createProduct')} active={isActive('/admin/products/create')} onClose={onClose} />
            <SidebarSubItem href={`/${locale}/admin/products`} label={t('allProducts')} active={isActive('/admin/products')} onClose={onClose} />
          </SidebarDropdown>
          <SidebarLink href={`/${locale}/admin/categories`} icon={Tags} label={t('categories')} active={isActive('/admin/categories')} onClose={onClose} />
          <SidebarLink href={`/${locale}/admin/brands`} icon={Image} label={t('brands')} active={isActive('/admin/brands')} onClose={onClose} />
          <SidebarLink href={`/${locale}/admin/orders`} icon={BarChart3} label={t('orders')} active={isActive('/admin/orders')} onClose={onClose} />
          {/* <SidebarLink href="/admin/flash-sales" icon={Zap} label={t('flashSales')} active={isActive('/admin/flash-sales')} /> */}
          {/* <SidebarLink href="/admin/coupons" icon={Ticket} label={t('coupons')} active={isActive('/admin/coupons')} /> */}
          
          <SidebarGroupTitle label={t('system')} />
          <SidebarLink href={`/${locale}/admin/users`} icon={Users} label={t('users')} active={isActive('/admin/users')} onClose={onClose} />
          <SidebarLink href={`/${locale}/admin/payment-methods`} icon={Settings} label={t('paymentMethods') || 'Payment Methods'} active={isActive('/admin/payment-methods')} onClose={onClose} />
          <SidebarLink href={`/${locale}/admin/governorates`} icon={Globe} label={t('governorates') || 'Governorates'} active={isActive('/admin/governorates')} onClose={onClose} />
          <SidebarLink href={`/${locale}/admin/banners`} icon={Palette} label={t('banners')} active={isActive('/admin/banners')} onClose={onClose} />
          <SidebarLink href={`/${locale}/admin/quotations`} icon={Palette} label={t('quotations')} active={isActive('/admin/quotations')} onClose={onClose} />
          {isAdmin && (
            <SidebarLink href={`/${locale}/admin/admin-control`} icon={BadgeCheck} label={tAdminControl('title')} active={isActive('/admin/admin-control')} onClose={onClose} />
          )}
          <SidebarLink href={`/${locale}/admin/settings`} icon={Settings} label={t('settings')} active={isActive('/admin/settings')} onClose={onClose} />
        </nav>

        {/* Footer / Logout Section */}
        <div className="p-4 bg-slate-50 dark:bg-muted border-t border-slate-100 dark:border-border">
          <button className="flex items-center gap-3 text-slate-500 dark:text-slate-300 hover:text-red-600 dark:hover:text-primary transition-colors w-full px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut size={18} />
            <span className="text-sm font-semibold">{t('logout')}</span>
          </button>
        </div>
    </aside>
    </>
  );
}

function SidebarGroupTitle({ label }: { label: string }) {
  return <div className="px-4 mt-6 mb-2 text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-[0.1em]">{label}</div>;
}

function SidebarLink({ icon: Icon, label, active, href, onClose }: any) {
  return (
    <Link href={href} onClick={onClose}>
      <div className={`px-3 py-2.5 flex items-center gap-3 rounded-xl cursor-pointer transition-all duration-200 group ${
        active 
        ? 'bg-red-600 dark:bg-primary text-white shadow-lg shadow-red-100 dark:shadow-primary/20' 
        : 'text-slate-600 dark:text-foreground hover:text-red-600 dark:hover:text-primary hover:bg-red-50 dark:hover:bg-red-900/20'
      }`}>
        <Icon size={18} className={active ? 'text-white' : 'text-slate-400 dark:text-muted-foreground group-hover:text-red-600 dark:group-hover:text-primary'} />
        <span className="text-sm font-semibold flex-1">{label}</span>
      </div>
    </Link>
  );
}

function SidebarDropdown({ icon: Icon, label, isOpen, active, onClick, children }: any) {
  return (
    <div className="space-y-1">
      <div onClick={onClick} className={`px-3 py-2.5 flex items-center gap-3 rounded-xl cursor-pointer transition-all duration-200 group ${
        active && !isOpen ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-primary' : 'text-slate-600 dark:text-foreground hover:text-red-600 dark:hover:text-primary hover:bg-red-50 dark:hover:bg-red-900/20'
      }`}>
        <Icon size={18} className={active ? 'text-red-600 dark:text-primary' : 'text-slate-400 dark:text-muted-foreground group-hover:text-red-600 dark:group-hover:text-primary'} />
        <span className="text-sm font-semibold flex-1">{label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} opacity-50`} />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-red-100 dark:border-red-900/40 ml-5 my-1">
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarSubItem({ href, label, active, onClose }: any) {
  return (
    <Link href={href} onClick={onClose} className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
      active 
      ? 'text-red-600 dark:text-primary bg-red-50 dark:bg-red-900/20 font-bold' 
      : 'text-slate-500 dark:text-muted-foreground hover:text-red-600 dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-muted'
    }`}>
      {label}
    </Link>
  );
}
