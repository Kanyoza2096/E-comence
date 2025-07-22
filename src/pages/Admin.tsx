import React, { useState } from 'react';
import { AdminTab } from '../types';
import AdminLayout from '../components/admin/AdminLayout';
import ProductManager from '../components/admin/ProductManager';
import OrderManager from '../components/admin/OrderManager';
import Analytics from '../components/admin/Analytics';
import DeviceManager from '../components/device/DeviceManager';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManager />;
      case 'orders':
        return <OrderManager />;
      case 'customers':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Customer Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Customer management features coming soon...
            </p>
          </div>
        );
      case 'analytics':
        return <Analytics />;
      case 'devices':
        return <DeviceManager />;
      default:
        return <Analytics />;
    }
  };

  return (
    <AdminLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;