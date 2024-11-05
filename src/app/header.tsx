'use client'
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {  Menu } from "lucide-react";
import useMedia from "@/hooks/useMedia";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navigation from "@/components/navigation";


export  function Header(){

    const isDesktop = useMedia('(min-width: 768px)');
    const [isMenuOpen , setIsMenuOpen] = useState<boolean>(false)

    const openMenu = () => {
        setIsMenuOpen(true);
        document.body.classList.add('overflow-hidden'); 
    };

    
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

                    {!isDesktop && <Button onClick={openMenu} className="p-0" variant={"ghost"}><Menu /></Button>}
                    {!isDesktop && isMenuOpen && <Navigation mobile={true} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/>}

                </div>

            </div>  
        </div>  
    )           
}


                
                