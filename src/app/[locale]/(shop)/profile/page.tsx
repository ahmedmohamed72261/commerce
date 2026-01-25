"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { getProfile } from "@/services/user.service";
import { useIsRTL } from "@/utils/rtl";

// Components
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileBasicInfo } from "@/components/profile/ProfileBasicInfo";
import { ProfileSecurity } from "@/components/profile/ProfileSecurity";
import { OrdersTab } from "@/components/profile/OrdersTab";
import { WishlistTab } from "@/components/profile/WishlistTab";
import { AddressesTab, type Address } from "@/components/profile/AddressesTab";
import { Breadcrumb } from "@/components/ui/breadcrumb";

type UserProfile = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  addresses?: Address[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const pickString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

const ProfilePage = () => {
  const isRTL = useIsRTL();
  const [activeTab, setActiveTab] = useState('My Profile');
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async () => {
    try {
      setProfileLoading(true);
      const res = await getProfile();
      const payload = (res as unknown as { data?: unknown })?.data;
      const data =
        isRecord(payload) && "data" in payload
          ? (payload as { data?: unknown }).data
          : payload;

      if (isRecord(data)) {
        setProfile({
          _id: pickString(data["_id"]),
          firstName: pickString(data["firstName"]),
          lastName: pickString(data["lastName"]),
          email: pickString(data["email"]),
          phone: pickString(data["phone"]),
          role: pickString(data["role"]),
          addresses: Array.isArray(data["addresses"])
            ? (data["addresses"] as unknown[])
                .map((a) => (isRecord(a) ? (a as Address) : null))
                .filter((x): x is Address => x !== null)
            : [],
        });
      } else {
        setProfile(null);
      }
    } catch {
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const addresses = useMemo(() => profile?.addresses ?? [], [profile]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-background text-slate-900 dark:text-foreground font-sans antialiased" dir={isRTL ? "rtl" : "ltr"}>
      {/* Unified Breadcrumb */}
      <Breadcrumb
        items={[
          { label: activeTab }
        ]}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
        
        {/* SIDEBAR */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-[2rem] shadow-sm min-h-[600px]">
            
            {/* 1. PROFILE TAB */}
            {activeTab === 'My Profile' && (
              <div className="p-6 md:p-10 space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-2">
                <ProfileBasicInfo profile={profile} loading={profileLoading} />
                <ProfileSecurity />
              </div>
            )}

            {/* 2. ORDERS TAB */}
            {activeTab === 'My Orders' && <OrdersTab />}

            {/* 3. WISHLIST TAB */}
            {activeTab === 'My Wishlist' && <WishlistTab />}

            {/* 4. ADDRESS TAB */}
            {activeTab === 'My Addresses' && (
              <AddressesTab addresses={addresses} onRefresh={fetchProfile} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
