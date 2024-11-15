
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster"
import Head from "next/head";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Uploaderv1',
  description: 'Uploaderv1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth " lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="min-h-screen flex flex-col ">
        <ConvexClientProvider>
        <Toaster />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
