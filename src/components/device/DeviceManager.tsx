import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bluetooth, 
  Smartphone, 
  Tablet, 
  Watch,
  Wifi,
  Battery,
  Signal,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useBluetooth } from '../../hooks/useBluetooth';
import Button from '../common/Button';

const DeviceManager: React.FC = () => {
  const { state } = useApp();
  const { 
    isBluetoothSupported, 
    isScanning, 
    error, 
    scanForDevices,
    connectToDevice,
    disconnectDevice,
    removeDevice,
    simulateDeviceUpdates
  } = useBluetooth();

  const [showSimulation, setShowSimulation] = useState(false);

  useEffect(() => {
    // Start device simulation when component mounts
    const cleanup = simulateDeviceUpdates();
    return cleanup;
  }, [simulateDeviceUpdates]);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'smartphone':
        return <Smartphone className="w-8 h-8" />;
      case 'tablet':
        return <Tablet className="w-8 h-8" />;
      case 'wearable':
        return <Watch className="w-8 h-8" />;
      default:
        return <Bluetooth className="w-8 h-8" />;
    }
  };

  const getSignalColor = (strength: number) => {
    if (strength >= 70) return 'text-green-600 dark:text-green-400';
    if (strength >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getBatteryColor = (level: number) => {
    if (level >= 60) return 'text-green-600 dark:text-green-400';
    if (level >= 30) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Device Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage Bluetooth and WiFi connected devices
          </p>
        </div>
        
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button
            onClick={() => setShowSimulation(!showSimulation)}
            variant={showSimulation ? 'primary' : 'outline'}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {showSimulation ? 'Stop Simulation' : 'Start Simulation'}
          </Button>
          
          {isBluetoothSupported && (
            <Button
              onClick={scanForDevices}
              loading={isScanning}
            >
              <Plus className="w-4 h-4 mr-2" />
              {isScanning ? 'Scanning...' : 'Add Device'}
            </Button>
          )}
        </div>
      </div>

      {/* Bluetooth Support Warning */}
      {!isBluetoothSupported && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4"
        >
          <div className="flex items-center">
            <Bluetooth className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Bluetooth API Not Supported
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Your browser doesn't support the Web Bluetooth API. Device simulation is available instead.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
        >
          <div className="flex items-center">
            <Bluetooth className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Connection Error
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {error}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Bluetooth className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {state.connectedDevices.length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Devices</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {state.connectedDevices.filter(d => d.connected).length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Connected</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Signal className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {state.connectedDevices.length > 0 
                  ? Math.round(state.connectedDevices.reduce((sum, device) => sum + device.signalStrength, 0) / state.connectedDevices.length)
                  : 0}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Signal</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Device List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Connected Devices
        </h3>
        
        {state.connectedDevices.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Bluetooth className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No devices connected
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Scan for Bluetooth devices or enable device simulation to get started
            </p>
            {isBluetoothSupported && (
              <Button onClick={scanForDevices} loading={isScanning}>
                <Plus className="w-4 h-4 mr-2" />
                Scan for Devices
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.connectedDevices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border-2 rounded-2xl p-6 transition-all duration-200 ${
                  device.connected 
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10' 
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {/* Device Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      device.connected 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {getDeviceIcon(device.deviceType)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {device.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {device.deviceType}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    device.connected 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      device.connected 
                        ? 'bg-green-500 animate-pulse' 
                        : 'bg-gray-400'
                    }`}></div>
                    <span>{device.connected ? 'Connected' : 'Disconnected'}</span>
                  </div>
                </div>

                {/* Device Stats */}
                <div className="space-y-3 mb-4">
                  {/* Signal Strength */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Signal className={`w-4 h-4 ${getSignalColor(device.signalStrength)}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Signal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            device.signalStrength >= 70 ? 'bg-green-500' :
                            device.signalStrength >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${device.signalStrength}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.signalStrength}%
                      </span>
                    </div>
                  </div>

                  {/* Battery Level */}
                  {device.batteryLevel !== undefined && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Battery</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              device.batteryLevel >= 60 ? 'bg-green-500' :
                              device.batteryLevel >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${device.batteryLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {device.batteryLevel}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Last Seen */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last seen</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date(device.lastSeen).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Device Actions */}
                <div className="flex space-x-2">
                  {device.connected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => disconnectDevice(device.id)}
                      className="flex-1"
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => connectToDevice(device.id)}
                      className="flex-1"
                    >
                      Connect
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeDevice(device.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceManager;