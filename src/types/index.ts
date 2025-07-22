// Core type definitions for the e-commerce platform

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviews: number;
  featured: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
}

export interface BluetoothDevice {
  id: string;
  name: string;
  connected: boolean;
  signalStrength: number;
  batteryLevel?: number;
  lastSeen: string;
  deviceType: 'smartphone' | 'tablet' | 'wearable' | 'unknown';
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueData: { name: string; value: number }[];
  orderStatusData: { name: string; value: number }[];
  customerGrowthData: { month: string; customers: number }[];
}

export type Theme = 'light' | 'dark';

export type AdminTab = 'products' | 'orders' | 'customers' | 'analytics' | 'devices';