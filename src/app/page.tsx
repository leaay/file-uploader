'use client'
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton,SignedIn,SignedOut } from "@clerk/nextjs";
// import {  currentUser } from "@clerk/nextjs/server";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";


export default async function Home() {


  const createFile = useMutation(api.files.createFile)
  

  return (
    <div className="flex flex-col gap-y-40 items-center">

      <SignedIn><SignOutButton><Button variant={"destructive"}>Sign Out</Button></SignOutButton></SignedIn>
      <SignedOut><SignInButton mode="modal"><Button variant={"default"}>Sign In</Button></SignInButton></SignedOut>
      <Button onClick={()=>{createFile({name:'hello'})}}>add to database</Button>

    </div>
  );
}
