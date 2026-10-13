import React from 'react';
import { Instagram, MessageCircle, Heart } from 'lucide-react';
import { ASSET_PATHS, ORDER_CONFIG, WHATSAPP_NUMBER } from '../data/config';
import { ScallopedBadge } from './ScallopedBadge';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EBC1B6]/30 border-t border-[#E2A99D]/40 py-8 px-4 mt-12 mb-16 md:mb-0">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#FBE6A8] bg-[#F6F1E6] shrink-0">
            <img
              src={ASSET_PATHS.logo}
              alt="K&A Cookies Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <p className="text-sm font-display text-[#8B4A28]">K&amp;A Cookies</p>
            <p className="text-[11px] text-[#4A2C23]/80">
              Galletas estilo New York hechas con amor en Costa Rica 🇨🇷
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-[#8B4A28]">
          <a
            href={ORDER_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#8B4A28] border border-[#FBE6A8] transition-all hover:scale-105 shadow-2xs"
          >
            <Instagram size={14} className="text-[#D14D72]" />
            <span>{ORDER_CONFIG.instagramHandle}</span>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#8B4A28] border border-[#FBE6A8] transition-all hover:scale-105 shadow-2xs"
          >
            <MessageCircle size={14} className="text-[#25D366]" />
            <span>WhatsApp (8614-0425)</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-[#4A2C23]/70">
          <p>© {new Date().getFullYear()} K&amp;A Cookies. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
