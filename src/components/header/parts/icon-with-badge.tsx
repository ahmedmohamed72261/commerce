import { ReactNode } from "react";

interface IconWithBadgeProps {
  icon: ReactNode;
  badgeCount?: number;
}

export function IconWithBadge({ icon, badgeCount }: IconWithBadgeProps) {
  return (
    <div className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors">
      {icon}
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
          {badgeCount}
        </span>
      )}
    </div>
  );
}
