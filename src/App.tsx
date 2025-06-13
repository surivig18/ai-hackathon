import React, { useState } from 'react';
import { WalletProvider } from './context/WalletContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import { ReceiveMoney } from './pages/ReceiveMoney';
import { TransactionHistoryPage } from './pages/TransactionHistoryPage';
import { CardsPage } from './pages/CardsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SecurityPage } from './pages/SecurityPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'send':
        return <SendMoney />;
      case 'receive':
        return <ReceiveMoney />;
      case 'history':
        return <TransactionHistoryPage />;
      case 'cards':
        return <CardsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'security':
        return <SecurityPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="flex-1 lg:ml-64">
            <Header
              onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isMobileMenuOpen={isMobileMenuOpen}
            />
            
            <main className="p-4 lg:p-6">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </WalletProvider>
  );
}

export default App;