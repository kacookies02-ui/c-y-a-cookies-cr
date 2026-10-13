import React from 'react';
import { ScallopedBadge } from './ScallopedBadge';
import { TabKey, TABS } from './Header';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  orderCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  orderCount,
}) => {
  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F6F1E6]/95 backdrop-blur-md border-t border-[#E2A99D]/30 px-2 py-1.5 shadow-[0_-4px_20px_rgba(74,44,35,0.08)]"
    >
      <div className="grid grid-cols-4 max-w-md mx-auto items-end">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group flex flex-col items-center justify-center py-1 px-1 focus:outline-none relative"
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <ScallopedBadge
                  type={tab.badgeType}
                  size={isActive ? 46 : 40}
                  isActive={isActive}
                  badgeColor={isActive ? '#E2A99D' : '#E8B6AB'}
                  borderColor={isActive ? '#FBE3A6' : '#F6E4BA'}
                  className={`transition-all duration-200 ${
                    isActive
                      ? '-translate-y-1.5 drop-shadow-[0_4px_10px_rgba(139,74,40,0.25)]'
                      : 'opacity-85'
                  }`}
                />

                {/* Badge counter for Pedidos */}
                {tab.id === 'pedidos' && orderCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4A2C23] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-[#FBE6A8] shadow-sm">
                    {orderCount}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] leading-tight font-bold tracking-tight text-center line-clamp-1 transition-colors mt-0.5 ${
                  isActive ? 'text-[#4A2C23]' : 'text-[#8B4A28]/80'
                }`}
              >
                {tab.label === 'Nuevos Productos'
                  ? 'Nuevos'
                  : tab.label === 'Nuestro Menú'
                  ? 'Menú'
                  : tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
