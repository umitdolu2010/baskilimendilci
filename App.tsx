
import React from 'react';
import Layout from './components/Layout.tsx';
import ProductSelector from './components/ProductSelector.tsx';
import SummaryCard from './components/SummaryCard.tsx';
import Cart from './components/Cart.tsx';
import { QuoteItem } from './types.ts';
import { calculateQuote } from './utils/calculations.ts';

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
  const [cartItems, setCartItems] = React.useState<QuoteItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Cart loading failed", e);
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const calculation = React.useMemo(() => {
    return activeItem ? calculateQuote([activeItem]) : calculateQuote([]);
  }, [activeItem]);

  const addToCart = () => {
    if (activeItem) {
      const newItem = { ...activeItem, id: Math.random().toString(36).substr(2, 9) };
      setCartItems([...cartItems, newItem]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, qty: number) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const completeOrder = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

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
    { question: "Minimum sipariş miktarı neden 10.000 adettir?", answer: "Özel baskılı ürünlerde, her iş için ayrı klişe (baskı kalıbı) ve makine ayarı yapılması gerekmektedir. 10.000 adet altındaki siparişlerde sabit kurulum maliyetleri birim fiyatı rasyonel olmayan seviyelere çıkardığı için, fiyat istikrarımızı korumak adına bu sınırı uyguluyoruz." },
    { question: "Grafik tasarım ve logo düzenleme ücretli mi?", answer: "Hayır. Baskılı Mendilci olarak, sipariş veren tüm müşterilerimize ücretsiz grafik tasarım desteği sunuyoruz. Logonuzun çözünürlüğü düşük olsa dahi profesyonel grafik ekibimiz vektörel çizimini yaparak onayınıza sunar." },
    { question: "Üretim ve teslimat süreci kaç gündür?", answer: "Tasarım onayınız ve ön ödemeniz alındıktan sonra üretim sürecimiz başlar. Standart üretim süremiz 10 iş günüdür. Üretimi tamamlanan ürünleriniz, anlaşmalı kargo veya ambar şirketleri aracılığıyla adresinize sevk edilir." },
    { question: "Ürünlerin son kullanma tarihi ve alkol oranı garantili mi?", answer: "Evet. Tüm ürünlerimiz tam otomatik makinelerde el değmeden paketlenir. Islak mendillerimizde ve özellikle 80 derece kolonyalı mendillerimizde kullanılan solüsyonlar, buharlaşmaya karşı yüksek bariyerli folyolarla korunur ve 2 yıl raf ömrü sunar." },
    { question: "Toplu alımlarda ve düzenli sevkiyatlarda indirim yapılıyor mu?", answer: "Aylık 50.000 adet ve üzeri düzenli alımları olan kurumsal partnerlerimiz için 'Yıllık Sabit Fiyat' ve 'Depolama' çözümleri sunuyoruz. Bu sayede hem fiyat dalgalanmalarından korunur hem ve stok maliyeti yükünden kurtulursunuz." }
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
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slide-in-bottom { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
        .animate-slide-in-bottom { animation: slide-in-bottom 0.3s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onOrderComplete={completeOrder}
      />

      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-[150] bg-orange-500 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 active:scale-95 transition-all"
      >
        <div className={`absolute -top-1 -right-1 bg-slate-950 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white transition-transform ${cartItems.length > 0 ? 'scale-100' : 'scale-0'}`}>
          {cartItems.length}
        </div>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
      </button>

      {/* Quotation Calculator Section */}
      <section id="calculator" className="scroll-mt-32 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
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

            <div className="bg-white p-2 rounded-3xl">
               <ProductSelector onUpdate={setActiveItem} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <SummaryCard 
                calculation={calculation} 
                activeItem={activeItem} 
                isValid={!!activeItem} 
                onAddToCart={addToCart}
              />
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
          {/* Row 1 */}
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
          {/* Row 2 */}
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

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Merak Edilenler</h3>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Sıkça Sorulan <span className="text-orange-500">Sorular</span></h2>
          </div>
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100">
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
