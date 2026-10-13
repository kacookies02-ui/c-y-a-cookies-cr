import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Plus, Sparkles, ShoppingBag } from 'lucide-react';
import { FLYERS_DATA, PHOTO_GALLERY, FlyerItem } from '../../data/config';

interface NuevosProductosTabProps {
  onOrderCookie: (cookieId: string) => void;
}

export const NuevosProductosTab: React.FC<NuevosProductosTabProps> = ({ onOrderCookie }) => {
  const [activeFlyerIndex, setActiveFlyerIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; desc?: string } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentFlyer = FLYERS_DATA[activeFlyerIndex];

  const handlePrev = () => {
    setActiveFlyerIndex((prev) => (prev > 0 ? prev - 1 : FLYERS_DATA.length - 1));
  };

  const handleNext = () => {
    setActiveFlyerIndex((prev) => (prev < FLYERS_DATA.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 md:py-6">
      {/* Tab Heading */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBC1B6]/30 border border-[#E2A99D]/40 rounded-full text-xs font-bold text-[#8B4A28] mb-2">
          <Sparkles size={13} className="text-[#F28C28]" />
          <span>SABORES DE TEMPORADA &amp; LANZAMIENTOS</span>
          <Sparkles size={13} className="text-[#F28C28]" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display text-[#8B4A28] tracking-tight">
          ¡Nueva Galleta!
        </h2>
        <p className="text-sm md:text-base text-[#4A2C23]/80 mt-1 max-w-md mx-auto">
          Descubrí nuestras creaciones exclusivas de temporada horneadas artesanalmente cada semana.
        </p>
      </div>

      {/* FLYERS CAROUSEL / SLIDER */}
      <div className="relative mb-12">
        {/* Desktop Arrow Controls */}
        <button
          onClick={handlePrev}
          aria-label="Flyer anterior"
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-[#F6F1E6] text-[#8B4A28] border-2 border-[#FBE6A8] shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          aria-label="Siguiente flyer"
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-[#F6F1E6] text-[#8B4A28] border-2 border-[#FBE6A8] shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronRight size={24} />
        </button>

        {/* Featured Flyer Card Showcase */}
        <div className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_8px_30px_rgba(139,74,40,0.12)] border-2 border-[#FBE6A8] relative overflow-hidden">
          {/* Decorative Corner Star */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#FBE3A6]/40 rounded-full blur-md pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Flyer Image with Lightbox click & Tag */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div
                className="relative group cursor-pointer w-full max-w-sm rounded-2xl overflow-hidden shadow-md border-2 border-[#EBC1B6] transition-transform duration-300 hover:scale-[1.01]"
                onClick={() =>
                  setLightboxImage({
                    src: currentFlyer.image,
                    title: `${currentFlyer.title} - ${currentFlyer.flavor}`,
                    desc: currentFlyer.description,
                  })
                }
              >
                {/* Editable Tag Badge on flyer */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold shadow-md border border-[#FBE6A8]"
                    style={{
                      backgroundColor: currentFlyer.badgeColor,
                      color: currentFlyer.themeColor,
                    }}
                  >
                    <span>✦</span>
                    {currentFlyer.tag}
                  </span>
                </div>

                {/* Lightbox hint icon */}
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </div>

                <div className="aspect-3/4 w-full bg-[#F6F1E6] flex items-center justify-center overflow-hidden">
                  <img
                    src={currentFlyer.image}
                    alt={`Flyer promocional: ${currentFlyer.flavor}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <span className="text-xs text-[#8B4A28]/70 mt-2 flex items-center gap-1">
                <Maximize2 size={12} /> Tocá la imagen para ampliar en pantalla completa
              </span>
            </div>

            {/* Flyer Info & Action */}
            <div className="md:col-span-6 flex flex-col justify-center text-left">
              <div className="inline-block mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#F28C28]">
                  {currentFlyer.title}
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-display text-[#8B4A28] mb-3 leading-tight">
                {currentFlyer.flavor}
              </h3>

              <p className="text-sm md:text-base text-[#4A2C23]/90 mb-4 leading-relaxed">
                {currentFlyer.description}
              </p>

              {/* Recipe Highlights */}
              <div className="bg-[#F6F1E6]/80 rounded-2xl p-4 mb-6 border border-[#E2A99D]/40">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#8B4A28] mb-2">
                  Detalles &amp; Ingredientes:
                </h4>
                <ul className="space-y-1.5">
                  {currentFlyer.details.map((detail, idx) => (
                    <li key={idx} className="text-xs md:text-sm text-[#4A2C23] flex items-start gap-2">
                      <span className="text-[#F28C28] font-bold mt-0.5">✦</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button: Pedir esta galleta */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOrderCookie(currentFlyer.cookieId)}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#8B4A28] text-white font-bold text-sm md:text-base shadow-md hover:bg-[#723a1d] active:scale-98 transition-all group"
                >
                  <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>Pedir esta galleta (₡2.500)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-[#E8E4DC]">
            {FLYERS_DATA.map((flyer, idx) => (
              <button
                key={flyer.id}
                onClick={() => setActiveFlyerIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeFlyerIndex === idx
                    ? 'w-8 h-2.5 bg-[#8B4A28]'
                    : 'w-2.5 h-2.5 bg-[#E8B6AB] hover:bg-[#8B4A28]/50'
                }`}
                aria-label={`Ver flyer ${flyer.flavor}`}
              />
            ))}
          </div>
        </div>

        {/* Quick Thumbnail Strip */}
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto no-scrollbar py-3 px-1 mt-3"
        >
          {FLYERS_DATA.map((flyer, idx) => {
            const isSelected = activeFlyerIndex === idx;
            return (
              <button
                key={flyer.id}
                onClick={() => setActiveFlyerIndex(idx)}
                className={`shrink-0 flex items-center gap-2.5 p-2 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'bg-white border-[#8B4A28] shadow-md scale-102'
                    : 'bg-[#F6F1E6] border-[#E8B6AB]/60 hover:bg-white'
                }`}
              >
                <div className="w-12 h-14 rounded-xl overflow-hidden bg-[#E8E4DC] shrink-0">
                  <img
                    src={flyer.image}
                    alt={flyer.flavor}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left pr-2">
                  <p className="text-xs font-bold text-[#8B4A28] line-clamp-1">{flyer.flavor}</p>
                  <span className="text-[10px] text-[#4A2C23]/70 font-semibold">{flyer.tag}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* GALERÍA DE FOTOS REALES (MOSAICO) */}
      <section className="mt-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F28C28] mb-1">
            <span>✦</span>
            <span>DIRECTO DEL HORNO</span>
            <span>✦</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display text-[#8B4A28]">
            Fotos Reales de Nuestras Galletas
          </h3>
          <p className="text-xs md:text-sm text-[#4A2C23]/80 mt-1">
            Así de gruesas, rellenas y esponjosas son nuestras New York Cookies en la vida real.
          </p>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {PHOTO_GALLERY.map((item, idx) => (
            <div
              key={idx}
              onClick={() =>
                setLightboxImage({
                  src: item.image,
                  title: item.title,
                  desc: item.subtitle,
                })
              }
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#FBE6A8] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square w-full overflow-hidden bg-[#E8E4DC]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-2.5 bg-white text-center">
                <p className="text-xs font-bold text-[#8B4A28] truncate">{item.title}</p>
                <p className="text-[10px] text-[#4A2C23]/70 truncate">{item.subtitle}</p>
              </div>
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-[#4A2C23]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/90 text-[#8B4A28] flex items-center justify-center shadow-sm">
                  <Maximize2 size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] bg-[#F6F1E6] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FBE6A8] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Cerrar vista completa"
            >
              <X size={20} />
            </button>

            {/* Image viewport */}
            <div className="relative flex-1 overflow-auto max-h-[70vh] bg-black/20 flex items-center justify-center p-2">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-w-full max-h-[68vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Caption */}
            <div className="p-4 bg-white border-t border-[#E8E4DC] flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-[#8B4A28]">{lightboxImage.title}</h4>
                {lightboxImage.desc && (
                  <p className="text-xs text-[#4A2C23]/80">{lightboxImage.desc}</p>
                )}
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="px-4 py-2 bg-[#8B4A28] text-white text-xs font-bold rounded-xl hover:bg-[#723a1d]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
