import React from 'react';
import { motion } from 'framer-motion';
import DeviceManager from '../components/device/DeviceManager';

const Devices: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DeviceManager />
        </motion.div>
      </div>
    </div>
  );
};

export default Devices;