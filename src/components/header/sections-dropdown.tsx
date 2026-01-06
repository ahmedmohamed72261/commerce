import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SectionsDropdown() {
  return (
    <div className="relative group">
      <Button variant="ghost" className="flex items-center gap-2 font-bold uppercase">
        <Menu className="w-5 h-5" />
        <span>All Departments</span>
      </Button>
    </div>
  );
}
