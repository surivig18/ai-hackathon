import React, { useState } from 'react';
import { 
  Bell, 
  Globe, 
  Moon, 
  Sun, 
  Shield, 
  CreditCard, 
  Users, 
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    transactions: true,
    security: true,
    marketing: false,
    updates: true
  });
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and application settings</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key === 'transactions' ? 'Transaction Alerts' :
                   key === 'security' ? 'Security Notifications' :
                   key === 'marketing' ? 'Marketing & Promotions' :
                   'Product Updates'}
                </p>
                <p className="text-sm text-gray-600">
                  {key === 'transactions' ? 'Get notified about your transactions' :
                   key === 'security' ? 'Receive security-related notifications' :
                   key === 'marketing' ? 'Receive marketing emails and promotions' :
                   'Get notified about new features and updates'}
                </p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [key]: !value })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="h-5 w-5 text-gray-600" /> : <Sun className="h-5 w-5 text-gray-600" />}
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-600">Switch to dark theme</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Biometric Authentication</p>
              <p className="text-sm text-gray-600">Use fingerprint or face recognition</p>
            </div>
            <button
              onClick={() => setBiometric(!biometric)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                biometric ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  biometric ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Payment Methods</p>
                  <p className="text-sm text-gray-600">Manage cards and accounts</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Privacy Settings</p>
                  <p className="text-sm text-gray-600">Control data sharing</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Download className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Data & Privacy</h3>
        </div>

        <div className="space-y-4">
          <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Export Data</p>
                <p className="text-sm text-gray-600">Download your account data</p>
              </div>
            </div>
          </button>

          <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Privacy Policy</p>
                <p className="text-sm text-gray-600">View our privacy policy</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl p-6 border border-red-200">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-red-900">Delete Account</p>
                <p className="text-sm text-red-700 mt-1">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}