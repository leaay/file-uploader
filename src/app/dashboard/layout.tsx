'use client'
import { Button } from "@/components/ui/button";
import useH from "@/hooks/useH";
import useMedia from "@/hooks/useMedia";
import { FileStack, StarIcon } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const isDesktop = useMedia('(min-width: 768px)');
    const headerHeight = useH('header');
    const pathname = usePathname();

    return (
        <main className="relative md:grid md:grid-cols-[minmax(100px,200px)_1fr]">
          {
          isDesktop && 
          <div style={{ top: `calc(${headerHeight}px  )`, maxHeight:`calc(100vh - ${headerHeight}px - 2rem)`}}  className="p-8  sticky top-8 mb-2rem ">
            <div className="flex flex-col gap-4 py-4 items-start "> 
                <Link href="/dashboard">
                    <Button variant={"link"} className={clsx("flex gap-2", {"text-purple-500": pathname === "/dashboard",})}><FileStack /> Files</Button>
                </Link>
                <Link href="/dashboard/favorites">
                    <Button variant={"link"} className={clsx("flex gap-2", {"text-purple-500": pathname.includes("/dashboard/favorites"),})}><StarIcon /> Favorites</Button>
                </Link>
            </div>
          </div>
          }

        {children}
        </main>
    );
  }


  