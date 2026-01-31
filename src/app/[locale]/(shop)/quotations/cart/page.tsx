"use client";

import { useQuoteCart } from "@/store/quote-cart";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { createQuotation } from "@/services/quotations.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, FileText } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { formatCurrency, cn } from "@/utils/utils";

export default function QuoteCartPage() {
    const t = useTranslations("Quotations");
    const locale = useLocale();
    const isAr = locale === 'ar';
    const { items, updateQuantity, removeItem, clearCart } = useQuoteCart();
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuthStore();

    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Please login to submit a quote");
            router.push(`/${locale}/login`);
            return;
        }
        if (items.length === 0) return;

        setLoading(true);
        try {
            const payload = {
                items: items.map(i => ({ product: i.product._id, quantity: i.quantity })),
                notes
            };
            await createQuotation(payload);
            toast.success("Quote submitted successfully");
            clearCart();
            router.push(`/${locale}/quotations/my-quotations`);
        } catch (error) {
            toast.error("Failed to submit quote");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container min-h-[60vh] flex flex-col items-center justify-center gap-4 animate-fade-up">
                <div className="p-6 rounded-full bg-muted">
                    <ShoppingBag size={48} className="text-muted-foreground" />
                </div>
                <h1 className="text-xl font-bold italic uppercase tracking-tighter">{t("empty")}</h1>
                <Button variant="outline" onClick={() => router.push('/')}>{t("backToStore") || "Continue Shopping"}</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 md:py-10 px-4 pb-32 md:pb-10" dir={isAr ? "rtl" : "ltr"}>
            {/* Header Section */}
            <header className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-foreground">
                    {t("cartTitle")}
                </h1>
                <div className="h-1 w-20 bg-primary" />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List of Products */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => {
                        const productName = typeof item.product.name === 'string' 
                            ? item.product.name 
                            : (item.product.name[locale as 'en' | 'ar'] || item.product.name.en);

                        return (
                            <div 
                                key={item.product._id} 
                                className="glass-panel group relative overflow-hidden p-3 md:p-4 rounded-2xl flex flex-row items-center gap-4 transition-all hover:border-primary/50 bg-card"
                            >
                                {/* Product Image */}
                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                    <img 
                                        src={(item.product.images && item.product.images[0]) ? item.product.images[0] : "/images/placeholder.png"} 
                                        alt={productName} 
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>

                                {/* Product Info & Actions */}
                                <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h3 className="font-black uppercase italic tracking-tight text-sm md:text-lg truncate max-w-[150px] md:max-w-none">
                                                {productName}
                                            </h3>
                                            <p className="text-primary font-bold text-sm md:text-base mt-1">
                                                {formatCurrency(item.product.salePrice || item.product.price, (locale as "en" | "ar"))}
                                            </p>
                                        </div>
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="text-muted-foreground hover:text-red-600 transition-colors" 
                                            onClick={() => removeItem(item.product._id)}
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>

                                    {/* Quantity Controls - Optimized for Mobile Thumb */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center bg-muted/50 rounded-lg p-1 border border-border">
                                            <Button 
                                                size="icon" 
                                                variant="ghost" 
                                                className="h-8 w-8 rounded-md hover:bg-background"
                                                onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                                            >
                                                <Minus size={14} />
                                            </Button>
                                            <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                                            <Button 
                                                size="icon" 
                                                variant="ghost" 
                                                className="h-8 w-8 rounded-md hover:bg-background"
                                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                            >
                                                <Plus size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sidebar / Bottom Bar on Mobile */}
                <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
                    <div className="glass-panel p-6 rounded-[--radius] bg-card space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText size={18} className="text-primary" />
                            <h2 className="text-lg font-black uppercase italic tracking-tighter">{t("notes")}</h2>
                        </div>
                        <textarea 
                            className="w-full p-4 border rounded-xl min-h-[100px] bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder={t("notesPlaceholder") || "Add instructions..."}
                        />

                        {/* Summary for Desktop */}
                        <div className="block pt-4 border-t border-border">
                            <Button className="w-full mt-6 py-7 rounded-xl font-black uppercase tracking-[0.2em] " onClick={handleSubmit} disabled={loading}>
                                {loading ? "Submitting..." : t("submit")}
                            </Button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}