
export enum ProductType {
  Mendil = 'Mendil',
  KolonyaliMendil = 'Kolonyalı Mendil',
  Seker = 'Şeker'
}

export interface ProductVariant {
  id: string;
  name: string;
  type: ProductType;
  baseCost: number; // Teknik altyapı için duruyor
  vatRate: number;
}

export interface QuoteItem {
  id: string;
  variant: ProductVariant;
  quantity: number;
  colorCount: number;
  logoUploaded: boolean;
  alcoholOption?: string;
  paperType?: string;
  towelQuality?: string;
  essence?: string;
}

export interface LeadData {
  fullName: string;
  phone: string;
  note?: string;
}

// Added missing interfaces for quote calculation and checkout processes
export interface QuoteCalculation {
  baseCostTotal: number;
  clicheCostTotal: number;
  profitMarginTotal: number;
  subtotal: number;
  vatTotal: number;
  grandTotal: number;
  grandTotalUSD: number;
}

export interface CheckoutData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  taxNumber: string;
  taxOffice: string;
  isCorporate: boolean;
}