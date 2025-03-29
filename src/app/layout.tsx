import { Metadata } from 'next';
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
