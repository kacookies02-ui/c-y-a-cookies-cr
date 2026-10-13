import React from 'react';
import { ScallopedBadge, BadgeIconType } from './ScallopedBadge';
import { ASSET_PATHS, ORDER_CONFIG } from '../data/config';

export type TabKey = 'nuevos-productos' | 'opiniones' | 'pedidos' | 'nuestro-menu';

interface HeaderProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  orderCount: number;
}

interface TabItem {
  id: TabKey;
  label: string;
  badgeType: BadgeIconType;
}

export const TABS: TabItem[] = [
  { id: 'nuevos-productos', label: 'Nuevos Productos', badgeType: 'box' },
  { id: 'opiniones', label: 'Opiniones', badgeType: 'hearts' },
  { id: 'pedidos', label: 'Pedidos', badgeType: 'hand' },
  { id: 'nuestro-menu', label: 'Nuestro Menú', badgeType: 'stack' },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, orderCount }) => {
  return (
    <header className="relative w-full pt-4 pb-3 px-4 transition-all">
      {/* Decorative background elements reminiscent of the menu sheet */}
      <div className="absolute top-2 left-6 w-16 h-16 rounded-full bg-[#EBC1B6]/30 blur-xl pointer-events-none -z-10" />
      <div className="absolute top-4 right-10 w-20 h-20 rounded-full bg-[#FBE6A8]/40 blur-xl pointer-events-none -z-10" />


      {/* Main Brand Logo Lockup */}
      <div className="flex flex-col items-center justify-center text-center">
        <button
          onClick={() => onTabChange('nuevos-productos')}
          className="group relative flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B4A28] rounded-full p-1"
          aria-label="K&A Cookies Inicio"
        >
          {/* Logo badge with fallback */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(139,74,40,0.18)]">
            <img
              src={ASSET_PATHS.logo}
              alt="Logo K&A Cookies - Galleta estilo New York partida"
              className="w-full h-full object-contain rounded-full"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If local image fails, show SVG fallback
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.logo-svg-fallback');
                if (fallback) (fallback as HTMLElement).style.display = 'block';
              }}
            />
            <div className="logo-svg-fallback hidden w-full h-full">
              <ScallopedBadge type="logo" size={72} />
            </div>
          </div>

          <h1 className="mt-1.5 text-2xl md:text-3xl font-display text-[#8B4A28] tracking-tight flex items-center gap-1.5">
            <span>K&amp;A Cookies</span>
          </h1>
          <p className="text-xs text-[#8B4A28]/80 font-bold uppercase tracking-widest -mt-0.5">
            New York Cookies · Costa Rica
          </p>
        </button>
      </div>

      {/* Desktop Tabs: Centered row with the 4 scalloped badges and labels */}
      <nav
        aria-label="Navegación principal"
        className="hidden md:flex items-center justify-center gap-8 lg:gap-12 mt-6 max-w-4xl mx-auto"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B4A28] rounded-2xl p-2 transition-transform duration-200"
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <ScallopedBadge
                  type={tab.badgeType}
                  size={76}
                  isActive={isActive}
                  badgeColor={isActive ? '#E2A99D' : '#E8B6AB'}
                  borderColor={isActive ? '#FBE3A6' : '#F6E4BA'}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'drop-shadow-[0_8px_16px_rgba(139,74,40,0.25)] ring-2 ring-[#FBE6A8] ring-offset-2 ring-offset-[#F6F1E6] rounded-full'
                      : 'opacity-90 group-hover:opacity-100 group-hover:-translate-y-1'
                  }`}
                />

                {/* Badge counter for Pedidos */}
                {tab.id === 'pedidos' && orderCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#4A2C23] text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-[#FBE6A8] shadow-md animate-bounce">
                    {orderCount}
                  </span>
                )}
              </div>

              <span
                className={`mt-2 text-sm font-bold tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#4A2C23] border-b-2 border-[#8B4A28] pb-0.5'
                    : 'text-[#8B4A28]/80 group-hover:text-[#4A2C23]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
