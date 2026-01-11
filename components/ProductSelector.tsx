
import React from 'react';
import { ProductVariant, QuoteItem, ProductType } from '../types.ts';
import { PRODUCT_VARIANTS, ADDITIONAL_COSTS } from '../constants.ts';

interface Props {
  onUpdate: (item: QuoteItem | null) => void;
}

const ProductSelector: React.FC<Props> = ({ onUpdate }) => {
  const [selectedVariantId, setSelectedVariantId] = React.useState(PRODUCT_VARIANTS[0].id);
  const [quantity, setQuantity] = React.useState<number>(50000);
  const [colors, setColors] = React.useState<number>(1);
  const [logoUploaded, setLogoUploaded] = React.useState<boolean>(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  
  // Mendil Options
  const [alcohol, setAlcohol] = React.useState('Alkolsüz');
  const [paper, setPaper] = React.useState('Standart Kuşe');
  const [towel, setTowel] = React.useState('Standart (35gr)');
  const [essence, setEssence] = React.useState('Limon');
  
  const [error, setError] = React.useState<string | null>(null);

  const selectedVariant = PRODUCT_VARIANTS.find(v => v.id === selectedVariantId);

  // Auto-set 80° alcohol for Cologne wipes
  React.useEffect(() => {
    if (selectedVariant?.type === ProductType.KolonyaliMendil) {
      setAlcohol('80° Alkollü');
    } else if (selectedVariant?.type === ProductType.Mendil && alcohol === '80° Alkollü') {
      setAlcohol('Alkolsüz'); // Reset if switched back to normal wipe
    }
  }, [selectedVariantId]);

  React.useEffect(() => {
    if (quantity < 10000) {
      setError("Minimum sipariş 10.000 adettir.");
      onUpdate(null);
    } else {
      setError(null);
      if (selectedVariant) {
        onUpdate({ 
          id: Math.random().toString(36).substr(2, 9),
          variant: selectedVariant, 
          quantity, 
          colorCount: colors, 
          logoUploaded,
          alcoholOption: alcohol,
          paperType: paper,
          towelQuality: towel,
          essence: selectedVariant.type === ProductType.KolonyaliMendil ? essence : undefined
        });
      }
    }
  }, [selectedVariantId, quantity, colors, logoUploaded, alcohol, paper, towel, essence]);

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
      {/* 1. Product Selection */}
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

      {/* Conditional Options for Mendil / Kolonyali */}
      {(selectedVariant?.type === ProductType.Mendil || selectedVariant?.type === ProductType.KolonyaliMendil) && (
        <section className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-10">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            Teknik Özellikler
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Alcohol Selection - Disabled/Auto for Cologne */}
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Alkol Oranı</label>
              <div className="flex flex-col gap-2">
                {selectedVariant.type === ProductType.KolonyaliMendil ? (
                  <div className="px-4 py-3 rounded-xl text-xs font-bold bg-orange-500 border-2 border-orange-500 text-white shadow-lg shadow-orange-500/10 text-center">
                    80° Alkollü (Sabit)
                  </div>
                ) : (
                  Object.keys(ADDITIONAL_COSTS.ALCOHOL).filter(opt => opt !== '80° Alkollü').map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAlcohol(opt)}
                      className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border-2 ${
                        alcohol === opt ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/10' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Essence Selection - Only for Cologne */}
            {selectedVariant.type === ProductType.KolonyaliMendil && (
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Esans Seçimi</label>
                <div className="flex flex-col gap-2">
                  {Object.keys(ADDITIONAL_COSTS.ESSENCE).map(opt => (
                    <button
                      key={opt}
                      onClick={() => setEssence(opt)}
                      className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border-2 ${
                        essence === opt ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/10' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Paper Selection */}
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Kağıt Türü</label>
              <div className="flex flex-col gap-2">
                {Object.keys(ADDITIONAL_COSTS.PAPER).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setPaper(opt)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border-2 ${
                      paper === opt ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/10' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Towel Selection */}
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Havlu Kalitesi</label>
              <div className="flex flex-col gap-2">
                {Object.keys(ADDITIONAL_COSTS.TOWEL).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setTowel(opt)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border-2 ${
                      towel === opt ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/10' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
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

      {/* 2. Quantity Section */}
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
      </section>

      {/* 3. Color Selection & 4. Logo Upload */}
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
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">4. Logonuzu Yükleyin</label>
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
            <p className="text-[10px] font-black text-center px-4 uppercase tracking-widest">
              {logoUploaded ? (fileName || 'Dosya Hazır') : 'Logoyu Sürükle veya Seç'}
            </p>
          </label>
        </section>
      </div>
    </div>
  );
};

export default ProductSelector;
