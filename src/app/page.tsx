"use client"
import { Button } from "@/components/ui/button";
import { SignInButton,SignedIn,SignedOut, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import UploadModal  from "@/components/uploadModal"
import { FileCard } from "@/components/fileCard";

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
            loading files..
          </div>   
        }

        <div className="grid grid-cols-1 w-3/4 rounded-xl gap-4 md:grid-cols-3 lg:grid-cols-5">
          {showFiles?.map((file) => <FileCard key={file._id} file={file} />)}
        </div>

      </SignedIn>
    </div>
  );
}
