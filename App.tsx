
import React from 'react';
import Layout from './components/Layout';
import ProductSelector from './components/ProductSelector';
import SummaryCard from './components/SummaryCard';
import Cart from './components/Cart';
import { QuoteItem } from './types';
import { calculateQuote } from './utils/calculations';

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

  // Load cart from local storage
  React.useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Save cart to local storage
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

      {/* Cart Drawer */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onOrderComplete={completeOrder}
      />

      {/* Floating Cart Button */}
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

            <div className="mt-8 p-6 bg-orange-50/50 rounded-2xl border border-orange-100 border-dashed">
              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                <span className="text-orange-600 font-black uppercase tracking-widest block mb-1">Teknik Bilgilendirme:</span>
                Fiyatlar 1 USD = 44 TL sınırına kadar geçerlidir. Özel baskılı üretimlerde adetlerde <span className="text-orange-600">+/-% 5-10</span> sapma payı bulunmaktadır.
              </p>
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
