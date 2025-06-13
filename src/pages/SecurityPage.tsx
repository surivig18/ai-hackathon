import React, { useState } from 'react';
import { Shield, Lock, Smartphone, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

export function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const securityEvents = [
    {
      type: 'login',
      description: 'Successful login from Chrome on Windows',
      timestamp: new Date('2024-01-20T10:30:00'),
      location: 'New York, NY',
      status: 'success'
    },
    {
      type: 'password_change',
      description: 'Password changed successfully',
      timestamp: new Date('2024-01-18T14:20:00'),
      location: 'New York, NY',
      status: 'success'
    },
    {
      type: 'suspicious',
      description: 'Failed login attempt detected',
      timestamp: new Date('2024-01-17T22:15:00'),
      location: 'Unknown location',
      status: 'warning'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Security</h1>
        <p className="text-gray-500 mt-1">Manage your account security and privacy settings</p>
      </div>

      {/* Security Overview */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Security Status</h2>
            <p className="text-green-600">Your account is well protected</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">2FA Enabled</p>
              <p className="text-sm text-gray-600">Two-factor authentication</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Strong Password</p>
              <p className="text-sm text-gray-600">Password meets requirements</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Email Verified</p>
              <p className="text-sm text-gray-600">Email address confirmed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
        </div>

        <form className="space-y-6 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Smartphone className="h-6 w-6 text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="sr-only"
            />
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {twoFactorEnabled && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-medium text-green-800">2FA is enabled</p>
            </div>
            <p className="text-sm text-green-700">
              Your account is protected with two-factor authentication using your mobile device.
            </p>
            <button className="text-sm text-green-700 underline hover:text-green-800 mt-2">
              Manage 2FA settings
            </button>
          </div>
        )}
      </div>

      {/* Recent Security Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Security Activity</h3>
        </div>

        <div className="space-y-4">
          {securityEvents.map((event, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                event.status === 'success' ? 'bg-green-100' :
                event.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                {event.status === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-gray-900">{event.description}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span>{event.timestamp.toLocaleDateString()} at {event.timestamp.toLocaleTimeString()}</span>
                  <span>•</span>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4">
          View all security activity
        </button>
      </div>
    </div>
  );
}