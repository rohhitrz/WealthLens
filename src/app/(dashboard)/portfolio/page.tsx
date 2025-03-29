'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  RiArrowUpLine, 
  RiArrowDownLine, 
  RiAddLine, 
  RiArrowUpSLine, 
  RiArrowDownSLine 
} from 'react-icons/ri';
import { portfolioData } from '@/data/portfolio';
import { holdingPerformance } from '@/data/performance';
import { Holding } from '@/types';
import styles from '@/styles/portfolio.module.scss';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Holding; direction: 'asc' | 'desc' } | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setHoldings(portfolioData);
  }, []);
  
  // Sorting functionality
  const requestSort = (key: keyof Holding) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };
  
  const sortedHoldings = [...holdings].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    
    if (a[key] < b[key]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Sparkline chart options
  const getSparklineOptions = (symbol: string) => {
    return {
      chart: {
        type: 'line' as const,
        sparkline: {
          enabled: true,
        },
        animations: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'smooth' as const,
        width: 2,
      },
      colors: [holdingPerformance[symbol][holdingPerformance[symbol].length - 1] > holdingPerformance[symbol][0] ? 'var(--success)' : 'var(--danger)'],
      tooltip: {
        enabled: false,
      },
    };
  };
  
  // Form state for adding a new holding
  const [newHolding, setNewHolding] = useState({
    symbol: '',
    name: '',
    quantity: '',
    avgPrice: '',
    sector: 'Technology',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewHolding(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddHolding = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!newHolding.symbol || !newHolding.name || !newHolding.quantity || !newHolding.avgPrice) {
      alert('Please fill all required fields');
      return;
    }
    
    const quantity = parseFloat(newHolding.quantity);
    const avgPrice = parseFloat(newHolding.avgPrice);
    
    if (isNaN(quantity) || isNaN(avgPrice)) {
      alert('Please enter valid numbers for quantity and price');
      return;
    }
    
    // Create a new holding
    const currentPrice = avgPrice * 1.05; // Mock current price 5% higher
    const id = (holdings.length + 1).toString();
    
    const holding: Holding = {
      id,
      symbol: newHolding.symbol.toUpperCase(),
      name: newHolding.name,
      quantity,
      avgPrice,
      currentPrice,
      value: quantity * currentPrice,
      change: 5, // Mock 5% change
      sector: newHolding.sector,
    };
    
    // Update holdings state
    setHoldings(prev => [...prev, holding]);
    
    // Reset form and close modal
    setNewHolding({
      symbol: '',
      name: '',
      quantity: '',
      avgPrice: '',
      sector: 'Technology',
    });
    setIsModalOpen(false);
  };
  
  if (!mounted) return null;
  
  return (
    <div className={styles.portfolio}>
      <div className={styles.headerArea}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.h1>
        
        <motion.button 
          className={styles.actionButton}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsModalOpen(true)}
        >
          <RiAddLine />
          Add Holding
        </motion.button>
      </div>
      
      <motion.div 
        className={styles.holdingsTable}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.tableHeader}>
          <div className={`${styles.cell} ${sortConfig?.key === 'symbol' ? styles.active : ''}`} onClick={() => requestSort('symbol')}>
            Symbol
            {sortConfig?.key === 'symbol' && (
              sortConfig.direction === 'asc' ? <RiArrowUpSLine /> : <RiArrowDownSLine />
            )}
          </div>
          <div className={styles.cell}>Name</div>
          <div className={`${styles.cell} ${styles.quantity} ${sortConfig?.key === 'quantity' ? styles.active : ''}`} onClick={() => requestSort('quantity')}>
            Quantity
            {sortConfig?.key === 'quantity' && (
              sortConfig.direction === 'asc' ? <RiArrowUpSLine /> : <RiArrowDownSLine />
            )}
          </div>
          <div className={`${styles.cell} ${sortConfig?.key === 'value' ? styles.active : ''}`} onClick={() => requestSort('value')}>
            Value
            {sortConfig?.key === 'value' && (
              sortConfig.direction === 'asc' ? <RiArrowUpSLine /> : <RiArrowDownSLine />
            )}
          </div>
          <div className={`${styles.cell} ${styles.change} ${sortConfig?.key === 'change' ? styles.active : ''}`} onClick={() => requestSort('change')}>
            Change
            {sortConfig?.key === 'change' && (
              sortConfig.direction === 'asc' ? <RiArrowUpSLine /> : <RiArrowDownSLine />
            )}
          </div>
          <div className={styles.cell}>Chart</div>
        </div>
        
        <div className={styles.tableRows}>
          {sortedHoldings.map((holding, index) => (
            <motion.div 
              key={holding.id}
              className={styles.tableRow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <div className={styles.symbol}>{holding.symbol}</div>
              <div className={styles.name}>{holding.name}</div>
              <div className={styles.quantity}>{holding.quantity}</div>
              <div className={styles.value}>${holding.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className={`${styles.change} ${holding.change >= 0 ? styles.positive : styles.negative}`}>
                {holding.change >= 0 ? <RiArrowUpLine /> : <RiArrowDownLine />}
                {Math.abs(holding.change).toFixed(2)}%
              </div>
              <div className={styles.sparkline}>
                {typeof window !== 'undefined' && holdingPerformance[holding.symbol] && (
                  <ReactApexChart
                    options={getSparklineOptions(holding.symbol)}
                    series={[{ data: holdingPerformance[holding.symbol] }]}
                    type="line"
                    height={30}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Add Holding Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className={styles.addHoldingModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h2>Add New Holding</h2>
              
              <form onSubmit={handleAddHolding}>
                <div className={styles.formGroup}>
                  <label htmlFor="symbol">Symbol</label>
                  <input 
                    type="text" 
                    id="symbol" 
                    name="symbol" 
                    value={newHolding.symbol} 
                    onChange={handleInputChange} 
                    placeholder="AAPL" 
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="name">Company Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={newHolding.name} 
                    onChange={handleInputChange} 
                    placeholder="Apple Inc." 
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="quantity">Quantity</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    value={newHolding.quantity} 
                    onChange={handleInputChange} 
                    placeholder="10" 
                    min="0.01" 
                    step="0.01" 
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="avgPrice">Average Price</label>
                  <input 
                    type="number" 
                    id="avgPrice" 
                    name="avgPrice" 
                    value={newHolding.avgPrice} 
                    onChange={handleInputChange} 
                    placeholder="150.00" 
                    min="0.01" 
                    step="0.01" 
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="sector">Sector</label>
                  <select 
                    id="sector" 
                    name="sector" 
                    value={newHolding.sector} 
                    onChange={handleInputChange}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Consumer Cyclical">Consumer Cyclical</option>
                    <option value="Communication Services">Communication Services</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Energy">Energy</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Industrials">Industrials</option>
                  </select>
                </div>
                
                <div className={styles.modalActions}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                  >
                    Add Holding
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
