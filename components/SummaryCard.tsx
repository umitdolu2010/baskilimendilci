
import React, { useEffect } from 'react';
import { QuoteItem, LeadData } from '../types.ts';
import { WHATSAPP_NUMBER } from '../constants.ts';
import { calculateQuote, formatCurrency } from '../utils/calculations.ts';

interface Props {
  items: QuoteItem[];
  onRemove: (index: number) => void;
}

const SummaryCard: React.FC<Props> = ({ items, onRemove }) => {
  const [lead, setLead] = React.useState<LeadData>({ fullName: '', phone: '', note: '' });
  const [discountRate, setDiscountRate] = React.useState<number>(0);
  const [isClientView, setIsClientView] = React.useState(false);
  const [customerPhoneForLink, setCustomerPhoneForLink] = React.useState('');
  const [includeVat, setIncludeVat] = React.useState(true); // KDV Durumu

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('view') === 'client') {
      setIsClientView(true);
    }
  }, []);

  // Tüm listenin hesaplaması
  const calculation = items.length > 0 ? calculateQuote(items, discountRate) : null;

  const getWhatsAppUrl = () => {
    if (items.length === 0 || !calculation || !lead.fullName) return "#";
    
    let messageParts = [`*FİYAT TEKLİFİ FORMU* 📄`, `--------------------------------`];
    messageParts.push(`*Firma:* ${lead.fullName}`);
    messageParts.push(`*Tel:* ${lead.phone}`);
    messageParts.push(`--------------------------------`);
    messageParts.push(`*SEÇİLEN ÜRÜNLER:*`);

    items.forEach((item, index) => {
      let itemDetail = `${index + 1}. ${item.variant.name} (${item.quantity.toLocaleString()} Adet)`;
      itemDetail += `\n   - Renk: ${item.colorCount}`;
      if (item.alcoholOption) itemDetail += `\n   - ${item.alcoholOption} / ${item.essence}`;
      messageParts.push(itemDetail);
    });

    messageParts.push(`--------------------------------`);
    if (discountRate > 0) messageParts.push(`*İSKONTO:* %${discountRate * 100} Uygulandı`);
    
    const finalTotal = includeVat ? calculation.grandTotal : calculation.subtotal;
    messageParts.push(`*KDV DURUMU:* ${includeVat ? 'Dahil' : 'Hariç'}`);
    messageParts.push(`*GENEL TOPLAM:* ${formatCurrency(finalTotal)}`);
    
    messageParts.push(`--------------------------------`);
    messageParts.push(`*Not:* ${lead.note || '-'}`);
    
    const message = messageParts.join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const sendLinkToCustomer = () => {
    if (customerPhoneForLink.length < 10) {
      alert("Lütfen geçerli bir telefon numarası giriniz.");
      return;
    }
    const baseUrl = window.location.origin + window.location.pathname;
    const clientLink = `${baseUrl}?view=client`;
    const message = `Merhaba, Eran Tedarik maliyet hesaplama aracımıza buradan ulaşarak güncel fiyatları inceleyebilirsiniz: ${clientLink}`;
    
    const waLink = `https://wa.me/90${customerPhoneForLink.replace(/^0+/, '')}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  };

  if (items.length === 0 || !calculation) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center h-full flex flex-col justify-center items-center opacity-50 min-h-[400px]">
         <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
         </div>
         <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Teklif listeniz boş.<br/>Ürün seçip "Listeye Ekle" butonuna basın.</p>
      </div>
    );
  }

  const isFormValid = lead.fullName.length > 2;
  const displayTotal = includeVat ? calculation.grandTotal : calculation.subtotal;

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden sticky top-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xs font-black text-amber-500 uppercase tracking-[0.2em]">Teklif Özeti ({items.length})</h3>
           
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
        
        {/* Ürün Listesi */}
        <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
           {items.map((item, idx) => (
             <div key={idx} className="flex justify-between items-start pb-4 border-b border-white/10 last:border-0 relative group">
                <div>
                  <span className="text-[9px] text-amber-500 font-bold uppercase block mb-1">{idx + 1}. {item.variant.type}</span>
                  <span className="text-sm font-bold leading-tight block">{item.variant.name}</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {(item.quantity / 1000)} Bin Adet • {item.colorCount} Renk
                    {item.alcoholOption && ` • ${item.alcoholOption}`}
                  </span>
                </div>
                <div className="text-right pl-4">
                  <button 
                    onClick={() => onRemove(idx)}
                    className="text-[9px] text-red-400 hover:text-red-300 underline mb-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Kaldır
                  </button>
                  {/* Birim fiyat hesaplaması yaklaşık olarak */}
                  <span className="block text-sm font-mono text-slate-300">
                    {formatCurrency(calculateQuote([item]).subtotal)}
                  </span>
                </div>
             </div>
           ))}
        </div>

        {/* Toplamlar */}
        <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-white/5">
           <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Ara Toplam</span>
                <span>{formatCurrency(calculation.subtotal / (1 - discountRate))}</span>
              </div>
              
              {discountRate > 0 && (
                <div className="flex justify-between text-xs text-green-400 font-bold">
                  <span>İskonto (%{discountRate * 100})</span>
                  <span>-{formatCurrency((calculation.subtotal / (1 - discountRate)) - calculation.subtotal)}</span>
                </div>
              )}

              {/* KDV Toggle Switch */}
              <div 
                onClick={() => setIncludeVat(!includeVat)}
                className="flex justify-between items-center text-xs text-slate-400 cursor-pointer group select-none py-1"
              >
                 <div className="flex items-center gap-2">
                    <div className={`w-7 h-4 rounded-full p-0.5 transition-colors duration-300 ${includeVat ? 'bg-amber-600' : 'bg-slate-700'}`}>
                       <div className={`w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${includeVat ? 'translate-x-3' : 'translate-x-0'}`}></div>
                    </div>
                    <span className="group-hover:text-white transition-colors">KDV {includeVat ? 'Dahil' : 'Hariç'}</span>
                 </div>
                 <span className={`${!includeVat ? 'opacity-40 line-through' : 'text-white'}`}>
                   {formatCurrency(calculation.vatTotal)}
                 </span>
              </div>
           </div>

           <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-end">
              <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">Genel Toplam</span>
              <span className="text-2xl font-black text-white tracking-tight">{formatCurrency(displayTotal)}</span>
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
              WhatsApp Sipariş Oluştur
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
