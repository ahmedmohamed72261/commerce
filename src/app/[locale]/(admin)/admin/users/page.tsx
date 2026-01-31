"use client";
import React, { useEffect, useState } from "react";
import { WhiteCard } from "@/components/admin/ui/cards";
import { getUsersForAdmin } from "@/services/admin-users.service";
import { Search, User } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("AdminSidebar");
  const tTable = useTranslations("AdminTable");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getUsersForAdmin();
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setUsers(list);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-foreground">{t("users")}</h1>
      </div>

      <WhiteCard
        noPadding
        headerAction={
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-muted/50 border border-gray-200 dark:border-border focus:bg-white dark:focus:bg-card focus:border-red-500 dark:focus:border-primary focus:ring-2 focus:ring-red-100 dark:focus:ring-primary/20 rounded-full transition-all w-64 outline-none text-gray-800 dark:text-foreground placeholder:text-gray-400 dark:placeholder:text-muted-foreground"
              />
              <Search size={16} className="absolute left-3 top-2 text-gray-400 dark:text-muted-foreground" />
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm text-gray-600 dark:text-muted-foreground">
            <thead className="bg-gray-50 dark:bg-muted/50 text-gray-500 dark:text-muted-foreground font-semibold uppercase text-xs">
              <tr>
                <th className="px-5 py-3">{tTable("name")}</th>
                <th className="px-5 py-3">{tTable("email")}</th>
                <th className="px-5 py-3">{tTable("phone")}</th>
                <th className="px-5 py-3">{tTable("role")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u: any) => (
                  <tr key={u._id || u.id} className="hover:bg-gray-50/50 dark:hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-foreground align-middle">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-muted flex items-center justify-center">
                          <User size={16} className="text-gray-400 dark:text-muted-foreground" />
                        </div>
                        <span>{u.firstName ? `${u.firstName} ${u.lastName ?? ""}`.trim() : u.name || "-"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">{u.email || "-"}</td>
                    <td className="px-5 py-3">{u.phone || "-"}</td>
                    <td className="px-5 py-3">{u.role || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </WhiteCard>
    </div>
  );
}
