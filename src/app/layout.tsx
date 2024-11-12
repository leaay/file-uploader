'use client'

import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster"
import Head from "next/head";

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

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Uploaderv1" />
        <meta property="og:description" content="Upload, manage, and securely store your files in one place." />
        <meta property="og:url" content="https://uploaderv1.netlify.app" />
        <meta property="og:image" content="/images/androind-chrome-192x192.png" />

        <meta name="twitter:card" content="images/androind-chrome-192x192.png" />
        <meta name="twitter:title" content="Uploaderv1" />
        <meta name="twitter:description" content="Upload, manage, and securely store your files in one place." />
        <meta name="twitter:image" content="/images/androind-chrome-192x192.png" />

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
