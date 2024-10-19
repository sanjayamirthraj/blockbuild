
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./providers";
import { Toaster } from 'sonner'


const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
});

export const metadata: Metadata = {
  title: "Building Blocks",
  description: "Create Automated Smart Contracts and AI agents on-chain",
};

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interTight.variable} font-sans antialiased`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >    
          <div vaul-drawer-wrapper="" className="bg-background">
          <Providers>
            {children}
          </Providers>
        >
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
