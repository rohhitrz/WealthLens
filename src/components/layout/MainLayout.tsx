'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiDashboardLine, 
  RiPieChartLine, 
  RiLineChartLine, 
  RiSettings4Line,
  RiDashboardFill,
  RiPieChartFill,
  RiLineChartFill,
  RiSettings4Fill,
  RiMoneyDollarCircleLine
} from 'react-icons/ri';
import Globe from '@/components/three/Globe';
import styles from '@/styles/layout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // Ensure we only render after hydration to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <RiMoneyDollarCircleLine size={24} color="var(--primary)" />
          <span>WealthLens</span>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/dashboard" className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
            {pathname === '/dashboard' ? <RiDashboardFill /> : <RiDashboardLine />}
            <span>Dashboard</span>
          </Link>
          
          <Link href="/portfolio" className={`${styles.navItem} ${pathname === '/portfolio' ? styles.active : ''}`}>
            {pathname === '/portfolio' ? <RiLineChartFill /> : <RiLineChartLine />}
            <span>Portfolio</span>
          </Link>
          
          <Link href="/insights" className={`${styles.navItem} ${pathname === '/insights' ? styles.active : ''}`}>
            {pathname === '/insights' ? <RiPieChartFill /> : <RiPieChartLine />}
            <span>Insights</span>
          </Link>
          
          <Link href="/settings" className={`${styles.navItem} ${pathname === '/settings' ? styles.active : ''}`}>
            {pathname === '/settings' ? <RiSettings4Fill /> : <RiSettings4Line />}
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <span>JD</span>
          </div>
          <div className={styles.userInfo}>
            <h4>John Doe</h4>
            <p>Premium Plan</p>
          </div>
        </div>
        
        <div className={styles.canvasContainer}>
          <Globe />
        </div>
      </aside>
      
      <main className={styles.mainContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MainLayout; 