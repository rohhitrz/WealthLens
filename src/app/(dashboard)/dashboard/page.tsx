'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { portfolioSummary } from '@/data/portfolio';
import { performanceData } from '@/data/performance';
import { newsData } from '@/data/news';
import { TimeFilter } from '@/types';
import styles from '@/styles/dashboard.module.scss';

// Dynamically import ApexCharts to avoid SSR issues
const DynamicChart = dynamic(() => import('@/components/charts/PerformanceChart'), {
  ssr: false,
  loading: () => <div className={styles.chartContainer}>Loading chart...</div>
});

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('1M');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Retrieve last selected time filter from localStorage if available
    const savedFilter = localStorage.getItem('dashboardTimeFilter') as TimeFilter | null;
    if (savedFilter) {
      setTimeFilter(savedFilter);
    }
  }, []);
  
  // Save the selected filter to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('dashboardTimeFilter', timeFilter);
    }
  }, [timeFilter, mounted]);
  
  // Animate number counting up
  const countUpVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };
  
  if (!mounted) return null;
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.headerArea}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Overview of your portfolio performance and market insights
        </motion.p>
      </div>
      
      <motion.div 
        className={styles.summarySection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={styles.summaryCard}>
          <h4>Total Balance</h4>
          <motion.div 
            className={styles.value}
            variants={countUpVariants}
            initial="hidden"
            animate="visible"
          >
            ${portfolioSummary.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </motion.div>
          <div className={`${styles.change} ${portfolioSummary.profitLossPercentage >= 0 ? styles.positive : styles.negative}`}>
            {portfolioSummary.profitLossPercentage >= 0 ? <RiArrowUpLine /> : <RiArrowDownLine />}
            {Math.abs(portfolioSummary.profitLossPercentage).toFixed(2)}%
          </div>
        </div>
        
        <div className={styles.summaryCard}>
          <h4>Profit/Loss</h4>
          <motion.div 
            className={styles.value}
            variants={countUpVariants}
            initial="hidden"
            animate="visible"
          >
            ${portfolioSummary.totalProfitLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </motion.div>
          <div className={`${styles.change} ${portfolioSummary.profitLossPercentage >= 0 ? styles.positive : styles.negative}`}>
            {portfolioSummary.profitLossPercentage >= 0 ? <RiArrowUpLine /> : <RiArrowDownLine />}
            {Math.abs(portfolioSummary.profitLossPercentage).toFixed(2)}%
          </div>
        </div>
        
        <div className={styles.summaryCard}>
          <h4>Holdings</h4>
          <motion.div 
            className={styles.value}
            variants={countUpVariants}
            initial="hidden"
            animate="visible"
          >
            {portfolioSummary.holdingsCount}
          </motion.div>
          <div className={styles.change}>
            Assets across different sectors
          </div>
        </div>
        
        <div className={styles.summaryCard}>
          <h4>Market Status</h4>
          <motion.div 
            className={styles.value}
            variants={countUpVariants}
            initial="hidden"
            animate="visible"
          >
            Open
          </motion.div>
          <div className={`${styles.change} ${styles.positive}`}>
            <RiArrowUpLine />
            Active Trading
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.chartSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className={styles.chartHeader}>
          <h3>Portfolio Performance</h3>
          
          <div className={styles.filters}>
            {(['1W', '1M', '3M', 'YTD', '1Y'] as TimeFilter[]).map((filter) => (
              <button 
                key={filter}
                className={`${styles.filter} ${timeFilter === filter ? styles.active : ''}`}
                onClick={() => setTimeFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.chartContainer}>
          <DynamicChart data={performanceData[timeFilter]} timeFilter={timeFilter} />
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.newsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className={styles.sectionHeader}>
          <h3>Market News</h3>
        </div>
        
        <div className={styles.newsContainer}>
          {newsData.slice(0, 5).map((news) => (
            <div key={news.id} className={styles.newsItem}>
              <div className={styles.newsImage}>
                <Image 
                  src={news.imageUrl}
                  alt={news.title}
                  width={80}
                  height={60}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.newsContent}>
                <h4>{news.title}</h4>
                <p>{news.summary}</p>
                <div className={styles.newsFooter}>
                  <span className={styles.source}>{news.source}</span>
                  <span>{new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
