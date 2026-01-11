
import React from 'react';
import { QuoteItem, CheckoutData } from '../types';
import { formatCurrency, calculateQuote } from '../utils/calculations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onOrderComplete: () => void;
}

const Cart: React.FC<Props> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onOrderComplete }) => {
  const [step, setStep] = React.useState<'cart' | 'checkout' | 'payment' | 'success'>('cart');
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<CheckoutData>({
    fullName: '', email: '', phone: '', address: '', taxNumber: '', taxOffice: '', isCorporate: true
  });

  const calculation = calculateQuote(items);

  const handleFinalCheckout = async () => {
    setLoading(true);
    // Burada normalde Vercel API'mıza (/api/pay) istek atacağız
    // Simüle ediyoruz:
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* Step-based Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950 tracking-tighter uppercase">
            {step === 'cart' ? 'SEPETİNİZ' : step === 'checkout' ? 'TESLİMAT' : step === 'payment' ? 'ÖDEME' : 'TEBRİKLER'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 && step !== 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Sepetiniz Boş</p>
            </div>
          ) : step === 'cart' ? (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group transition-all hover:border-orange-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{item.variant.type}</span>
                    <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                  <h4 className="font-black text-slate-900 mb-4">{item.variant.name}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <button onClick={() => onUpdateQuantity(item.id, Math.max(10000, item.quantity - 5000))} className="px-3 py-1 hover:bg-slate-50 text-slate-400 font-bold">-</button>
                      <span className="px-3 text-xs font-black text-slate-900 border-x border-slate-200">{item.quantity / 1000}K</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 5000)} className="px-3 py-1 hover:bg-slate-50 text-slate-400 font-bold">+</button>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">
                      {formatCurrency((calculateQuote([item]).grandTotal))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : step === 'checkout' ? (
            <div className="space-y-4">
               <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6">
                 <button onClick={() => setFormData({...formData, isCorporate: false})} className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${!formData.isCorporate ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>Bireysel</button>
                 <button onClick={() => setFormData({...formData, isCorporate: true})} className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${formData.isCorporate ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>Kurumsal</button>
               </div>
               <div className="space-y-3">
                 <input type="text" placeholder="Ad Soyad / Firma Ünvanı" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 transition-colors text-sm font-medium" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                 <input type="email" placeholder="E-Posta Adresi" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 transition-colors text-sm font-medium" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                 <input type="tel" placeholder="GSM Numarası" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 transition-colors text-sm font-medium" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                 <textarea placeholder="Teslimat Adresi" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 transition-colors text-sm font-medium h-24" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                 {formData.isCorporate && (
                   <div className="grid grid-cols-2 gap-4 animate-slide-in-bottom">
                      <input type="text" placeholder="Vergi No" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-500" value={formData.taxNumber} onChange={e => setFormData({...formData, taxNumber: e.target.value})} />
                      <input type="text" placeholder="Vergi Dairesi" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-500" value={formData.taxOffice} onChange={e => setFormData({...formData, taxOffice: e.target.value})} />
                   </div>
                 )}
               </div>
            </div>
          ) : step === 'payment' ? (
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center justify-between">
                <img src="https://www.iyzico.com/assets/images/logo/iyzico-logo.svg" alt="Iyzico" className="h-5" />
                <div className="flex gap-2">
                   <div className="w-8 h-5 bg-white border border-slate-200 rounded flex items-center justify-center text-[6px] font-bold">VISA</div>
                   <div className="w-8 h-5 bg-white border border-slate-200 rounded flex items-center justify-center text-[6px] font-bold">MC</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="group">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Kart Üzerindeki İsim</label>
                  <input type="text" placeholder="JOHN DOE" className="w-full p-4 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-colors font-bold text-sm" />
                </div>
                <div className="group">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Kart Numarası</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-colors font-bold text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Son Kullanma</label>
                     <input type="text" placeholder="AA/YY" className="w-full p-4 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-colors font-bold text-sm" />
                   </div>
                   <div>
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">CVC</label>
                     <input type="password" placeholder="***" className="w-full p-4 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-colors font-bold text-sm" />
                   </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <p className="text-[10px] text-slate-500 font-medium leading-tight">İşleminiz 256-bit SSL sertifikası ve Iyzico güvencesi ile %100 güvenli olarak tamamlanacaktır.</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
               <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
                  <svg className="w-12 h-12 text-emerald-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
               </div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-4">Sipariş Alındı!</h3>
               <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                 Ödemeniz başarıyla tamamlandı. Grafik ekibimiz en kısa sürede sizinle iletişime geçerek tasarım onayınızı alacaktır.
               </p>
               <button onClick={() => { onOrderComplete(); onClose(); }} className="bg-slate-900 text-white font-black px-10 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl">Kapat</button>
            </div>
          )}
        </div>

        {/* Dynamic Footer */}
        {step !== 'success' && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Ödenecek Tutar</span>
              <span className="text-xl font-black text-slate-950">{formatCurrency(calculation.grandTotal)}</span>
            </div>
            
            {items.length > 0 && (
              <button 
                disabled={loading}
                onClick={() => {
                  if (step === 'cart') setStep('checkout');
                  else if (step === 'checkout') setStep('payment');
                  else handleFinalCheckout();
                }}
                className={`w-full ${loading ? 'bg-slate-400' : 'bg-slate-950 hover:bg-slate-800'} text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-xs h-16`}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <>
                    {step === 'cart' ? 'TESLİMAT BİLGİLERİ' : step === 'checkout' ? 'ÖDEMEYE GEÇ' : 'SİPARİŞİ TAMAMLA'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </button>
            )}
            
            {step !== 'cart' && !loading && (
              <button onClick={() => setStep(step === 'payment' ? 'checkout' : 'cart')} className="w-full mt-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors py-2">
                Geri Dön
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
