"use client";

import { useQuoteCart } from "@/store/quote-cart";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { createQuotation } from "@/services/quotations.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export default function QuoteCartPage() {
    const t = useTranslations("Quotations");
    const locale = useLocale();
    const { items, updateQuantity, removeItem, clearCart } = useQuoteCart();
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuthStore();

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
        return <div className="container mx-auto py-20 text-center text-xl text-muted-foreground">{t("empty")}</div>;
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">{t("cartTitle")}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.product._id} className="flex gap-4 p-4 border rounded-lg items-center bg-card">
                            <div className="w-24 h-24 relative flex-shrink-0">
                                <img 
                                    src={item.product.image || "/images/placeholder.png"} 
                                    alt={typeof item.product.name === 'string' ? item.product.name : item.product.name.en} 
                                    className="object-cover w-full h-full rounded" 
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{typeof item.product.name === 'string' ? item.product.name : item.product.name.en}</h3>
                                <p className="text-muted-foreground font-semibold">${item.product.salePrice || item.product.price}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}>
                                    <Minus size={16} />
                                </Button>
                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
                                    <Plus size={16} />
                                </Button>
                            </div>
                            <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => removeItem(item.product._id)}>
                                <Trash2 size={20} />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="p-6 border rounded-lg h-fit bg-card sticky top-24">
                    <h2 className="text-xl font-bold mb-4">{t("notes")}</h2>
                    <textarea 
                        className="w-full p-3 border rounded-md mb-6 min-h-[120px] bg-background"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t("notes")}
                    />
                    <div className="flex justify-between items-center mb-6 text-lg font-bold">
                         <span>{t("total")} ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                    </div>
                    <Button className="w-full text-lg py-6" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : t("submit")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
