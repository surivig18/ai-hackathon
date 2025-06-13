import React from 'react';
import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react';
import { WalletBalance } from '../../types/wallet';
import { formatCurrency } from '../../utils/currency';

interface BalanceCardProps {
  balances: WalletBalance[];
  hideBalance: boolean;
  onToggleBalance: () => void;
}

export function BalanceCard({ balances, hideBalance, onToggleBalance }: BalanceCardProps) {
  const primaryBalance = balances.find(b => b.currency === 'USD') || balances[0];
  const totalUSD = balances.reduce((total, balance) => {
    // Mock conversion rates - in a real app, these would come from an API
    const rates: Record<string, number> = { USD: 1, EUR: 1.1, GBP: 1.25 };
    return total + (balance.amount * (rates[balance.currency] || 1));
  }, 0);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-blue-100 text-sm">Total Balance</p>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold">
              {hideBalance ? '••••••' : formatCurrency(totalUSD)}
            </h2>
            <button
              onClick={onToggleBalance}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              {hideBalance ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-green-300">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">+12.5%</span>
          </div>
          <p className="text-blue-100 text-xs">vs last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {balances.map((balance) => (
          <div key={balance.currency} className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-100 text-sm">{balance.currency}</span>
              <div className="text-right">
                <p className="font-semibold">
                  {hideBalance ? '••••' : formatCurrency(balance.amount, balance.currency)}
                </p>
                {balance.locked && balance.locked > 0 && (
                  <p className="text-blue-200 text-xs">
                    {formatCurrency(balance.locked, balance.currency)} locked
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button className="flex-1 bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Add Money
        </button>
        <button className="flex-1 bg-white/20 backdrop-blur-sm py-2 px-4 rounded-lg font-medium hover:bg-white/30 transition-colors">
          Withdraw
        </button>
      </div>
    </div>
  );
}