import { useEffect, useState } from "react";
import { BannerSlider } from "@/components/hero/banner-slider";
import { getBannersByType } from "@/services/banners.service";
import { cn } from "@/utils/utils";

export function MainBanner({
  interval = 6000,
  className,
  heightClass = "h-[360px] md:h-[600px] lg:h-[850px]",
  children,
  onIndexChange,
}: {
  interval?: number;
  className?: string;
  heightClass?: string;
  children?: React.ReactNode;
  onIndexChange?: (index: number) => void;
}) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const banners = await getBannersByType("main");
        const imgs = banners.flatMap((b: any) =>
          Array.isArray(b.images) ? b.images : [b.imageUrl].filter(Boolean)
        );
        const normalized = imgs.map((img: any) =>
          typeof img === "string" ? img : img?.imageUrl
        ).filter(Boolean) as string[];
        if (normalized.length) setImages(normalized);
      } catch {
        // fallback (optional): keep empty to avoid showing wrong content
      }
    })();
  }, []);

  if (images.length === 0) return null;

  return (
    <div className={cn("w-full relative", className)}>
      <BannerSlider
        images={images}
        interval={interval}
        className="rounded-none shadow-none"
        heightClass={heightClass}
        onIndexChange={onIndexChange}
      >
        {children}
      </BannerSlider>
    </div>
  );
}
