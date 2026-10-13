import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/config';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage = encodeURIComponent(
    '¡Hola K&A Cookies! 🍪 Me gustaría consultar sobre sus galletas estilo New York.'
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 bg-white text-[#4A2C23] p-3 rounded-2xl shadow-xl border border-[#E2A99D]/40 max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Cerrar mensaje"
          >
            <X size={14} />
          </button>
          <p className="font-bold text-[#8B4A28] mb-0.5">¿Antojo de galletas? 🍪</p>
          <p className="text-[#4A2C23]/90">
            Escribinos directo a WhatsApp para resolver dudas o coordinar pedidos especiales.
          </p>
        </div>
      )}

      {/* Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-108 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Contactar a K&A Cookies por WhatsApp"
      >
        {/* Subtle pulsing outer ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-60 pointer-events-none" />

        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] relative z-10" />

        {/* Floating badge */}
        <span className="absolute -top-1 -left-1 bg-[#8B4A28] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-xs">
          Tico
        </span>
      </a>
    </div>
  );
};
