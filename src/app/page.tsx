"use client"
import { Button } from "@/components/ui/button";
import { SignInButton,SignedIn,SignedOut, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton"
import UploadModal  from "@/components/uploadModal"

export default  function Home() {

  const org = useOrganization()
  const {user} = useUser()
  const currentOwner = org.organization?.id ? org.organization.id : user?.id;
  const showFiles = useQuery(api.files.getFile, {ownerID: currentOwner || 'skip'}) 

  return (
    <div className="flex flex-col gap-y-10 justify-center p-4 items-center">
      
        <SignedOut>
          <SignInButton mode="modal"><Button variant={"default"}>Sign In</Button></SignInButton></SignedOut>
        <SignedIn>

        <div className="container mx-auto flex flex-row justify-between p-12 items-center">
          <h1 className="text-xl">Your Files</h1>
          <UploadModal currentOwner={currentOwner} />
        </div>

        {!showFiles && 
          <div className="flex flex-col gap-4 container items-center ">
          <Skeleton className="bg-gray-400 h-[40px] w-3/4 rounded-xl"/>
          <Skeleton className="bg-gray-400 h-[40px] w-3/4 rounded-xl"/>
          <Skeleton className="bg-gray-400 h-[40px] w-3/4 rounded-xl"/>
          <Skeleton className="bg-gray-400 h-[40px] w-3/4 rounded-xl"/>
          </div>   
        }

        <div className="grid grid-cols-4 w-3/4 rounded-xl overflow-hidden bg-indigo-200">
          {showFiles?.map((file,index) => (
            <div key={file._id} className={`${index % 2 === 0 ? 'bg-slate-400' : 'bg-gray-300'} p-4 text-black`}>
              {file.name}
            </div>
          ))}
        </div>

      </SignedIn>
    </div>
  );
}
