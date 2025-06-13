export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'deposit' | 'withdrawal';
  amount: number;
  currency: string;
  recipient?: {
    name: string;
    email: string;
    avatar?: string;
  };
  sender?: {
    name: string;
    email: string;
    avatar?: string;
  };
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  timestamp: Date;
  fee?: number;
  reference?: string;
}

export interface WalletBalance {
  currency: string;
  amount: number;
  locked?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  verified: boolean;
  createdAt: Date;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  recipient: string;
  description: string;
  type: 'email' | 'phone' | 'username';
}

export interface NotificationItem {
  id: string;
  type: 'transaction' | 'security' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}