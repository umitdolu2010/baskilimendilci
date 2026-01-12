
import { ProductVariant, ProductType } from './types.ts';

export const EXCHANGE_RATE_USD = 44.0;
export const PROFIT_MARGIN = 0.40; // 40%
export const CLICHE_COST_PER_COLOR = 750.0;
export const WHATSAPP_NUMBER = "905533281999";

// Ek Maliyetler
export const ADDITIONAL_COSTS = {
  ALCOHOL: {
    'Alkolsüz': 0.00,
    '40° Alkollü': 0.15,
    '70° Alkollü': 0.25
  },
  PAPER: {
    'Triblex (Metalize)': 0.00,
    'Kuşe (Kalın Kağıt)': 0.10
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
  // Islak Mendil
  { id: 'm-5x10', name: 'Mendil (5x10)', type: ProductType.Mendil, baseCost: 0.40, vatRate: 0.20 },
  { id: 'm-6x10', name: 'Mendil (6x10)', type: ProductType.Mendil, baseCost: 0.45, vatRate: 0.20 },
  { id: 'm-6x12', name: 'Mendil (6x12)', type: ProductType.Mendil, baseCost: 0.52, vatRate: 0.20 },
  { id: 'm-7x10', name: 'Mendil (7x10)', type: ProductType.Mendil, baseCost: 0.475, vatRate: 0.20 },
  { id: 'm-7x12', name: 'Mendil (7x12)', type: ProductType.Mendil, baseCost: 0.57, vatRate: 0.20 },
  
  // Kolonyalı Mendil
  { id: 'km-5x10', name: 'Kolonyalı (5x10)', type: ProductType.KolonyaliMendil, baseCost: 0.40, vatRate: 0.20 },
  { id: 'km-6x10', name: 'Kolonyalı (6x10)', type: ProductType.KolonyaliMendil, baseCost: 0.45, vatRate: 0.20 },
  { id: 'km-6x12', name: 'Kolonyalı (6x12)', type: ProductType.KolonyaliMendil, baseCost: 0.52, vatRate: 0.20 },
  { id: 'km-7x10', name: 'Kolonyalı (7x10)', type: ProductType.KolonyaliMendil, baseCost: 0.475, vatRate: 0.20 },
  { id: 'km-7x12', name: 'Kolonyalı (7x12)', type: ProductType.KolonyaliMendil, baseCost: 0.57, vatRate: 0.20 },

  // Şeker
  { id: 's-3gr-white', name: 'Şeker (3gr Beyaz)', type: ProductType.Seker, baseCost: 0.23, vatRate: 0.01 },
  { id: 's-3gr-brown', name: 'Şeker (3gr Esmer)', type: ProductType.Seker, baseCost: 0.33, vatRate: 0.01 },
  { id: 's-4gr-white', name: 'Şeker (4gr Beyaz)', type: ProductType.Seker, baseCost: 0.28, vatRate: 0.01 },
  { id: 's-4gr-brown', name: 'Şeker (4gr Esmer)', type: ProductType.Seker, baseCost: 0.38, vatRate: 0.01 },
];
