
import React from 'react';
import { ProductVariant, QuoteItem } from '../types';
import { PRODUCT_VARIANTS } from '../constants';
import { formatCurrency } from '../utils/calculations';

interface Props {
  onUpdate: (item: QuoteItem | null) => void;
}

const ProductSelector: React.FC<Props> = ({ onUpdate }) => {
  const [selectedVariantId, setSelectedVariantId] = React.useState(PRODUCT_VARIANTS[0].id);
  const [quantity, setQuantity] = React.useState<number>(50000);
  const [colors, setColors] = React.useState<number>(1);
  const [logoUploaded, setLogoUploaded] = React.useState<boolean>(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (quantity < 10000) {
      setError("Minimum sipariş 10.000 adettir.");
      onUpdate(null);
    } else {
      setError(null);
      const variant = PRODUCT_VARIANTS.find(v => v.id === selectedVariantId);
      if (variant) {
        onUpdate({ variant, quantity, colorCount: colors, logoUploaded });
      }
    }
  }, [selectedVariantId, quantity, colors, logoUploaded]);

  const handleQuantityChange = (val: number) => {
    setQuantity(val);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoUploaded(true);
      setFileName(file.name);
    } else {
      setLogoUploaded(false);
      setFileName(null);
    }
  };

  return (
    <div className="space-y-12">
      {/* Product Selection */}
      <section>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">1. Ürün Seçimi</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRODUCT_VARIANTS.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVariantId(v.id)}
              className={`text-left p-6 rounded-2xl border-2 transition-all ${
                selectedVariantId === v.id 
                ? 'border-orange-500 bg-white shadow-xl shadow-orange-500/10' 
                : 'border-slate-100 hover:border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <p className={`text-[10px] font-black uppercase tracking-widest ${selectedVariantId === v.id ? 'text-orange-500' : 'text-slate-400'}`}>
                  {v.type}
                </p>
                {selectedVariantId === v.id && (
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-base font-black text-slate-900 mt-2">{v.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Quantity Section */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">2. Sipariş Miktarı</label>
          <div className="flex items-center gap-2">
            <input 
              type="number"
              className={`w-36 text-right text-2xl font-black bg-white border-b-2 outline-none px-2 py-1 transition-colors ${error ? 'border-red-500 text-red-500' : 'border-slate-900 text-slate-900'}`}
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
            />
            <span className="text-xs font-black text-slate-400 uppercase">Adet</span>
          </div>
        </div>
        <input
          type="range"
          min="5000"
          max="100000"
          step="5000"
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          value={quantity > 100000 ? 100000 : quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
        />
        <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>10.000 Min.</span>
          <span>50.000</span>
          <span>100.000+</span>
        </div>
        
        {/* Production Variance Note */}
        <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
          <svg className="w-4 h-4 text-orange-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Önemli: Özel üretimlerde sevkiyat adetlerinde <span className="text-slate-900">+/-% 5-10</span> fark oluşabilir.
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}
      </section>

      {/* Color Selection & Logo Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">3. Baskı Renk Sayısı</label>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <button
                key={num}
                onClick={() => setColors(num)}
                className={`w-12 h-12 rounded-xl border-2 font-black text-sm transition-all flex items-center justify-center ${
                  colors === num 
                  ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">4. Logonuzu Yükleyin (Opsiyonel)</label>
          <div className="relative">
            <input
              type="file"
              id="logo-upload"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,.pdf,.ai,.eps"
            />
            <label
              htmlFor="logo-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                logoUploaded ? 'bg-emerald-50 border-emerald-300 text-emerald-600' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {logoUploaded ? (
                <>
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[10px] font-black uppercase text-center px-4 line-clamp-1">{fileName || 'Yüklendi'}</p>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dosya Seçin</p>
                </>
              )}
            </label>
          </div>
        </section>
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
         <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
         <p className="text-[10px] text-blue-700 font-bold uppercase leading-relaxed tracking-tight">
           Klişe bedeli, ilk siparişte her renk için 750,00 TL olarak bir kez yansıtılır. Tekrar siparişlerinde klişe bedeli alınmaz.
         </p>
      </div>
    </div>
  );
};

export default ProductSelector;
