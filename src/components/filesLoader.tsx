import { Button } from "@/components/ui/button";
import { SignInButton,SignedIn,SignedOut, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import UploadModal  from "@/components/uploadModal"
import { FileCard } from "@/components/fileCard";
import Image from 'next/image'
import SearchBar from "@/components/searchBar";
import { useEffect, useState } from "react";
import useH from "@/hooks/useH";
import { DataTable } from "./file-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, Rows4 } from "lucide-react";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger} from "@/components/ui/tooltip"
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton"

interface prop{
    title: string;
    fav?: boolean;
}

type DataViewType = 'grid' | 'table';

export default  function FilesLoader({title,fav}:prop) {

  const org = useOrganization()
  const {user} = useUser()
  const [query , setQuery] = useState<string | undefined>(undefined)
  const [dataView, setDataView] = useState<DataViewType>('grid');
  const currentOwner = org.organization?.id ? org.organization.id : user?.id;
  const headerHeight = useH('header');
  const showFiles = useQuery(api.files.getFile, {ownerID: currentOwner || 'skip' , query:query, fav:fav ? true : false}) || undefined; 
   
  console.log(showFiles)

  useEffect(() => {
    const savedLayout  = localStorage.getItem('dataView') as DataViewType;
    if (savedLayout !== null) {
      setDataView(savedLayout);
    }
  }, []);

  const toggleView = (prop:DataViewType) => {
    setDataView(prop);
    localStorage.setItem('dataView', prop); 
  };

  return (
    
    <div className={` relative  flex-1 flex ${showFiles?.length === 0  ? 'justify-start' : ''} items-center flex-col`}>
      <TooltipProvider >
        
        <SignedOut>
          <SignInButton mode="modal"><Button variant={"default"}>Sign In</Button></SignInButton></SignedOut>
        <SignedIn>

        
          <>
            <div style={{ top: `calc(${headerHeight}px )` }} className={`p-6 m-1  bg-white z-[5]  w-full    sticky `}>
              <div className="flex flex-row justify-between mx-auto  items-center container ">
                <div className="flex  flex-col md:flex-row  gap-4 w-full justify-between">
                  <h1 className="text-2xl ">{title}</h1>
                  <SearchBar  setQuery={setQuery} />
                </div>
                <div className="flex  flex-col md:flex-row  gap-4 justify-end">
                <Tabs value={dataView} defaultValue={dataView} >
                        <TabsList >
                            <Tooltip>
                              <TooltipTrigger><TabsTrigger onClick={()=>toggleView("grid")} value="grid"><Grid className="w-8" /></TabsTrigger></TooltipTrigger>
                              <TooltipContent className="z-50">Grid view</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger><TabsTrigger onClick={()=>toggleView("table")} value="table"><Rows4 className="w-8"  /></TabsTrigger></TooltipTrigger>
                              <TooltipContent className="z-50">Table view</TooltipContent>
                            </Tooltip>
                        </TabsList>
                  </Tabs>
                <UploadModal currentOwner={currentOwner} />
                </div>
              </div>
            </div>
            
            {dataView === 'grid'  &&
            <div className=" grid grid-cols-1  sm:grid-cols-2 w-11/12 rounded-xl gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7  px-8   ">
                  {showFiles?.map((file) => <FileCard key={file._id} file={file} /> )}
            </div>
            }

            {dataView === 'table'&& showFiles && <DataTable data={showFiles} columns={columns} />}
            
          </>
          
        

        {showFiles?.length === 0 && 



          <div className="flex flex-col justify-center p-10 ">
            <Image src="/empty.svg" width={700}height={700}alt="Picture of the author"/>
            <div className="flex flex-col md:flex-row items-start p-8 justify-center gap-y-6 ">
              <h1 className="text-4xl">Upload something!</h1> 
            </div>
          </div>

        }

        {showFiles === undefined && dataView === 'grid' && 
            <div className=" grid grid-cols-1  sm:grid-cols-2 w-11/12 rounded-xl gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7  px-8   ">
              {
              Array.from({length:14}).map((index)=>(<Skeleton key={index + '1'} className="w-full h-72 bg-gray-300  md:h-52"/>))
              }
            </div>
        }

        {showFiles === undefined &&  dataView === 'table' && 
           <div className="grid w-11/12">
           <div className="grid  mb-1">
             <Skeleton className="h-10 bg-gray-400 rounded w-full" />
           </div>
       
           {Array.from({ length: 12 }).map((index) => (
             <div key={index + '1'} className="grid grid-cols-5 gap-1 mb-1">
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
             </div>
           ))}
         </div>
        }

        

      </SignedIn>
      
      </TooltipProvider>
    </div>
  );
}
