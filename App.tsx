
import React from 'react';
import Layout from './components/Layout';
import ProductSelector from './components/ProductSelector';
import SummaryCard from './components/SummaryCard';
import { QuoteItem, QuoteCalculation } from './types';
import { calculateQuote } from './utils/calculations';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<QuoteItem | null>(null);

  const calculation = React.useMemo(() => {
    return activeItem ? calculateQuote([activeItem]) : calculateQuote([]);
  }, [activeItem]);

  return (
    <Layout>
      {/* Quotation Calculator Section */}
      <section id="calculator" className="scroll-mt-32 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Configuration Form */}
          <div className="lg:col-span-7 space-y-12">
            <div className="mb-10">
              <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-4 uppercase">
                Hızlı Teklif <span className="text-orange-500">Konfigüratörü</span>
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Aşağıdaki seçenekleri kullanarak ihtiyacınıza en uygun ürün paketini oluşturun. 
                Tüm fiyatlarımıza KDV ve güncel hammadde maliyetleri dahildir.
              </p>
            </div>

            {/* Hizmet Sözümüz Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-hover hover:border-orange-200">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-orange-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Ücretsiz Grafik</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Logonuzu biz hazırlayalım.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-hover hover:border-orange-200">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-orange-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Hijyenik Üretim</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Tam otomatik paketleme.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-hover hover:border-orange-200">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-orange-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Hızlı Sevkiyat</h4>
                  <p className="text-[10px] text-slate-500 font-medium">10 iş gününde teslimat.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-2 rounded-3xl">
               <ProductSelector onUpdate={setActiveItem} />
            </div>

            {/* Specific technical note as requested */}
            <div className="mt-8 p-6 bg-orange-50/50 rounded-2xl border border-orange-100 border-dashed">
              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                <span className="text-orange-600 font-black uppercase tracking-widest block mb-1">Teknik Bilgilendirme:</span>
                Fiyatlar 1 USD = 44 TL sınırına kadar geçerlidir. Özel baskılı üretimlerde adetlerde <span className="text-orange-600">+/-% 5-10</span> sapma payı bulunmaktadır.
              </p>
            </div>

            {/* Quality & Flexibility Info section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-slate-100">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                  </svg>
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Maksimum Kalite</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Islak mendillerimizde <span className="text-slate-900 font-black">38-40 gr</span> yüksek emiciliğe sahip havlu kumaş ve premium parfümler kullanılmaktadır.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.718 2.154a2 2 0 01-1.24 1.24l-2.154.718a2 2 0 00-1.414 1.96l.477 2.387a2 2 0 00.547 1.022l1.768 1.768a2 2 0 001.022.547l2.387.477a2 2 0 001.96-1.414l.718-2.154a2 2 0 011.24-1.24l2.154-.718a2 2 0 001.414-1.96l-.477-2.387a2 2 0 00-.547-1.022l-1.768-1.768z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13.5h.01M3 11.5h.01M3 9.5h.01M21 13.5h.01M21 11.5h.01M21 9.5h.01" />
                  </svg>
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Esnek Seçenekler</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Talebinize göre <span className="text-slate-900 font-black">30° veya 70° alkollü</span> solüsyon seçenekleri sunulabilmektedir. Detaylı bilgi için bize ulaşın.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Dynamic Summary Panel (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <SummaryCard calculation={calculation} activeItem={activeItem} isValid={!!activeItem} />
              
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Kur Garantisi: 1 USD = 44.00 TL
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section id="referanslar" className="scroll-mt-24 py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Referanslarımız</h3>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Güvenle <span className="text-orange-500">Çalışıyoruz</span></h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all duration-500">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-white rounded-2xl border border-slate-200 flex items-center justify-center p-6 hover:shadow-lg hover:border-orange-200 transition-all cursor-default">
                <div className="w-full h-8 bg-slate-100 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-400 text-sm font-medium italic">
              Türkiye çapında 500'den fazla restoran ve kafe markasına hizmet verdik.
            </p>
          </div>
        </div>
      </section>

      {/* Kullanım Şartları & Mutabakat Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-xl">
                <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-6">Mutabakat Metni Özeti</h3>
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">Çalışma Prensibimiz ve <br/><span className="text-orange-500">Sözleşme Şartları</span></h2>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
                Siparişinizi onaylamadan önce lütfen operasyonel süreçlerimizi inceleyin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Ödeme Koşulları
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Üretime başlanması için toplam tutarın %50'si ön ödeme, kalan %50'si ise üretim bitiminde (sevk öncesi) tahsil edilir.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Tasarım Onayı
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Grafik tasarımı onaylanmayan işlerin üretimine başlanmaz. Onay sonrası oluşabilecek hatalardan müşteri sorumludur.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Üretim Payı
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Özel baskılı üretimlerde adet bazında +/-% 5-10 arasında fire veya fazla üretim opsiyonu bulunmaktadır.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Lojistik & Teslimat
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Kargo/Nakliye ücreti aksi belirtilmedikçe alıcıya aittir. Termin süresi onaydan itibaren 10 iş günüdür.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
