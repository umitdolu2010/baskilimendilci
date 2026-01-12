
import React from 'react';
import { QuoteItem, ProductType, LeadData } from '../types.ts';
import { WHATSAPP_NUMBER } from '../constants.ts';

interface Props {
  activeItem: QuoteItem | null;
  isValid: boolean;
}

const SummaryCard: React.FC<Props> = ({ activeItem, isValid }) => {
  const [lead, setLead] = React.useState<LeadData>({ fullName: '', phone: '', note: '' });

  const getWhatsAppUrl = () => {
    if (!activeItem || !lead.fullName || !lead.phone) return "#";
    
    const logoStatus = activeItem.logoUploaded ? "✅ Mevcut (Vektörel)" : "❌ Tasarım Desteği İstiyorum";
    let details = `*Ürün:* ${activeItem.variant.name}\n*Miktar:* ${activeItem.quantity.toLocaleString()} Adet\n*Baskı:* ${activeItem.colorCount} Renkli`;
    
    if (activeItem.variant.type !== ProductType.Seker) {
      details += `\n*Alkol:* ${activeItem.alcoholOption}\n*Esans:* ${activeItem.essence || 'Standart'}`;
    }
    
    const message = `*YENİ TEKLİF TALEBİ* 🚀\n--------------------------------\n*Müşteri:* ${lead.fullName}\n*Telefon:* ${lead.phone}\n--------------------------------\n${details}\n*Logo Durumu:* ${logoStatus}\n--------------------------------\n*Müşteri Notu:* ${lead.note || 'Yok'}\n--------------------------------\n_Lütfen bana bu ürün için özel bir fiyat teklifi hazırlayın._`;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const isFormValid = lead.fullName.length > 2 && lead.phone.length > 8;

  return (
    <div className={`bg-slate-950 rounded-[2.5rem] p-10 shadow-3xl relative overflow-hidden text-white transition-all duration-500 ${!isValid ? 'opacity-40 grayscale pointer-events-none scale-95' : 'opacity-100'}`}>
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      
      <div className="relative">
        <div className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-2">Özel Teklif Formu</h3>
          <p className="text-2xl font-black tracking-tighter leading-tight">Size Özel Teklif İçin <br/> Bilgilerinizi Paylaşın</p>
        </div>
        
        <div className="space-y-4">
          <div className="group">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Ad Soyad / Firma Ünvanı *</label>
            <input 
              type="text" 
              placeholder="Örn: Mehmet Yılmaz / Gastro Cafe"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-orange-500 transition-all placeholder:text-slate-600"
              value={lead.fullName}
              onChange={e => setLead({...lead, fullName: e.target.value})}
            />
          </div>

          <div className="group">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Telefon Numarası *</label>
            <input 
              type="tel" 
              placeholder="05xx xxx xx xx"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-orange-500 transition-all placeholder:text-slate-600"
              value={lead.phone}
              onChange={e => setLead({...lead, phone: e.target.value})}
            />
          </div>

          <div className="group">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Varsa Notunuz</label>
            <textarea 
              placeholder="Eklemek istediğiniz detaylar..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-orange-500 transition-all h-24 placeholder:text-slate-600"
              value={lead.note}
              onChange={e => setLead({...lead, note: e.target.value})}
            />
          </div>

          <div className="pt-8">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 mb-6 text-center">
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Maliyet Hesaplama Tamamlandı</p>
              <p className="text-xs font-medium text-slate-300">En uygun fiyat teklifi için hazırız.</p>
            </div>

            <a 
              href={getWhatsAppUrl()} 
              target={isFormValid ? "_blank" : undefined}
              className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                isFormValid 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl shadow-emerald-600/20 active:scale-95' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              TEKLİF İSTE (WHATSAPP)
            </a>
            {!isFormValid && (
              <p className="text-[10px] text-slate-600 text-center mt-4 font-medium italic">
                Lütfen zorunlu alanları (*) doldurunuz.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
