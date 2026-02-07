"use client";
import React, { useEffect, useState } from "react";
import { WhiteCard } from "@/components/admin/ui/cards";
import { useContactsStore } from "@/store/contacts";
import { Trash2, Search, Loader2, Eye } from "lucide-react";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { Contact } from "@/types/contact";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function ContactsPage() {
  const locale = useLocale() as "en" | "ar";
  const isRTL = locale === "ar";
  const { contacts, loading, fetchContacts, deleteContact, pagination } = useContactsStore();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts(1);
  }, []);

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const openView = (contact: Contact) => {
    setSelectedContact(contact);
    setViewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">
          {isRTL ? "رسائل الاتصال" : "Contact Messages"}
        </h1>
      </div>

      <WhiteCard noPadding>
        {loading && contacts.length === 0 ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center text-sm text-gray-600 dark:text-muted-foreground">
              <thead className="bg-gray-50 dark:bg-muted/50 text-black dark:text-foreground font-semibold uppercase text-base sm:text-lg">
                <tr>
                  <th className="px-5 py-3 text-center rtl:text-center">{isRTL ? "الاسم" : "Name"}</th>
                  <th className="px-5 py-3 text-center rtl:text-center">{isRTL ? "البريد الإلكتروني" : "Email"}</th>
                  <th className="px-5 py-3 text-center rtl:text-center">{isRTL ? "الهاتف" : "Phone"}</th>
                  <th className="px-5 py-3 text-center rtl:text-center">{isRTL ? "الغرض" : "Purpose"}</th>
                  <th className="px-5 py-3">{isRTL ? "التاريخ" : "Date"}</th>
                  <th className="px-5 py-3">{isRTL ? "الإجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-border text-base sm:text-lg">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-800 dark:text-foreground text-center rtl:text-center">
                      {contact.name}
                    </td>
                    <td className="px-5 py-4 text-center rtl:text-center">{contact.email}</td>
                    <td className="px-5 py-4 text-center rtl:text-center">{contact.phone}</td>
                    <td className="px-5 py-4 max-w-xs truncate text-center rtl:text-center" title={contact.purpose}>
                      {contact.purpose}
                    </td>
                    <td className="px-5 py-4">
                      {new Date(contact.createdAt).toLocaleDateString(locale)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openView(contact)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title={isRTL ? "عرض" : "View"}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title={isRTL ? "حذف" : "Delete"}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      {isRTL ? "لا توجد رسائل" : "No messages found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-gray-100 dark:border-border flex justify-center gap-2">
            <button
              disabled={pagination.page === 1}
              onClick={() => fetchContacts(pagination.page - 1)}
              className="px-3 py-1 rounded bg-gray-100 dark:bg-muted disabled:opacity-50"
            >
              {isRTL ? "السابق" : "Prev"}
            </button>
            <span className="px-3 py-1 text-sm flex items-center">
              {pagination.page} / {pagination.pages}
            </span>
            <button
              disabled={pagination.page === pagination.pages}
              onClick={() => fetchContacts(pagination.page + 1)}
              className="px-3 py-1 rounded bg-gray-100 dark:bg-muted disabled:opacity-50"
            >
              {isRTL ? "التالي" : "Next"}
            </button>
          </div>
        )}
      </WhiteCard>

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isRTL ? "تفاصيل الرسالة" : "Message Details"}</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">{isRTL ? "الاسم" : "Name"}</label>
                  <p className="text-base font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">{isRTL ? "التاريخ" : "Date"}</label>
                  <p className="text-base font-medium">{new Date(selectedContact.createdAt).toLocaleString(locale)}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">{isRTL ? "البريد الإلكتروني" : "Email"}</label>
                  <p className="text-base font-medium">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">{isRTL ? "الهاتف" : "Phone"}</label>
                  <p className="text-base font-medium">{selectedContact.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">{isRTL ? "الرسالة" : "Message"}</label>
                <div className="mt-2 p-4 bg-gray-50 dark:bg-muted rounded-lg text-sm whitespace-pre-wrap">
                  {selectedContact.purpose}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={isRTL ? "تأكيد الحذف" : "Confirm Delete"}
        description={isRTL ? "هل تريد حذف هذا السجل؟" : "Do you want to delete this record?"}
        confirmText={isRTL ? "حذف" : "Delete"}
        cancelText={isRTL ? "إلغاء" : "Cancel"}
        onConfirm={async () => {
          if (!deleteId) return;
          const success = await deleteContact(deleteId);
          if (success) {
            toast.success(isRTL ? "تم حذف الاتصال بنجاح" : "Contact deleted successfully");
            fetchContacts(1);
          } else {
            toast.error(isRTL ? "فشل الحذف" : "Delete failed");
          }
          setDeleteId(null);
        }}
      />
    </div>
  );
}
