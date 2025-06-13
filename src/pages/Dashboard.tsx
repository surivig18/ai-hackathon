import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { BalanceCard } from '../components/Dashboard/BalanceCard';
import { QuickActions } from '../components/Dashboard/QuickActions';
import { RecentTransactions } from '../components/Dashboard/RecentTransactions';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { balances, transactions } = useWallet();
  const [hideBalance, setHideBalance] = useState(false);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'send':
        onNavigate('send');
        break;
      case 'receive':
        onNavigate('receive');
        break;
      case 'scan':
        // Handle QR scan
        break;
      case 'contacts':
        // Handle contacts
        break;
      case 'cards':
        onNavigate('cards');
        break;
      case 'mobile':
        // Handle mobile pay
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's your wallet overview.</p>
      </div>

      <BalanceCard
        balances={balances}
        hideBalance={hideBalance}
        onToggleBalance={() => setHideBalance(!hideBalance)}
      />

      <QuickActions onActionClick={handleQuickAction} />

      <RecentTransactions
        transactions={transactions}
        onViewAll={() => onNavigate('history')}
      />
    </div>
  );
}