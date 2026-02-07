"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, Box, Users, BarChart2, ArrowUpRight, Clock, User, Tag } from 'lucide-react';
import { StatCard, WhiteCard } from '@/components/admin/ui/cards';
import { getOrders } from '@/services/orders.service';
import { getDashboardStatistics } from '@/services/admin.service';
 
import { useTranslations, useLocale } from 'next-intl';
import { formatCurrency } from '@/utils/utils';

export default function AdminDashboard() {
  const [latestOrders, setLatestOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<{ totalOrders: number; totalProducts: number; totalUsers: number } | null>(null);
  
  const t = useTranslations('AdminDashboard');
  const locale = useLocale() as "en" | "ar";

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, statsRes] = await Promise.all([
          getOrders(),
          getDashboardStatistics()
        ]);

        if (ordersRes.data && Array.isArray(ordersRes.data)) {
           setLatestOrders(ordersRes.data.slice(0, 5));
        }
        
        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-foreground">{t('greeting')}</h1>
        <p className="text-gray-500 dark:text-muted-foreground mt-1">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* <StatCard label={t('stats.totalRevenue')} value={formatCurrency(0, locale)} icon={DollarSign} color="bg-gradient-to-br from-green-500 to-green-600" trend="-" /> */}
        <StatCard label={t('stats.subscriptions')} value={stats?.totalUsers?.toString() || "0"} icon={Users} color="bg-gradient-to-br from-blue-500 to-blue-600" trend="Total Users" />
        <StatCard label={t('stats.sales')} value={stats?.totalOrders?.toString() || "0"} icon={ShoppingCart} color="bg-gradient-to-br from-orange-500 to-orange-600" trend="Total Orders" />
        <StatCard label={t('stats.products')} value={stats?.totalProducts?.toString() || "0"} icon={Box} color="bg-gradient-to-br from-purple-500 to-purple-600" trend="Active Products" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          <WhiteCard title={t('latestOrdersTitle')} viewAllHref="/admin/orders">
            <div className="divide-y divide-gray-100 dark:divide-border">
              {latestOrders.length === 0 ? (
                <div className="p-6 text-center text-gray-400 dark:text-muted-foreground">{t('latestOrdersEmpty')}</div>
              ) : (
                latestOrders.map((order) => (
                  <div key={order._id || order.orderId} className="flex items-center justify-between p-4 hover:bg-gray-50/50 dark:hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                        {order.customer?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-foreground">{order.customer?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-muted-foreground">{order.customer?.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 dark:text-foreground">{formatCurrency(Number(order.totalAmount || 0), locale)}</p>
                      <p className="text-xs text-gray-500 dark:text-muted-foreground">{new Date(order.createdAt || order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </WhiteCard>
        </div>

        <div>
          <WhiteCard title={t('recentActivityTitle')}>
            <div className="space-y-6">
              {latestOrders.length > 0 ? (
                <ActivityItem icon={ShoppingCart} color="green" text={<><strong>New Order #...{String(latestOrders[0]?._id ?? latestOrders[0]?.orderId ?? '').slice(-4)}</strong> for {Number(latestOrders[0]?.totalAmount || 0).toFixed(2)}</>} time="5m ago" />
              ) : (
                <ActivityItem icon={ShoppingCart} color="green" text={<>No recent orders</>} time="-" />
              )}
              <ActivityItem icon={User} color="blue" text={<><strong>New customer</strong> signed up: user@example.com</>} time="1h ago" />
              <ActivityItem icon={Tag} color="orange" text={<><strong>Product updated:</strong> "Wireless Headphones"</>} time="3h ago" />
              {latestOrders.length > 1 ? (
                <ActivityItem icon={ShoppingCart} color="green" text={<><strong>New Order #...{String(latestOrders[1]?._id ?? latestOrders[1]?.orderId ?? '').slice(-4)}</strong> for {Number(latestOrders[1]?.totalAmount || 0).toFixed(2)}</>} time="5h ago" />
              ) : (
                <ActivityItem icon={ShoppingCart} color="green" text={<>No additional orders</>} time="-" />
              )}
            </div>
          </WhiteCard>
          {/* Payment Methods section removed */}
        </div>
      </div>
    </div>
  );
}

function ActivityItem({
  icon: Icon,
  color,
  text,
  time,
}: {
  icon: React.ComponentType<any>;
  color: "green" | "blue" | "orange";
  text: React.ReactNode;
  time: string;
}) {
  const colors = {
    green: "bg-green-100 dark:bg-green-600/20 text-green-600 dark:text-green-400",
    blue: "bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400",
    orange: "bg-orange-100 dark:bg-orange-600/20 text-orange-600 dark:text-orange-400",
  };
  return (
    <div className="flex items-start gap-4">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${colors[color]}`}>
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-700 dark:text-foreground">{text}</div>
        <div className="text-xs text-gray-400 dark:text-muted-foreground mt-1 flex items-center gap-1.5">
          <Clock size={12} /> {time}
        </div>
      </div>
    </div>
  );
}
