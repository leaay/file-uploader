import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Header } from "./header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
        <Header/>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
