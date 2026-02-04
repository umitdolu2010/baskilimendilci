
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Simple Professional Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* New Logo Implementation */}
            <div className="h-12 w-auto flex items-center">
              <img 
                src="https://i.hizliresim.com/5u2k5p1.png" 
                alt="Eran Tedarik" 
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                ERAN<span className="text-amber-600">TEDARİK</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Kurumsal Tedarik Çözümleri</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Fiyatlar Güncel</span>
             </div>
             <a href="tel:+905075199429" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Destek: 0507 519 94 29</a>
          </div>
        </div>
      </header>

      <main className="flex-grow py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">
            © 2024 Eran Tedarik - Tüm ürün fiyatları hammadde borsasına göre anlık güncellenir.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
