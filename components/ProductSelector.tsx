
import React from 'react';
import { ProductVariant, QuoteItem, ProductType } from '../types.ts';
import { PRODUCT_VARIANTS } from '../constants.ts';
import { calculateQuote, formatCurrency } from '../utils/calculations.ts';

interface Props {
  onAdd: (item: QuoteItem) => void;
}

const ProductSelector: React.FC<Props> = ({ onAdd }) => {
  const [selectedType, setSelectedType] = React.useState<ProductType>(ProductType.Mendil);
  const [selectedVariantId, setSelectedVariantId] = React.useState('');
  const [quantity, setQuantity] = React.useState<number>(10000);
  const [colorCount, setColorCount] = React.useState<number>(1);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  
  // Özelleştirme State'leri
  const [alcohol, setAlcohol] = React.useState('Alkolsüz');
  const [essence, setEssence] = React.useState('Limon');
  
  const filteredVariants = PRODUCT_VARIANTS.filter(v => v.type === selectedType);
  
  React.useEffect(() => {
    if (filteredVariants.length > 0) {
      setSelectedVariantId(filteredVariants[0].id);
    }
  }, [selectedType]);

  const selectedVariant = PRODUCT_VARIANTS.find(v => v.id === selectedVariantId);

  // Anlık fiyat hesaplama (Buton üzerinde göstermek için)
  const currentItemPreview: QuoteItem | null = selectedVariant ? {
    id: 'preview',
    variant: selectedVariant,
    quantity,
    colorCount,
    logoUploaded: !!logoFile,
    alcoholOption: selectedType === ProductType.Mendil ? alcohol : undefined,
    essence: selectedType === ProductType.Mendil ? essence : undefined
  } : null;

  const currentCalculation = currentItemPreview ? calculateQuote([currentItemPreview]) : null;

  const handleAddItem = () => {
    if (currentItemPreview) {
      // Create a unique ID for the list item
      const newItem = {
        ...currentItemPreview,
        id: Math.random().toString(36).substr(2, 9)
      };
      onAdd(newItem);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    }
  };

  const renderColorDots = (count: number) => {
    const colors = ['bg-slate-800', 'bg-blue-500', 'bg-red-500', 'bg-yellow-400'];
    return (
      <div className="flex gap-0.5 justify-center mt-1">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${colors[i] || 'bg-slate-300'}`}></div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Ürün Grubu (Yatay Kaydırmalı) */}
      <section>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">1. Ürün Grubu Seçiniz</label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {Object.values(ProductType).map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-tight transition-all whitespace-nowrap ${
                selectedType === type 
                ? 'border-amber-600 bg-amber-600 text-white shadow-md shadow-amber-500/20' 
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Varyant / Ebat Seçimi */}
      <section className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">2. Model / Ebat Seçimi</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filteredVariants.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVariantId(v.id)}
              className={`py-3 px-3 rounded-xl border text-[11px] font-bold transition-all text-left relative overflow-hidden group ${
                selectedVariantId === v.id 
                ? 'bg-white border-amber-600 text-amber-700 shadow-sm ring-1 ring-amber-500/20' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="relative z-10">{v.name.replace(`${selectedType}`, '').trim()}</span>
              {selectedVariantId === v.id && (
                <div className="absolute right-0 top-0 w-6 h-6 bg-amber-600 rounded-bl-xl flex items-center justify-center">
                   <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Adet & Renk (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">3. Sipariş Adeti</label>
          <div className="grid grid-cols-3 gap-2">
            {[10000, 20000, 30000, 40000, 50000].map(qty => (
              <button
                key={qty}
                onClick={() => setQuantity(qty)}
                className={`py-2.5 rounded-lg text-xs font-black transition-all border ${
                  quantity === qty 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {qty / 1000} Bin
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">4. Baskı Rengi</label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(count => (
              <button
                key={count}
                onClick={() => setColorCount(count)}
                className={`py-2 rounded-lg border transition-all flex flex-col items-center justify-center ${
                  colorCount === count 
                  ? 'border-amber-600 bg-amber-50 text-amber-700 font-bold' 
                  : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-xs">{count} Renk</span>
                {renderColorDots(count)}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Ek Özellikler (Mendil Grubu için) */}
      {selectedType === ProductType.Mendil && (
        <section className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100">
            <h4 className="text-xs font-black text-amber-800 uppercase tracking-wide mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.477 2.387a2 2 0 00.547 1.022l1.428 1.428a2 2 0 002.828 0l1.428-1.428a2 2 0 000-2.828l-1.428-1.428z" /></svg>
              İçerik Özellikleri
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-amber-600 uppercase tracking-wider mb-2 block">Alkol Seviyesi</label>
                  <div className="flex gap-1">
                    {['Alkolsüz', '30° Alkollü', '70° Alkollü'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setAlcohol(opt)}
                        className={`flex-1 py-2 rounded-md text-[10px] font-bold border transition-all ${
                          alcohol === opt ? 'bg-amber-600 border-amber-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-amber-600 uppercase tracking-wider mb-2 block">Koku / Esans</label>
                  <div className="flex gap-1">
                    {['Limon', 'Mandalina', 'Dove', 'Tütün'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setEssence(opt)}
                        className={`flex-1 py-2 rounded-md text-[9px] font-bold border transition-all px-1 ${
                          essence === opt ? 'bg-amber-600 border-amber-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
            </div>
        </section>
      )}

      {/* 5. Logo Dosya Yükleme */}
      <section className="pt-2">
        <div className={`flex items-center gap-3 p-4 rounded-xl border-2 border-dashed transition-all ${logoFile ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-slate-50'}`}>
           <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${logoFile ? 'bg-green-500' : 'bg-slate-200'}`}>
              {logoFile 
                ? <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                : <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              }
           </div>
           <div className="flex-grow">
             <label htmlFor="logo-upload" className="block text-xs font-bold text-slate-900 cursor-pointer">
               {logoFile ? logoFile.name : 'Firma Logonuzu Yükleyin'}
             </label>
             <p className="text-[10px] text-slate-500">
               {logoFile ? 'Dosya başarıyla eklendi' : 'PDF, AI veya Yüksek Çözünürlüklü Görsel'}
             </p>
           </div>
           <input 
             id="logo-upload" 
             type="file" 
             className="hidden" 
             accept="image/*,.pdf,.ai,.psd"
             onChange={handleFileChange}
           />
           {logoFile && (
             <button onClick={() => setLogoFile(null)} className="text-red-500 text-xs font-bold underline">Sil</button>
           )}
        </div>
      </section>

      {/* 6. EKLEME BUTONU */}
      <section className="pt-4 border-t border-slate-100">
         <button 
           onClick={handleAddItem}
           className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-black py-4 rounded-xl shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 transition-all active:scale-95 group"
         >
           <span>Teklif Listesine Ekle</span>
           <span className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-xs">
             {currentCalculation ? formatCurrency(currentCalculation.grandTotal) : '...'}
           </span>
           <svg className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
         </button>
         <p className="text-center text-[10px] text-slate-400 mt-2">
           *Farklı ürünler seçerek listenize birden fazla kalem ekleyebilirsiniz.
         </p>
      </section>
    </div>
  );
};

export default ProductSelector;
