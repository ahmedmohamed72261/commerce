"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-[#f1f4f9] text-[#4b515b] font-sans antialiased">
        <AdminSidebar />
        <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
          <AdminHeader />
          <main className="p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
