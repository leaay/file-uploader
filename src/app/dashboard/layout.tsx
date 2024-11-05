'use client'
import useH from "@/hooks/useH";
import useMedia from "@/hooks/useMedia";
import { usePathname } from "next/navigation";
import Navigation from "@/components/navigation";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const isDesktop = useMedia('(min-width: 768px)');
    // const headerHeight = useH('header');
    // const pathname = usePathname();

    return (
        <main className="relative md:grid md:grid-cols-[minmax(100px,200px)_1fr]">
         {isDesktop && <Navigation desktop={true}  />} 
         {children}
        </main>
    );
  }


  