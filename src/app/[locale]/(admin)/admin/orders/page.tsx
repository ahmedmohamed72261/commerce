"use client";
import React, { useEffect, useState } from 'react';
import { WhiteCard } from '@/components/admin/ui/cards';
import { getOrders, cancelOrder } from '@/services/orders.service';
import { updateOrderStatus, bulkUpdateOrdersStatus } from '@/services/admin-orders.service';
import { Search, Filter, Eye, CheckCircle, XCircle, AlertCircle, Clock, Package } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/utils/utils';
import { toast } from 'sonner';
import { formatCurrency } from '@/utils/utils';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations('AdminOrders');
  const tTable = useTranslations('AdminTable');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  }

  const refresh = fetchData;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900';
      case 'processing':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-900';
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-muted/50 dark:text-muted-foreground border border-gray-200 dark:border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return <CheckCircle size={14} className="mr-1" />;
      case 'pending':
        return <Clock size={14} className="mr-1" />;
      case 'processing':
        return <Package size={14} className="mr-1" />;
      case 'cancelled':
        return <XCircle size={14} className="mr-1" />;
      default:
        return <AlertCircle size={14} className="mr-1" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{t('title')}</h1>
          <p className="text-sm text-gray-500 dark:text-muted-foreground mt-1">{t('subtitle')}</p>
        </div>
      </div>

       <WhiteCard noPadding headerAction={
         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
           <div className="relative flex-1 sm:flex-initial">
             <input 
               type="text" 
               placeholder={t('searchPlaceholder')} 
               className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-muted/50 border border-gray-200 dark:border-border rounded-lg focus:bg-white dark:focus:bg-card focus:border-red-500 dark:focus:border-primary focus:ring-2 focus:ring-red-100 dark:focus:ring-primary/20 outline-none transition-all text-gray-800 dark:text-foreground placeholder:text-gray-400 dark:placeholder:text-muted-foreground" 
             />
             <Search size={18} className="absolute left-3 top-2.5 text-gray-400 dark:text-muted-foreground" />
           </div>
           <button className="px-3 py-2 border border-gray-200 dark:border-border rounded-lg text-gray-600 dark:text-muted-foreground hover:bg-gray-50 dark:hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm font-medium">
             <Filter size={16} /> <span>{t('filter')}</span>
           </button>
         </div>
       }>
         <div className="overflow-x-auto">
           <table className="w-full text-center text-sm text-gray-600 dark:text-muted-foreground">
             <thead className="bg-gray-50/50 dark:bg-muted/50 border-b border-gray-100 dark:border-border">
               <tr>
                 <th className="px-6 py-4 w-10">
                   <div className="flex items-center">
                     <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-border text-red-600 focus:ring-red-500 bg-white dark:bg-card" />
                   </div>
                 </th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-foreground text-xs uppercase tracking-wider">{tTable('orderId')}</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-foreground text-xs uppercase tracking-wider">{tTable('date')}</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-foreground text-xs uppercase tracking-wider">{tTable('customer')}</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-foreground text-xs uppercase tracking-wider">{tTable('status')}</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-foreground text-xs uppercase tracking-wider">{tTable('total')}</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-foreground text-xs uppercase tracking-wider text-right">{tTable('actions')}</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">{t('loading')}</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">{t('empty')}</td></tr>
               ) : (
                 orders.map((order: any) => (
                   <tr key={order.orderId || order._id} className="group hover:bg-gray-50 dark:hover:bg-muted/30 transition-colors">
                     <td className="px-6 py-4">
                       <div className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-border text-red-600 focus:ring-red-500 bg-white dark:bg-card" />
                      </div>
                     </td>
                     <td className="px-6 py-4">
                       <span className="font-medium text-gray-900 dark:text-foreground font-mono">
                         #{(order.orderId || order._id || '').toString().substring(0, 8)}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-xs">
                       {(order.date || order.createdAt) ? new Date(order.date || order.createdAt).toLocaleDateString() : 'N/A'}
                       <div className="text-[10px] text-gray-400">
                         {(order.date || order.createdAt) ? new Date(order.date || order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                           {(order.customer?.name || 'U').charAt(0)}
                         </div>
                         <div>
                           <div className="font-medium text-gray-900 dark:text-foreground text-sm">{order.customer?.name || 'Guest User'}</div>
                           <div className="text-xs text-gray-400">{order.customer?.email}</div>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       <span className={cn(
                         "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                         getStatusColor(order.status || 'pending')
                       )}>
                         {getStatusIcon(order.status || 'pending')}
                         {order.status || 'Pending'}
                       </span>
                     </td>
                     <td className="px-6 py-4 font-semibold text-gray-900 dark:text-foreground">
                       {formatCurrency(Number(order.totalAmount || 0), locale)}
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex items-center justify-center gap-2">
                         <Link 
                           href={`/${locale}/admin/orders/${order._id || order.orderId}`}
                           className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                           title={t('viewOrder')}
                         >
                           <Eye size={18} />
                         </Link>
                         
                         {order.status !== 'delivered' && order.status !== 'completed' && order.status !== 'cancelled' && (
                           <button
                             className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                             title={t('markDelivered')}
                             onClick={async () => {
                               const id = (order._id || order.orderId || '').toString();
                               if (!id) return;
                               try {
                                 await updateOrderStatus(id, 'delivered');
                                 toast.success(t('deliveredSuccess'))
                                 await refresh();
                               } catch {
                                 toast.error(t('updateFailed'))
                               }
                             }}
                           >
                             <CheckCircle size={18} />
                           </button>
                         )}

                         {order.status !== 'cancelled' && order.status !== 'delivered' && order.status !== 'completed' && (
                           <button
                             className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                             title={t('cancelOrder')}
                             onClick={async () => {
                               const id = (order._id || order.orderId || '').toString();
                               if (!id) return;
                               if (confirm(t('confirmCancel'))) {
                                 try {
                                   await cancelOrder(id);
                                   toast.success(t('cancelSuccess'))
                                  await refresh();
                                 } catch (error) {
                                   toast.error(t('cancelFailed'))
                                 }
                               }
                             }}
                           >
                             <XCircle size={18} />
                           </button>
                         )}
                       </div>
                     </td>
                   </tr>
                 ))
               )}
             </tbody>
           </table>
         </div>
         
         {/* Pagination (Static for now, can be connected to API) */}
         {orders.length > 0 && (
           <div className="px-6 py-4 border-t border-gray-100 dark:border-border flex items-center justify-between">
             <div className="text-xs text-gray-500 dark:text-muted-foreground">
               Showing <span className="font-medium text-gray-900 dark:text-foreground">1</span> to <span className="font-medium text-gray-900 dark:text-foreground">{orders.length}</span> of <span className="font-medium text-gray-900 dark:text-foreground">{orders.length}</span> results
             </div>
             <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 dark:border-border rounded text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-muted disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-gray-200 dark:border-border rounded text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-muted disabled:opacity-50" disabled>Next</button>
            </div>
           </div>
         )}
       </WhiteCard>
    </div>
  );
}
