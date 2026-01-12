
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-side {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(15px) translateY(-10px); }
        }
        @keyframes pulse-neon {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.2), 0 0 40px rgba(249, 115, 22, 0.1); }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.5), 0 0 80px rgba(249, 115, 22, 0.2); }
        }
        @keyframes text-shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes container-shine {
          0% { left: -100%; top: -100%; }
          100% { left: 100%; top: 100%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float 9s ease-in-out infinite reverse; }
        .animate-float-side { animation: float-side 7s ease-in-out infinite; }
        .animate-pulse-neon { animation: pulse-neon 3s ease-in-out infinite; }
        
        .text-shimmer {
          background: linear-gradient(90deg, #f97316 0%, #fbbf24 50%, #f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shine 3s linear infinite;
        }

        .glass-badge {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {/* Sticky Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 8L12 13L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
              BASKILI<span className="text-orange-500"> MENDİLCİ</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="#calculator" 
              onClick={(e) => scrollToSection(e, 'calculator')}
              className="bg-slate-950 text-white text-[10px] font-black px-6 py-3.5 rounded-full hover:bg-slate-800 transition-all uppercase tracking-widest shadow-xl shadow-slate-900/10 active:scale-95 block"
            >
              Hemen Teklif Al
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-950 pt-32 pb-24 relative overflow-hidden">
        {/* Deep Background Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] -mr-40 -mt-20 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[130px] -ml-20 -mb-20"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-8">
                Premium Baskı Çözümleri
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.85]">
                Markanızı <br/> <span className="text-orange-500 underline decoration-white/10 decoration-8 underline-offset-8 text-7xl md:text-9xl">Masaya Taşıyın</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-12">
                Restoran ve kafeler için yüksek kalite baskılı ıslak mendil ve şeker çözümleri. 
                Seçenekleri belirleyin, size özel en iyi fiyat teklifini sunalım.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <a 
                  href="#calculator" 
                  onClick={(e) => scrollToSection(e, 'calculator')}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-2xl shadow-orange-500/30 text-sm uppercase tracking-widest active:scale-95 flex items-center justify-center group"
                >
                  Hemen Teklif Al
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a 
                  href="https://wa.me/905533281999" 
                  target="_blank"
                  className="bg-white/5 hover:bg-white/10 text-white font-black px-12 py-5 rounded-2xl transition-all border border-white/10 text-sm uppercase tracking-widest backdrop-blur-sm flex items-center justify-center"
                >
                  WhatsApp Destek
                </a>
              </div>
            </div>
            
            {/* 🎨 Premium Showcase Area */}
            <div className="hidden lg:block relative group">
              {/* Badge 1: Hijyen (Top-Left) */}
              <div className="absolute -top-10 -left-10 z-40 animate-float transition-all duration-700 group-hover:-translate-x-4">
                <div className="glass-badge p-5 rounded-[2rem]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div className="pr-4">
                      <p className="text-white text-[10px] font-black uppercase tracking-widest">Gıda Uyumlu</p>
                      <p className="text-emerald-400 text-[11px] font-black tracking-tight uppercase">ISO-9001 BELGELİ</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge 2: Hız (Middle-Right) */}
              <div className="absolute top-1/2 -right-16 z-40 animate-float-slow transition-all duration-700 group-hover:translate-x-4">
                <div className="glass-badge p-5 rounded-[2rem]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center border border-orange-500/20 animate-pulse">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div className="pr-4">
                      <p className="text-white text-[10px] font-black uppercase tracking-widest">Ekspres Üretim</p>
                      <p className="text-orange-400 text-[11px] font-black tracking-tight uppercase">10 GÜNDE TESLİM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge 3: Tasarım (Bottom-Left) */}
              <div className="absolute -bottom-8 -left-4 z-40 animate-float-side transition-all duration-700 group-hover:translate-y-4">
                <div className="glass-badge p-4 rounded-[1.8rem]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </div>
                    <div className="pr-4">
                      <p className="text-white text-[10px] font-black uppercase tracking-widest">Hediye Hizmet</p>
                      <p className="text-blue-400 text-[11px] font-black tracking-tight uppercase">ÜCRETSİZ TASARIM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Container */}
              <div className="aspect-[4/5] bg-slate-900 rounded-[5rem] border border-white/10 shadow-3xl relative overflow-hidden flex items-center justify-center transition-all duration-1000 group-hover:rounded-[3.5rem] group-hover:shadow-orange-500/20 group-hover:scale-[1.03]">
                {/* Glowing Background Glows */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                
                {/* Animated Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/0 via-white/5 to-white/0 -translate-x-full -translate-y-full rotate-45 group-hover:animate-[container-shine_2s_ease-in-out_infinite] pointer-events-none"></div>

                {/* Hero Image */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                   <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" 
                    alt="Cafe Interior" 
                    className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:opacity-30 group-hover:grayscale-0 transition-all duration-1000" 
                   />
                   
                   {/* Centered Content */}
                   <div className="relative z-10 p-12 text-center transform transition-transform duration-700 group-hover:scale-110">
                      {/* Logo Box with Neon Glow */}
                      <div className="w-32 h-32 bg-orange-500 rounded-[2.5rem] mx-auto mb-10 flex items-center justify-center shadow-3xl rotate-12 group-hover:rotate-0 transition-all duration-500 relative animate-pulse-neon">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {/* Orbit Circles */}
                        <div className="absolute -inset-4 border border-orange-500/30 rounded-[3rem] animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute -inset-8 border border-orange-500/10 rounded-[3.5rem] animate-[spin_15s_linear_infinite_reverse]"></div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-white font-black text-3xl uppercase tracking-tighter leading-none">
                            YÜKSEK KALİTE
                          </h3>
                          <h3 className="text-shimmer font-black text-4xl uppercase tracking-tighter leading-none">
                            PROFESYONEL
                          </h3>
                          <h3 className="text-white font-black text-3xl uppercase tracking-tighter leading-none">
                            BASKI ÇÖZÜMÜ
                          </h3>
                        </div>
                        
                        <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">
                           <span className="text-[10px] font-black uppercase tracking-[0.4em]">SINIFININ EN İYİSİ</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Visual Decorative Light */}
              <div className="absolute -inset-4 border border-orange-500/20 rounded-[6rem] -z-10 blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-white font-black text-sm">B</span>
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tighter">BASKILI MENDİLCİ</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0 font-medium">
                Türkiye'nin lider baskılı promosyon ürünleri tedarikçisi. Restoran, cafe ve oteller için 
                hijyenik, kaliteli ve hızlı üretim çözümleri.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-6">İletişim</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li><a href="tel:+905533281999" className="hover:text-orange-500 transition-colors">+90 (553) 328 19 99</a></li>
                <li className="leading-relaxed">
                  <span>Zafer Mah. 2370 SK. No:2 <br/> BUCA/İZMİR</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
              © 2024 Baskılı Mendilci. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
