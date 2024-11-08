'use client'
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth " lang="en">
      <body className="min-h-screen flex flex-col ">
        <ConvexClientProvider>
        <Toaster />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
