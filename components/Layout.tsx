
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Header - Non-sticky as requested */}
      <header className="bg-white border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 8L12 13L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
              BASKILI<span className="text-orange-500"> MENDİLCİ</span>
            </h1>
          </a>
          <div className="flex items-center gap-4">
            <a href="tel:905075199429" className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Destek Hattı:</span>
              <span className="text-sm font-black">+90 (507) 519 94 29</span>
            </a>
            <a 
              href="#calculator" 
              className="bg-slate-950 text-white text-[10px] font-black px-6 py-3.5 rounded-full hover:bg-slate-800 transition-all uppercase tracking-widest shadow-xl shadow-slate-900/10 active:scale-95 block"
            >
              Hemen Başla
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-950 pt-32 pb-24 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent blur-[120px] rounded-full -mr-40 opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Premium Baskı Çözümleri
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.85] drop-shadow-sm">
                Markanızı <br/> <span className="text-orange-500 underline decoration-white/10 decoration-8 underline-offset-8">Masaya Taşıyın</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-12">
                Restoran ve kafeler için yüksek kalite baskılı ıslak mendil ve şeker çözümleri. 
                Şeffaf fiyatlandırma, hızlı üretim ve güvenilir teslimat.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <a 
                  href="#calculator" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-2xl shadow-orange-500/30 text-sm uppercase tracking-widest active:scale-95 flex items-center justify-center"
                >
                  Fiyat Hesapla
                </a>
                <a 
                  href="#referanslar" 
                  className="bg-white/5 hover:bg-white/10 text-white font-black px-12 py-5 rounded-2xl transition-all border border-white/10 text-sm uppercase tracking-widest backdrop-blur-sm flex items-center justify-center"
                >
                  Referanslarımız
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-slate-900 to-slate-800 rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden flex items-center justify-center group transition-all duration-700 hover:rounded-[3rem]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative w-full h-full flex items-center justify-center scale-110">
                  <div className="absolute top-1/4 left-1/4 w-56 h-40 bg-white rounded-2xl shadow-2xl transform -rotate-12 group-hover:-rotate-6 transition-transform duration-700 p-5 border border-slate-100">
                     <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-1 bg-slate-100 rounded"></div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Baskılı Islak Mendil</span>
                        <div className="w-8 h-8 bg-slate-50 rounded-full"></div>
                     </div>
                  </div>
                  
                  <div className="absolute bottom-1/3 right-1/4 w-44 h-32 bg-orange-500 rounded-2xl shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-700 p-4">
                     <div className="w-full h-full border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center gap-2">
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest text-center">Baskılı Stick Şeker</span>
                        <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                     </div>
                  </div>
                </div>
                
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 animate-bounce transition-all duration-1000">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Hızlı Teslimat</p>
                    <p className="text-sm font-black text-slate-900 uppercase">10 İş Gününde Kapıda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white font-black text-lg text-sm">B</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">BASKILI MENDİLCİ</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Türkiye'nin lider baskılı promosyon ürünleri tedarikçisi. Restoran, cafe ve oteller için 
                hijyenik, kaliteli ve hızlı üretim çözümleri sunuyoruz.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Ürünlerimiz</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#calculator" className="hover:text-orange-500 transition-colors">Islak Mendil</a></li>
                <li><a href="#calculator" className="hover:text-orange-500 transition-colors">Baskılı Şeker</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Karton Bardak</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Peçete Grubu</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Kurumsal</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Hakkımızda</a></li>
                <li><a href="#referanslar" className="hover:text-orange-500 transition-colors">Referanslar</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Kalite Belgeleri</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">İletişim</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              © 2024 Baskılı Mendilci. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
               <img src="https://api.dicebear.com/7.x/initials/svg?seed=ISO&backgroundColor=f1f5f9" alt="ISO" className="h-6" />
               <img src="https://api.dicebear.com/7.x/initials/svg?seed=GMP&backgroundColor=f1f5f9" alt="GMP" className="h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
