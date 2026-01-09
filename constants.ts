
import { ProductVariant, ProductType } from './types';

export const EXCHANGE_RATE_USD = 44.0;
export const PROFIT_MARGIN = 0.40; // 40%
export const CLICHE_COST_PER_COLOR = 750.0;
export const WHATSAPP_NUMBER = "905075199429"; // Güncellenmiş kurumsal hat

export const PRODUCT_VARIANTS: ProductVariant[] = [
  { id: 'm-6x10', name: 'Mendil (6x10)', type: ProductType.Mendil, baseCost: 0.45, vatRate: 0.20 },
  { id: 'm-7x10', name: 'Mendil (7x10)', type: ProductType.Mendil, baseCost: 0.475, vatRate: 0.20 },
  { id: 'm-7x12', name: 'Mendil (7x12)', type: ProductType.Mendil, baseCost: 0.57, vatRate: 0.20 },
  { id: 's-white', name: 'Şeker (3gr Beyaz)', type: ProductType.Seker, baseCost: 0.23, vatRate: 0.01 },
  { id: 's-brown', name: 'Şeker (3gr Esmer)', type: ProductType.Seker, baseCost: 0.33, vatRate: 0.01 },
];
