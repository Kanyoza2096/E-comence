import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cart, Product, Theme, BluetoothDevice } from '../types';
import { mockProducts } from '../data/mockData';

// App state interface
interface AppState {
  theme: Theme;
  cart: Cart;
  products: Product[];
  connectedDevices: BluetoothDevice[];
  isOffline: boolean;
}

// Action types
type AppAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_DEVICE'; payload: BluetoothDevice }
  | { type: 'REMOVE_DEVICE'; payload: string }
  | { type: 'UPDATE_DEVICE'; payload: BluetoothDevice }
  | { type: 'SET_OFFLINE'; payload: boolean };

// Initial state
const initialState: AppState = {
  theme: (localStorage.getItem('theme') as Theme) || 'light',
  cart: {
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
    total: 0,
    itemCount: 0
  },
  products: mockProducts,
  connectedDevices: [],
  isOffline: false
};

// Calculate cart totals
const calculateCartTotals = (items: any[]) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

// Update initial cart totals
initialState.cart = {
  ...initialState.cart,
  ...calculateCartTotals(initialState.cart.items)
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };

    case 'SET_THEME':
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };

    case 'ADD_TO_CART': {
      const existingItem = state.cart.items.find(item => item.product.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.cart.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.cart.items, { product: action.payload, quantity: 1 }];
      }
      
      const totals = calculateCartTotals(newItems);
      const newCart = { items: newItems, ...totals };
      localStorage.setItem('cart', JSON.stringify(newItems));
      
      return { ...state, cart: newCart };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.cart.items.filter(item => item.product.id !== action.payload);
      const totals = calculateCartTotals(newItems);
      const newCart = { items: newItems, ...totals };
      localStorage.setItem('cart', JSON.stringify(newItems));
      
      return { ...state, cart: newCart };
    }

    case 'UPDATE_CART_QUANTITY': {
      const newItems = action.payload.quantity <= 0
        ? state.cart.items.filter(item => item.product.id !== action.payload.productId)
        : state.cart.items.map(item =>
            item.product.id === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          );
      
      const totals = calculateCartTotals(newItems);
      const newCart = { items: newItems, ...totals };
      localStorage.setItem('cart', JSON.stringify(newItems));
      
      return { ...state, cart: newCart };
    }

    case 'CLEAR_CART':
      localStorage.setItem('cart', '[]');
      return { ...state, cart: { items: [], total: 0, itemCount: 0 } };

    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };

    case 'ADD_DEVICE':
      return {
        ...state,
        connectedDevices: [...state.connectedDevices, action.payload]
      };

    case 'REMOVE_DEVICE':
      return {
        ...state,
        connectedDevices: state.connectedDevices.filter(device => device.id !== action.payload)
      };

    case 'UPDATE_DEVICE':
      return {
        ...state,
        connectedDevices: state.connectedDevices.map(device =>
          device.id === action.payload.id ? action.payload : device
        )
      };

    case 'SET_OFFLINE':
      return { ...state, isOffline: action.payload };

    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_OFFLINE', payload: false });
    const handleOffline = () => dispatch({ type: 'SET_OFFLINE', payload: true });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};