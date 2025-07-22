import { Product, Order, Customer, AnalyticsData } from '../types';

// Mock product data with high-quality Pexels images
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    tags: ['wireless', 'audio', 'premium', 'noise-cancelling'],
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviews: 124,
    featured: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitoring, GPS, and smartphone connectivity.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Wearables',
    tags: ['fitness', 'smart', 'health', 'gps'],
    inStock: true,
    stockQuantity: 15,
    rating: 4.6,
    reviews: 89,
    featured: true,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Professional Camera',
    description: 'High-resolution digital camera for professional photography with advanced features and interchangeable lenses.',
    price: 1299.99,
    originalPrice: 1499.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Cameras',
    tags: ['photography', 'professional', 'high-resolution'],
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviews: 56,
    featured: false,
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    title: 'Gaming Mechanical Keyboard',
    description: 'RGB mechanical gaming keyboard with customizable keys and ultra-responsive switches.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Gaming',
    tags: ['gaming', 'mechanical', 'rgb', 'keyboard'],
    inStock: true,
    stockQuantity: 32,
    rating: 4.7,
    reviews: 203,
    featured: false,
    createdAt: '2024-01-25'
  },
  {
    id: '5',
    title: 'Laptop Backpack',
    description: 'Durable and stylish laptop backpack with multiple compartments and water-resistant material.',
    price: 79.99,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Accessories',
    tags: ['laptop', 'backpack', 'travel', 'durable'],
    inStock: true,
    stockQuantity: 18,
    rating: 4.4,
    reviews: 67,
    featured: false,
    createdAt: '2024-02-01'
  },
  {
    id: '6',
    title: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    tags: ['wireless', 'charging', 'qi', 'fast-charge'],
    inStock: true,
    stockQuantity: 45,
    rating: 4.3,
    reviews: 156,
    featured: true,
    createdAt: '2024-02-05'
  }
];

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'ORDER-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[1], quantity: 1 }
    ],
    total: 499.98,
    status: 'delivered',
    createdAt: '2024-01-15',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: 'ORDER-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { product: mockProducts[2], quantity: 1 }
    ],
    total: 1299.99,
    status: 'shipped',
    createdAt: '2024-01-20',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    }
  },
  {
    id: 'ORDER-003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    items: [
      { product: mockProducts[3], quantity: 2 },
      { product: mockProducts[4], quantity: 1 }
    ],
    total: 379.97,
    status: 'processing',
    createdAt: '2024-01-25',
    shippingAddress: {
      street: '789 Pine Rd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  }
];

// Mock customers data
export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john@example.com',
    totalOrders: 3,
    totalSpent: 1299.94,
    joinDate: '2023-12-01'
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    totalOrders: 5,
    totalSpent: 2199.95,
    joinDate: '2023-11-15'
  },
  {
    id: 'CUST-003',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    totalOrders: 2,
    totalSpent: 679.94,
    joinDate: '2024-01-10'
  }
];

// Mock analytics data
export const mockAnalytics: AnalyticsData = {
  totalRevenue: 24599.87,
  totalOrders: 156,
  totalCustomers: 89,
  averageOrderValue: 157.69,
  revenueData: [
    { name: 'Jan', value: 4200 },
    { name: 'Feb', value: 3800 },
    { name: 'Mar', value: 5200 },
    { name: 'Apr', value: 4600 },
    { name: 'May', value: 6800 }
  ],
  orderStatusData: [
    { name: 'Delivered', value: 68 },
    { name: 'Shipped', value: 24 },
    { name: 'Processing', value: 18 },
    { name: 'Pending', value: 12 }
  ],
  customerGrowthData: [
    { month: 'Jan', customers: 23 },
    { month: 'Feb', customers: 31 },
    { month: 'Mar', customers: 42 },
    { month: 'Apr', customers: 58 },
    { month: 'May', customers: 89 }
  ]
};