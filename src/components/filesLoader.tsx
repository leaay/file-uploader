"use client"
import { Button } from "@/components/ui/button";
import { SignInButton,SignedIn,SignedOut, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import UploadModal  from "@/components/uploadModal"
import { FileCard } from "@/components/fileCard";
import Image from 'next/image'
import SearchBar from "@/components/searchBar";
import { useState } from "react";

interface prop{
    title: string;
}

export default  function FilesLoader({title}:prop) {

  const org = useOrganization()
  const {user} = useUser()
  const [query , setQuery] = useState<string | undefined>(undefined)
  const currentOwner = org.organization?.id ? org.organization.id : user?.id;


  const showFiles = useQuery(api.files.getFile, {ownerID: currentOwner || 'skip' , query:query}); 
  
  const isLoading = showFiles === undefined

  return (
    
    <div className={` relative sm:p-8  gap-6 sm:gap-4 md:gap-8 flex-1 flex ${showFiles?.length === 0 || isLoading ? 'justify-start' : ''} items-center flex-col`}>
      
        <SignedOut>
          <SignInButton mode="modal"><Button variant={"default"}>Sign In</Button></SignInButton></SignedOut>
        <SignedIn>

        
          <>
            <div className="px-4 container mx-auto flex flex-row justify-between  items-center max-w-7xl sticky pt-2 z-10 top-[72px] bg-white">
              <h1 className="text-2xl">{title}</h1>
              <SearchBar  setQuery={setQuery} />
              <UploadModal currentOwner={currentOwner} />
            </div>
            
            {!isLoading && showFiles?.length !== 0 && <div className="px-4 container mx-auto  max-w-7xl">Found {showFiles?.length} files:</div>}

            <div className=" grid grid-cols-1 sm:grid-cols-2 w-3/4 rounded-xl gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7  px-8 ">
                  {showFiles?.map((file) => <FileCard key={file._id} file={file} /> )}
            </div>
          </>
      

        {showFiles?.length === 0 && 
          <div className="flex flex-col justify-center p-10 ">
            <Image src="/empty.svg" width={700}height={700}alt="Picture of the author"/>
            <div className="flex flex-col md:flex-row items-start p-8 justify-center gap-y-6 ">
              <h1 className="text-4xl">Upload something!</h1> 
            </div>
          </div>
        }

        {isLoading && 
          <div className="flex flex-col gap-4 container items-center py-24 ">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>   
        }

        

      </SignedIn>
    </div>
  );
}
