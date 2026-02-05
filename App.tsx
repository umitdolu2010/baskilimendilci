
import React from 'react';
import Layout from './components/Layout.tsx';
import ProductSelector from './components/ProductSelector.tsx';
import SummaryCard from './components/SummaryCard.tsx';
import { QuoteItem } from './types.ts';

const App: React.FC = () => {
  // Artık tek bir item değil, bir liste tutuyoruz
  const [quoteItems, setQuoteItems] = React.useState<QuoteItem[]>([]);

  const handleAddItem = (item: QuoteItem) => {
    setQuoteItems(prev => [...prev, item]);
  };

  const handleRemoveItem = (index: number) => {
    setQuoteItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Configurator */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="mb-8 border-b border-slate-100 pb-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Maliyet Hesaplama</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Aşağıdaki araç üzerinden ürün grubunu, teknik özellikleri ve sipariş miktarını seçin. 
                "Teklif Listesine Ekle" butonuna basarak birden fazla ürünü sepetinize ekleyebilir ve toplu fiyat alabilirsiniz.
              </p>
            </div>
            
            <ProductSelector onAdd={handleAddItem} />

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 rounded-xl p-4 flex items-start gap-3 border border-blue-100">
               <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               <p className="text-xs text-blue-800 leading-relaxed font-medium">
                 <strong>Not:</strong> Burada hesaplanan fiyatlar ham maliyetler ve ortalama klişe giderleri baz alınarak oluşturulmuştur. 
                 Kesin sipariş onayı öncesinde grafik tasarımınızın yoğunluğuna göre %5-10 oranında değişiklik gösterebilir.
               </p>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
           <SummaryCard 
             items={quoteItems} 
             onRemove={handleRemoveItem}
           />
           
           <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-widest">Güvenli Ödeme Altyapısı:</span>
              <img src="https://www.iyzico.com/assets/images/logo/iyzico-logo.svg" alt="iyzico" className="h-4" />
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
