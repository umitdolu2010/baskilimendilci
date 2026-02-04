
import { ProductVariant, ProductType } from './types.ts';

export const EXCHANGE_RATE_USD = 32.0; // Güncel kur
export const PROFIT_MARGIN = 0.35; // %35 Kar marjı
export const CLICHE_COST_PER_COLOR = 750.0;
export const WHATSAPP_NUMBER = "905075199429";

// Ek Maliyetler
export const ADDITIONAL_COSTS = {
  ALCOHOL: {
    'Alkolsüz': 0.00,
    '30° Alkollü': 0.15,
    '70° Alkollü': 0.25
  },
  PAPER: {
    'Standart': 0.00,
    'Kuşe (Kalın)': 0.10,
    'Yağlı Kağıt': 0.20,
    'Sülfit': 0.05
  },
  TOWEL: {
    'Standart (40gr)': 0.00,
    'Ekstra Kalın (50gr)': 0.08
  },
  ESSENCE: {
    'Limon': 0.00,
    'Mandalina': 0.05,
    'Tütün': 0.05,
    'VIP Parfüm': 0.10
  }
};

export const PRODUCT_VARIANTS: ProductVariant[] = [
  // --- MENDİL GRUBU (BİRLEŞTİRİLMİŞ) ---
  { id: 'm-5x10', name: 'Mendil (5x10 cm)', type: ProductType.Mendil, baseCost: 0.40, vatRate: 0.20 },
  { id: 'm-6x10', name: 'Mendil (6x10 cm)', type: ProductType.Mendil, baseCost: 0.45, vatRate: 0.20 },
  { id: 'm-6x12', name: 'Mendil (6x12 cm)', type: ProductType.Mendil, baseCost: 0.52, vatRate: 0.20 },
  { id: 'm-7x10', name: 'Mendil (7x10 cm)', type: ProductType.Mendil, baseCost: 0.475, vatRate: 0.20 },
  { id: 'm-7x12', name: 'Mendil (7x12 cm)', type: ProductType.Mendil, baseCost: 0.57, vatRate: 0.20 },
  
  // --- ŞEKER GRUBU ---
  { id: 's-3gr-w', name: 'Stick Şeker (3gr Beyaz)', type: ProductType.Seker, baseCost: 0.23, vatRate: 0.01 },
  { id: 's-3gr-b', name: 'Stick Şeker (3gr Esmer)', type: ProductType.Seker, baseCost: 0.33, vatRate: 0.01 },
  { id: 's-4gr-w', name: 'Kare Şeker (4gr Beyaz)', type: ProductType.Seker, baseCost: 0.28, vatRate: 0.01 },

  // --- KESE KAĞIDI GRUBU ---
  { id: 'kk-durum', name: 'Dürüm Kağıdı (Standart)', type: ProductType.KeseKagidi, baseCost: 0.60, vatRate: 0.20 },
  { id: 'kk-hamburger', name: 'Hamburger Kese (16x16)', type: ProductType.KeseKagidi, baseCost: 0.75, vatRate: 0.20 },
  { id: 'kk-patates', name: 'Patates Zarfı (Karton)', type: ProductType.KeseKagidi, baseCost: 0.95, vatRate: 0.20 },
  { id: 'kk-catal', name: 'Çatal Bıçak Kılıfı', type: ProductType.KeseKagidi, baseCost: 0.45, vatRate: 0.20 },

  // --- AMBALAJ KAĞIDI GRUBU ---
  { id: 'ak-yagli-3040', name: 'Yağlı Kağıt (30x40cm)', type: ProductType.AmbalajKagidi, baseCost: 0.85, vatRate: 0.20 },
  { id: 'ak-yagli-5070', name: 'Yağlı Kağıt (50x70cm)', type: ProductType.AmbalajKagidi, baseCost: 1.40, vatRate: 0.20 },
  { id: 'ak-sulfit', name: 'Sülfit Kağıt (Logolu)', type: ProductType.AmbalajKagidi, baseCost: 0.55, vatRate: 0.20 },
  { id: 'ak-amerikanservis', name: 'Amerikan Servis (Kuşe)', type: ProductType.AmbalajKagidi, baseCost: 1.10, vatRate: 0.20 },

  // --- SERVİS SETİ GRUBU ---
  { id: 'ss-2li', name: 'Set V1 (Mendil + Tuz)', type: ProductType.ServisSeti, baseCost: 1.20, vatRate: 0.20 },
  { id: 'ss-3lu', name: 'Set V2 (Mendil+Tuz+Kürdan)', type: ProductType.ServisSeti, baseCost: 1.45, vatRate: 0.20 },
  { id: 'ss-4lu', name: 'Set V3 (Mendil+Tuz+Kürdan+Biber)', type: ProductType.ServisSeti, baseCost: 1.65, vatRate: 0.20 },
  { id: 'ss-lux', name: 'Lüks Set (Çatal+Bıçak+Mendil+Tuz)', type: ProductType.ServisSeti, baseCost: 3.50, vatRate: 0.20 },

  // --- KARTON BARDAK GRUBU ---
  { id: 'kb-4oz', name: '4oz Karton Bardak (Espresso)', type: ProductType.KartonBardak, baseCost: 0.90, vatRate: 0.20 },
  { id: 'kb-7oz', name: '7oz Karton Bardak (Otomat)', type: ProductType.KartonBardak, baseCost: 1.10, vatRate: 0.20 },
  { id: 'kb-8oz', name: '8oz Karton Bardak (Standart)', type: ProductType.KartonBardak, baseCost: 1.25, vatRate: 0.20 },
  { id: 'kb-12oz', name: '12oz Karton Bardak (Latte)', type: ProductType.KartonBardak, baseCost: 1.60, vatRate: 0.20 },
  { id: 'kb-dw-8oz', name: '8oz Double Wall (Çift Duvar)', type: ProductType.KartonBardak, baseCost: 2.10, vatRate: 0.20 },

  // --- PET BARDAK GRUBU (YENİ) ---
  // Not: Fiyatlar örnek olarak girilmiştir, güncelleyebilirsiniz.
  { id: 'pb-300', name: '300ml Pet Bardak (Standart)', type: ProductType.PetBardak, baseCost: 1.50, vatRate: 0.20 },
  { id: 'pb-400', name: '400ml Pet Bardak (Büyük)', type: ProductType.PetBardak, baseCost: 1.75, vatRate: 0.20 },
  { id: 'pb-500', name: '500ml Pet Bardak (Maxi)', type: ProductType.PetBardak, baseCost: 2.00, vatRate: 0.20 },
];
