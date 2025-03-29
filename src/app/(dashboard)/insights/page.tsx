'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { assetAllocation, topPerformers, worstPerformers, monthlyPerformance } from '@/data/insights';
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';
import styles from '@/styles/insights.module.scss';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<'top' | 'worst'>('top');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Pie chart options for asset allocation
  const pieChartOptions = {
    chart: {
      type: 'pie' as const,
      fontFamily: 'var(--font-sans)',
    },
    labels: assetAllocation.map(item => item.label),
    colors: [
      '#336cfb', // Primary
      '#4793ff', 
      '#59a0ff', 
      '#6badff', 
      '#7dbafe', 
      '#8ec7fd',
      '#a0d4fc',
      '#b2e1fb',
      '#c4eefa',
      '#d6fbf9',
    ],
    legend: {
      position: 'bottom' as const,
      fontSize: '14px',
      labels: {
        colors: 'var(--foreground)',
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (value: number) => {
          return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          legend: {
            position: 'bottom' as const,
            fontSize: '12px',
          },
        },
      },
    ],
    stroke: {
      width: 0,
    },
  };
  
  // Bar chart options for monthly performance
  const barChartOptions = {
    chart: {
      type: 'bar' as const,
      fontFamily: 'var(--font-sans)',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        columnWidth: '60%',
      },
    },
    colors: monthlyPerformance.map(item => item.value >= 0 ? 'var(--success)' : 'var(--danger)'),
    xaxis: {
      categories: monthlyPerformance.map(item => item.month),
      labels: {
        style: {
          colors: 'var(--muted)',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value.toFixed(1)}%`,
        style: {
          colors: 'var(--muted)',
        },
      },
    },
    grid: {
      borderColor: 'var(--border)',
      strokeDashArray: 4,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value.toFixed(2)}%`,
      },
    },
  };
  
  if (!mounted) return null;
  
  return (
    <div className={styles.insights}>
      <div className={styles.headerArea}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Detailed analysis of your portfolio composition and performance
        </motion.p>
      </div>
      
      <motion.div 
        className={styles.allocationSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={styles.sectionHeader}>
          <h3>Asset Allocation</h3>
        </div>
        
        <div className={styles.chart}>
          {mounted && (
            <ReactApexChart
              options={pieChartOptions}
              series={assetAllocation.map(item => item.value)}
              type="pie"
              height={300}
            />
          )}
        </div>
        
        <div className={styles.allocationLegend}>
          {assetAllocation.map((item, index) => (
            <div key={item.label} className={styles.legendItem}>
              <div className={styles.circle} style={{ backgroundColor: pieChartOptions.colors[index % pieChartOptions.colors.length] }}></div>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.percentage}>{item.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.performersSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className={styles.sectionHeader}>
          <h3>Top Performers</h3>
        </div>
        
        <div className={styles.tabList}>
          <button 
            className={`${styles.tab} ${activeTab === 'top' ? styles.active : ''}`} 
            onClick={() => setActiveTab('top')}
          >
            Top Performers
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'worst' ? styles.active : ''}`} 
            onClick={() => setActiveTab('worst')}
          >
            Worst Performers
          </button>
        </div>
        
        <div className={styles.performerList}>
          {(activeTab === 'top' ? topPerformers : worstPerformers).map((performer) => (
            <div key={performer.symbol} className={styles.performerItem}>
              <div className={styles.performerIcon}>
                {performer.symbol.substring(0, 2)}
              </div>
              
              <div className={styles.performerInfo}>
                <div className={styles.symbol}>{performer.symbol}</div>
                <div className={styles.name}>{performer.name}</div>
              </div>
              
              <div className={styles.performerValue}>
                <div className={`${styles.percentage} ${performer.change >= 0 ? styles.positive : styles.negative}`}>
                  {performer.change >= 0 ? <RiArrowUpLine /> : <RiArrowDownLine />}
                  {Math.abs(performer.change).toFixed(2)}%
                </div>
                <div className={styles.price}>${performer.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.monthlySection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className={styles.sectionHeader}>
          <h3>Monthly Performance</h3>
        </div>
        
        <div className={styles.chart}>
          {mounted && (
            <ReactApexChart
              options={barChartOptions}
              series={[{
                name: 'Monthly Return',
                data: monthlyPerformance.map(item => item.value),
              }]}
              type="bar"
              height={400}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
