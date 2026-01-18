"use client";
import React from "react";

type Props = { description?: string };

export const ProductDescription: React.FC<Props> = ({ description }) => {
  if (!description) return null;
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <h2 className="text-sm font-black uppercase text-slate-500 mb-2 tracking-wide">
        Description
      </h2>
      <p className="text-sm text-slate-700 leading-relaxed">{description}</p>
    </div>
  );
};
