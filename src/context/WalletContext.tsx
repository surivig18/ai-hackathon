import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, WalletBalance, User, NotificationItem } from '../types/wallet';

interface WalletContextType {
  user: User | null;
  balances: WalletBalance[];
  transactions: Transaction[];
  notifications: NotificationItem[];
  loading: boolean;
  sendMoney: (recipient: string, amount: number, currency: string, description: string) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: string) => void;
  updateBalance: (currency: string, amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock data
const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  phone: '+1 (555) 123-4567',
  verified: true,
  createdAt: new Date('2023-01-15'),
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'receive',
    amount: 1250.00,
    currency: 'USD',
    sender: {
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    description: 'Freelance project payment',
    status: 'completed',
    timestamp: new Date('2024-01-20T10:30:00'),
    reference: 'TXN-001'
  },
  {
    id: '2',
    type: 'send',
    amount: 89.50,
    currency: 'USD',
    recipient: {
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    description: 'Dinner split',
    status: 'completed',
    timestamp: new Date('2024-01-19T18:15:00'),
    fee: 2.50,
    reference: 'TXN-002'
  },
  {
    id: '3',
    type: 'deposit',
    amount: 500.00,
    currency: 'USD',
    description: 'Bank transfer',
    status: 'pending',
    timestamp: new Date('2024-01-18T14:20:00'),
    reference: 'TXN-003'
  },
  {
    id: '4',
    type: 'send',
    amount: 25.00,
    currency: 'USD',
    recipient: {
      name: 'Emma Davis',
      email: 'emma.davis@example.com'
    },
    description: 'Coffee money',
    status: 'completed',
    timestamp: new Date('2024-01-17T09:45:00'),
    fee: 1.00,
    reference: 'TXN-004'
  }
];

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'transaction',
    title: 'Payment Received',
    message: 'You received $1,250.00 from Sarah Wilson',
    timestamp: new Date('2024-01-20T10:30:00'),
    read: false
  },
  {
    id: '2',
    type: 'security',
    title: 'Security Alert',
    message: 'New device login detected',
    timestamp: new Date('2024-01-19T15:20:00'),
    read: true,
    action: {
      label: 'Review',
      url: '/security'
    }
  }
];

export function WalletProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>(mockUser);
  const [balances, setBalances] = useState<WalletBalance[]>([
    { currency: 'USD', amount: 2486.75, locked: 0 },
    { currency: 'EUR', amount: 1250.30, locked: 0 },
    { currency: 'GBP', amount: 875.20, locked: 0 }
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [loading, setLoading] = useState(false);

  const sendMoney = async (recipient: string, amount: number, currency: string, description: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'send',
      amount,
      currency,
      recipient: {
        name: recipient,
        email: `${recipient.toLowerCase().replace(' ', '.')}@example.com`
      },
      description,
      status: 'completed',
      timestamp: new Date(),
      fee: amount * 0.025, // 2.5% fee
      reference: `TXN-${Date.now().toString().slice(-6)}`
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update balance
    setBalances(prev => prev.map(balance => 
      balance.currency === currency 
        ? { ...balance, amount: balance.amount - amount - (newTransaction.fee || 0) }
        : balance
    ));

    // Add notification
    const notification: NotificationItem = {
      id: Date.now().toString(),
      type: 'transaction',
      title: 'Payment Sent',
      message: `You sent $${amount.toFixed(2)} to ${recipient}`,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
    
    setLoading(false);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const updateBalance = (currency: string, amount: number) => {
    setBalances(prev => prev.map(balance => 
      balance.currency === currency 
        ? { ...balance, amount: balance.amount + amount }
        : balance
    ));
  };

  return (
    <WalletContext.Provider value={{
      user,
      balances,
      transactions,
      notifications,
      loading,
      sendMoney,
      addTransaction,
      markNotificationAsRead,
      updateBalance
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}