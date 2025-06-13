import React, { useState } from 'react';
import { QrCode, Link, Smartphone, Mail, Copy, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function ReceiveMoneyOptions() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const paymentLink = `https://walletpay.com/pay/${Math.random().toString(36).substr(2, 9)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Request Form */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Payment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (optional)
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this payment for?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h3>
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <QrCode className="h-32 w-32 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 text-center max-w-md">
            Share this QR code for others to scan and send you money instantly
          </p>
          {amount && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(parseFloat(amount), currency)}
              </p>
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Payment Link */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Link</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={paymentLink}
            readOnly
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {copiedLink ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Share this link via email, text, or social media to request payment
        </p>
      </div>

      {/* Share Options */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Options</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Email</span>
          </button>

          <button className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">SMS</span>
          </button>

          <button className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Link className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Share Link</span>
          </button>

          <button className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <QrCode className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
}