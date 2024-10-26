'use client'
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { FileStack, Menu, Star } from "lucide-react";
import useMedia from "@/hooks/useMedia";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export  function Header(){

    const isDesktop = useMedia('(min-width: 768px)');
    const pathname = usePathname()
    
    return (
        <div className="header border-b-2 p-4 bg-white sticky top-0 z-10 ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="font-medium text-l  md:text-2xl flex items-center gap-x-2"><Image src="/logo.svg" width={66} height={66} alt="logo"/>Uploaderv1</div>
                <div className="flex gap-x-4 md:gap-x-12">
                    <OrganizationSwitcher appearance={{
                        elements:{
                            organizationSwitcherTrigger:'p-0 md:p-0.5',
                            userPreview:'gap-1 md:gap-2',
                            internal3gh7hq:'hidden md:flex',
                        }
                    }}/>
                    <UserButton appearance={{
                        elements: {
                            avatarBox:'w-6 , h-6 , md:h-12 , md:w-12',
                        },
                    }} />

                {!isDesktop &&
                    <DropdownMenu>
                        <DropdownMenuTrigger><Menu/></DropdownMenuTrigger>
                        <DropdownMenuContent className="p-12 ">
                            <DropdownMenuLabel className="pb-4" >Navigation</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link href="/dashboard">
                                    <Button variant={"link"} className={clsx("flex gap-2", {"text-purple-500": pathname === "/dashboard",})}><FileStack /> Files</Button>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/dashboard/favorites">
                                    <Button variant={"link"} className={clsx("flex gap-2", {"text-purple-500": pathname.includes("/dashboard/favorites"),})}><Star /> Favorites</Button>
                                </Link>
                            </DropdownMenuItem>
                            <Separator />

                        </DropdownMenuContent>
                    </DropdownMenu>
                }

                </div>

            </div>  
        </div>  
    )           
}


                
                