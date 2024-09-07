import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script'
import { ThemeProvider } from "@/components/shared/theme-toggle/provider/theme-provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from 'next-auth/react'
import { metadataobj } from '@/constants/metadata';

export const metadata: Metadata = metadataobj;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="pt-br">
      <body className="flex flex-row justify-center w-full h-full dark bg-background">

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster toastOptions={{
            className: '!bg-muted !text-primary',
          }} />

          {children}
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            strategy="lazyOnload"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
