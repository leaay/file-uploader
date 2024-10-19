"use client"

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";


export default  function Home() {



  return (
    <div className={` relative sm:p-8 md:p-12 gap-6 sm:gap-4 md:gap-8 flex-1 flex  items-center flex-col`}>

           <SignedIn> <Link href="/dashboard">Dashboard</Link></SignedIn>
           <SignedOut>
                <SignInButton fallbackRedirectUrl={'/dashboard'} mode="modal"><Button variant={"default"}>Sign In</Button></SignInButton>
           </SignedOut>
        

    </div>
  );
}
