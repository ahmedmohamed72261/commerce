import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export function StatCard({ label, value, icon: Icon, color }: any) {
  // Convert basic color classes to gradients or nicer shades if possible, 
  // but for now relying on the passed 'color' prop being a background class.
  // We'll wrap it to add some depth.
  
  return (
    <div className={`${color} p-6 rounded-xl text-white flex items-center justify-between shadow-lg shadow-gray-200/50 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
      <div className="z-10 relative">
        <div className="text-xs font-bold uppercase opacity-70 tracking-wider mb-2">{label}</div>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg shadow-inner z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        <Icon size={24} className="text-white" />
      </div>
      
      {/* Decorative background icon */}
      <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
        <Icon size={120} />
      </div>
      
      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}

export function WhiteCard({ title, children, className = "", noPadding = false, headerAction, collapsible }: any) {
  return (
    <div className={`bg-white border border-gray-100 rounded-xl shadow-sm shadow-gray-200/50 overflow-hidden ${className}`}>
      {(title || headerAction) && (
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          {title && <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full inline-block"></span>
            {title}
          </h3>}
          <div className="flex items-center gap-3">
             {headerAction}
             {collapsible && (
               <button className="p-1.5 hover:bg-gray-50 rounded-md text-gray-400 hover:text-gray-600 transition-colors">
                 <MoreHorizontal size={16}/>
               </button>
             )}
          </div>
        </div>
      )}
      <div className={noPadding ? "" : "p-6"}>{children}</div>
    </div>
  );
}
