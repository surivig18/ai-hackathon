import React from 'react';
import { SendMoneyForm } from '../components/SendMoney/SendMoneyForm';

export function SendMoney() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Send Money</h1>
        <p className="text-gray-500 mt-2">Send money quickly and securely to anyone</p>
      </div>

      <SendMoneyForm />
    </div>
  );
}