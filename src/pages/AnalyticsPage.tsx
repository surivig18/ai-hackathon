import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export function AnalyticsPage() {
  const stats = [
    {
      title: 'Total Spent',
      value: '$3,247.82',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: ArrowUpRight,
      color: 'text-red-600'
    },
    {
      title: 'Total Received',
      value: '$5,891.45',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: ArrowDownLeft,
      color: 'text-green-600'
    },
    {
      title: 'Net Income',
      value: '$2,643.63',
      change: '+4.1%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Transactions',
      value: '127',
      change: '+15.3%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  const spendingCategories = [
    { category: 'Food & Dining', amount: 845.32, percentage: 26 },
    { category: 'Shopping', amount: 623.18, percentage: 19 },
    { category: 'Transportation', amount: 412.50, percentage: 13 },
    { category: 'Entertainment', amount: 387.92, percentage: 12 },
    { category: 'Bills & Utilities', amount: 298.75, percentage: 9 },
    { category: 'Other', amount: 680.15, percentage: 21 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Track your spending patterns and financial insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  stat.color === 'text-red-600' ? 'bg-red-100' :
                  stat.color === 'text-green-600' ? 'bg-green-100' :
                  stat.color === 'text-blue-600' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Spending Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
          <div className="space-y-4">
            {spendingCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                  <span className="text-sm font-semibold text-gray-900">${category.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-10 w-10 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Savings Goal</h4>
            <p className="text-2xl font-bold text-blue-600 mt-2">$8,500</p>
            <p className="text-sm text-gray-500">$2,500 remaining</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="h-10 w-10 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Spending Limit</h4>
            <p className="text-2xl font-bold text-green-600 mt-2">$1,200</p>
            <p className="text-sm text-gray-500">$347 remaining</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '29%' }}></div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-10 w-10 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Investment</h4>
            <p className="text-2xl font-bold text-purple-600 mt-2">$15,240</p>
            <p className="text-sm text-gray-500">+12.5% return</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}