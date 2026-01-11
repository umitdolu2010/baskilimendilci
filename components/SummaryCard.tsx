
import React from 'react';
import { QuoteCalculation, QuoteItem, ProductType } from '../types.ts';
import { formatCurrency } from '../utils/calculations.ts';
import { WHATSAPP_NUMBER } from '../constants.ts';

interface Props {
  calculation: QuoteCalculation;
  activeItem: QuoteItem | null;
  isValid: boolean;
  onAddToCart: () => void;
}

const SummaryCard: React.FC<Props> = ({ calculation, activeItem, isValid, onAddToCart }) => {
  const getNumericPart = (value: number) => {
    const formatted = formatCurrency(value, 'TRY');
    return formatted.replace(/[TL|TRY|₺|\s]/g, '').trim();
  };

  const getWhatsAppUrl = () => {
    if (!activeItem) return "";
    const unitPrice = calculation.grandTotal / activeItem.quantity;
    const logoNote = activeItem.logoUploaded ? "\n*Logom hazır.*" : "";
    let technicalDetails = "";
    let productName = activeItem.variant.name;
    if (activeItem.variant.type === ProductType.KolonyaliMendil) {
      productName = `80 Derece Kolonyalı Mendil (Esans: ${activeItem.essence || 'Limon'})`;
      technicalDetails = `\n*Detaylar:* ${activeItem.paperType}, ${activeItem.towelQuality}`;
    } else if (activeItem.variant.type === ProductType.Mendil) {
      technicalDetails = `\n*Detaylar:* ${activeItem.alcoholOption}, ${activeItem.paperType}, ${activeItem.towelQuality}`;
    }
    const message = `*TEKLİF TALEBİ*\n------------------------\n*Ürün:* ${productName}${technicalDetails}\n*Adet:* ${activeItem.quantity.toLocaleString()} Adet\n*Toplam:* ${formatCurrency(calculation.grandTotal)}\n------------------------${logoNote}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className={`bg-slate-950 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white transition-all duration-500 ${!isValid ? 'opacity-40 grayscale pointer-events-none scale-95' : 'opacity-100'}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      
      <div className="relative">
        <h3 className="text-sm font-black uppercase tracking-widest text-orange-500 mb-10">Teklif Özeti</h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-900 pb-4">
            <span className="text-xs font-bold text-slate-500 uppercase">Ara Toplam</span>
            <span className="font-medium text-white">{formatCurrency(calculation.subtotal)}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-900 pb-4">
            <span className="text-xs font-bold text-slate-500 uppercase">KDV (%20)</span>
            <span className="font-medium text-white">{formatCurrency(calculation.vatTotal)}</span>
          </div>

          <div className="pt-8">
            <div className="text-center">
              <span className="text-5xl font-black text-white tracking-tighter">{getNumericPart(calculation.grandTotal)}</span>
              <span className="text-lg font-bold text-orange-600 ml-1">TL</span>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button 
              onClick={onAddToCart}
              className="w-full bg-white text-slate-950 font-black py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 text-xs uppercase tracking-widest"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
              Siparişi Sepete Ekle
            </button>
            <a 
              href={getWhatsAppUrl()} 
              target="_blank" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest no-underline"
            >
              WhatsApp ile Teklif Al
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
