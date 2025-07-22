import { useState, useCallback } from 'react';
import { BluetoothDevice } from '../types';
import { useApp } from '../contexts/AppContext';

// Custom hook for Web Bluetooth API integration
export const useBluetooth = () => {
  const { dispatch } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if Web Bluetooth is supported
  const isBluetoothSupported = 'bluetooth' in navigator;

  // Scan for Bluetooth devices
  const scanForDevices = useCallback(async () => {
    if (!isBluetoothSupported) {
      setError('Web Bluetooth API is not supported in this browser');
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      // Request Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service', 'device_information']
      });

      if (device) {
        const mockDevice: BluetoothDevice = {
          id: device.id || `device-${Date.now()}`,
          name: device.name || 'Unknown Device',
          connected: false,
          signalStrength: Math.floor(Math.random() * 100),
          batteryLevel: Math.floor(Math.random() * 100),
          lastSeen: new Date().toISOString(),
          deviceType: 'smartphone'
        };

        dispatch({ type: 'ADD_DEVICE', payload: mockDevice });
        
        // Simulate connection
        setTimeout(() => {
          dispatch({ 
            type: 'UPDATE_DEVICE', 
            payload: { ...mockDevice, connected: true } 
          });
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan for devices');
    } finally {
      setIsScanning(false);
    }
  }, [isBluetoothSupported, dispatch]);

  // Connect to a device
  const connectToDevice = useCallback(async (deviceId: string) => {
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ 
        type: 'UPDATE_DEVICE', 
        payload: { 
          id: deviceId, 
          name: '', 
          connected: true,
          signalStrength: 0,
          lastSeen: new Date().toISOString(),
          deviceType: 'smartphone'
        } 
      });
    } catch (err) {
      setError('Failed to connect to device');
    }
  }, [dispatch]);

  // Disconnect from a device
  const disconnectDevice = useCallback((deviceId: string) => {
    dispatch({ 
      type: 'UPDATE_DEVICE', 
      payload: { 
        id: deviceId, 
        name: '', 
        connected: false,
        signalStrength: 0,
        lastSeen: new Date().toISOString(),
        deviceType: 'smartphone'
      } 
    });
  }, [dispatch]);

  // Remove a device
  const removeDevice = useCallback((deviceId: string) => {
    dispatch({ type: 'REMOVE_DEVICE', payload: deviceId });
  }, [dispatch]);

  // Simulate device data updates
  const simulateDeviceUpdates = useCallback(() => {
    const interval = setInterval(() => {
      const mockDevice: BluetoothDevice = {
        id: `sim-device-${Date.now()}`,
        name: `Simulated Device ${Math.floor(Math.random() * 100)}`,
        connected: Math.random() > 0.3,
        signalStrength: Math.floor(Math.random() * 100),
        batteryLevel: Math.floor(Math.random() * 100),
        lastSeen: new Date().toISOString(),
        deviceType: ['smartphone', 'tablet', 'wearable'][Math.floor(Math.random() * 3)] as any
      };

      dispatch({ type: 'ADD_DEVICE', payload: mockDevice });
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return {
    isBluetoothSupported,
    isScanning,
    error,
    scanForDevices,
    connectToDevice,
    disconnectDevice,
    removeDevice,
    simulateDeviceUpdates
  };
};