import React, { useState } from 'react';
import { Search, User, DollarSign, MessageSquare, Send, Loader2 } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { formatCurrency } from '../../utils/currency';

export function SendMoneyForm() {
  const { balances, sendMoney, loading } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Mock contacts for search
  const mockContacts = [
    'Sarah Wilson',
    'Mike Chen',
    'Emma Davis',
    'James Brown',
    'Lisa Anderson',
    'David Wilson',
    'Maria Garcia',
    'Robert Johnson'
  ];

  const selectedBalance = balances.find(b => b.currency === currency);
  const numericAmount = parseFloat(amount) || 0;
  const fee = numericAmount * 0.025; // 2.5% fee
  const total = numericAmount + fee;
  const canSend = recipient && numericAmount > 0 && selectedBalance && selectedBalance.amount >= total;

  const handleRecipientSearch = (value: string) => {
    setRecipient(value);
    if (value.length > 1) {
      const results = mockContacts.filter(contact =>
        contact.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;

    try {
      await sendMoney(recipient, numericAmount, currency, description);
      // Reset form
      setRecipient('');
      setAmount('');
      setDescription('');
      setShowResults(false);
    } catch (error) {
      console.error('Failed to send money:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Send className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Send Money</h2>
        </div>

        <form onSubmit={handleSend} className="space-y-6">
          {/* Recipient */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send to
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={recipient}
                onChange={(e) => handleRecipientSearch(e.target.value)}
                placeholder="Search contacts or enter email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {showResults && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {searchResults.map((contact, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setRecipient(contact);
                      setShowResults(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{contact}</p>
                      <p className="text-sm text-gray-500">
                        {contact.toLowerCase().replace(' ', '.')}@example.com
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amount and Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {balances.map((balance) => (
                  <option key={balance.currency} value={balance.currency}>
                    {balance.currency}
                  </option>
                ))}
              </select>
            </div>
            {selectedBalance && (
              <p className="text-sm text-gray-500 mt-2">
                Available balance: {formatCurrency(selectedBalance.amount, currency)}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this payment for?"
                rows={3}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Transaction Summary */}
          {numericAmount > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">{formatCurrency(numericAmount, currency)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction fee</span>
                <span className="font-medium">{formatCurrency(fee, currency)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total, currency)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Send Button */}
          <button
            type="submit"
            disabled={!canSend || loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              canSend && !loading
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Money
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}