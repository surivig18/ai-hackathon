import React from 'react';
import { ReceiveMoneyOptions } from '../components/ReceiveMoney/ReceiveMoneyOptions';

export function ReceiveMoney() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Receive Money</h1>
        <p className="text-gray-500 mt-2">Request payments and share your payment details</p>
      </div>

      <ReceiveMoneyOptions />
    </div>
  );
}