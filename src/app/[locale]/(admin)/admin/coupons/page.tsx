"use client";
import React, { useEffect, useState } from 'react';
import { WhiteCard } from '@/components/admin/ui/cards';
import { getAllCoupons, createCoupon, updateCoupon, deleteCoupon, Coupon, CreateCouponDTO } from '@/services/coupons.service';
import { Plus, Search, Ticket, Pencil, Trash2, Calendar, DollarSign, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminModal } from '@/components/admin/ui/AdminModal';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency, cn } from '@/utils/utils';
import { format } from 'date-fns';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useIsRTL } from '@/utils/rtl';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<CreateCouponDTO>>({
    code: '',
    value: 0,
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    usageLimit: 0,
    expiresAt: ''
  });

  const t = useTranslations('AdminCoupons');
  const locale = useLocale() as "en" | "ar";
  const isRTL = useIsRTL();

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const data = await getAllCoupons();
      setCoupons(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      toast.error('Failed to fetch coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleOpenCreate = () => {
    setEditingCoupon(null);
    setFormData({
      code: '',
      value: 0,
      minOrderAmount: 0,
      maxDiscountAmount: 0,
      usageLimit: 100,
      expiresAt: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd')
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      value: coupon.value,
      minOrderAmount: coupon.minOrderAmount,
      maxDiscountAmount: coupon.maxDiscountAmount,
      usageLimit: coupon.usageLimit,
      expiresAt: coupon.expiresAt ? format(new Date(coupon.expiresAt), 'yyyy-MM-dd') : ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.code || !formData.expiresAt) {
        toast.error('Please fill in required fields');
        return;
      }

      const payload: CreateCouponDTO = {
        code: formData.code,
        value: Number(formData.value),
        minOrderAmount: Number(formData.minOrderAmount),
        maxDiscountAmount: Number(formData.maxDiscountAmount),
        usageLimit: Number(formData.usageLimit),
        expiresAt: formData.expiresAt
      };

      if (editingCoupon) {
        await updateCoupon(editingCoupon._id, payload);
        toast.success('Coupon updated successfully');
      } else {
        await createCoupon(payload);
        toast.success('Coupon created successfully');
      }
      setModalOpen(false);
      fetchCoupons();
    } catch (error) {
      toast.error(editingCoupon ? 'Failed to update coupon' : 'Failed to create coupon');
    }
  };

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <Button onClick={handleOpenCreate} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
          {t('addNew')}
        </Button>
      </div>

      <WhiteCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-base sm:text-xl text-left rtl:text-right">
            <thead className="bg-gray-50/50 dark:bg-card/50 text-muted-foreground font-medium">
              <tr>
                <th className="px-6 py-4">{t('code')}</th>
                <th className="px-6 py-4">{t('discount')}</th>
                <th className="px-6 py-4">{t('usage')}</th>
                <th className="px-6 py-4">{t('expiry')}</th>
                <th className="px-6 py-4">{t('status')}</th>
                <th className="px-6 py-4 text-right rtl:text-left">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-border">
              {filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    {t('empty')}
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50/50 dark:hover:bg-card/50 transition-colors">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                          <Ticket className="w-4 h-4" />
                        </div>
                        {coupon.code}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {coupon.value}% {locale === 'ar' ? 'خصم' : 'OFF'}
                      {coupon.maxDiscountAmount ? ` (${locale === 'ar' ? 'الحد الأقصى' : 'Max'} ${coupon.maxDiscountAmount})` : ''}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[80px] h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${Math.min((coupon.usedCount / (coupon.usageLimit || 1)) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {coupon.usedCount} / {coupon.usageLimit || '∞'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(coupon.expiresAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        coupon.isActive 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      )}>
                        {coupon.isActive ? t('active') : t('inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500" onClick={() => handleOpenEdit(coupon)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(coupon._id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </WhiteCard>

      <AdminModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editingCoupon ? t('editTitle') : t('createTitle')}
        className="max-w-md h-auto"
        footer={
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-border">
            <Button variant="outline" onClick={() => setModalOpen(false)}>{t('cancel')}</Button>
            <Button onClick={handleSubmit}>{editingCoupon ? t('update') : t('create')}</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('couponCode')}</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                className="pl-9"
                placeholder="e.g. SUMMER2024"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('discountValue')}</Label>
              <div className="relative">
                <Input 
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: Number(e.target.value)})}
                  min={0}
                  max={100}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('usageLimit')}</Label>
              <Input 
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({...formData, usageLimit: Number(e.target.value)})}
                min={0}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('minOrderAmount')}</Label>
              <Input 
                type="number"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({...formData, minOrderAmount: Number(e.target.value)})}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('maxDiscount')}</Label>
              <Input 
                type="number"
                value={formData.maxDiscountAmount}
                onChange={(e) => setFormData({...formData, maxDiscountAmount: Number(e.target.value)})}
                min={0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('expiryDate')}</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({...formData, expiresAt: e.target.value})}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </AdminModal>
      
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={t('deleteConfirm')}
        description=""
        confirmText={t('deleteConfirm')}
        cancelText={t('cancel')}
        onConfirm={async () => {
          if (!deleteId) return;
          try {
            await deleteCoupon(deleteId);
            toast.success(locale === 'ar' ? 'تم حذف الكوبون' : 'Coupon deleted successfully');
            fetchCoupons();
          } catch {
            toast.error(locale === 'ar' ? 'فشل حذف الكوبون' : 'Failed to delete coupon');
          } finally {
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
