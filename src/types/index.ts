export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  change: number;
  sector: string;
}

export interface PortfolioSummary {
  totalBalance: number;
  totalProfitLoss: number;
  profitLossPercentage: number;
  holdingsCount: number;
}

export type TimeFilter = '1W' | '1M' | '3M' | 'YTD' | '1Y';

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
}

export interface InsightItem {
  label: string;
  value: number;
  percentage: number;
}

export interface Performance {
  symbol: string;
  name: string;
  change: number;
  price: number;
}

export type ThemeMode = 'light' | 'dark'; 