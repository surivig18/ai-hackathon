import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Plus, Minus, Clock, CheckCircle, XCircle, Download } from 'lucide-react';
import { Transaction } from '../../types/wallet';
import { formatCurrency, formatDate, formatTime } from '../../utils/currency';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.recipient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.sender?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="send">Sent</option>
            <option value="receive">Received</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getTransactionIcon(transaction)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {transaction.type === 'send' ? (
                          `To ${transaction.recipient?.name || 'Unknown'}`
                        ) : transaction.type === 'receive' ? (
                          `From ${transaction.sender?.name || 'Unknown'}`
                        ) : (
                          transaction.description
                        )}
                      </h3>
                      {getStatusIcon(transaction.status)}
                    </div>
                    <p className="text-gray-600 text-sm truncate mb-2">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{formatDate(transaction.timestamp)}</span>
                      <span>{formatTime(transaction.timestamp)}</span>
                      {transaction.reference && (
                        <span className="font-mono">{transaction.reference}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="mb-1">
                      {getAmountDisplay(transaction)}
                    </div>
                    {transaction.fee && transaction.fee > 0 && (
                      <p className="text-xs text-gray-500">
                        Fee: {formatCurrency(transaction.fee, transaction.currency)}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}