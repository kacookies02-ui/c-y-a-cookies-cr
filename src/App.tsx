/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, TabKey } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';
import { NuevosProductosTab } from './components/tabs/NuevosProductosTab';
import { OpinionesTab } from './components/tabs/OpinionesTab';
import { PedidosTab } from './components/tabs/PedidosTab';
import { NuestroMenuTab } from './components/tabs/NuestroMenuTab';

export default function App() {
  // Pestaña inicial: "Nuevos Productos" según especificación
  const [activeTab, setActiveTab] = useState<TabKey>('nuevos-productos');

  // Estado del carrito de pedidos: { [cookieId]: cantidad }
  const [cart, setCart] = useState<Record<string, number>>({});

  // Total de galletas en el pedido
  const totalOrderCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // Agregar galleta al pedido
  const handleAddToCart = (cookieId: string) => {
    setCart((prev) => ({
      ...prev,
      [cookieId]: (prev[cookieId] || 0) + 1,
    }));
  };

  // Pedir galleta desde un flyer promocional: agrega y navega a Pedidos
  const handleOrderCookieFromFlyer = (cookieId: string) => {
    setCart((prev) => ({
      ...prev,
      [cookieId]: (prev[cookieId] || 0) + 1,
    }));
    setActiveTab('pedidos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Actualizar cantidad específica
  const handleUpdateQuantity = (cookieId: string, quantity: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[cookieId];
      } else {
        updated[cookieId] = quantity;
      }
      return updated;
    });
  };

  // Vaciar carrito
  const handleClearCart = () => {
    setCart({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E6] text-[#4A2C23] relative selection:bg-[#E2A99D] selection:text-[#4A2C23]">
      {/* Background Organic Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 -left-12 w-64 h-64 rounded-full bg-[#EBC1B6]/20 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#FBE6A8]/30 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-[#F28C28]/10 blur-3xl" />
      </div>

      {/* Header fijo con Logo y Navegación de Escritorio */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        orderCount={totalOrderCount}
      />

      {/* Contenido Principal según pestaña activa */}
      <main className="flex-1 w-full pb-16 md:pb-8">
        <div className="transition-opacity duration-300">
          {activeTab === 'nuevos-productos' && (
            <NuevosProductosTab onOrderCookie={handleOrderCookieFromFlyer} />
          )}

          {activeTab === 'opiniones' && <OpinionesTab />}

          {activeTab === 'pedidos' && (
            <PedidosTab
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={handleClearCart}
            />
          )}

          {activeTab === 'nuestro-menu' && (
            <NuestroMenuTab
              onAddToCart={handleAddToCart}
              onGoToPedidos={() => {
                setActiveTab('pedidos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              cart={cart}
            />
          )}
        </div>
      </main>

      {/* Botón Flotante Redondo de WhatsApp */}
      <WhatsAppButton />

      {/* Barra de Navegación Móvil Fija Abajo */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        orderCount={totalOrderCount}
      />

      {/* Pie de Página Mínimo */}
      <Footer />
    </div>
  );
}
