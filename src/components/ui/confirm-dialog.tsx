"use client";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-[2rem] p-6 border-none shadow-2xl bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest">{title}</DialogTitle>
        </DialogHeader>
        {description && (
          <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
        )}
        <DialogFooter>
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-xl"
            >
              {cancelText}
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className="h-11 rounded-xl bg-red-600 hover:bg-black text-white"
            >
              {confirmText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
