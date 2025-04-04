import { Holding } from '../types';

export const portfolioData: Holding[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 15,
    avgPrice: 145.75,
    currentPrice: 178.32,
    value: 2674.80,
    change: 22.35,
    sector: 'Technology',
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 10,
    avgPrice: 242.50,
    currentPrice: 315.75,
    value: 3157.50,
    change: 30.21,
    sector: 'Technology',
  },
  {
    id: '3',
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    quantity: 8,
    avgPrice: 3125.00,
    currentPrice: 3452.89,
    value: 27623.12,
    change: 10.49,
    sector: 'Consumer Cyclical',
  },
  {
    id: '4',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 5,
    avgPrice: 2250.75,
    currentPrice: 2050.95,
    value: 10254.75,
    change: -8.88,
    sector: 'Communication Services',
  },
  {
    id: '5',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    quantity: 12,
    avgPrice: 675.50,
    currentPrice: 725.60,
    value: 8707.20,
    change: 7.42,
    sector: 'Automotive',
  },
  {
    id: '6',
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    quantity: 18,
    avgPrice: 123.45,
    currentPrice: 149.78,
    value: 2696.04,
    change: 21.33,
    sector: 'Financial Services',
  },
  {
    id: '7',
    symbol: 'V',
    name: 'Visa Inc.',
    quantity: 25,
    avgPrice: 197.65,
    currentPrice: 230.50,
    value: 5762.50,
    change: 16.62,
    sector: 'Financial Services',
  },
  {
    id: '8',
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    quantity: 14,
    avgPrice: 156.78,
    currentPrice: 170.55,
    value: 2387.70,
    change: 8.78,
    sector: 'Healthcare',
  },
  {
    id: '9',
    symbol: 'PFE',
    name: 'Pfizer Inc.',
    quantity: 40,
    avgPrice: 42.35,
    currentPrice: 36.75,
    value: 1470.00,
    change: -13.22,
    sector: 'Healthcare',
  },
  {
    id: '10',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    quantity: 20,
    avgPrice: 125.45,
    currentPrice: 245.89,
    value: 4917.80,
    change: 96.01,
    sector: 'Technology',
  },
];

export const portfolioSummary = {
  totalBalance: 69651.41,
  totalProfitLoss: 12405.23,
  profitLossPercentage: 21.67,
  holdingsCount: portfolioData.length
}; 