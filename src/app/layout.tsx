import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster"
import { Header } from "./header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ConvexClientProvider>
        <Toaster />
        <Header/>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
