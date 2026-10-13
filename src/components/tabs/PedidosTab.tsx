import React, { useState } from 'react';
import {
  Plus,
  Minus,
  ShoppingBag,
  Send,
  MapPin,
  Calendar,
  CheckCircle,
  Truck,
  Store,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import {
  COOKIES_DATA,
  ORDER_CONFIG,
  WHATSAPP_NUMBER,
  CookieItem,
} from '../../data/config';
import { ScallopedBadge } from '../ScallopedBadge';

interface PedidosTabProps {
  cart: Record<string, number>;
  onUpdateQuantity: (cookieId: string, quantity: number) => void;
  onClearCart: () => void;
}

export const PedidosTab: React.FC<PedidosTabProps> = ({
  cart,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'entrega' | 'retiro'>('entrega');
  const [address, setAddress] = useState('');
  const [desiredDate, setDesiredDate] = useState('Viernes');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculations
  const selectedItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const cookie = COOKIES_DATA.find((c) => c.id === id);
      return {
        cookie,
        quantity: qty,
        subtotal: qty * (cookie?.price || ORDER_CONFIG.fixedPrice),
      };
    })
    .filter((item): item is { cookie: CookieItem; quantity: number; subtotal: number } => item.cookie !== undefined);

  const totalQuantity = selectedItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = selectedItems.reduce((acc, curr) => acc + curr.subtotal, 0);

  // Format Costa Rican Colones
  const formatColones = (amount: number) => {
    return `₡${amount.toLocaleString('es-CR')}`;
  };

  // Step 2 validation before proceeding to step 3
  const handleProceedToSummary = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) {
      newErrors.name = 'Por favor ingresá tu nombre.';
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      newErrors.phone = 'Por favor ingresá un número de teléfono válido (mínimo 8 dígitos).';
    }
    if (deliveryMethod === 'entrega' && !address.trim()) {
      newErrors.address = 'Por favor indicá tu dirección o zona para la entrega.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setCurrentStep(3);
  };

  // Build formatted WhatsApp Message URL
  const generateWhatsAppUrl = () => {
    let message = `🍪 *¡HOLA K&A COOKIES! QUIERO HACER UN PEDIDO* 🍪\n\n`;

    message += `📋 *DETALLE DEL PEDIDO:*\n`;
    selectedItems.forEach(({ cookie, quantity, subtotal }) => {
      message += `• ${quantity}x ${cookie.name} (${formatColones(subtotal)})\n`;
    });

    message += `\n📦 *Total Galletas:* ${totalQuantity} unidades\n`;
    message += `💰 *TOTAL A PAGAR:* ${formatColones(totalAmount)}\n\n`;

    message += `👤 *DATOS DEL CLIENTE:*\n`;
    message += `• *Nombre:* ${customerName.trim()}\n`;
    message += `• *Teléfono:* ${customerPhone.trim()}\n`;
    message += `• *Modalidad:* ${deliveryMethod === 'entrega' ? '🚚 Entrega a domicilio' : '📍 Retiro personal'}\n`;

    if (deliveryMethod === 'entrega') {
      message += `• *Dirección / Zona:* ${address.trim()}\n`;
    }

    message += `• *Fecha deseada:* ${desiredDate}\n`;

    if (notes.trim()) {
      message += `• *Notas:* ${notes.trim()}\n`;
    }

    message += `\n_¡Muchas gracias! Quedo a la espera de su confirmación para coordinar el pago por SINPE Móvil o transferencia._ 🇨🇷`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 md:py-6">
      {/* Title with hand badge */}
      <div className="text-center mb-6 flex flex-col items-center">
        <div className="mb-2">
          <ScallopedBadge type="hand" size={54} badgeColor="#E2A99D" borderColor="#FBE6A8" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display text-[#8B4A28] tracking-tight">
          Hacé tu pedido
        </h2>
        <p className="text-xs md:text-sm text-[#4A2C23]/80 mt-1 max-w-md">
          Elegí tus sabores favoritos, completá tus datos y mandalo por WhatsApp en segundos.
        </p>

        {/* Order status banner */}
        <div
          className={`mt-3 py-1.5 px-4 rounded-full text-xs font-bold border ${
            ORDER_CONFIG.isOpen
              ? 'bg-[#FBE6A8]/60 text-[#8B4A28] border-[#F28C28]/40'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {ORDER_CONFIG.isOpen ? (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Pedidos abiertos · {ORDER_CONFIG.statusTextOpen}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <AlertCircle size={14} />
              <span>{ORDER_CONFIG.statusTextClosed}</span>
            </span>
          )}
        </div>
      </div>

      {/* 3-STEP PROGRESS BAR */}
      <div className="bg-white rounded-2xl p-3 md:p-4 mb-6 border-2 border-[#FBE6A8] shadow-sm">
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <button
            onClick={() => setCurrentStep(1)}
            className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              currentStep === 1
                ? 'bg-[#8B4A28] text-white shadow-xs'
                : totalQuantity > 0
                ? 'bg-[#F6F1E6] text-[#8B4A28]'
                : 'text-gray-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0">
              1
            </span>
            <span className="truncate">1. Elegí</span>
          </button>

          <button
            onClick={() => totalQuantity > 0 && setCurrentStep(2)}
            disabled={totalQuantity === 0}
            className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              currentStep === 2
                ? 'bg-[#8B4A28] text-white shadow-xs'
                : totalQuantity > 0
                ? 'bg-[#F6F1E6] text-[#8B4A28]'
                : 'text-gray-400 opacity-60 cursor-not-allowed'
            }`}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0">
              2
            </span>
            <span className="truncate">2. Tus datos</span>
          </button>

          <button
            onClick={() => totalQuantity > 0 && handleProceedToSummary()}
            disabled={totalQuantity === 0}
            className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              currentStep === 3
                ? 'bg-[#8B4A28] text-white shadow-xs'
                : totalQuantity > 0
                ? 'bg-[#F6F1E6] text-[#8B4A28]'
                : 'text-gray-400 opacity-60 cursor-not-allowed'
            }`}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0">
              3
            </span>
            <span className="truncate">3. Enviar</span>
          </button>
        </div>
      </div>

      {/* STEP 1: ELEGIR GALLETAS */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#8B4A28]">
              Nuestras 15 galletas disponibles (Precio fijo ₡2.500 c/u)
            </h3>
            {totalQuantity > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-red-600 hover:underline font-semibold"
              >
                Vaciar selección
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COOKIES_DATA.map((cookie) => {
              const qty = cart[cookie.id] || 0;
              return (
                <div
                  key={cookie.id}
                  className={`bg-white rounded-2xl p-3 border-2 transition-all flex items-center justify-between gap-3 shadow-xs ${
                    qty > 0
                      ? 'border-[#8B4A28] ring-1 ring-[#8B4A28]/30 bg-[#FFFDF9]'
                      : 'border-[#FBE6A8] hover:border-[#E2A99D]'
                  }`}
                >
                  {/* Left: Thumbnail & Name */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#FBE6A8] bg-[#F6F1E6] shrink-0">
                      <img
                        src={cookie.image}
                        alt={cookie.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <h4 className="text-xs font-bold text-[#4A2C23] truncate">
                          {cookie.name}
                        </h4>
                        {cookie.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#EBC1B6]/30 text-[#8B4A28] font-bold shrink-0">
                            {cookie.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-[#8B4A28] mt-0.5">
                        ₡2.500
                      </p>
                      <p className="text-[10px] text-[#4A2C23]/60 line-clamp-1">
                        {cookie.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Quantity Controls */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-[#F6F1E6] rounded-xl p-1 border border-[#E2A99D]/40">
                    <button
                      onClick={() => onUpdateQuantity(cookie.id, Math.max(0, qty - 1))}
                      disabled={qty === 0}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                        qty > 0
                          ? 'bg-white text-[#8B4A28] shadow-xs hover:bg-[#8B4A28] hover:text-white'
                          : 'text-gray-300 cursor-not-allowed'
                      }`}
                      aria-label={`Disminuir ${cookie.name}`}
                    >
                      <Minus size={13} />
                    </button>

                    <span className="w-6 text-center text-xs font-extrabold text-[#4A2C23]">
                      {qty}
                    </span>

                    <button
                      onClick={() => onUpdateQuantity(cookie.id, qty + 1)}
                      className="w-7 h-7 rounded-lg bg-[#8B4A28] text-white flex items-center justify-center font-bold text-xs shadow-xs hover:bg-[#723a1d] transition-colors"
                      aria-label={`Aumentar ${cookie.name}`}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Quick Cart Total Bar */}
          <div className="sticky bottom-16 md:bottom-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 border-2 border-[#8B4A28] shadow-xl flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#4A2C23]/80">
                {totalQuantity === 0
                  ? 'Elegí al menos una galleta para continuar'
                  : `${totalQuantity} galleta${totalQuantity > 1 ? 's' : ''} seleccionada${totalQuantity > 1 ? 's' : ''}`}
              </p>
              <p className="text-xl font-black text-[#8B4A28]">
                Total: {formatColones(totalAmount)}
              </p>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              disabled={totalQuantity === 0}
              className={`py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
                totalQuantity > 0
                  ? 'bg-[#8B4A28] text-white hover:bg-[#723a1d] active:scale-98'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Continuar a tus datos</span>
              <span className="text-base font-bold">→</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TUS DATOS */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-5 md:p-8 border-2 border-[#FBE6A8] shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
            <div>
              <h3 className="text-xl font-display text-[#8B4A28]">Tus datos de entrega</h3>
              <p className="text-xs text-[#4A2C23]/70">
                Llená los datos para que coordinemos tu pedido sin demoras.
              </p>
            </div>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-[#8B4A28] font-bold hover:underline"
            >
              ← Modificar galletas
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-[#8B4A28] mb-1">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej. Sofía Hernández"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#F6F1E6]/40 focus:ring-1 focus:ring-[#8B4A28] ${
                  errors.name ? 'border-red-500' : 'border-[#E2A99D]/60'
                }`}
              />
              {errors.name && (
                <p className="text-[10px] text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-[#8B4A28] mb-1">
                Teléfono / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Ej. 8888-8888"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#F6F1E6]/40 focus:ring-1 focus:ring-[#8B4A28] ${
                  errors.phone ? 'border-red-500' : 'border-[#E2A99D]/60'
                }`}
              />
              {errors.phone && (
                <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Delivery Method Toggle */}
          <div>
            <label className="block text-xs font-bold text-[#8B4A28] mb-1.5">
              ¿Cómo querés recibir tus galletas?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('entrega')}
                className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  deliveryMethod === 'entrega'
                    ? 'border-[#8B4A28] bg-[#FCEFEB] text-[#8B4A28] shadow-xs'
                    : 'border-[#E8E4DC] text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Truck size={18} />
                <span>🚚 Entrega a domicilio</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('retiro')}
                className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  deliveryMethod === 'retiro'
                    ? 'border-[#8B4A28] bg-[#FCEFEB] text-[#8B4A28] shadow-xs'
                    : 'border-[#E8E4DC] text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Store size={18} />
                <span>📍 Retiro personal</span>
              </button>
            </div>
          </div>

          {/* Address field (if delivery) */}
          {deliveryMethod === 'entrega' && (
            <div>
              <label className="block text-xs font-bold text-[#8B4A28] mb-1">
                Dirección exacta o Zona de entrega (GAM) *
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Curridabat, de la Pops 200m este, casa esquinera color crema..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#F6F1E6]/40 focus:ring-1 focus:ring-[#8B4A28] resize-none ${
                  errors.address ? 'border-red-500' : 'border-[#E2A99D]/60'
                }`}
              />
              {errors.address && (
                <p className="text-[10px] text-red-600 mt-1">{errors.address}</p>
              )}
            </div>
          )}

          {/* Desired Date selection */}
          <div>
            <label className="block text-xs font-bold text-[#8B4A28] mb-1.5">
              Día deseado para entrega o retiro:
            </label>
            <div className="flex flex-wrap gap-2">
              {['Jueves', 'Viernes', 'Sábado', 'Hoy mismo (Entrega Inmediata)'].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDesiredDate(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    desiredDate === day
                      ? 'bg-[#8B4A28] text-white border-[#8B4A28]'
                      : 'bg-[#F6F1E6] text-[#4A2C23] border-[#E2A99D]/60 hover:bg-[#FBE6A8]'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#8B4A28] mb-1">
              Comentarios o instrucciones especiales (opcional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej. Es para regalo de cumpleaños / avisar al llegar..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2A99D]/60 text-xs bg-[#F6F1E6]/40 focus:ring-1 focus:ring-[#8B4A28]"
            />
          </div>

          {/* Next button */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E8E4DC]">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-[#8B4A28] font-bold"
            >
              ← Volver al paso 1
            </button>

            <button
              onClick={handleProceedToSummary}
              className="py-3 px-6 rounded-xl bg-[#8B4A28] text-white font-bold text-xs shadow-md hover:bg-[#723a1d] active:scale-98"
            >
              Ver resumen de pedido →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: RESUMEN Y ENVÍO POR WHATSAPP */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-5 md:p-8 border-2 border-[#FBE6A8] shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
            <div>
              <h3 className="text-xl font-display text-[#8B4A28]">Resumen de tu pedido</h3>
              <p className="text-xs text-[#4A2C23]/70">
                Revisá que todo esté en orden antes de mandar a WhatsApp.
              </p>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-[#8B4A28] font-bold hover:underline"
            >
              ← Modificar datos
            </button>
          </div>

          {/* Items breakdown */}
          <div className="bg-[#F6F1E6]/60 rounded-2xl p-4 border border-[#E2A99D]/40 space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#8B4A28] mb-1">
              Galletas seleccionadas:
            </h4>
            {selectedItems.map(({ cookie, quantity, subtotal }) => (
              <div
                key={cookie.id}
                className="flex items-center justify-between text-xs py-1 border-b border-[#E8E4DC]/60 last:border-0"
              >
                <span className="font-bold text-[#4A2C23]">
                  {quantity}x {cookie.name}
                </span>
                <span className="font-extrabold text-[#8B4A28]">
                  {formatColones(subtotal)}
                </span>
              </div>
            ))}

            <div className="pt-2 flex items-center justify-between text-base font-black text-[#8B4A28] border-t border-[#8B4A28]/20">
              <span>Total ({totalQuantity} galletas):</span>
              <span className="text-lg">{formatColones(totalAmount)}</span>
            </div>
          </div>

          {/* Customer info card */}
          <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#FBE6A8] space-y-1.5 text-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#8B4A28] mb-1">
              Datos registrados:
            </h4>
            <p>
              <strong className="text-[#8B4A28]">Nombre:</strong> {customerName}
            </p>
            <p>
              <strong className="text-[#8B4A28]">Teléfono:</strong> {customerPhone}
            </p>
            <p>
              <strong className="text-[#8B4A28]">Método:</strong>{' '}
              {deliveryMethod === 'entrega' ? '🚚 Entrega a domicilio' : '📍 Retiro personal'}
            </p>
            {deliveryMethod === 'entrega' && (
              <p>
                <strong className="text-[#8B4A28]">Dirección:</strong> {address}
              </p>
            )}
            <p>
              <strong className="text-[#8B4A28]">Fecha:</strong> {desiredDate}
            </p>
            {notes && (
              <p>
                <strong className="text-[#8B4A28]">Notas:</strong> {notes}
              </p>
            )}
          </div>

          {/* Big WhatsApp CTA */}
          <div className="pt-2">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-base shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.5)] active:scale-98 transition-all flex items-center justify-center gap-3 text-center"
            >
              <Send size={20} className="fill-white" />
              <span>Enviar pedido por WhatsApp ({formatColones(totalAmount)})</span>
            </a>
            <p className="text-[11px] text-[#4A2C23]/70 text-center mt-2">
              Se abrirá WhatsApp con el mensaje prellenado para coordinar tu pago y entrega.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
