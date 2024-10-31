import Header from '@/components/header';
import Provider from '@/components/provider';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

const font = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eth Explorer',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, 'bg-background antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <div className="mx-auto flex min-h-screen w-full flex-col px-6 md:max-w-7xl md:gap-y-4">
              <Header />
              <div>{children}</div>
            </div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
