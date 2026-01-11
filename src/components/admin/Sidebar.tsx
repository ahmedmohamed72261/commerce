"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, BarChart3, Zap, Ticket, 
  FileText, Menu as MenuIcon, Edit3, ImageIcon, 
  Users, Globe, Palette, Settings, ChevronDown, LogOut 
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState(['Products', 'Appearance']);

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]);
  };

  const isActive = (path: string) => pathname === path;
  const isParentActive = (paths: string[]) => paths.some(p => pathname.startsWith(p));

  return (
    <aside className="w-64 bg-white text-slate-600 flex flex-col fixed h-full z-30 border-r border-slate-200 transition-all duration-300">
        {/* Header / Logo Section */}
        <div className="h-16 flex items-center px-6 bg-white border-b border-slate-100">
          <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center shadow-md shadow-red-200">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <span className="text-slate-900 font-extrabold ml-3 text-xl tracking-tight">Fleet<span className="text-red-600">Cart</span></span>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          <SidebarLink href="/admin" icon={LayoutDashboard} label="Dashboard" active={isActive('/admin')} />
          
          <SidebarGroupTitle label="Shop Management" />
          <SidebarDropdown 
            icon={ShoppingBag} 
            label="Products" 
            isOpen={expandedMenus.includes('Products')} 
            active={isParentActive(['/admin/products', '/admin/categories', '/admin/brands'])}
            onClick={() => toggleMenu('Products')}
          >
            <SidebarSubItem href="/admin/products/create" label="Create Product" active={isActive('/admin/products/create')} />
            <SidebarSubItem href="/admin/products" label="All Products" active={isActive('/admin/products')} />
            <SidebarSubItem href="/admin/categories" label="Categories" active={isActive('/admin/categories')} />
            <SidebarSubItem href="/admin/brands" label="Brands" active={isActive('/admin/brands')} />
          </SidebarDropdown>

          <SidebarLink href="/admin/orders" icon={BarChart3} label="Orders" active={isActive('/admin/orders')} />
          <SidebarLink href="/admin/flash-sales" icon={Zap} label="Flash Sales" active={isActive('/admin/flash-sales')} />
          <SidebarLink href="/admin/coupons" icon={Ticket} label="Coupons" active={isActive('/admin/coupons')} />
          
          <SidebarGroupTitle label="Content" />
          <SidebarLink href="/admin/pages" icon={FileText} label="Pages" active={isActive('/admin/pages')} />
          <SidebarLink href="/admin/menus" icon={MenuIcon} label="Menus" active={isActive('/admin/menus')} />
          <SidebarLink href="/admin/blog" icon={Edit3} label="Blog" active={isActive('/admin/blog')} />
          <SidebarLink href="/admin/media" icon={ImageIcon} label="Media" active={isActive('/admin/media')} />

          <SidebarGroupTitle label="System" />
          <SidebarLink href="/admin/users" icon={Users} label="Users" active={isActive('/admin/users')} />
          <SidebarLink href="/admin/localization" icon={Globe} label="Localization" active={isActive('/admin/localization')} />
          <SidebarDropdown 
            icon={Palette} 
            label="Appearance" 
            isOpen={expandedMenus.includes('Appearance')} 
            active={isParentActive(['/admin/appearance'])}
            onClick={() => toggleMenu('Appearance')}
          >
            <SidebarSubItem href="/admin/appearance/sliders" label="Sliders" active={isActive('/admin/appearance/sliders')} />
            <SidebarSubItem href="/admin/appearance/storefront" label="Storefront" active={isActive('/admin/appearance/storefront')} />
          </SidebarDropdown>
          <SidebarLink href="/admin/settings" icon={Settings} label="Settings" active={isActive('/admin/settings')} />
        </nav>

        {/* Footer / Logout Section */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <button className="flex items-center gap-3 text-slate-500 hover:text-red-600 transition-colors w-full px-3 py-2 rounded-lg hover:bg-red-50">
            <LogOut size={18} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
    </aside>
  );
}

function SidebarGroupTitle({ label }: { label: string }) {
  return <div className="px-4 mt-6 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">{label}</div>;
}

function SidebarLink({ icon: Icon, label, active, href }: any) {
  return (
    <Link href={href}>
      <div className={`px-3 py-2.5 flex items-center gap-3 rounded-xl cursor-pointer transition-all duration-200 group ${
        active 
        ? 'bg-red-600 text-white shadow-lg shadow-red-100' 
        : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
      }`}>
        <Icon size={18} className={active ? 'text-white' : 'text-slate-400 group-hover:text-red-600'} />
        <span className="text-sm font-semibold flex-1">{label}</span>
      </div>
    </Link>
  );
}

function SidebarDropdown({ icon: Icon, label, isOpen, active, onClick, children }: any) {
  return (
    <div className="space-y-1">
      <div onClick={onClick} className={`px-3 py-2.5 flex items-center gap-3 rounded-xl cursor-pointer transition-all duration-200 group ${
        active && !isOpen ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
      }`}>
        <Icon size={18} className={active ? 'text-red-600' : 'text-slate-400 group-hover:text-red-600'} />
        <span className="text-sm font-semibold flex-1">{label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} opacity-50`} />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-red-100 ml-5 my-1">
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarSubItem({ href, label, active }: any) {
  return (
    <Link href={href} className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
      active 
      ? 'text-red-600 bg-red-50 font-bold' 
      : 'text-slate-500 hover:text-red-600 hover:bg-slate-50'
    }`}>
      {label}
    </Link>
  );
}