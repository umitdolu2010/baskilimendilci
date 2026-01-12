
import React from 'react';
import Layout from './components/Layout.tsx';
import ProductSelector from './components/ProductSelector.tsx';
import SummaryCard from './components/SummaryCard.tsx';
import { QuoteItem } from './types.ts';

const OrderStep: React.FC<{ number: string; title: string; desc: string; isLast?: boolean }> = ({ number, title, desc, isLast }) => (
  <div className="flex-1 relative group">
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-6">
      <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm mb-4 shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform">
        {number}
      </div>
      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-2">{title}</h4>
      <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight">{desc}</p>
    </div>
    {!isLast && (
      <div className="hidden lg:block absolute top-11 left-[calc(0%+4rem)] w-[calc(100%-4rem)] h-[1px] bg-slate-100">
        <div className="h-full bg-orange-500 w-0 group-hover:w-full transition-all duration-1000"></div>
      </div>
    )}
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={`text-sm md:text-base font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-orange-500' : 'text-slate-900 group-hover:text-orange-500'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-orange-500 text-white rotate-45' : 'bg-slate-100 text-slate-400 rotate-0'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-3xl">
          {answer}
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<QuoteItem | null>(null);

  const row1Brands = [
    { name: 'Saray Lokantası', icon: 'SL' }, { name: 'Kahve Limanı', icon: 'KL' }, { name: 'Elite Bistro', icon: 'EB' },
    { name: 'Deniz Palace', icon: 'DP' }, { name: 'Burger Point', icon: 'BP' }, { name: 'Pizza Art', icon: 'PA' },
  ];

  const row2Brands = [
    { name: 'Lezzet Sofrası', icon: 'LS' }, { name: 'Modern Mutfak', icon: 'MM' }, { name: 'Steak House', icon: 'SH' },
    { name: 'Sultan Sofrası', icon: 'SS' }, { name: 'Cafe 34', icon: 'C34' }, { name: 'Bistro Verde', icon: 'BV' },
  ];

  const workSteps = [
    { title: "Ücretsiz Tasarım", desc: "Logonuzu vektörel hale getirip en şık sunumla onayınıza sunuyoruz.", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
    { title: "Hassas Üretim", desc: "Tam otomatik makinelerde, el değmeden hijyenik paketleme yapıyoruz.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.477 2.387a2 2 0 00.547 1.022l1.428 1.428a2 2 0 002.828 0l1.428-1.428a2 2 0 000-2.828l-1.428-1.428z" },
    { title: "Kalite Kontrol", desc: "Sızdırmazlık ve baskı netliği testlerinden sonra ürünleri koliliyoruz.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Hızlı Sevkiyat", desc: "Türkiye'nin her yerine anlaşmalı ambar ve kargolarla gönderiyoruz.", icon: "M5 13l4 4L19 7" }
  ];

  const faqData = [
    { question: "Teklif süreci nasıl işler?", answer: "Formu doldurduktan sonra uzman ekibimiz seçtiğiniz opsiyonlara göre en iyi hammadde ve üretim maliyetlerini hesaplar. Size özel hazırlanan resmi teklifimiz yaklaşık 30 dakika içerisinde WhatsApp üzerinden tarafınıza iletilir." },
    { question: "Grafik tasarım ve logo düzenleme ücretli mi?", answer: "Hayır. Baskılı Mendilci olarak, sipariş veren tüm müşterilerimize ücretsiz grafik tasarım desteği sunuyoruz. Logonuzun çözünürlüğü düşük olsa dahi profesyonel grafik ekibimiz vektörel çizimini yaparak onayınıza sunar." },
    { question: "Üretim ve teslimat süreci kaç gündür?", answer: "Tasarım onayınız ve ön ödemeniz alındıktan sonra üretim sürecimiz başlar. Standart üretim süremiz 10 iş günüdür." },
    { question: "Numune gönderimi yapıyor musunuz?", answer: "Evet. Daha önce yaptığımız çalışmalardan oluşan 'Kalite Paketi'mizi adresinize kargo ile gönderebiliriz. Böylece kağıt kalitesini ve koku seçeneklerini yakından inceleyebilirsiniz." }
  ];

  return (
    <Layout>
      <style>{`
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-scroll-left { animation: scroll-left 40s linear infinite; }
        .animate-scroll-right { animation: scroll-right 40s linear infinite; }
        .pause-on-hover:hover .animate-scroll-left, .pause-on-hover:hover .animate-scroll-right { animation-play-state: paused; }
        .fade-mask { mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        .btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-shimmer::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 40px;
          height: 200%;
          background: rgba(255, 255, 255, 0.2);
          animation: shimmer 3s infinite linear;
        }
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        .animate-breathe { animation: breathe 4s infinite ease-in-out; }
      `}</style>

      {/* 🚀 Sipariş Süreci Adımları Paneli */}
      <section className="bg-slate-50 border-b border-slate-100 py-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-2">
             <OrderStep number="1" title="Konfigürasyon" desc="Ürün detaylarını belirleyin." />
             <OrderStep number="2" title="Bilgi Girişi" desc="Firma bilgilerinizi ekleyin." />
             <OrderStep number="3" title="Anlık Talep" desc="WhatsApp üzerinden gönderin." />
             <OrderStep number="4" title="Resmi Teklif" desc="30 dk içinde teklifiniz hazır!" isLast />
          </div>
        </div>
      </section>

      {/* Quotation Calculator Section */}
      <section id="calculator" className="scroll-mt-32 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="mb-10">
              <h3 className="text-3xl font-black text-slate-950 tracking-tighter mb-4 uppercase">
                Teklif <span className="text-orange-500">Konfigüratörü</span>
              </h3>
              <p className="text-slate-500 font-bold leading-relaxed max-w-xl text-[10px] uppercase tracking-widest">
                İhtiyacınız olan ürün varyantlarını ve miktarı seçin. 
                Uzmanlarımız sizin için en güncel hammadde maliyetlerini hesaplasın.
              </p>
            </div>

            <div className="bg-white">
               <ProductSelector onUpdate={setActiveItem} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <SummaryCard 
                activeItem={activeItem} 
                isValid={!!activeItem} 
              />
              <div className="mt-8 p-8 bg-orange-500/5 rounded-[2.5rem] border border-orange-500/10 flex items-start gap-5">
                 <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <div>
                    <p className="text-[11px] text-slate-900 font-black uppercase tracking-widest mb-1">Hızlı Dönüş Garantisi</p>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">
                       Gönderdiğiniz talepler direkt üretim planlama birimine düşer ve en geç 1 saat içinde yanıtlanır.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Çalışma Prensiplerimiz Section */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Süreç Yönetimi</h3>
            <h2 className="text-4xl font-black tracking-tighter uppercase">Çalışma <span className="text-orange-500">Prensiplerimiz</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workSteps.map((step, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon} />
                  </svg>
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-3">{step.title}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References Section */}
      <section id="referanslar" className="scroll-mt-24 py-32 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center">
            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Portfolyomuz</h3>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Binlerce Marka <span className="text-orange-500">Bizi Seçti</span></h2>
          </div>
        </div>
        <div className="pause-on-hover flex flex-col gap-6">
          <div className="relative fade-mask flex overflow-hidden">
            <div className="flex animate-scroll-left gap-6 whitespace-nowrap px-3">
              {[...row1Brands, ...row1Brands].map((brand, i) => (
                <div key={i} className="inline-flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-8 py-6 min-w-[240px]">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-slate-300 shadow-sm">{brand.icon}</div>
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative fade-mask flex overflow-hidden">
            <div className="flex animate-scroll-right gap-6 whitespace-nowrap px-3">
              {[...row2Brands, ...row2Brands].map((brand, i) => (
                <div key={i} className="inline-flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-8 py-6 min-w-[240px]">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-slate-300 shadow-sm">{brand.icon}</div>
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - REVERTED TO SITE COLOR */}
      <section id="faq" className="py-32 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Merak Edilenler</h3>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Sıkça Sorulan <span className="text-orange-500">Sorular</span></h2>
          </div>
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-900/5 border border-slate-100">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
