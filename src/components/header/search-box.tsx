"use client";

import { useState } from "react";
import { Search, MapPin, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const branches = [
  {
    name: "الحامل الرقمي لأجهزة الكمبيوتر",
    address: "حول - شارع حبيب المنصور - مجمع الملا التجاري - الدور الأرضي",
    phone: "22616272",
    email: "sales@dh-kw.com",
  },
  {
    name: "ديجيتال هورايزون",
    address: "Hwalli - Bin Kaldun ST - Almulla commercial complex Showroom 27 G floor",
    phone: "22616727",
    email: "sales@dh-kw.com",
  },
];

export function SearchBox() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [branch, setBranch] = useState("فرعنا");

  return (
    <>
      {/* Search Bar */}
      <div className="flex w-full max-w-5xl items-center gap-2 rounded-xl border border-border bg-card px-2 py-2">
        {/* Branch Selector */}
        <button
          onClick={() => setOpen(true)}
          className="
            flex items-center gap-2
            rounded-lg border border-border
            px-4 py-2
            text-sm font-semibold text-primary
            hover:bg-muted
            transition
          "
        >
          <MapPin className="h-4 w-4" />
          <span>{branch}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Input */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="عن ماذا تبحث؟"
          className="
            flex-1 bg-transparent px-4
            text-sm outline-none
            placeholder:text-muted-foreground
          "
        />

        {/* Search Button */}
        <Button
          size="icon"
          className="h-10 w-10 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Branch Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
           <div className="bg-white p-4 rounded-lg">
             <button onClick={() => setOpen(false)}>Close</button>
           </div>
        </div>
      )}
    </>
  );
}
