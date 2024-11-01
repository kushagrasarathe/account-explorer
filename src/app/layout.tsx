import Header from '@/components/header';
import Provider from '@/components/provider';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
// import { Raleway } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

// const font = Raleway({ subsets: ['latin'] });

const khTekaRegular = localFont({
  src: './fonts/KHTeka-Regular.woff2',
  variable: '--font-teka-sans',
  weight: '100 900',
});

const khTekaMono = localFont({
  src: './fonts/KHTekaMono-Regular.woff2',
  variable: '--font-teka-mono',
  weight: '100 900',
});

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
      <body
        className={cn(
          khTekaRegular.variable,
          khTekaMono.variable,
          'bg-reown-1/5'
        )}
      >
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
