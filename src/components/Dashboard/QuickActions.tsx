import React from 'react';
import { Send, Download, CreditCard, Smartphone, QrCode, Users } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const actions = [
  {
    id: 'send',
    label: 'Send Money',
    icon: Send,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    id: 'receive',
    label: 'Receive',
    icon: Download,
    color: 'bg-emerald-500 hover:bg-emerald-600',
  },
  {
    id: 'scan',
    label: 'Scan QR',
    icon: QrCode,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: Users,
    color: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    id: 'cards',
    label: 'Cards',
    icon: CreditCard,
    color: 'bg-pink-500 hover:bg-pink-600',
  },
  {
    id: 'mobile',
    label: 'Mobile Pay',
    icon: Smartphone,
    color: 'bg-indigo-500 hover:bg-indigo-600',
  },
];

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center transition-all group-hover:scale-110`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}