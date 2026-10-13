import React, { useState } from 'react';
import { Plus, Check, ShoppingBag, Eye, X, Sparkles } from 'lucide-react';
import { COOKIES_DATA, CookieItem, ORDER_CONFIG, ASSET_PATHS } from '../../data/config';
import { ScallopedBadge } from '../ScallopedBadge';

interface NuestroMenuTabProps {
  onAddToCart: (cookieId: string) => void;
  onGoToPedidos: () => void;
  cart: Record<string, number>;
}

export const NuestroMenuTab: React.FC<NuestroMenuTabProps> = ({
  onAddToCart,
  onGoToPedidos,
  cart,
}) => {
  const [activeFilter, setActiveFilter] = useState<'todas' | 'clasicas' | 'temporada'>('todas');
  const [justAddedCookieId, setJustAddedCookieId] = useState<string | null>(null);
  const [previewMenuModal, setPreviewMenuModal] = useState<boolean>(false);

  const filteredCookies = COOKIES_DATA.filter((cookie) => {
    if (activeFilter === 'todas') return true;
    return cookie.category === activeFilter;
  });

  const handleAdd = (cookieId: string) => {
    onAddToCart(cookieId);
    setJustAddedCookieId(cookieId);
    setTimeout(() => {
      setJustAddedCookieId(null);
    }, 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 md:py-6 relative">
      {/* MENU HEADER IDENTICAL TO REFERENCE IMAGE */}
      <div className="relative bg-white rounded-3xl p-6 md:p-10 border-2 border-[#FBE6A8] shadow-[0_8px_30px_rgba(139,74,40,0.08)] mb-8 overflow-hidden text-center">
        {/* Organic Background Decorations (exact match to user's menu image) */}
        {/* Top-right pink crescent arc */}
        <div className="absolute top-2 right-2 md:top-4 md:right-8 w-24 h-24 md:w-36 md:h-36 rounded-full border-8 md:border-[14px] border-[#E2A99D]/30 pointer-events-none -mr-8 -mt-8" />

        {/* Left middle pastel yellow/beige blob */}
        <div className="absolute top-1/4 -left-10 w-28 h-28 md:w-40 md:h-40 rounded-full bg-[#FBE3A6]/45 blur-xs pointer-events-none" />

        {/* Orange "x" mark */}
        <div className="absolute top-16 left-6 md:left-12 text-[#F28C28] font-black text-2xl select-none opacity-80 pointer-events-none">
          ✕
        </div>

        {/* Orange dot */}
        <div className="absolute bottom-12 left-1/4 w-3.5 h-3.5 rounded-full bg-[#F28C28] select-none opacity-80 pointer-events-none" />

        {/* Muted beige dot */}
        <div className="absolute top-1/2 left-8 w-4 h-4 rounded-full bg-[#E8E4DC] select-none pointer-events-none" />

        {/* Bottom-right beige blob */}
        <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#E8E4DC]/70 pointer-events-none" />

        {/* Bottom-left dark brown starburst shape */}
        <div className="absolute -bottom-6 -left-6 pointer-events-none text-[#8B4A28] opacity-90 select-none">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,0 62,35 98,20 78,50 98,80 62,65 50,100 38,65 2,80 22,50 2,20 38,35" />
          </svg>
        </div>

        {/* Content of Header */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo Badge in top left/center */}
          <div className="mb-2">
            <ScallopedBadge type="logo" size={68} badgeColor="#E2A99D" borderColor="#FBE6A8" />
          </div>

          {/* "NEW YORK" in large display font */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#111111] tracking-tight leading-none uppercase">
            NEW YORK
          </h2>

          {/* "Cookies" in script typography */}
          <div className="text-4xl sm:text-5xl md:text-6xl font-script text-[#111111] -mt-2 sm:-mt-3 transform -rotate-2">
            Cookies
          </div>

          {/* "MENÚ" in thin outline / spaced letters */}
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.35em] text-[#111111] mt-1 uppercase"
            style={{
              fontFamily: 'Nunito, sans-serif',
              textShadow: '0 0 1px #111',
            }}
          >
            MENÚ
          </div>

          <p className="text-xs md:text-sm text-[#4A2C23]/70 font-semibold mt-3 max-w-sm">
            Todas nuestras galletas pesan más de 120g y cuestan únicamente ₡2.500 c/u.
          </p>

          {/* Button to see full visual sheets */}
          <div className="mt-4">
            <button
              onClick={() => setPreviewMenuModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F6F1E6] hover:bg-[#FBE6A8] text-[#8B4A28] border border-[#E2A99D]/60 text-xs font-bold transition-all shadow-2xs"
            >
              <Eye size={14} />
              <span>Ver láminas completas del menú</span>
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS: Todas · Clásicas · De temporada */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(
          [
            { id: 'todas', label: 'Todas las galletas' },
            { id: 'clasicas', label: 'Clásicas NY' },
            { id: 'temporada', label: 'De Temporada' },
          ] as const
        ).map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all duration-200 ${
              activeFilter === filter.id
                ? 'bg-[#8B4A28] text-white shadow-md scale-102'
                : 'bg-white text-[#4A2C23] border border-[#E2A99D]/50 hover:bg-[#F6F1E6]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* GRID OF 15 COOKIES: 2 cols on mobile, 3 cols on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {filteredCookies.map((cookie) => {
          const qtyInCart = cart[cookie.id] || 0;
          const wasJustAdded = justAddedCookieId === cookie.id;

          return (
            <div
              key={cookie.id}
              className="group relative bg-white rounded-3xl p-4 md:p-6 border-2 border-[#FBE6A8] shadow-[0_4px_16px_rgba(139,74,40,0.06)] hover:shadow-[0_8px_24px_rgba(139,74,40,0.12)] transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Season / Classic Badge */}
              {cookie.category === 'temporada' && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#EBC1B6] text-[#8B4A28] shadow-2xs">
                    Temporada
                  </span>
                </div>
              )}

              {/* Circular Cutout Photo of the Cookie (Exact match to reference) */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden p-1 bg-gradient-to-br from-[#FBE6A8] to-[#E2A99D] shadow-sm mb-3 group-hover:scale-104 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#F6F1E6] flex items-center justify-center">
                  <img
                    src={cookie.image}
                    alt={cookie.name}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Fun cookie name typography in "Chewy" font */}
              <h3
                className="text-base sm:text-lg md:text-xl font-bold text-[#111111] mb-1 font-cookie tracking-wide leading-snug min-h-[2.5rem] flex items-center justify-center"
              >
                {cookie.name}
              </h3>

              {/* Black Pill with white text ₡2.500 (Exact match to reference!) */}
              <div className="mt-1 mb-3">
                <span className="inline-block bg-black text-white px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold tracking-tight shadow-2xs">
                  ₡2.500
                </span>
              </div>

              {/* Short description */}
              <p className="text-[11px] sm:text-xs text-[#4A2C23]/75 line-clamp-2 mb-4 flex-1">
                {cookie.description}
              </p>

              {/* Action: Add to cart button */}
              <button
                onClick={() => handleAdd(cookie.id)}
                className={`w-full py-2.5 px-3 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs ${
                  wasJustAdded
                    ? 'bg-emerald-600 text-white scale-102'
                    : qtyInCart > 0
                    ? 'bg-[#8B4A28] text-white hover:bg-[#723a1d]'
                    : 'bg-[#F6F1E6] text-[#8B4A28] border border-[#E2A99D] hover:bg-[#8B4A28] hover:text-white'
                }`}
                aria-label={`Agregar ${cookie.name} al pedido`}
              >
                {wasJustAdded ? (
                  <>
                    <Check size={14} />
                    <span>¡Agregada!</span>
                  </>
                ) : qtyInCart > 0 ? (
                  <>
                    <Plus size={14} />
                    <span>En pedido ({qtyInCart}) · Agregar +</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>Agregar al pedido</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating View Order Strip if cart has items */}
      {Object.values(cart).some((q) => q > 0) && (
        <div className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-30 animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={onGoToPedidos}
            className="flex items-center gap-2 py-3 px-5 rounded-2xl bg-[#8B4A28] text-white font-bold text-xs md:text-sm shadow-xl hover:bg-[#723a1d] transition-all hover:scale-103"
          >
            <ShoppingBag size={16} />
            <span>
              Ver pedido (
              {Object.values(cart).reduce((a, b) => a + b, 0)} galletas)
            </span>
            <span className="text-base font-bold">→</span>
          </button>
        </div>
      )}

      {/* FULL MENU SHEETS PREVIEW MODAL */}
      {previewMenuModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewMenuModal(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#F6F1E6] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FBE6A8] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-white border-b border-[#E8E4DC] flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-[#8B4A28]">
                  Láminas Originales del Menú New York
                </h4>
                <p className="text-xs text-[#4A2C23]/70">
                  Todas las galletas a ₡2.500 · Horneadas artesanalmente
                </p>
              </div>
              <button
                onClick={() => setPreviewMenuModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 overflow-auto max-h-[70vh] space-y-6">
              {/* Sheet 1: 9 cookies */}
              <div className="bg-white rounded-2xl p-6 border border-[#E8E4DC] text-center">
                <h5 className="font-bold text-sm text-[#8B4A28] mb-4">
                  Lámina 1 · 9 Especialidades
                </h5>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    'Leche Pinito',
                    'Cookie Monster',
                    "Santa's Bite",
                    "S'more 2.0",
                    'Birthday Cake',
                    'Oreo Cake',
                    "Cupid's Kiss",
                    'Spooky Pumpkin',
                    'Moreo',
                  ].map((name, i) => {
                    const c = COOKIES_DATA.find((x) => x.name === name);
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-[#FBE6A8] mb-1">
                          <img
                            src={c?.image || ASSET_PATHS.logo}
                            alt={name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="text-xs font-bold font-cookie">{name}</p>
                        <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold">
                          ₡2.500
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sheet 2: 6 cookies */}
              <div className="bg-white rounded-2xl p-6 border border-[#E8E4DC] text-center">
                <h5 className="font-bold text-sm text-[#8B4A28] mb-4">
                  Lámina 2 · 6 Especialidades
                </h5>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    'Wicked Glitter',
                    'Smore',
                    'Red Velvet',
                    'M&M Cosmic',
                    'Popcorn TWIX Cookie',
                    'Chunky Deluxe',
                  ].map((name, i) => {
                    const c = COOKIES_DATA.find((x) => x.name === name);
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-[#FBE6A8] mb-1">
                          <img
                            src={c?.image || ASSET_PATHS.logo}
                            alt={name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="text-xs font-bold font-cookie">{name}</p>
                        <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold">
                          ₡2.500
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-3 bg-white border-t border-[#E8E4DC] text-center">
              <button
                onClick={() => setPreviewMenuModal(false)}
                className="px-6 py-2 bg-[#8B4A28] text-white text-xs font-bold rounded-xl"
              >
                Volver al Menú
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
