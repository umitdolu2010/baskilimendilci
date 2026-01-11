
import { QuoteItem, QuoteCalculation, ProductType } from '../types';
import { PROFIT_MARGIN, CLICHE_COST_PER_COLOR, EXCHANGE_RATE_USD, ADDITIONAL_COSTS } from '../constants';

export const calculateQuote = (items: QuoteItem[]): QuoteCalculation => {
  let baseCostTotal = 0;
  let clicheCostTotal = 0;
  let vatTotal = 0;

  items.forEach(item => {
    // Calculate additional costs per unit
    let extraPerUnit = 0;
    let basePriceMultiplier = 1.0;

    if (item.variant.type === ProductType.Mendil || item.variant.type === ProductType.KolonyaliMendil) {
      // 20% base cost increase for Cologne wipes
      if (item.variant.type === ProductType.KolonyaliMendil) {
        basePriceMultiplier = 1.20;
      }

      extraPerUnit += ADDITIONAL_COSTS.ALCOHOL[item.alcoholOption as keyof typeof ADDITIONAL_COSTS.ALCOHOL] || 0;
      extraPerUnit += ADDITIONAL_COSTS.PAPER[item.paperType as keyof typeof ADDITIONAL_COSTS.PAPER] || 0;
      extraPerUnit += ADDITIONAL_COSTS.TOWEL[item.towelQuality as keyof typeof ADDITIONAL_COSTS.TOWEL] || 0;
      
      if (item.variant.type === ProductType.KolonyaliMendil) {
        extraPerUnit += ADDITIONAL_COSTS.ESSENCE[item.essence as keyof typeof ADDITIONAL_COSTS.ESSENCE] || 0;
      }
    }

    const unitBaseCost = (item.variant.baseCost * basePriceMultiplier) + extraPerUnit;
    const itemCost = unitBaseCost * item.quantity;
    const itemClicheCost = item.colorCount * CLICHE_COST_PER_COLOR;
    
    baseCostTotal += itemCost;
    clicheCostTotal += itemClicheCost;
    
    // Profit is applied to (Base Materials Cost + Cliche Cost)
    const itemSubtotal = (itemCost + itemClicheCost) * (1 + PROFIT_MARGIN);
    vatTotal += itemSubtotal * item.variant.vatRate;
  });

  const subtotal = (baseCostTotal + clicheCostTotal) * (1 + PROFIT_MARGIN);
  const profitMarginTotal = (baseCostTotal + clicheCostTotal) * PROFIT_MARGIN;
  const grandTotal = subtotal + vatTotal;
  const grandTotalUSD = grandTotal / EXCHANGE_RATE_USD;

  return {
    baseCostTotal,
    clicheCostTotal,
    profitMarginTotal,
    subtotal,
    vatTotal,
    grandTotal,
    grandTotalUSD
  };
};

export const formatCurrency = (value: number, currency: string = 'TRY') => {
  try {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value);
  } catch (e) {
    return value.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' ' + currency;
  }
};
