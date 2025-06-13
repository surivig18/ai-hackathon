import React from 'react';
import { useWallet } from '../context/WalletContext';
import { TransactionHistory } from '../components/TransactionHistory/TransactionHistory';

export function TransactionHistoryPage() {
  const { transactions } = useWallet();

  return (
    <TransactionHistory transactions={transactions} />
  );
}