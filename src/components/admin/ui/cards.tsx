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

export function WhiteCard({ title, children, className = "", noPadding = false, headerAction, collapsible, tabs }: any) {
  const [activeTab, setActiveTab] = React.useState(tabs ? tabs[0].id : null);

  return (
    <div className={`bg-white border border-gray-100 rounded-xl shadow-sm shadow-gray-200/50 overflow-hidden ${className}`}>
      {(title || headerAction || tabs) && (
        <div className="px-6 pt-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex-1">
            {title && !tabs && <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
              <span className="w-1 h-4 bg-red-500 rounded-full inline-block"></span>
              {title}
            </h3>}
            {tabs && (
              <div className="flex gap-1 -mb-px">
                {tabs.map((tab: any) => (
                  <button 
                    key={tab.id} 
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 ${
                      activeTab === tab.id 
                      ? 'border-red-500 text-red-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 ml-4">
             {headerAction}
             {collapsible && (
               <button className="p-1.5 hover:bg-gray-50 rounded-md text-gray-400 hover:text-gray-600 transition-colors">
                 <MoreHorizontal size={16}/>
               </button>
             )}
          </div>
        </div>
      )}
      
      {tabs ? (
        <div className="p-6">
          {tabs.find((tab: any) => tab.id === activeTab)?.content}
        </div>
      ) : (
        <div className={noPadding ? "" : "p-6"}>{children}</div>
      )}
    </div>
  );
}
