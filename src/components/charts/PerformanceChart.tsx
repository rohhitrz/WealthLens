'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChartDataPoint, TimeFilter } from '@/types';
import { useTheme } from '@/components/ThemeProvider';

// Import ApexCharts dynamically to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PerformanceChartProps {
  data: ChartDataPoint[];
  timeFilter: TimeFilter;
}

const PerformanceChart = ({ data, timeFilter }: PerformanceChartProps) => {
  const { theme } = useTheme();
  const [chartOptions, setChartOptions] = useState<ApexCharts.ApexOptions>({});
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  
  useEffect(() => {
    // Format data for the chart
    const formattedDates = data.map(item => item.date);
    const values = data.map(item => item.value);
    
    setSeries([
      {
        name: 'Portfolio Value',
        data: values,
      },
    ]);
    
    // Update chart options
    setChartOptions({
      chart: {
        type: 'area',
        height: 300,
        fontFamily: 'var(--font-sans)',
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          speed: 800,
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        background: 'transparent',
      },
      colors: ['var(--primary)'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 100],
        },
      },
      stroke: {
        curve: 'smooth' as const,
        width: 3,
      },
      grid: {
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'category',
        categories: formattedDates,
        labels: {
          formatter: function (value) {
            // Format date based on the time filter
            const date = new Date(value);
            if (timeFilter === '1W' || timeFilter === '1M') {
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }
            return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
          },
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
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 });
          },
          style: {
            colors: 'var(--muted)',
          },
        },
      },
      tooltip: {
        theme: theme as 'light' | 'dark',
        x: {
          format: 'MMM dd, yyyy',
        },
        y: {
          formatter: function (value) {
            return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          },
        },
      },
      markers: {
        size: 0,
        strokeWidth: 0,
        hover: {
          size: 5,
        },
      },
    });
  }, [data, theme, timeFilter]);
  
  return (
    <div id="performance-chart">
      {typeof window !== 'undefined' && (
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="area"
          height={300}
        />
      )}
    </div>
  );
};

export default PerformanceChart; 