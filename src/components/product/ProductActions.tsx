"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type Props = {
  productId: string | number;
  title: string;
  stock?: number;
  price?: number;
  salePrice?: number;
};

export const ProductActions: React.FC<Props> = ({
  productId,
  title,
  stock,
  price,
  salePrice,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(productId);
  const tShop = useTranslations("Shop");

  const handleAddToCart = async () => {
    const success = await addToCart(String(productId), quantity);
    success
      ? toast.success(`Added ${quantity} ${title} to cart!`)
      : toast.error("Failed to add to cart");
  };

  const handleToggleWishlist = () => {
    if (wishlisted) {
      removeItem(productId);
      toast.info("Removed from wishlist");
    } else {
      addItem({ id: productId, title, price: salePrice ?? price ?? 0, salePrice });
      toast.success("Added to wishlist!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between w-full md:w-auto min-w-[160px] border border-border rounded-xl p-1 bg-muted/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="hover:text-white dark:hover:tex-white"
        >
          <Minus className="h-4 w-4" /> 
        </Button>
        <span className="px-2 py-2 font-bold text-base md:text-lg text-foreground">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuantity((q) => q + 1)}
          className="hover:text-white dark:hover:tex-white"
        >
          <Plus className="h-4 w-4" /> 
        </Button>
      </div>

      <div className="flex flex-row gap-3 w-full">
        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={!stock || stock === 0}
          className="flex-1 bg-red-600 h-12 hover:bg-black dark:hover:bg-red-700 text-white rounded-xl font-black uppercase italic shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} /> {tShop("addToCart")}
        </Button>

        {/* Wishlist */}
        <Button
          onClick={handleToggleWishlist}
          variant="outline"
          className={`flex-1 rounded-xl h-12 border border-border hover:bg-muted ${
            wishlisted ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/20" : ""
          }`}
        >
          <Heart
            className={`transition-colors ${
              wishlisted ? "text-red-600 dark:text-red-500 fill-red-600 dark:fill-red-500" : "hover:text-red-600 dark:hover:text-red-500"
            }`}
          />
        </Button>
      </div>
    </div>
  );
};
