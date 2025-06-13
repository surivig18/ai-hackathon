import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Plus, Minus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Transaction } from '../../types/wallet';
import { formatCurrency, formatDate, formatTime } from '../../utils/currency';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

export function RecentTransactions({ transactions, onViewAll }: RecentTransactionsProps) {
  const getTransactionIcon = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'send':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      case 'receive':
        return <ArrowDownLeft className="h-5 w-5 text-green-500" />;
      case 'deposit':
        return <Plus className="h-5 w-5 text-blue-500" />;
      case 'withdrawal':
        return <Minus className="h-5 w-5 text-orange-500" />;
      default:
        return <ArrowUpRight className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getAmountDisplay = (transaction: Transaction) => {
    const prefix = transaction.type === 'send' || transaction.type === 'withdrawal' ? '-' : '+';
    const color = transaction.type === 'send' || transaction.type === 'withdrawal' 
      ? 'text-red-600' : 'text-green-600';
    
    return (
      <span className={`font-semibold ${color}`}>
        {prefix}{formatCurrency(transaction.amount, transaction.currency)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button
          onClick={onViewAll}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              {getTransactionIcon(transaction)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900 truncate">
                  {transaction.type === 'send' ? (
                    `To ${transaction.recipient?.name || 'Unknown'}`
                  ) : transaction.type === 'receive' ? (
                    `From ${transaction.sender?.name || 'Unknown'}`
                  ) : (
                    transaction.description
                  )}
                </p>
                {getStatusIcon(transaction.status)}
              </div>
              <p className="text-sm text-gray-500 truncate">
                {transaction.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <span>{formatDate(transaction.timestamp)}</span>
                <span>•</span>
                <span>{formatTime(transaction.timestamp)}</span>
                {transaction.reference && (
                  <>
                    <span>•</span>
                    <span>{transaction.reference}</span>
                  </>
                )}
              </div>
            </div>

            <div className="text-right">
              {getAmountDisplay(transaction)}
              {transaction.fee && transaction.fee > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  Fee: {formatCurrency(transaction.fee, transaction.currency)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowUpRight className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No transactions yet</p>
          <p className="text-sm text-gray-400 mt-1">Your transaction history will appear here</p>
        </div>
      )}
    </div>
  );
}