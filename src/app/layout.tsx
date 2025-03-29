import { Metadata } from 'next';
import Script from 'next/script';
import '../styles/globals.scss';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'WealthLens | Financial Portfolio Dashboard',
  description: 'A sophisticated financial portfolio dashboard for tracking investments and market trends.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var storedTheme = localStorage.getItem('theme');
                var theme = storedTheme || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (error) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            })();
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
