import { InsightItem, Performance } from '@/types';

// Asset allocation data
export const assetAllocation: InsightItem[] = [
  { label: 'Technology', value: 41356.22, percentage: 59.38 },
  { label: 'Financial Services', value: 8458.54, percentage: 12.14 },
  { label: 'Healthcare', value: 3857.70, percentage: 5.54 },
  { label: 'Consumer Cyclical', value: 27623.12, percentage: 19.56 },
  { label: 'Communication Services', value: 10254.75, percentage: 8.01 },
  { label: 'Automotive', value: 8707.20, percentage: 6.53 },
];

// Top performing assets
export const topPerformers: Performance[] = [
  { 
    symbol: 'NVDA', 
    name: 'NVIDIA Corporation', 
    change: 96.01, 
    price: 245.89 
  },
  { 
    symbol: 'MSFT', 
    name: 'Microsoft Corporation', 
    change: 30.21, 
    price: 315.75 
  },
  { 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    change: 22.35, 
    price: 178.32 
  },
  { 
    symbol: 'JPM', 
    name: 'JPMorgan Chase & Co.', 
    change: 21.33, 
    price: 149.78 
  },
  { 
    symbol: 'V', 
    name: 'Visa Inc.', 
    change: 16.62, 
    price: 230.50 
  },
];

// Worst performing assets
export const worstPerformers: Performance[] = [
  { 
    symbol: 'PFE', 
    name: 'Pfizer Inc.', 
    change: -13.22, 
    price: 36.75 
  },
  { 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc.', 
    change: -8.88, 
    price: 2050.95 
  },
  { 
    symbol: 'JNJ', 
    name: 'Johnson & Johnson', 
    change: 8.78, 
    price: 170.55 
  },
  { 
    symbol: 'TSLA', 
    name: 'Tesla, Inc.', 
    change: 7.42, 
    price: 725.60 
  },
  { 
    symbol: 'AMZN', 
    name: 'Amazon.com, Inc.', 
    change: 10.49, 
    price: 3452.89 
  },
];

// Monthly portfolio performance
export const monthlyPerformance = [
  { month: 'Jan', value: 4.5 },
  { month: 'Feb', value: 3.8 },
  { month: 'Mar', value: 7.2 },
  { month: 'Apr', value: 5.1 },
  { month: 'May', value: 2.7 },
  { month: 'Jun', value: -1.5 },
  { month: 'Jul', value: 3.2 },
  { month: 'Aug', value: 2.9 },
  { month: 'Sep', value: -0.8 },
  { month: 'Oct', value: 3.5 },
  { month: 'Nov', value: 2.1 },
  { month: 'Dec', value: 4.3 },
]; 