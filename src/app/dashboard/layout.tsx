'use client'
import { Button } from "@/components/ui/button";
import useH from "@/hooks/useH";
import useMedia from "@/hooks/useMedia";
import { FileStack, Star } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const isDesktop = useMedia('(min-width: 768px)');
    const headerHeight = useH('header');

    return (
        <main className="relative md:grid md:grid-cols-[minmax(100px,200px)_1fr]">
          {
          isDesktop && 
          <div style={{ top: `calc(${headerHeight}px  )`, maxHeight:`calc(100vh - ${headerHeight}px - 2rem)`}}  className="p-8  sticky top-8 mb-2rem ">
            <div className="flex flex-col gap-4 py-4 items-start "> 
                <Button variant={"link"}><Link href={'/dashboard'} className="flex gap-2 items-center" > <FileStack />Files</Link></Button>
                <Button  variant={"link"}><Link href={'/dashboard/favourites'} className="flex gap-2 items-center" ><Star/>Favourites </Link></Button>
            </div>
          </div>
          }

        {children}
        </main>
    );
  }


  