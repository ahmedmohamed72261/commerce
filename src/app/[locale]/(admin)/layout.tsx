"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/Header';
import { cn } from '@/utils/utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';

  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem("adminSidebarOpen");
      if (saved) setSidebarOpen(saved === "true");
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      sessionStorage.setItem("adminSidebarOpen", String(sidebarOpen));
    } catch {}
  }, [sidebarOpen]);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className={cn(
          'flex min-h-screen bg-background text-foreground font-sans antialiased'
        )}
      >
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div
          className={cn(
            'flex-1 flex flex-col overflow-auto min-h-0 transition-all duration-300',
            // sidebar offset
            isRTL ? 'md:mr-64' : 'md:ml-64'
          )}
        >
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1  p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
