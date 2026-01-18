"use client";
import React from "react";

type Props = { stock?: number; condition?: string };

export const ProductMeta: React.FC<Props> = ({ stock, condition }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-wide mb-1">
        Stock Status
      </p>
      <span
        className={`text-sm font-bold uppercase ${
          stock && stock > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {stock && stock > 0 ? "In Stock" : "Out of Stock"}
      </span>
      {typeof stock === "number" && (
        <p className="text-xs text-slate-400 font-semibold">{stock} units</p>
      )}
    </div>
    {condition && (
      <div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-wide mb-1">
          Condition
        </p>
        <span className="text-sm font-semibold">{condition}</span>
      </div>
    )}
  </div>
);
