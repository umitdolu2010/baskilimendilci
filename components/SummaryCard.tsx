
import React, { useEffect, useState } from 'react';
import { QuoteItem, ProductType, LeadData } from '../types.ts';
import { WHATSAPP_NUMBER } from '../constants.ts';
import { calculateQuote, formatCurrency } from '../utils/calculations.ts';

interface Props {
  activeItem: QuoteItem | null;
  isValid: boolean;
}

const SummaryCard: React.FC<Props> = ({ activeItem, isValid }) => {
  const [lead, setLead] = React.useState<LeadData>({ fullName: '', phone: '', note: '' });
  const [discountRate, setDiscountRate] = React.useState<number>(0);
  const [isClientView, setIsClientView] = React.useState(false);
  const [customerPhoneForLink, setCustomerPhoneForLink] = React.useState('');

  useEffect(() => {
    // Check if we are in client view mode based on URL
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('view') === 'client') {
      setIsClientView(true);
    }
  }, []);

  // İskonto oranını calculateQuote fonksiyonuna gönderiyoruz
  const calculation = activeItem ? calculateQuote([activeItem], discountRate) : null;

  const getWhatsAppUrl = () => {
    if (!activeItem || !calculation || !lead.fullName) return "#";
    
    let details = `*TÜR:* ${activeItem.variant.type}\n*MODEL:* ${activeItem.variant.name}\n*ADET:* ${activeItem.quantity.toLocaleString()}\n*RENK:* ${activeItem.colorCount}`;
    
    if (activeItem.alcoholOption) details += `\n*İÇERİK:* ${activeItem.alcoholOption} / ${activeItem.essence}`;
    if (activeItem.logoUploaded) details += `\n*LOGO:* Dosya Eklendi 📎`;
    if (discountRate > 0) details += `\n*İSKONTO:* %${discountRate * 100} Uygulandı`;
    
    // Birim fiyatı hesaplarken iskonto düşülmüş toplam üzerinden gidiyoruz
    const unitPrice = calculation.subtotal / activeItem.quantity;
    const totals = `*BİRİM FİYAT:* ${formatCurrency(unitPrice)}\n*GENEL TOPLAM:* ${formatCurrency(calculation.grandTotal)}`;

    const message = `*FİYAT TEKLİFİ FORMU* 📄\n--------------------------------\n*Firma:* ${lead.fullName}\n*Tel:* ${lead.phone}\n--------------------------------\n${details}\n--------------------------------\n${totals}\n--------------------------------\n*Not:* ${lead.note || '-'}`;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const sendLinkToCustomer = () => {
    if (customerPhoneForLink.length < 10) {
      alert("Lütfen geçerli bir telefon numarası giriniz.");
      return;
    }
    // Create the link to the current page with 'view=client' parameter
    const baseUrl = window.location.origin + window.location.pathname;
    const clientLink = `${baseUrl}?view=client`;
    const message = `Merhaba, Eran Tedarik maliyet hesaplama aracımıza buradan ulaşarak güncel fiyatları inceleyebilirsiniz: ${clientLink}`;
    
    const waLink = `https://wa.me/90${customerPhoneForLink.replace(/^0+/, '')}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  };

  if (!activeItem || !calculation) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center h-full flex flex-col justify-center items-center opacity-50">
         <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
         </div>
         <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Hesaplama yapmak için<br/>soldan ürün seçiniz.</p>
      </div>
    );
  }

  const isFormValid = lead.fullName.length > 2;
  const unitPrice = calculation.subtotal / activeItem.quantity;

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden sticky top-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xs font-black text-amber-500 uppercase tracking-[0.2em]">Teklif Özeti</h3>
           
           {/* İskonto Seçici - Sadece Yönetici Görür (Client View Değilse) */}
           {!isClientView && (
             <div className="relative">
                <select 
                  value={discountRate}
                  onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
                  className="bg-slate-800 border border-slate-700 text-white text-[10px] font-bold uppercase rounded-lg py-1 px-2 outline-none focus:border-amber-500 appearance-none pr-6 cursor-pointer"
                >
                  <option value="0">İndirim Yok</option>
                  <option value="0.05">%5 İndirim</option>
                  <option value="0.10">%10 İndirim</option>
                  <option value="0.15">%15 İndirim</option>
                  <option value="0.20">%20 İndirim</option>
                  <option value="0.25">%25 İndirim</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
             </div>
           )}
        </div>
        
        {/* Fiş Görünümü */}
        <div className="space-y-4 mb-8">
           <div className="flex justify-between items-start pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Seçilen Ürün</span>
                <span className="text-lg font-bold leading-tight block">{activeItem.variant.name}</span>
                <span className="text-xs text-slate-400 mt-1 block">{activeItem.quantity.toLocaleString()} Adet • {activeItem.colorCount} Renk Baskı</span>
                {activeItem.logoUploaded && (
                  <span className="inline-flex items-center gap-1 mt-2 text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Logo Eklendi
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Birim Fiyat</span>
                <span className="text-lg font-mono font-medium text-amber-400">
                  {formatCurrency(unitPrice)}
                </span>
                <span className="text-[9px] text-slate-500 block">+KDV</span>
              </div>
           </div>

           <div className="space-y-2 py-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Ara Toplam (Klişe Dahil)</span>
                <span>{formatCurrency(calculation.subtotal)}</span>
              </div>
              
              {discountRate > 0 && (
                <div className="flex justify-between text-xs text-green-400 font-bold">
                  <span>İskonto (%{discountRate * 100})</span>
                  <span>-İndirimli Fiyat Uygulandı</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-slate-400">
                <span>KDV (%{(activeItem.variant.vatRate * 100).toFixed(0)})</span>
                <span>{formatCurrency(calculation.vatTotal)}</span>
              </div>
           </div>

           <div className="pt-4 border-t border-white/10 flex justify-between items-end">
              <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">Genel Toplam</span>
              <span className="text-3xl font-black text-white tracking-tight">{formatCurrency(calculation.grandTotal)}</span>
           </div>
        </div>

        {/* Hızlı Form */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-3">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Teklifi Oluştur & Gönder</p>
           <input 
              type="text" 
              placeholder="Firma Ünvanı"
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-500 transition-colors"
              value={lead.fullName}
              onChange={e => setLead({...lead, fullName: e.target.value})}
            />
            <input 
              type="tel" 
              placeholder="İletişim Numarası"
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-500 transition-colors"
              value={lead.phone}
              onChange={e => setLead({...lead, phone: e.target.value})}
            />
            <textarea 
              placeholder="Notunuz..."
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-500 transition-colors h-12 resize-none"
              value={lead.note}
              onChange={e => setLead({...lead, note: e.target.value})}
            />
            
            <a 
              href={getWhatsAppUrl()} 
              target={isFormValid ? "_blank" : undefined}
              className={`block w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all ${
                isFormValid 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              WhatsApp Teklif Al
            </a>
        </div>

        {/* Yönetici Paneli - Müşteriye Link Gönder */}
        {!isClientView && (
          <div className="mt-6 pt-6 border-t border-white/10">
             <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-2">Müşteriye Link Gönder</p>
             <div className="flex gap-2">
                <input 
                  type="tel" 
                  placeholder="5XX XXX XX XX" 
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                  value={customerPhoneForLink}
                  onChange={e => setCustomerPhoneForLink(e.target.value)}
                />
                <button 
                  onClick={sendLinkToCustomer}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 rounded-lg transition-colors whitespace-nowrap"
                >
                  Gönder
                </button>
             </div>
             <p className="text-[9px] text-slate-500 mt-2">
               *Müşteriye gönderilen linkte indirim paneli gizlenir.
             </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SummaryCard;
