
import React from 'react';
import { QuoteItem } from '../types';
import { formatCurrency } from '../utils/calculations';

interface Props {
  items: QuoteItem[];
  onRemove: (index: number) => void;
}

const QuoteTable: React.FC<Props> = ({ items, onRemove }) => {
  if (items.length === 0) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400">
        Henüz bir ürün eklenmedi. Teklif oluşturmak için ürün seçin.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Ürün</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">Miktar</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">Renk</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">Birim Maliyet</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item, index) => (
            <tr key={index} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.variant.name}</td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right">{item.quantity.toLocaleString()}</td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right">{item.colorCount}</td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right">{formatCurrency(item.variant.baseCost)}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteTable;
