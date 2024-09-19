"use client"
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton,SignedIn,SignedOut } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default  function Home() {


  const createFile = useMutation(api.files.createFile)
  const showFiles = useQuery(api.files.getFile)


  return (
    <div className="flex flex-row gap-x-10 justify-center p-4">

      <SignedIn><SignOutButton><Button variant={"destructive"}>Sign Out</Button></SignOutButton></SignedIn>
      <SignedOut><SignInButton mode="modal"><Button variant={"default"}>Sign In</Button></SignInButton></SignedOut>
      <Button onClick={()=>{createFile({name:'hello2'})}}>add to database</Button>

      {showFiles?.map((file) => (
        <div key={file.id}>
          {file.name}
        </div>
      ))}
 
    </div>
  );
}
