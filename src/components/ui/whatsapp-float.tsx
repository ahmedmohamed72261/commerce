"use client";

import { Phone } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/1234567890" // Replace with actual number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-105 animate-bounce-slow"
    >
      <Phone className="w-5 h-5 fill-current" />
      <span className="font-bold hidden md:inline">Call Us</span>
    </a>
  );
}
