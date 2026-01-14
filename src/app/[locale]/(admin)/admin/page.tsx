"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, Box, Users, BarChart2, ArrowUpRight, Clock, User, Tag } from 'lucide-react';
import { StatCard, WhiteCard } from '@/components/admin/ui/cards';
import { getOrders } from '@/services/orders.service';
import { getAllPaymentMethods, createPaymentMethod, togglePaymentMethod } from '@/services/payment-methods.service';

export default function AdminDashboard() {
  const [latestOrders, setLatestOrders] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [pmForm, setPmForm] = useState<{ nameEn: string; nameAr: string; instructionsEn: string; instructionsAr: string; icon?: File | null }>({
    nameEn: "",
    nameAr: "",
    instructionsEn: "",
    instructionsAr: "",
    icon: null,
  });

  useEffect(() => {
    async function fetchLatest() {
      try {
        const response = await getOrders();
        if (response.data && Array.isArray(response.data)) {
           setLatestOrders(response.data.slice(0, 5));
        }
        const pm = await getAllPaymentMethods();
        const data = Array.isArray(pm?.data) ? pm.data : Array.isArray(pm) ? pm : [];
        setPaymentMethods(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchLatest();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">Good morning, Admin!</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Revenue" value="$45,231.89" icon={DollarSign} color="bg-gradient-to-br from-green-500 to-green-600" trend="+20.1% from last month" />
        <StatCard label="Subscriptions" value="+2350" icon={Users} color="bg-gradient-to-br from-blue-500 to-blue-600" trend="+180.1% from last month" />
        <StatCard label="Sales" value="+12,234" icon={ShoppingCart} color="bg-gradient-to-br from-orange-500 to-orange-600" trend="+19% from last month" />
        <StatCard label="Active Now" value="+573" icon={BarChart2} color="bg-gradient-to-br from-purple-500 to-purple-600" trend="+201 since last hour" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Latest Orders */}
        <div className="lg:col-span-2">
          <WhiteCard title="Latest Orders" viewAllHref="/admin/orders">
            <div className="divide-y divide-gray-100">
              {latestOrders.length === 0 ? (
                <div className="p-6 text-center text-gray-400">No orders to display.</div>
              ) : (
                latestOrders.map((order) => (
                  <div key={order._id || order.orderId} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {order.customer?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{order.customer?.name}</p>
                        <p className="text-xs text-gray-500">{order.customer?.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">${Number(order.totalAmount).toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt || order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </WhiteCard>
        </div>

        {/* Right Column: Recent Activity */}
        <div>
          <WhiteCard title="Recent Activity">
            <div className="space-y-6">
              {latestOrders.length > 0 ? (
                <ActivityItem icon={ShoppingCart} color="green" text={<><strong>New Order #...{String(latestOrders[0]?._id ?? latestOrders[0]?.orderId ?? '').slice(-4)}</strong> for ${Number(latestOrders[0]?.totalAmount || 0).toFixed(2)}</>} time="5m ago" />
              ) : (
                <ActivityItem icon={ShoppingCart} color="green" text={<>No recent orders</>} time="-" />
              )}
              <ActivityItem icon={User} color="blue" text={<><strong>New customer</strong> signed up: user@example.com</>} time="1h ago" />
              <ActivityItem icon={Tag} color="orange" text={<><strong>Product updated:</strong> "Wireless Headphones"</>} time="3h ago" />
              {latestOrders.length > 1 ? (
                <ActivityItem icon={ShoppingCart} color="green" text={<><strong>New Order #...{String(latestOrders[1]?._id ?? latestOrders[1]?.orderId ?? '').slice(-4)}</strong> for ${Number(latestOrders[1]?.totalAmount || 0).toFixed(2)}</>} time="5h ago" />
              ) : (
                <ActivityItem icon={ShoppingCart} color="green" text={<>No additional orders</>} time="-" />
              )}
            </div>
          </WhiteCard>
          <WhiteCard title="Payment Methods">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="border border-gray-200 rounded px-3 h-10 text-sm" placeholder="Name (EN)" value={pmForm.nameEn} onChange={(e) => setPmForm((p) => ({ ...p, nameEn: e.target.value }))} />
                <input className="border border-gray-200 rounded px-3 h-10 text-sm" placeholder="Name (AR)" value={pmForm.nameAr} onChange={(e) => setPmForm((p) => ({ ...p, nameAr: e.target.value }))} />
                <input className="border border-gray-200 rounded px-3 h-10 text-sm md:col-span-2" placeholder="Instructions (EN)" value={pmForm.instructionsEn} onChange={(e) => setPmForm((p) => ({ ...p, instructionsEn: e.target.value }))} />
                <input className="border border-gray-200 rounded px-3 h-10 text-sm md:col-span-2" placeholder="Instructions (AR)" value={pmForm.instructionsAr} onChange={(e) => setPmForm((p) => ({ ...p, instructionsAr: e.target.value }))} />
                <input type="file" accept="image/*" className="md:col-span-2" onChange={(e) => setPmForm((p) => ({ ...p, icon: e.target.files?.[0] || null }))} />
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                onClick={async () => {
                  const fd = new FormData();
                  if (pmForm.icon) fd.append("icon", pmForm.icon);
                  fd.append("name", JSON.stringify({ en: pmForm.nameEn, ar: pmForm.nameAr }));
                  fd.append("instructions", JSON.stringify({ en: pmForm.instructionsEn, ar: pmForm.instructionsAr }));
                  await createPaymentMethod(fd);
                  const pm = await getAllPaymentMethods();
                  const data = Array.isArray(pm?.data) ? pm.data : Array.isArray(pm) ? pm : [];
                  setPaymentMethods(data);
                  setPmForm({ nameEn: "", nameAr: "", instructionsEn: "", instructionsAr: "", icon: null });
                }}
              >
                Create Payment Method
              </button>
              <div className="divide-y divide-gray-100">
                {paymentMethods.map((pm) => (
                  <div key={pm._id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      {pm.icon && <img src={pm.icon} className="h-6 w-6 object-contain" alt={pm.name} />}
                      <div>
                        <div className="font-semibold text-gray-800">{pm.name}</div>
                        <div className="text-xs text-gray-500">{pm.instructions?.en}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${pm.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{pm.isActive ? 'Active' : 'Disabled'}</span>
                      <button
                        className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50"
                        onClick={async () => {
                          await togglePaymentMethod(pm._id, !pm.isActive);
                          const refreshed = await getAllPaymentMethods();
                          const data = Array.isArray(refreshed?.data) ? refreshed.data : Array.isArray(refreshed) ? refreshed : [];
                          setPaymentMethods(data);
                        }}
                      >
                        {pm.isActive ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WhiteCard>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, color, text, time }: any) {
  const colors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
  };
  return (
    <div className="flex items-start gap-4">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${colors[color]}`}>
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-700">{text}</div>
        <div className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
          <Clock size={12} /> {time}
        </div>
      </div>
    </div>
  );
}
