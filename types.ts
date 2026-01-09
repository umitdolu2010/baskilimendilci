
export enum ProductType {
  Mendil = 'Mendil',
  Seker = 'Şeker'
}

export interface ProductVariant {
  id: string;
  name: string;
  type: ProductType;
  baseCost: number;
  vatRate: number;
}

export interface QuoteItem {
  variant: ProductVariant;
  quantity: number;
  colorCount: number;
  logoUploaded?: boolean;
}

export interface QuoteCalculation {
  baseCostTotal: number;
  clicheCostTotal: number;
  profitMarginTotal: number;
  subtotal: number;
  vatTotal: number;
  grandTotal: number;
  grandTotalUSD: number;
}
