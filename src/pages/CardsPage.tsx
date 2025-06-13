import React from 'react';
import { CreditCard, Plus, Eye, EyeOff, MoreVertical } from 'lucide-react';

export function CardsPage() {
  const cards = [
    {
      id: '1',
      type: 'Visa',
      lastFour: '4242',
      expiryDate: '12/25',
      cardholderName: 'Alex Johnson',
      isDefault: true,
      color: 'bg-gradient-to-r from-blue-600 to-purple-600'
    },
    {
      id: '2',
      type: 'Mastercard',
      lastFour: '8888',
      expiryDate: '08/26',
      cardholderName: 'Alex Johnson',
      isDefault: false,
      color: 'bg-gradient-to-r from-gray-800 to-gray-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cards & Accounts</h1>
          <p className="text-gray-500 mt-1">Manage your payment methods</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Add Card
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="relative">
            <div className={`${card.color} rounded-2xl p-6 text-white relative overflow-hidden`}>
              {/* Card Design Elements */}
              <div className="absolute top-4 right-4">
                <button className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm">Balance</p>
                    <p className="text-2xl font-bold">$2,486.75</p>
                  </div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-white/80 text-sm">Card Number</p>
                  <p className="font-mono text-lg tracking-wider">•••• •••• •••• {card.lastFour}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/80 text-xs">CARDHOLDER NAME</p>
                    <p className="font-medium">{card.cardholderName}</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">EXPIRES</p>
                    <p className="font-medium">{card.expiryDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{card.type}</p>
                    {card.isDefault && (
                      <span className="bg-white/20 text-xs px-2 py-1 rounded-full">Default</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card chip simulation */}
              <div className="absolute top-20 left-6 w-8 h-6 bg-white/30 rounded-md"></div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Add New Card</h3>
          <p className="text-gray-500 text-sm text-center">Link a new credit or debit card to your wallet</p>
        </div>
      </div>

      {/* Bank Accounts */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Connected Bank Accounts</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            + Add Account
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Chase Checking</p>
                <p className="text-sm text-gray-500">••••••••1234</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Bank of America Savings</p>
                <p className="text-sm text-gray-500">••••••••5678</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}