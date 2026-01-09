
import { QuoteItem, QuoteCalculation } from '../types';
import { PROFIT_MARGIN, CLICHE_COST_PER_COLOR, EXCHANGE_RATE_USD } from '../constants';

export const calculateQuote = (items: QuoteItem[]): QuoteCalculation => {
  let baseCostTotal = 0;
  let clicheCostTotal = 0;
  let vatTotal = 0;

  items.forEach(item => {
    const itemCost = item.variant.baseCost * item.quantity;
    baseCostTotal += itemCost;
    clicheCostTotal += item.colorCount * CLICHE_COST_PER_COLOR;
    
    // Profit applied to base cost and cliche cost
    const itemSubtotal = (itemCost + (item.colorCount * CLICHE_COST_PER_COLOR)) * (1 + PROFIT_MARGIN);
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
    // Fallback if currency code is still problematic in some environments
    return value.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' ' + currency;
  }
};
