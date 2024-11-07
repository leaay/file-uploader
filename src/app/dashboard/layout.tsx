'use client'
import useMedia from "@/hooks/useMedia";
import Navigation from "@/components/navigation";
import { Header } from "../header";
import Footer from "@/components/footer";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const isDesktop = useMedia('(min-width: 768px)');

    return (
        <>
        <Header/>
        <main className="relative md:grid md:grid-cols-[minmax(100px,200px)_1fr]">
         {isDesktop && <Navigation desktop={true}  />} 
         {children}
        </main>
        <Footer />
        </>
    );
  }


  