"use client";

import { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  title: string;
  type: "checkbox" | "range" | "tags";
  options?: FilterOption[];
  min?: number;
  max?: number;
}

interface ReusableSidebarProps {
  filters: FilterGroup[];
  onFilterChange?: (filters: Record<string, string[] | number>) => void;
  className?: string;
}

export function ReusableSidebar({ filters, onFilterChange, className }: ReusableSidebarProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[] | number>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    filters.reduce((acc, f) => ({ ...acc, [f.id]: true }), {})
  );

  const toggleSection = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckboxChange = (groupId: string, value: string) => {
    setActiveFilters((prev) => {
      const current = Array.isArray(prev[groupId]) ? (prev[groupId] as string[]) : [];
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      
      const newFilters = { ...prev, [groupId]: updated };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleRangeChange = (groupId: string, value: number) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev, [groupId]: value };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-red-600" />
        <h2 className="text-xl font-bold text-foreground">Filters</h2>
      </div>

      {filters.map((group) => (
        <div 
          key={group.id} 
          className="glass-panel rounded-xl p-5 border border-border bg-card dark:bg-card/50"
        >
          <button 
            onClick={() => toggleSection(group.id)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h3 className="font-bold text-foreground group-hover:text-red-600 transition-colors">
              {group.title}
            </h3>
            {expanded[group.id] ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          {expanded[group.id] && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              {group.type === "checkbox" && (
                <div className="space-y-3">
                  {group.options?.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group/item">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer h-5 w-5 rounded border-border bg-muted checked:bg-red-600 checked:border-red-600 transition-all focus:ring-2 focus:ring-red-600/20"
                          checked={Array.isArray(activeFilters[group.id]) ? (activeFilters[group.id] as string[]).includes(opt.value) : false}
                          onChange={() => handleCheckboxChange(group.id, opt.value)}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                        {opt.label}
                      </span>
                      {opt.count !== undefined && (
                        <span className="ml-auto text-xs text-muted-foreground/50 bg-muted px-2 py-0.5 rounded-full">
                          {opt.count}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              )}

              {group.type === "range" && (
                <div className="pt-2">
                      <div className="flex items-center justify-between mb-4">
                         <span className="text-sm font-medium text-muted-foreground">${group.min || 0}</span>
                         <span className="text-sm font-bold text-red-600">
                       ${typeof activeFilters[group.id] === "number" ? (activeFilters[group.id] as number) : (group.max || 1000)}
                         </span>
                      </div>
                      <input 
                        type="range"
                        min={group.min || 0}
                        max={group.max || 1000}
                        value={typeof activeFilters[group.id] === "number" ? (activeFilters[group.id] as number) : (group.max || 1000)}
                        onChange={(e) => handleRangeChange(group.id, Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500 transition-all"
                      />
                    </div>
                  )}

              {group.type === "tags" && (
                <div className="flex flex-wrap gap-2">
                  {group.options?.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleCheckboxChange(group.id, opt.value)}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-full border transition-all",
                        Array.isArray(activeFilters[group.id]) && (activeFilters[group.id] as string[]).includes(opt.value)
                          ? "bg-red-600 text-white border-red-600 shadow-md"
                          : "bg-background border-border text-muted-foreground hover:border-red-600 hover:text-red-600"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20">
        Apply Filters
      </Button>
    </div>
  );
}
