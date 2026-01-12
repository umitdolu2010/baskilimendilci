
import React from 'react';
import { ProductVariant, QuoteItem, ProductType } from '../types.ts';
import { PRODUCT_VARIANTS } from '../constants.ts';

interface Props {
  onUpdate: (item: QuoteItem | null) => void;
}

const ProductSelector: React.FC<Props> = ({ onUpdate }) => {
  const [selectedType, setSelectedType] = React.useState<ProductType>(ProductType.Mendil);
  const [selectedVariantId, setSelectedVariantId] = React.useState('');
  const [quantity, setQuantity] = React.useState<number>(10000);
  const [colorCount, setColorCount] = React.useState<number>(1);
  const [logoUploaded, setLogoUploaded] = React.useState<boolean>(false);
  
  const [alcohol, setAlcohol] = React.useState('Alkolsüz');
  const [essence, setEssence] = React.useState('Limon');
  
  const filteredVariants = PRODUCT_VARIANTS.filter(v => v.type === selectedType);
  
  React.useEffect(() => {
    if (filteredVariants.length > 0) {
      setSelectedVariantId(filteredVariants[0].id);
    }
    
    if (selectedType === ProductType.KolonyaliMendil) {
      setAlcohol('70° Alkollü');
    } else {
      setAlcohol('Alkolsüz');
    }
  }, [selectedType]);

  const selectedVariant = PRODUCT_VARIANTS.find(v => v.id === selectedVariantId);

  React.useEffect(() => {
    if (selectedVariant) {
      onUpdate({ 
        id: 'active-selection',
        variant: selectedVariant, 
        quantity, 
        colorCount,
        logoUploaded,
        alcoholOption: alcohol,
        essence: selectedType === ProductType.KolonyaliMendil ? essence : undefined
      });
    }
  }, [selectedVariantId, quantity, logoUploaded, alcohol, essence, selectedType, colorCount]);

  const renderColorDots = (count: number) => {
    const colors = ['bg-slate-900', 'bg-blue-500', 'bg-red-500', 'bg-yellow-400'];
    return (
      <div className="flex gap-1 justify-center mt-1">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${colors[i] || 'bg-slate-300'}`}></div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* 1. Kategori Seçimi */}
      <section>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">1. Ürün Kategorisi</label>
        <div className="flex gap-2">
          {Object.values(ProductType).map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-1 py-3 rounded-xl border-2 font-black text-[10px] uppercase tracking-tighter transition-all ${
                selectedType === type 
                ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm' 
                : 'border-slate-100 bg-slate-50 text-slate-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Teknik Detay / Varyant Seçimi */}
      <section className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          2. {selectedType === ProductType.Seker ? 'Şeker Tipi' : 'Ebat Seçimi'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filteredVariants.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVariantId(v.id)}
              className={`py-3 px-2 rounded-xl border-2 text-[11px] font-bold transition-all ${
                selectedVariantId === v.id 
                ? 'bg-white border-orange-500 text-orange-600 shadow-sm' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {v.name.replace(`${selectedType} `, '').replace('(', '').replace(')', '')}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Adet & Baskı Rengi (Yan Yana) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">3. Sipariş Miktarı</label>
          <div className="grid grid-cols-3 gap-2">
            {[10000, 20000, 50000].map(qty => (
              <button
                key={qty}
                onClick={() => setQuantity(qty)}
                className={`py-3 rounded-xl text-[11px] font-black transition-all border-2 ${
                  quantity === qty ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                {qty / 1000}K
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">4. Baskı Renk Sayısı</label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(count => (
              <button
                key={count}
                onClick={() => setColorCount(count)}
                className={`py-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${
                  colorCount === count 
                  ? 'border-orange-500 bg-orange-50 text-orange-600' 
                  : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                <span className="text-[11px] font-black">{count}</span>
                {renderColorDots(count)}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Ek Özellikler (Sadece Mendil/Kolonyalı) */}
      {(selectedType !== ProductType.Seker) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Alkol Oranı</label>
              <div className="flex gap-2">
                {selectedType === ProductType.KolonyaliMendil ? (
                  <div className="w-full py-2.5 rounded-lg text-[10px] font-bold bg-orange-500 text-white text-center uppercase">70° Hijyen</div>
                ) : (
                  ['Alkolsüz', '40° Alkol'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAlcohol(opt)}
                      className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold border-2 transition-all ${
                        alcohol === opt ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-slate-200 text-slate-500'
                      }`}
                    >
                      {opt}
                    </button>
                  ))
                )}
              </div>
            </div>

            {selectedType === ProductType.KolonyaliMendil && (
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Esans</label>
                <div className="flex gap-2">
                  {['Limon', 'Mandalina', 'VIP'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setEssence(opt)}
                      className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold border-2 transition-all ${
                        essence === opt ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-500'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
        </section>
      )}

      {/* 5. Tasarım Durumu */}
      <section>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">5. Grafik Tasarım</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setLogoUploaded(true)}
            className={`py-3 rounded-xl border-2 font-black text-[10px] uppercase tracking-tighter transition-all ${
              logoUploaded ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-100 text-slate-400'
            }`}
          >
            Logom Hazır
          </button>
          <button
            onClick={() => setLogoUploaded(false)}
            className={`py-3 rounded-xl border-2 font-black text-[10px] uppercase tracking-tighter transition-all ${
              !logoUploaded ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400'
            }`}
          >
            Tasarım İstiyorum
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductSelector;
