
import React from 'react';
import { QuoteCalculation, QuoteItem } from '../types';
import { formatCurrency } from '../utils/calculations';
import { WHATSAPP_NUMBER } from '../constants';

interface Props {
  calculation: QuoteCalculation;
  activeItem: QuoteItem | null;
  isValid: boolean;
}

const SummaryCard: React.FC<Props> = ({ calculation, activeItem, isValid }) => {
  // Helper to get just the numeric part of the formatted currency for the big display
  const getNumericPart = (value: number) => {
    const formatted = formatCurrency(value, 'TRY');
    return formatted.replace(/[TL|TRY|₺|\s]/g, '').trim();
  };

  const handleWhatsAppConfirm = () => {
    if (!activeItem) return;

    const unitPrice = calculation.grandTotal / activeItem.quantity;
    const logoNote = activeItem.logoUploaded ? "\n*Not:* Logom hazır, size göndereceğim." : "";
    
    const message = `*TEKLİF ONAY TALEBİ*\n` +
      `------------------------\n` +
      `*Ürün:* ${activeItem.variant.name}\n` +
      `*Adet:* ${activeItem.quantity.toLocaleString()} Adet\n` +
      `*Birim Fiyat:* ${formatCurrency(unitPrice)}\n` +
      `*Toplam Tutar:* ${formatCurrency(calculation.grandTotal)} (KDV Dahil)\n` +
      `------------------------${logoNote}\n` +
      `Bu teklif web sitesi üzerinden oluşturulmuştur, mutabakat metni onay beklemektedir.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className={`bg-slate-950 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white transition-all duration-500 ${!isValid ? 'opacity-40 grayscale pointer-events-none scale-95' : 'opacity-100'}`}>
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>

      <div className="relative">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-sm font-black uppercase tracking-widest text-orange-500">Teklif Özeti</h3>
          <span className="text-[10px] font-bold text-slate-500 px-2 py-1 border border-slate-800 rounded">REF-2024-001</span>
        </div>
        
        <div className="space-y-6">
          {/* Internal costs (Base Cost & Profit) hidden from visitor, combined into "Product Price" */}
          <div className="flex justify-between items-center border-b border-slate-900 pb-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-500 uppercase">Ürün ve Üretim Bedeli</span>
              {activeItem && (
                <span className="text-[9px] text-slate-600 uppercase font-medium">
                  {activeItem.variant.name} x {activeItem.quantity.toLocaleString()} Adet
                </span>
              )}
            </div>
            <span className="font-medium text-white">{formatCurrency(calculation.subtotal)}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-slate-900 pb-4">
            <span className="text-xs font-bold text-slate-500 uppercase">KDV Toplamı</span>
            <span className="font-medium text-white">{formatCurrency(calculation.vatTotal)}</span>
          </div>

          <div className="pt-8">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center mb-2">Net Teklif Tutarı</p>
            <div className="text-center">
              <span className="text-5xl font-black text-white tracking-tighter">
                {getNumericPart(calculation.grandTotal)}
              </span>
              <span className="text-lg font-bold text-orange-600 ml-1">TL</span>
            </div>
            <div className="text-center mt-2 text-slate-400 font-bold text-sm">
              ({formatCurrency(calculation.grandTotalUSD, 'USD')})
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-4 font-medium uppercase italic">
              * Fiyatlara belirtilen KDV oranları dahildir.
            </p>
          </div>

          <div className="pt-6 space-y-3">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-orange-900/20 active:scale-95 flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              PDF TEKLİF İNDİR
            </button>
            
            <button 
              onClick={handleWhatsAppConfirm}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WHATSAPP İLE ONAYLA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
