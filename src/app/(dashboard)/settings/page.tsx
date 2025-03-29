'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiSunLine, RiMoonLine, RiSaveLine, RiRestartLine } from 'react-icons/ri';
import { useTheme } from '@/components/ThemeProvider';
import styles from '@/styles/settings.module.scss';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  
  // State for user preferences
  const [preferences, setPreferences] = useState({
    notifications: true,
    autoRefresh: true,
  });
  
  // Load saved settings on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);
  
  // Handle toggle change
  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Save settings
  const saveSettings = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    alert('Settings saved successfully!');
  };
  
  // Reset to defaults
  const resetDefaults = () => {
    const defaultPreferences = {
      notifications: true,
      autoRefresh: true,
    };
    
    setPreferences(defaultPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    setTheme('dark');
  };
  
  return (
    <div className={styles.settings}>
      <div className={styles.headerArea}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Settings
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Customize your dashboard experience and preferences
        </motion.p>
      </div>
      
      <motion.div 
        className={styles.settingsContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={styles.settingGroup}>
          <h3>Appearance</h3>
          
          <div className={styles.settingRow}>
            <div>
              <h4>Theme Mode</h4>
              <p>Switch between light and dark mode</p>
            </div>
            <div className={styles.themeToggle}>
              <button 
                className={`${styles.themeButton} ${theme === 'light' ? styles.active : ''}`}
                onClick={() => setTheme('light')}
              >
                <RiSunLine />
                Light
              </button>
              <button 
                className={`${styles.themeButton} ${theme === 'dark' ? styles.active : ''}`}
                onClick={() => setTheme('dark')}
              >
                <RiMoonLine />
                Dark
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.settingGroup}>
          <h3>Notifications</h3>
          
          <div className={styles.settingRow}>
            <div>
              <h4>Enable Notifications</h4>
              <p>Get alerts for important updates</p>
            </div>
            <div className={styles.toggle}>
              <input 
                type="checkbox" 
                id="notifications" 
                checked={preferences.notifications} 
                onChange={() => handleToggle('notifications')} 
              />
              <label htmlFor="notifications"></label>
            </div>
          </div>
          
          <div className={styles.settingRow}>
            <div>
              <h4>Auto-refresh Data</h4>
              <p>Automatically update portfolio data</p>
            </div>
            <div className={styles.toggle}>
              <input 
                type="checkbox" 
                id="autoRefresh" 
                checked={preferences.autoRefresh} 
                onChange={() => handleToggle('autoRefresh')} 
              />
              <label htmlFor="autoRefresh"></label>
            </div>
          </div>
        </div>
        
        <div className={styles.settingsActions}>
          <button 
            className={styles.resetButton} 
            onClick={resetDefaults}
          >
            <RiRestartLine />
            Reset to Defaults
          </button>
          
          <button 
            className={styles.saveButton} 
            onClick={saveSettings}
          >
            <RiSaveLine />
            Save Settings
          </button>
        </div>
      </motion.div>
    </div>
  );
}
