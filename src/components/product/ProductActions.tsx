"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { toast } from "sonner";

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
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between w-full border border-gray-200 rounded-xl p-1 sm:w-40 bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="hover:text-red-600"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="px-3 py-3 font-bold text-lg">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuantity((q) => q + 1)}
          className="hover:text-red-600"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-row gap-3">
        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={!stock || stock === 0}
          className="flex-1 bg-red-600 hover:bg-black text-white rounded-xl font-black uppercase italic shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} /> Add to Cart
        </Button>

        {/* Wishlist */}
        <Button
          onClick={handleToggleWishlist}
          variant="outline"
          className={`flex-1 rounded-xl border-gray-200 hover:bg-gray-50 ${
            wishlisted ? "bg-red-50 border-red-200" : ""
          }`}
        >
          <Heart
            className={`transition-colors ${
              wishlisted ? "text-red-600 fill-red-600" : "hover:text-red-600"
            }`}
          />
        </Button>
      </div>
    </div>
  );
};
