
import { ProductVariant, ProductType } from './types';

export const EXCHANGE_RATE_USD = 44.0;
export const PROFIT_MARGIN = 0.40; // 40%
export const CLICHE_COST_PER_COLOR = 750.0;
export const WHATSAPP_NUMBER = "905075199429";

// Ek Maliyetler
export const ADDITIONAL_COSTS = {
  ALCOHOL: {
    'Alkolsüz': 0.00,
    '30° Alkollü': 0.15,
    '70° Alkollü': 0.22,
    '80° Alkollü': 0.30
  },
  PAPER: {
    'Standart Kuşe': 0.00,
    'Gümüş/Altın Metalize': 0.12
  },
  TOWEL: {
    'Standart (35gr)': 0.00,
    'Ekstra Kalın (45gr)': 0.06
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
  { id: 'm-6x10', name: 'Mendil (6x10)', type: ProductType.Mendil, baseCost: 0.45, vatRate: 0.20 },
  { id: 'm-7x10', name: 'Mendil (7x10)', type: ProductType.Mendil, baseCost: 0.475, vatRate: 0.20 },
  { id: 'm-7x12', name: 'Mendil (7x12)', type: ProductType.Mendil, baseCost: 0.57, vatRate: 0.20 },
  
  // Kolonyalı Mendil
  { id: 'km-6x10', name: 'Kolonyalı (6x10)', type: ProductType.KolonyaliMendil, baseCost: 0.45, vatRate: 0.20 },
  { id: 'km-7x10', name: 'Kolonyalı (7x10)', type: ProductType.KolonyaliMendil, baseCost: 0.475, vatRate: 0.20 },
  { id: 'km-7x12', name: 'Kolonyalı (7x12)', type: ProductType.KolonyaliMendil, baseCost: 0.57, vatRate: 0.20 },

  // Şeker
  { id: 's-white', name: 'Şeker (3gr Beyaz)', type: ProductType.Seker, baseCost: 0.23, vatRate: 0.01 },
  { id: 's-brown', name: 'Şeker (3gr Esmer)', type: ProductType.Seker, baseCost: 0.33, vatRate: 0.01 },
];
