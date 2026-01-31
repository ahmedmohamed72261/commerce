import { useEffect, useState } from "react";
import { getBannersByType } from "@/services/banners.service";
import { cn } from "@/utils/utils";

export function SecondaryBannerRow({ className }: { className?: string }) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const banners = await getBannersByType("secondary");
        const imgs = banners.flatMap((b: any) =>
          Array.isArray(b.images) ? b.images : [b.imageUrl].filter(Boolean)
        );
        const normalized = imgs.map((img: any) =>
          typeof img === "string" ? img : img?.imageUrl
        ).filter(Boolean) as string[];
        setImages(normalized);
      } catch {}
    })();
  }, []);

  if (!images.length) return null;

  return (
    <div className={cn("grid gap-4", images.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1", className)}>
      {images.map((url, i) => (
        <div
          key={i}
          className={cn(
            "relative rounded-xl overflow-hidden group",
            images.length === 1 ? "h-[200px] md:h-[400px]" : "h-[200px] md:h-[300px]"
          )}
        >
          <img
            src={url}
            alt="Banner"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
