"use client"
import { Button } from "@/components/ui/button";
import { SignInButton,SignedIn,SignedOut, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import UploadModal  from "@/components/uploadModal"
import { FileCard } from "@/components/fileCard";
import Image from 'next/image'
import Spiner from "@/components/spiner";

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

        {showFiles?.length===0 || !showFiles ? null :
          <div className="container mx-auto flex flex-row justify-between p-12 items-center">
            <h1 className="text-xl">Your Files</h1>
            <UploadModal currentOwner={currentOwner} />
          </div>
        }

        {showFiles?.length === 0 && 
          <div className="py-12 md:py-24">
          <Image
              src="/empty.svg"
              width={500}
              height={500}
              alt="Picture of the author"
          />
        
          <div className="flex flex-col md:flex-row items-start p-8 justify-between gap-y-6 ">
          <h1 className="text-4xl">Upload something!</h1> 
            <UploadModal currentOwner={currentOwner} />
          </div>
          
          </div>
        }

        {!showFiles && 
          <div className="flex flex-col gap-4 container items-center py-24 ">
            <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>   
        }

        <div className="grid grid-cols-1 w-3/4 rounded-xl gap-4 md:grid-cols-3 lg:grid-cols-5">
          {showFiles?.map((file) => <FileCard key={file._id} file={file} />)}
        </div>

      </SignedIn>
    </div>
  );
}
