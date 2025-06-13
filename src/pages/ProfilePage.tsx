import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Shield, Edit, Camera } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

export function ProfilePage() {
  const { user } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account information and preferences</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-6">
          <div className="relative">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
              {user?.verified && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  <Shield className="h-3 w-3" />
                  Verified
                </div>
              )}
            </div>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {user?.createdAt.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-50'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-50'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'bg-gray-50'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Since
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={user?.createdAt.toLocaleDateString() || ''}
                disabled
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Account Status</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">Verified</p>
          <p className="text-sm text-gray-500">Full access enabled</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Transactions</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">127</p>
          <p className="text-sm text-gray-500">Total completed</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Active Since</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {Math.floor((new Date().getTime() - (user?.createdAt?.getTime() || 0)) / (1000 * 60 * 60 * 24 * 30))}
          </p>
          <p className="text-sm text-gray-500">Months</p>
        </div>
      </div>
    </div>
  );
}